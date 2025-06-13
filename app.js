import express from 'express';
import cookieParser from 'cookie-parser';

import {PORT} from './config/env.js';

import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectToDatabase from './database/mongodb.js'; //don't forget to import
import errorMiddleware from './middlewares/error.middleware.js';


const app = express();

//express built-in middleware. 
app.use(express.json()); //allows app to handle json data sent in requests.
app.use(express.urlencoded({extended: false})); //helps us process data sent to us via html forms in a simple format.
app.use(cookieParser()); //reads cookies from incoming requests so the app can store user data.

app.use('/api/v1/auth', authRouter); //means that you can get to the sign-up page from api.v1.auth.sign-up
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

app.use(errorMiddleware); //the custom middleware we made.

app.get('/', (req, res) => {     //calls first path to homepage that has a callback function as the second argument
    res.send("Subscription Tracker API");
});



app.listen(PORT, async () =>{ //need to define where the app is being accessed
    console.log(`Server is running on port ${PORT}`)

    await connectToDatabase() //because this is an async function, this needs to have await in front and async needs to be added to app.listen
})

export default app