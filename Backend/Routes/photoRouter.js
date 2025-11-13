import express from "express";
import { fetchPhotos, uploadPhotos } from "../Controllers/photoController.js";
import upload from "../Middleware/multer.js";

const router = express.Router();

router.post("/photos/upload", upload.any(), uploadPhotos);
router.get("/photos/all", fetchPhotos);

//upload.any() = upload.array() or upload.single()

export default router;
