import express from "express";
import {
  deleteUser,
  fetchAllUsers,
  loginUser,
  registerUser,
  updateUserRole,
} from "../Controllers/userController.js";
import { verifyAdminRole } from "../Middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", fetchAllUsers);
router.delete("/:id", deleteUser);
router.patch("/:id", verifyAdminRole, updateUserRole);

export default router;
