import express from "express";
import { createAction, getActions } from "../controllers/actioncontroller.js";

const router = express.Router();

router.post("/actions", createAction);  // to save an action
router.get("/actions", getActions);     // to get all actions

export default router;
