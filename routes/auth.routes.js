import {Router} from 'express';
import { signUp, signIn } from '../controllers/auth.controller.js';

const authRouter = Router();

authRouter.post("/sign-up", signUp); //you cant just return an api, you need to "send" it. it's also usually sent in a JSON format, not a single string--hence the brackets and "title:" for this now deleted code that came affert /sign-up "(req, res) => res.send({title: "Sign Up"}));"
authRouter.post("/sign-in", signIn);
//authRouter.post("/sign-out", signOut);

export default authRouter;