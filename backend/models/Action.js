import mongoose from "mongoose";

const actionSchema = new mongoose.Schema(
  {
    activity: { type: String, required: true },
    date: { type: Date, required: true },
    carbonSaved: { type: Number, required: true, min:[0,"Carbon saved cannot be negative"],},
  },
  { timestamps: true }
);

export default mongoose.model("Action", actionSchema);
