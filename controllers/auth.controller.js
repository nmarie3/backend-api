import mongoose from "mongoose";
import bcrypt from "bcryptjs"; //generates randomized strings to hash our passwords
import jwt from "jsonwebtoken";
import User from '../models/user.model.js';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.js'

export const signUp = async (req, res, next) => {
    //implement sign-up logic here
    const session = await mongoose.startSession(); //mongoose transaction session
    session.startTransaction(); //basically we need to have an atomic operation -- so if something goes wrong we stop everything immediatatly so we don't get errors of only half the data getting logged or whatnot.

    try {
        //logic to create new user
        const {name, email, password} = req.body; //req.body is an obj containing data from client (POST request)

        //check if user already exists
        const existingUser = await User.findOne({email}) //checks if email is same as the one user is trying to create account with.
        if(existingUser) {
            const error = new Error("User already exists");
            error.statusCode = 409; //already exists
            throw error;
        }

        //if user doesn't already exist then we Hash the password -- always want to secure passwords, never store them in plain text
        const salt = await bcrypt.genSalt(10);//complexity you want to use for randomizing your password -- default is 10
        const hashedPassword = await bcrypt.hash(password, salt); //pass the plain text password from the user and the salt generated above

        const newUsers = await User.create([{name, email, password: hashedPassword}], {session}); //we attach a session just in case something goes wrong. if something goes wrong, then we end up aborting, then the user will not be created.

        const token = jwt.sign({userId: newUsers[0]._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN}) //we create a token for the user to sign in. the [0] is the array of new users from newUsers after we pass in the array of the data. in this case we're only making one new user so defaults to 0 anyway, but it only goes to the user with the following id hence the ._id

        await session.commitTransaction(); //if everything goes right we commit to creating the user.
        session.endSession();

        res.status(201).json({ //we can return this "response" after a successful session -- 201 means created
            success: true,
            message: "User created successfully",
            data: {
                token,
                user: newUsers[0],
            }
        })


    }catch (error) { //same as above but saying if anything starts to go wrong abort the transaction.
        await session.abortTransaction();
        session.endSession();
        next(error);
    } 
}

export const signIn = async (req, res, next) => {
    //implement sign-in logic here
    try {
        const {email, password} = req.body //no need to destructure name here since we're signing in.
        const user = await User.findOne({email}); //check if user exists

        if(!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password); //if email exists then check the password by comparing what they entered by the pw stored in database.

        if(!isPasswordValid) {
            const error = new Error("Invalid password");
            error.statusCode = 401;
            throw error;
        }

        //if it matches make a token
        const token = jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

        //then we return
        res.status(200).json({ //200 means success
            success: true,
            message: "User sign in successful",
            data: {
                token,
                user,
            }
        });
    }catch (error) {
        next(error);
    }

}


// export const signOut = async (req, res, next) => {
//     //implement sign-out logic here

// }
