module.exports = {
  MONGO_USER: process.env.MONGO_USER,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  MONGO_IP: process.env.MONGO_IP || "mongo",
  MONGO_PORT: process.env.MONGO_PORT || 27017,
  MONGO_DB_NAME: process.env.MONGO_DB_NAME,
  REDIS_URL: process.env.REDIS_URL || "redis",
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  REDIS_USER: process.env.REDIS_USER || "default",
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  SESSION_SECRET: process.env.SESSION_SECRET,
  POSTGRES_USER: process.env.POSTGRES_USER || "postgres",
  PSQL_HOST: process.env.PSQL_HOST || "postgres",
  PSQL_PORT: process.env.PSQL_PORT || 5432,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_DB: process.env.POSTGRES_DB,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_LIFETIME: process.env.JWT_LIFETIME,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASS: process.env.MAIL_PASS,
  ORIGIN_URL: process.env.MAIL_PASS || "localhost:3000"
}