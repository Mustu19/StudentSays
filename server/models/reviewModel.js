import mongoose from "mongoose";
import { College } from "./collegeModel.js";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
      required: true,
    },
    reviewText: {
      type: String,
      required: true,
    },
    ratings: {
      placement: { type: Number, required: true },
      faculty: { type: Number, required: true },
      facility: { type: Number, required: true },
      curriculum: { type: Number, required: true },
      overallDevelopment: { type: Number, required: true },
    },
    averageRating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

reviewSchema.pre("save", function (next) {
  this.averageRating =
    (this.ratings.faculty +
      this.ratings.facility +
      this.ratings.placement +
      this.ratings.curriculum +
      this.ratings.overallDevelopment) /
    5;
  next();
});

reviewSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      const review = this;
      await College.updateOne(
        { _id: review.college },
        { $pull: { reviews: review._id } }
      );
      next();
    } catch (err) {
      next(err);
    }
  }
);

export const Review = mongoose.model("Review", reviewSchema);
