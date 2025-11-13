import express from "express";
import {
  deletePhoto,
  fetchPhotos,
  uploadPhotos,
} from "../Controllers/photoController.js";
import upload from "../Middleware/multer.js";
import { verifyRole, verifyToken } from "../Middleware/auth.js";

const router = express.Router();

router.post("/upload", upload.any(), uploadPhotos);
router.get("/all", fetchPhotos);
router.delete(
  "/delete/:id",
  verifyToken,
  verifyRole("admin", "owner"),
  deletePhoto
);

//upload.any() = upload.array() or upload.single()

export default router;
