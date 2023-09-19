const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session')
const redis = require("redis");

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
}
connectWithRetry()
app.enable("trust proxy")//this is after we used nginx as a proxy with our app!
app.use(cors());

app.use(express.json())

app.get("/api/v1", (req, res) => {
  res.send(`<h1>hi full-stack</h1> <style> body {background-color: #1e1e1e;} h1 { color: #007acc;
  font-weight: bold; text-align: center; font-size: 35px; font-family: system-ui; text-transform: uppercase; <style>
`);
  console.log('it ran, yo')
})

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on port ${port}`))