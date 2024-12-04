import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  logoutUser,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  addUser,
} from "../controllers/userController.js";

import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser).get(protect, getUsers);
router.route("/add").post(protect, addUser);
router.post("/logout", logoutUser);
router.post("/auth", authUser);
router
  .route("/:id")
  .delete(protect, deleteUser)
  .get(protect, getUserById)
  .put(protect, updateUser);

export default router;
