const path = require('path');
const express = require('express');
const app = express();

const mongoose = require('mongoose');
const helmet = require('helmet')
const session = require('express-session')
const cors = require('cors');
// let RedisStore = require("connect-redis")(session)

// const redis = require("redis");
// const { createClient } = require("redis");

const { RateLimiterMemory } = require("rate-limiter-flexible");// this prevents DDoS and brute force attacks when set well
// because it limits the not normal requests, as having 100 req in one day from an ip, block it!
// can be used with any presenting approach, sql, mongo, redis etc.


const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  REDIS_URL,
  REDIS_PORT,
  REDIS_USER,
  REDIS_PASSWORD,
  SESSION_SECRET,
} = require("./config/config");

// let redisClient = createClient({//promise, use similar to await
//   // url: `redis://${REDIS_USER}:${REDIS_PASSWORD}@${REDIS_URL}.redis.server:${REDIS_PORT}`,
//   // url: `redis://${REDIS_USER}:${REDIS_PASSWORD}@${REDIS_URL}:${REDIS_PORT}/`,
//   url: `redis://default:${REDIS_PASSWORD}@${REDIS_URL}:${REDIS_PORT}/`,
// })
//   .on('error', err => console.log('Redis Client Error', err))
//   .connect();

// createClient({
//   url: `redis://${REDIS_USER}:${REDIS_PASSWORD}@${REDIS_URL}.redis.server:${REDIS_PORT}`
// });

app.use(helmet())
app.enable("trust proxy");
app.use(cors());
app.disable('x-powered-by');

const postRouter = require('./routes/postRoutes')
const userRouter = require('./routes/userRoutes')

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?
authSource=admin`

const connectWithRetry = async () => {
  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false // this option in 4.4.24 is deprecated and causes an error if put
    });
    console.log('successfully connected to DB');
  } catch (e) {
    console.log(e);
    setTimeout(connectWithRetry, 5000);
  }
};
connectWithRetry()

// const expiryDate = 60 * 60 * 1000 || process.env.max_age;
// app.use(
//   session({
//     store: new RedisStore({
//       client: redisClient,
//       // prefix: "express-app:",//is this required?
//     }),
//     secret: SESSION_SECRET,
//     // resave: false, // required: force lightweight session keep alive (touch)
//     // saveUninitialized: false, // recommended: only save session when data exists
//     cookie: {
//       secure: false, //http allowed🔴, if true => https only ✔️
//       httpOnly: true,// http(s) not xss, so always put it as true
//       resave: false,
//       saveUninitialized: false,
//       maxAge: expiryDate,

//       // domain - indicates the domain of the cookie; use it to compare against the domain of the server in which the URL is being requested. If they match, then check the path attribute next.
//       // path - indicates the path of the cookie; use it to compare against the request path. If this and domain match, then send the cookie in the request.
//     },
//     // genid: function (req) {// useful to stop conflicts with generating uid
//     //   return genuuid() // use UUIDs for session IDs
//     // },
//   })
// )

const mainPages = require('./routes/mainLinks');
app.use('/', mainPages);

app.use(express.json());
app.use(express.static(path.join(__dirname, '../view')));
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);


app.use('*', (req, res, next) => {
  res.status(404).sendFile(path.resolve(__dirname, '../view/pages', '404.html'));
})

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on port ${port}`));