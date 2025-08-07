import Action from "../models/Action.js";

export const createAction = async (req, res) => {
  try {
    const newAction = new Action(req.body);
    const savedAction = await newAction.save();
    res.status(201).json(savedAction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getActions = async (req, res) => {
  try {
    const actions = await Action.find();
    res.status(200).json(actions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
