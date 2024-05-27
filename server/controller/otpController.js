import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { User } from "../models/authModel.js";
import { OTP } from "../models/otpModel.js";
import nodemailer from "nodemailer";
import speakeasy from "speakeasy";

const getOtp = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;

  try {
    if (!email) {
      throw new Error("Email is required");
    }

    // Check if email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email already exists");
    }

    // Generate OTP
    const otpSecret = speakeasy.generateSecret().base32;
    const otp = speakeasy.totp({
      secret: otpSecret,
      step: 3600, // OTP is valid for 1 hour (3600 seconds)
    });

    // Calculate OTP expiry time (1 hour from now)
    const expiryTime = new Date();
    expiryTime.setTime(expiryTime.getTime() + 3600000);

    // Save OTP in the database
    const otpDoc = await OTP.create({
      email,
      otpValue: otp,
      expiryTime,
      otpSecret,
    });

    // Send OTP to user's email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "freddymercury5253@gmail.com",
        pass: "freddybhaifreddybhai",
      },
    });
    const mailOptions = {
      from: "freddymercury5253@gmail.com",
      to: email,
      subject: "OTP Verification",
      text: `Your OTP is: ${otp}`,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);

    // Send success response with OTP document
    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otpDoc,
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    // Pass any caught errors to the error handler middleware
    next(new Error("Failed to send OTP"));
  }
});

export default getOtp;
