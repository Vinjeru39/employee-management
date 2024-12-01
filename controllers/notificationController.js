import asyncHandler from "../middleware/asyncHandler.js";
import Notification from "../models/notificationModel.js";

// @desc Fetch all notifications
// @route GET /api/notifications
// @access Private
const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id });

  res.status(200).json(notifications);
});

// @desc Delete a Notification
// @route DELETE /api/notifications/:id
// @access Private
const deleteNotification = asyncHandler(async (req, res) => {
  //also only the creator should  be able to delete it
  const notification = await Notification.findById(req.params.id);

  if (notification) {
    await Notification.deleteOne({ _id: notification._id });
    res.status(200).json({ message: "Notification deleted" });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

export { getNotifications, deleteNotification };
