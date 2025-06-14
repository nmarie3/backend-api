import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body, //takes everything the user passes
            user: req.user._id, //we need to know what user is trying to create the subscription -- this req.user is not part of the req.body because its coming from the auth.middleware before creating any subscription.
        });
        res.status(201).json({success: true, data: subscription});
    }catch (error) {
        next(error);
    }
}