import React, { useState } from 'react';
import './CommentForm.css';

const CommentForm = ({ onSubmit, initialText = '', label = 'Post', autoFocus = false }) => {
  const [text, setText] = useState(initialText);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        autoFocus={autoFocus}
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment..."
        className="comment-textarea"
      />
      <div className="button-wrapper">
        <button type="submit" className="comment-button">
          {label}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
