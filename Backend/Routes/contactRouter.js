import express from "express";
import bodyParser from "body-parser";
import sendingEmail from "../Controllers/emailController.js";

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post("/contact", sendingEmail);

export default router;
