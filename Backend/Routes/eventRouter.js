import express from "express";
import { createEvent, fetchAllEvents } from "../Controllers/eventController.js";
import upload from "../Middleware/multer.js";

const router = express.Router();

router.post("/create", upload.single("image"), createEvent);
router.get("/all", fetchAllEvents);

export default router;
