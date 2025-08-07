import express from "express";
import User from "../models/user.js";

const router = express.Router();

// ✅ Register route (with name)
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
});

// ✅ Login route (updated)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    console.log("Entered:", email, password);
    console.log("Found in DB:", user?.email, user?.password);

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✅ Return _id too
    res.status(200).json({ 
      message: "Login successful", 
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});


// Update Profile
router.put("/profile/:email", async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (name) user.name = name;
    if (password) user.password = password;
    await user.save();
    res.status(200).json({ message: "Profile updated successfully", user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
});


// ✅ Use named export
export { router as authRoutes };
