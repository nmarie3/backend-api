import {Router} from 'express';

const authRouter = Router();

authRouter.post("/sign-up", (req, res) => res.send({title: "Sign Up"})); //you cant just return an api, you need to "send" it. it's also usually sent in a JSON format, not a single string--hence the brackets and "title:"
authRouter.post("/sign-in", (req, res) => res.send({title: "Sign In"}));
authRouter.post("/sign-out", (req, res) => res.send({title: "Sign Out"}));

export default authRouter;