//this file is to authorize our users

import User from '../models/user.model.js';

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find(); //fetches all users from database

        res.status(200).json({
            success: true,
            data: users,
        })
    }catch(error) {
        next (error) //hand it over to our error handling
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select("-password"); //fetches one user from database. the -passwords says give us back all the data except ffor their password.

        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error; //means we catch it and send it to our middleware
        }

        res.status(200).json({
            success: true,
            data: user,
        })
    }catch(error) {
        next (error) //hand it over to our error handling
    }
}