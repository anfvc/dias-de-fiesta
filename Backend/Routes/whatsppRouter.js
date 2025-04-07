import express from "express";
import handleSendWhatsApp from "../Controllers/whatsappController.js";

const router = express.Router();

console.log("WhatsApp route is working----->");
router.get("/whatsapp", handleSendWhatsApp);

export default router;
