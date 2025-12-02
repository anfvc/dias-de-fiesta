import express from "express";
import {
  createTestimonial,
  deleteAllTestimonials,
  deleteTestimonial,
  fetchTestimonials,
  updateTestimonial,
} from "../Controllers/testimonialController.js";
import { verifyRole, verifyToken } from "../Middleware/auth.js";

const router = express.Router();

router.post("/create", verifyToken, verifyRole("admin", "owner"), createTestimonial);
router.get("/get", fetchTestimonials);
router.put(
  "/update/:id",
  verifyToken,
  verifyRole("admin", "owner"),
  updateTestimonial
);
router.delete(
  "/delete/:id",
  verifyToken,
  verifyRole("admin", "owner"),
  deleteTestimonial
);
router.delete("/delete/all", verifyToken, verifyRole("admin", "owner"), deleteAllTestimonials);

export default router;
