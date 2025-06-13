//basically all error middleware looks like this. the info before the request, then the request, then the response, then what happens after the response. we're basically intercepting the error so we have a better idea of what went wrong.

//how it works as an example:
//create a subscription => middleware (check renewal date) => middleware (check for errors) => next => controller

const errorMiddleware = (err, req, res, next) => { 
    try {
        let error = { ...err}; //decode error by destructuring error we get through props
        error.message = err.message;
        console.error(err);

        //figure out type of error
        //Mongoose bad ObjectId (apparently a common one)
        if (err.name === "CastError") {
            const message = "Resource not found";
            error = new Error(message);
            error.statusCode = 404;
        }
        //Mongoose duplicate key
        if (err.code ===11000) {
            const message ="Duplicate field value entered";
            error = new Error(message);
            error.statusCode = 400;
        }
        //Mongoose validation error -- when we're creating a document and don't pass all the right props.
        if (err.name === "Validation Error") {
            const message = Object.values(err.errors).map(val => val.message); //mapping over all the values because we might have many errors and show a message for each one.
            error = new Error(message.join(", ")); //join all the messages
            error.statusCode = 400;
        }
        res.status(error.statusCode || 500).json({success: false, error: error.message || "Server Error"}) //returns the response
    }catch(error) {
    next(error) //sends to next step to let us know error actually happened
    }
};

export default errorMiddleware;