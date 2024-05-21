const mongoose = require("mongoose");

// MongoDB connection
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connection successful to DB");
  } catch (error) {
    console.error("database connection fail");
    process.exit(0);
  }
};

module.exports = connectDb;