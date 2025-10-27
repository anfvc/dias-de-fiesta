import express from "express";
import {
  createTestimonial,
  deleteAllTestimonials,
  deleteTestimonial,
  fetchTestimonials,
  updateTestimonial,
} from "../Controllers/testimonialController.js";

const router = express.Router();

router.post("/create", createTestimonial);
router.get("/get", fetchTestimonials);
router.put("/update/:id", updateTestimonial);
router.delete("/delete/:id", deleteTestimonial);
router.delete("/delete/all", deleteAllTestimonials);

export default router;
