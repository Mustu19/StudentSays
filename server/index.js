const express = require("express");
const app = express();
const connectDb = require("./utils/db");
const dotenv = require("dotenv");
const cors = require("cors");
const router = require("./routes/authRoute");

dotenv.config();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// route
app.use("/api/auth", router);

// Start the server
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
