import express from "express";
import { createEvent } from "../Controllers/eventController.js";
import upload from "../Middleware/multer.js";

const router = express.Router();

router.post("/create", upload.single("image"), createEvent);

export default router;
