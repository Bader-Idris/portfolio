const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.DB_URI_PORTFOLIO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`Connected to DB`);
  })
  .catch((err) => {
    console.log(`Error connecting to MongoDB: ${err.message}`);
  });

app.use(express.static(path.join(__dirname, "./dist")));
const mainEndpoint = (req, res) => {
  res.sendFile(path.join(__dirname, "./dist", "index.html"));
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("*", mainEndpoint);

const emailSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});

const Email = mongoose.model("Email", emailSchema);

app.post("/api/v1/emails", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newEmail = new Email({ name, email, message });
  newEmail.save()
    .then(() => {
      res.json({ success: true });
    })
    .catch((err) => {
      res.status(500).json({ error: "Error saving email" });
    });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

