import mongoose from "mongoose";
import {DB_URI, NODE_ENV} from '../config/env.js';

if(!DB_URI) {
    throw new Error("define the MONGODB_URI enviornment variable inside .env.<development/production>.local");
}

const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI) //this is the process we want to go right. we want to connect to this database.
        console.log(`Connected to database in ${NODE_ENV} mode`); //this is either production or development
    }catch (error) {
        console.error("Error connecting to database: ", error); //show what error

        process.exit(1); //exits proccess with code of 1 which means failure
    }
};

export default connectToDatabase;