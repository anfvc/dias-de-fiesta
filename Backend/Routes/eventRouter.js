import express from "express";
import { verifyRole, verifyToken } from "../Middleware/auth.js";
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
router.put(
  "/update/:id",
  verifyToken,
  verifyRole("admin", "owner", "editor"),
  upload.single("image"),
  updateEvent
);
router.delete(
  "/delete/:id",
  verifyToken,
  verifyRole("admin", "owner"),
  deleteEvent
);
router.delete(
  "/deleteall",
  verifyToken,
  verifyRole("admin", "owner"),
  deleteAllEvents
);

export default router;
