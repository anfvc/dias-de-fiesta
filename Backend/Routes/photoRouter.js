import express from "express";
import { uploadPhotos } from "../Controllers/photoController.js";
import upload from "../Middleware/multer.js";


const router = express.Router();

router.post("/photos", upload.any(), uploadPhotos);

//upload.any() = upload.array() or upload.single()

export default router;
