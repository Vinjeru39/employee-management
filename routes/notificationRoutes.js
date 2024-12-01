import express from "express";
const router = express.Router();

import { protect } from "../middleware/authMiddleware.js";

import {
  deleteNotification,
  getNotifications,
} from "../controllers/notificationController.js";

router.route("/").get(protect, getNotifications);

router.route("/:id").delete(protect, deleteNotification);

export default router;
