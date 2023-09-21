const path = require('path');

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session')
const redis = require("redis");
const cors = require('cors');
// let RedisStore = require("connect-redis")(session);//should be 5.1.0, because latest@7.xx.xx has different setup

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  REDIS_URL,
  REDIS_PORT,
  SESSION_SECRET,
} = require("./config/config");

// let redisClient = redis.createClient({
//   host: REDIS_URL,
//   port: REDIS_PORT,
// })


// const postRouter = require('./routes/postRoutes')
// const userRouter = require('./routes/userRoutes')

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?
authSource=admin`

const connectWithRetry = () => {
  mongoose
    .connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false // this option in 4.4.24 is deprecated and causes an error if put
    })
    .then(() => console.log('successfully connected to DB'))
    .catch((e) => {
      console.log(e)
      setTimeout(connectWithRetry, 5000)
    })
};
connectWithRetry()

app.enable("trust proxy");//this is after we used nginx as a proxy with our app!
app.use(cors());

// app.use(session({
//   store: new RedisStore({
//     client: redisClient
//   }),
//   secret: SESSION_SECRET,
//   cookie: {
//     // to learn more about those cookie properties, check express-session library, view options
//     secure: false, //http allowed🔴, if true => https only ✔️
//     resave: false,
//     saveUninitialized: false,
//     httpOnly: true,//js browser won't be able to access it, which is good for preventing XSS
//     maxAge: 1800000,// in millisecond
//   }
// }))

const mainPages = require('./routes/mainLinks');

app.use(express.json());
// app.use(express.urlencoded({ extended: false }))// docker was working without it!
app.use(express.static('../view/public'));//might make as view, check fonts and what's not in public DIR
// app.use('/api/v1/posts', postRouter);
// app.use('/api/v1/users', userRouter);


app.use('/', mainPages);

app.get('*', (req, res) => {
  res.status(404).sendFile(path.resolve(__dirname, '../view/pages', '404.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on port ${port}`));