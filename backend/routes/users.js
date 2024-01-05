import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  getUsersCount,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../middlewares/Auth.js";

const router = express.Router();

// Get the count of all users
router.get("/get_users_count", getUsersCount);

// Update a user by ID
router.put("/:id", updateUser);

// Delete a user by ID (Requires admin privileges)
router.delete("/:id", verifyAdmin, deleteUser);

// Get user by ID
router.get("/:id", getUser);

// Get all users (Requires token verification)
router.get("/", verifyToken, getUsers);

export default router;
