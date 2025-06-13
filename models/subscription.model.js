import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: [true, "Subscription name required"],
        trim: true,
        minLength: 2,
        maxLength: 100,
    },
    price: {
        type: Number,
        required: [true, "Subscription price is required"],
        min: [0, "Price must be greater than 0"] //used for numbers.
    },
    currency: {
        type: String,
        enum: ["USD", "EUR", "GBP"],
        default: "USD"
    },
    frequency: {
        type: String,
        enum: ["daily", "weekly", "monthly", "yearly"]
    },
    category: {
        type: String,
        enum: ["sports", "news", "entertainment", "lifestyle", "technology", "finance", "politics", "other"],
        required: true
    },
    paymentMethod: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ["active", "cancelled", "expired"],
        default: "active"
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => value <= new Date(), //this is checking if you're putting in future dates or not making it invalid.
            message: "Start date must be in the past."
        }
    },
    renewalDate: {
        type: Date,
        //required: true, //commenting this out so its not required to run the auto renewal function below.
        validate: {
            validator: function(value) {  
                return value > this.startDate;
             }, 
            message: "Renewal date must be after start date." //renewal but be greater than. also comparing it with constructor startDate above. arrow functions won't work for this.
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, //this is the user id whose subscription it belongs to.
        ref: "User", //refernce to User model
        required: true,
        index: true, //optimizes queries by indexing the user field.
    }
}, {timestamps: true});

//create a function that happens before each of the documents are created.
//it auto calculates the renewal date if missing.
subscriptionSchema.pre("save", function (next) {  //this gets called before we save the document
    if(!this.renewalDate) { //is calculated based on the start date and the renewal period.
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };
        this.renewalDate = new Date(this.startDate); //made the start date
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]); //now increases it by adding the number of days based on the type of frequency that gets passed in.
    }

    //auto-update the status if renewal date has passed.
    if (this.renewalDate < new Date()) {
        this.status = "expired";
    }

    next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema); 

export default Subscription;