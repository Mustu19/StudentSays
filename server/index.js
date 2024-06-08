import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/errorMiddleware.js";
import connectDb from "./database/db.js";
import authRoute from "./routes/authRoute.js";
// import otpRouter from "./routes/otpRoute.js"
import collegeRoute from "./routes/collegeRoute.js";
import adminRoute from "./routes/adminRoute.js";
import reviewRoute from "./routes/reviewRoute.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

// Middleware
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use('/uploads', express.static('uploads'));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route
app.use("/api/auth", authRoute);
app.use("/api/colleges", collegeRoute);
app.use("/api/admin", adminRoute);
app.use("/api/reviews", reviewRoute);
// app.use('/otp', otpRouter);

app.use(errorMiddleware);
// Start the server
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
