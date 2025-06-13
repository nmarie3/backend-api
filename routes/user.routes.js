import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js"; //all you have to do is import this so that only the user who is logged in can view their data

const userRouter = Router();

//GET /users -- gets all users as static parameter
//GET /users/:id -- dynamic parameter to get the user details by their id

userRouter.get(`/`, getUsers); //a route to get all users
userRouter.get(`/:id`, authorize, getUser); //add authorize after the path but before the next function
userRouter.post(`/`, (req, res) => res.send({title: "CREATE new user"}));
userRouter.put(`/:id`, (req, res) => res.send({title: "UPDATE user"}));
userRouter.delete(`/:id`, (req, res) => res.send({title: "DELETE user"}));

export default userRouter;