//models tell us what our data looks like

import mongoose from "mongoose";

const userSchema = new mongoose.Schema( { //passes an obj that defines how a specific model is going to look like
    name: {
        type: String, 
        required: [true, "Username is required"], //the second part is an error message if an error occurs.
        trim: true, //this removes empty spaces if exist.
        minLength: 2, //this is how many characters.
        maxLength: 50,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true, //means there can only be one.
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Please give a valid email"], //this is an expression that checks for email pattern.
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: 6,
    }
}, {timestamps: true}); //this means that alongside the above objs, we'll have createdAt and updatedAt fields.

const User = mongoose.model("User", userSchema); //and this makes sure each new user instance created follows the above schema.

export default User;