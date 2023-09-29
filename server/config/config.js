module.exports = {
  MONGO_IP: process.env.MONGO_IP || "mongo",
  MONGO_PORT: process.env.MONGO_PORT || 27017,
  MONGO_USER: process.env.MONGO_USER,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  REDIS_URL: process.env.REDIS_URL || "redis",
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  REDIS_USER: process.env.REDIS_USER || "default",
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  SESSION_SECRET: process.env.SESSION_SECRET
}