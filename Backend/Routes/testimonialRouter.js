import express from "express";
import {
  createTestimonial,
  deleteTestimonial,
  fetchTestimonials,
} from "../Controllers/testimonialController.js";

const router = express.Router();

router.post("/create", createTestimonial);
router.get("/get", fetchTestimonials);
router.delete("/delete/:id", deleteTestimonial);

export default router;
