// import { Ratelimit } from "@upstash/ratelimit";
// import { Redis } from "@upstash/redis";

// import dotenv from "dotenv";

// dotenv.config();

// const ratelimit = new Ratelimit({
//   redis: Redis.fromEnv(),
//   limiter: RateLimit.slidingWindows(5, "10 s"),
// });

// export default ratelimit;


// config/upstash.js
import dotenv from 'dotenv';
import fetch from 'node-fetch'; // Make sure this is installed

dotenv.config();

const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

export async function redisIncrWithExpire(key, windowSeconds) {
  const incrRes = await fetch(`${UPSTASH_REDIS_REST_URL}/incr/${key}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${UPSTASH_REDIS_REST_TOKEN}`,
    },
  });
  const incrData = await incrRes.json();

  if (incrData.result === 1) {
    await fetch(`${UPSTASH_REDIS_REST_URL}/expire/${key}/${windowSeconds}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${UPSTASH_REDIS_REST_TOKEN}`,
      },
    });
  }

  return incrData.result;
}
