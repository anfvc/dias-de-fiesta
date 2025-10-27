import express from "express";
import {
  createEvent,
  deleteAllEvents,
  deleteEvent,
  fetchAllEvents,
  updateEvent,
} from "../Controllers/eventController.js";
import upload from "../Middleware/multer.js";

const router = express.Router();

router.post("/create", upload.single("image"), createEvent);
router.get("/all", fetchAllEvents);
router.put("/update/:id", upload.single("image"), updateEvent);
router.delete("/delete/:id", deleteEvent);
router.delete("/deleteall", deleteAllEvents);

export default router;
