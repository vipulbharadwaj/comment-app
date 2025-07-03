const Notification = require('../models/Notification.js');

const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipientId: req.user._id })
      .sort({ createdAt: -1 })
      .populate('senderId', 'username')
      .populate('commentId', 'text');

    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification || notification.recipientId.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Notification not found or unauthorized' });
    }

    notification.isRead = true;
    await notification.save();

    res.json({ message: 'Marked as read' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getNotifications, 
    markAsRead
};
