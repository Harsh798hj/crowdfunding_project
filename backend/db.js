// db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Verify environment variable exists before attempting connection
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    // Modern Mongoose connection (no deprecated options needed for v6+)
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // Connection success message with MongoDB host information
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database Name: ${conn.connection.name}`);
    console.log(`🔄 Connection ReadyState: ${conn.connection.readyState}`);

  } catch (error) {
    // Detailed error logging
    console.error(`❌ MongoDB Connection Failed: ${error.message}`);
    console.error('💡 Troubleshooting Tips:');
    console.error('1. Check if MongoDB server is running');
    console.error('2. Verify MONGO_URI in .env file');
    
    // Graceful shutdown
    process.exit(1);
  }
};

// Export the connection function
module.exports = connectDB;