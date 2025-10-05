import express from "express";
import { createEvent } from "../Controllers/eventController.js";

const router = express.Router();

router.post("/events/create", createEvent);

export default router;
