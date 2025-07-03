require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const connectDB = require('./util/db');
const authRoutes = require('./routes/authRoutes');
const commentRoutes = require('./routes/commentRoutes');
const notificationRoutes = require('./routes/notificationRoutes'); 


const app = express();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

app.get('/', (req, res)=>{
    res.send('Welcome to the Comment App Backend');
})
app.use('/api/auth', authRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/notifications', notificationRoutes);




const PORT = process.env.PORT || 5000;

connectDB().then(()=>{
app.listen(5000, ()=>{
    console.log('Server is running on port 3000');
})
});
