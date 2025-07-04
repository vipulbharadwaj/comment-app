import React, { useState } from 'react';
import CommentForm from './CommentForm';
import API from '../util/api';
import './CommentList.css';
import { jwtDecode } from 'jwt-decode';

const token = localStorage.getItem('token');
const currentUser = token ? jwtDecode(token) : null;

console.log('Current User:', currentUser);

const Comment = ({ comment, refresh, level = 0 }) => {
  if (!comment) return null;

  const [replying, setReplying] = useState(false);
  const [editing, setEditing] = useState(false);

const commentUserId = typeof comment.userId === 'string' ? comment.userId : comment.userId?._id;
const isOwner = currentUser?.id === commentUserId;




  const handleReply = async (text) => {
    await API.post('/comments', { text, parentId: comment._id });
    setReplying(false);
    refresh();
  };

  const handleEdit = async (text) => {
    await API.put(`/comments/${comment._id}`, { text });
    setEditing(false);
    refresh();
  };

  const handleDelete = async () => {
    if (window.confirm('Delete this comment?')) {
      try {
        await API.delete(`/comments/${comment._id}`);
        refresh();
      } catch (err) {
        console.error('Delete failed:', err);
        alert('Failed to delete comment');
      }
    }
  };

  return (
    <div className={`comment-item level-${level}`}>
      <div className="avatar">
        {comment.userId?.username?.[0]?.toUpperCase() || 'U'}
      </div>

      <div className="comment-content">
        <div className="header">
          <strong>{comment.userId?.username || 'User'}</strong>
          <span className="timestamp"> · {new Date(comment.createdAt).toLocaleString()}</span>
        </div>

        {editing ? (
          <CommentForm
            initialText={comment.text}
            onSubmit={handleEdit}
            label="Update"
            autoFocus
          />
        ) : (
          <div className="text">
            {comment.deleted ? '[Deleted]' : comment.text}
          </div>
        )}

        {!comment.deleted && (
          <div className="actions">
            <button className="reply-btn" onClick={() => setReplying(!replying)}>
              {replying ? 'Cancel' : 'Reply'}
            </button>

            {isOwner && !editing && (
              <>
                <button className="reply-btn" onClick={() => setEditing(true)}>Edit</button>
                <button className="reply-btn danger" onClick={handleDelete}>Delete</button>
              </>
            )}
          </div>
        )}

        {replying && <CommentForm onSubmit={handleReply} label="Reply" autoFocus />}

        <div className="replies">
          {comment.replies?.map((reply) => (
            <Comment
              key={reply._id}
              comment={reply}
              refresh={refresh}
              level={level + 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const CommentList = ({ comments, refresh }) => {
  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} refresh={refresh} />
      ))}
    </div>
  );
};

export default CommentList;
