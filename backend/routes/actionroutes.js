import express from "express";
import Action from "../models/Action.js";

const router = express.Router();

// POST: Create a new eco-action
router.post("/actions", async (req, res) => {
  console.log("📥 Received action POST:", req.body); 
  try {
    const newAction = new Action(req.body);
    const savedAction = await newAction.save();
    res.status(201).json(savedAction);
  } catch (error) {
    console.error("❌ Error saving action:", error);
    res.status(400).json({ error: error.message });
  }
});

// GET: Fetch all eco-actions
router.get("/actions", async (req, res) => {
  try {
    const actions = await Action.find().sort({ createdAt: -1 }); // 👈 newest first
    res.status(200).json(actions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


export default router;
