//where we put our enviornmental variables

import {config} from 'dotenv';

//extracts all variable files...
config({path: `.env.${process.env.NODE_ENV || 'development'}.local`}); //we don't want only one env file, we want multiple for different enviornments, so change into a template string, then it'll pull from the env variables


export const {PORT, NODE_ENV, DB_URI, JWT_SECRET, JWT_EXPIRES_IN}= process.env //...then exports them, meaning its coming from the enviornments file