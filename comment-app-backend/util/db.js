const mongoose = require('mongoose');



const connectDB= async()=>{

    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${connect.connection.host}`);
        return connect;
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
        process.exit(1); 
        
    }
}
module.exports = connectDB;
