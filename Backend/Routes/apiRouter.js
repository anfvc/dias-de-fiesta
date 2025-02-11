import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Testing the server!!" });
});

router.get("/hello", (req, res) => {
  res.json({ message: "Hello from the server." });
});

export default router;
