import express from "express";
import {
  deleteUser,
  fetchAllUsers,
  loginUser,
  registerUser,
} from "../Controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", fetchAllUsers);
router.delete("/:id", deleteUser);

export default router;
