
const express = require("express");
const serverless = require("serverless-http");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const router = express.Router();

// MongoDB connection
mongoose.connect(process.env.DB_URI_PORTFOLIO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error(`MongoDB connection error: ${err}`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files and main HTML response
app.use(express.static(path.join(__dirname, "../../dist")));
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../dist", "index.html"));
});

// API Endpoint
const emailSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});

const Email = mongoose.model("Email", emailSchema);

router.post("/api/v1/emails", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const newEmail = new Email({ name, email, message });
  newEmail.save()
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(500).json({ error: "Error saving email" }));
});

app.use("/.netlify/functions/server", router);

module.exports.handler = serverless(app);
