import { User } from "../models/authModel.js";
import { sendResetPasswordEmail } from "../utils/email.js";
import crypto from "crypto";

const home = async (req, res) => {
  try {
    res.status(200).send("Welcome to the controller home app!");
  } catch (error) {
    console.log("error");
  }
};

const signup = async (req, res) => {
  try {
    // const data = req.body;
    console.log(req.body);
    const { username, email, state, password, isAdmin } = req.body;

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(400).json({ msg: "email already exists" });
    }

    const userCreated = await User.create({
      username,
      email,
      state,
      password,
      isAdmin,
    });

    res.status(201).json({
      msg: "Registration Successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await userExist.comparePassword(password);

    if (isPasswordValid) {
      res.status(200).json({
        message: "Login Successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid email or passord " });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// User Logic
const user = async (req, res) => {
  try {
    // const userData = await User.find({});
    const userData = req.user;
    console.log(userData);
    return res.status(200).json(userData);
  } catch (error) {
    console.log(` error from user route ${error}`);
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = await user.generatePasswordResetToken();
    await user.save();

    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
    await sendResetPasswordEmail(user.email, resetUrl);

    res.status(200).json({ message: "Reset password email sent" });
  } catch (error) {
    console.error("Error sending reset password email:", error);
    res.status(500).json({ message: "Failed to send reset password email" });
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  const { resetToken } = req.params;
  const { newPassword } = req.body;

  // resetPasswordToken = crypto
  //   .createHash("sha256")
  //   .update(resetToken)
  //   .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: resetToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400);
    throw new Error("Invalid or expired reset token");
  }

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.json({ message: "Password reset successful" });
};

export default { home, signup, signin, user, forgotPassword, resetPassword };
