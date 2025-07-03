import React, { useEffect, useState } from 'react';
import API from '../util/api';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  const fetchComments = async () => {
    try {
      const res = await API.get('/comments');
      setComments(res.data);
    } catch (err) {
      alert('Failed to fetch comments');
      navigate('/login');
    }
  };

  const handleNewComment = async (text) => {
    await API.post('/comments', { text });
    fetchComments();
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="container">
      <h2>Comments</h2>
      <CommentForm onSubmit={handleNewComment} label="Post Comment" />
      <CommentList comments={comments} refresh={fetchComments} />
    </div>
  );
};

export default Home;
