import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { createSubscription } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => res.send({title: 'GET all subscriptions'}));
subscriptionRouter.get('/:id', (req, res) => res.send({title: 'GET subscription details'}));
subscriptionRouter.post('/', authorize, createSubscription); //adding authorize here will populate the req.user with the user information that is currently logged in. if they're not logged in they can't create a subscription.
subscriptionRouter.put('/:id', (req, res) => res.send({title: 'UPDATE subscription'}));
subscriptionRouter.delete('/:id', (req, res) => res.send({title: 'DELETE subscription'}));
subscriptionRouter.get('/user/:id', (req, res) => res.send({title: 'GET all subscriptions of specific user'}));
subscriptionRouter.put('/:id/cancel', (req, res) => res.send({title: 'CANCEL subscription'}));
subscriptionRouter.put('/:id/cancel', (req, res) => res.send({title: 'CANCEL subscription'}));
subscriptionRouter.get('/:id/upcoming-renewals', (req, res) => res.send({title: 'GET upcoming renewals'}));

export default subscriptionRouter;