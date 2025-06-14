//ARCJET restrict users from spamming -- bot protection -- keeps app fast and secure

import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
    try {
        const decision = await aj.protect(req, {requested: 1}); //protect this request and tell me your decision -- should it be denied or should we let it through? the requested: 1 means we take one token away from the bucket in arcjet.js

        if(decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({error: "Rate limit exceed"});
            }
            if (decision.reason.isBot()) {
                return res.status(403).json({error: "Bot detected"});
            }
            return res.status(403).json({error: "Access denied"}); //if neither of the above   
        }

        next(); //if not denied, go to the next step -- create, update user, whatever.
    }catch(error) {
        console.log(`Arcjet Middleware Error: ${error}`);
        next (error)
    }
}

export default arcjetMiddleware;