import mongoose from "mongoose";

const actionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["Transport", "Energy", "Food", "Waste", "Water", "Other"],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  points: {
    type: Number,
    required: true,
  },
});

const Action = mongoose.model("Action", actionSchema);
export default Action;
