import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { Review } from "./reviewModel.js";
import { College } from "./collegeModel.js";

// Define the User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  state: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: String },
});

// Pre-deleteOne hook to delete reviews and update college references
userSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      const reviews = await Review.find({ user: this._id });

      for (const review of reviews) {
        await College.updateOne(
          { _id: review.college },
          { $pull: { reviews: review._id } }
        );
        await Review.deleteMany({ user: this._id });
      }

      next();
    } catch (err) {
      next(err);
    }
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }

  try {
    const saltRound = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, saltRound);
    user.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// comparePassword
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// JSON WEB TOKEN
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.error("Token Error: ", error);
  }
};

// Generate Password Reset Token
userSchema.methods.generatePasswordResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpires = Date.now() + 15 * 60 * 1000 ;

  return resetToken;
};

// Define the model or the collection name
export const User = mongoose.model("User", userSchema);
