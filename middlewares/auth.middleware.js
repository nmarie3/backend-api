//this middleware will prevent outsiders from fetching user data

import { JWT_SECRET } from "../config/env.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authorize = async (req, res, next) => {
    try { //for the try here we want to try getting access to the token
        let token

        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) { //when you pass a token through headers, it's protocol that it starts with Bearer
            token = req.headers.authorization.split(" ")[1]; //this removes the Bearer word from the token giving us the second part of the string.
        }

        if(!token) return res.status(401).json({message: "Unauthorized"});

        //if we do get the token then we need to verify it
        const decoded = jwt.verify(token, JWT_SECRET);

        //check if user still exists by fetching it from database
        const user = await User.findById(decoded.userId);
        //if it doesn't exist again error
        if (!user) return res.status(401).json({message: "Unauthorized"});
        //if it does exist we attach the user to the request being made
        req.user = user; //now we know exactly who is making the request with this additional information

        next(); //then forward it over to the second part of the request

    }catch (error) {
        res.status(401).json({message: "unauthorized", error: error.message}); //401 means unauthorized
    }
}

export default authorize;

//restrict users from spamming -- bot protection -- keeps app fast and secure