const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

console.log("🔹 Loaded JWT_SECRET:", process.env.JWT_SECRET);
console.log("🔹 Loaded MONGO_URI:", process.env.MONGO_URI);

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/huddle").then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// Middleware to Verify JWT Token
const JWT_SECRET = process.env.JWT_SECRET
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("🔹 Received Token:", token); // ✅ Debug log

  if (!token) return res.status(401).json({ error: "Unauthorized. Please log in." });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("✅ Decoded User:", decoded); // ✅ Debug log
    req.user = decoded;
    next();
  } catch (error) {
    console.error("❌ Token Verification Error:", error); // ✅ Debug log
    res.status(401).json({ error: "Invalid token. Please log in again." });
  }
};
// User Schema & Model
const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);

// Signup
app.post("/api/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: "Username and password are required" });

    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ error: "Username already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.json({ message: "User created successfully" });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ error: "Signup failed" });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET || "default_secret", // Use a default if env variable is missing
      { expiresIn: "1h" }
    );

    res.json({ token, user: { userId: user._id, username: user.username } }); // ✅ Fix token response
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Event Schema & Model
const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Event = mongoose.model("Event", EventSchema);

// Add New Event (Protected)
app.post("/api/myevents", authenticate, async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ error: "Event name is required" });

    const newEvent = new Event({ name, description, creator: req.user.userId });
    await newEvent.save();
    res.json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    console.error("Event Creation Error:", error);
    res.status(500).json({ error: "Failed to create event" });
  }
});

// Get All Events for Home Page
app.get("/api/home", async (req, res) => {
  try {
    const events = await Event.find().populate("creator", "username");
    res.json(
      events.map((event) => ({
        _id: event._id,
        name: event.name,
        description: event.description,
        creatorUsername: event.creator ? event.creator.username : "Unknown", // ✅ Fix null reference issue
      }))
    );
  } catch (error) {
    console.error("Fetch Events Error:", error);
    res.status(500).json({ error: "Error fetching events" });
  }
});

// Get Events Created by Logged-in User (Protected)
app.get("/api/myevents", authenticate, async (req, res) => {
  try {
    const events = await Event.find({ creator: req.user.userId }).populate("creator", "username");
    res.json(
      events.map((event) => ({
        _id: event._id,
        name: event.name,
        description: event.description,
        creatorUsername: event.creator ? event.creator.username : "Unknown", // ✅ Fix null reference issue
      }))
    );
  } catch (error) {
    console.error("Fetch User Events Error:", error);
    res.status(500).json({ error: "Error fetching your events" });
  }
});

// Start Server
app.listen(5000, () => console.log("✅ Server running on port 5000"));