import { Router } from "express";

const userRouter = Router();

//GET /users -- gets all users as static parameter
//GET /users/:id -- dynamic parameter to get the user details by their id

userRouter.get(`/`, (req, res) => res.send({title: "Fetch/GET all users"})); //a route to get all users
userRouter.get(`/:id`, (req, res) => res.send({title: "Fetch/GET user details"}));
userRouter.post(`/`, (req, res) => res.send({title: "CREATE new user"}));
userRouter.put(`/:id`, (req, res) => res.send({title: "UPDATE user"}));
userRouter.delete(`/:id`, (req, res) => res.send({title: "DELETE user"}));

export default userRouter;