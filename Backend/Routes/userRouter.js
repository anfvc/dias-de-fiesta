import express from "express";
import {
  deleteUser,
  fetchAllUsers,
  fetchCurrentUser,
  loginUser,
  registerUser,
  updateUserRole,
} from "../Controllers/userController.js";
import { verifyRole, verifyToken } from "../Middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", fetchAllUsers);
router.get("/me", verifyToken, fetchCurrentUser);
router.delete("/:id", deleteUser);
router.patch("/:id", verifyRole, updateUserRole);

export default router;
