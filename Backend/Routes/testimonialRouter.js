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

router.post("/create", createTestimonial);
router.get("/get", fetchTestimonials);
router.put("/update/:id", verifyToken, verifyRole, updateTestimonial);
router.delete("/delete/:id", verifyToken, verifyRole, deleteTestimonial);
router.delete("/delete/all", deleteAllTestimonials);

export default router;
