const Comment = require('../models/Comment');
const Notification = require('../models/Notification');

const createComment = async (req, res) => {
  const { text, parentId } = req.body;

  try {
    const comment = await Comment.create({
      userId: req.user._id,
      text,
      parentId: parentId || null
    });

    if (parentId) {
      const parentComment = await Comment.findById(parentId);

      if (parentComment && parentComment.userId.toString() !== req.user._id.toString()) {
        await Notification.create({
          recipientId: parentComment.userId,
          senderId: req.user._id,
          commentId: comment._id,
          message: `replied to your comment`
        });
      }
    }

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getComments = async (req, res) => {
  try {
    const comments = await Comment.find().lean();

    
    const commentMap = {};
    comments.forEach(comment => commentMap[comment._id] = { ...comment, replies: [] });

    const nestedComments = [];

    comments.forEach(comment => {
      if (comment.parentId) {
        commentMap[comment.parentId]?.replies.push(commentMap[comment._id]);
      } else {
        nestedComments.push(commentMap[comment._id]);
      }
    });

    res.json(nestedComments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    if (comment.userId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not your comment' });


    //15 minutes edit rule
    const timePassed = (Date.now() - new Date(comment.createdAt)) / (60 * 1000); 
    if (timePassed > 15)
      return res.status(400).json({ message: 'Edit window expired' });

    comment.text = req.body.text || comment.text;
    comment.updatedAt = new Date();
    await comment.save();

    res.json({ message: 'Comment updated', comment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) return res.status(404).json({ message: 'Not found' });
    if (comment.userId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not your comment' });

    const timePassed = (Date.now() - new Date(comment.createdAt)) / (60 * 1000);
    if (timePassed > 15)
      return res.status(400).json({ message: 'Delete window expired' });

    await Comment.findByIdAndDelete(comment._id); 

    res.json({ message: 'Comment permanently deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



module.exports = {
  createComment,
    getComments,
    updateComment,
    deleteComment
};