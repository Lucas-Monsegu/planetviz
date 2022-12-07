const redisClient = require('redis').createClient;

export const redis = redisClient(6379, 'localhost');