// import ratelimit from "../config/upstash.js";


// const rateLimiter = async (req, res, next) => {
//     try{
//         const {success} = await ratelimit.limit("my-limit-key");

//         if (!success) {
//             return res.status(429).json({
//                 message:"Too many requests, please try again later"
//             })
//         }
//         next();
//     } catch (error) {
//         console.log("Rate limit error", error);
//         next(error);
//     }
// }

// export default rateLimiter;


// middleware/rateLimiter.js
import { redisIncrWithExpire } from '../config/upstash.js';

const MAX_REQUESTS = 10;
const WINDOW_SECONDS = 20;

const rateLimiter = async (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const key = `ratelimit:${ip}`;

  try {
    const requestCount = await redisIncrWithExpire(key, WINDOW_SECONDS);

    if (requestCount > MAX_REQUESTS) {
      return res.status(429).json({
        message: 'Too many requests, please try again later',
      });
    }

    next();
  } catch (error) {
    console.error('Rate limiter error:', error.message);
    next(error);
  }
};

export default rateLimiter;
