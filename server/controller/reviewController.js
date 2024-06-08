import { Review } from "../models/reviewModel.js";
import { College } from "../models/collegeModel.js";
import { User } from "../models/authModel.js";

// Helper function to calculate average rating for a college
const updateCollegeAverageRating = async (collegeId) => {
  const reviews = await Review.find({ college: collegeId });
  const totalRating = reviews.reduce(
    (sum, review) => sum + review.averageRating,
    0
  );
  const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;

  await College.findByIdAndUpdate(collegeId, {
    averageRating,
  });
};

const addReview = async (req, res) => {
  const { collegeId, reviewText, ratings } = req.body;
  const userId = req.user._id;

  try {
    const newReview = new Review({
      user: userId,
      college: collegeId,
      reviewText,
      ratings,
    });

    const savedReview = await newReview.save();
    const college = await College.findById(collegeId);

    // Update the reviews array of the college
    college.reviews.push(savedReview._id);
    await college.save();

    // Update the average rating of the college
    await updateCollegeAverageRating(collegeId);

    res.status(201).json(savedReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteReview = async (req, res) => {
  const reviewId = req.params.id;
  const userId = req.user._id;
  const isAdmin = req.user.isAdmin;

  try {
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Check if the user is an admin or the owner of the review
    if (review.user.toString() !== userId.toString() && !isAdmin) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this review" });
    }

    const collegeId = review.college;
    await review.deleteOne();

    // Update the reviews array and average rating of the college
    const college = await College.findById(collegeId);
    college.reviews = college.reviews.filter(id => id.toString() !== reviewId);
    await college.save();

    await updateCollegeAverageRating(collegeId);

    res.status(200).json({ message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateReview = async (req, res) => {
  const reviewId = req.params.id;
  const userId = req.user._id;
  const { reviewText, ratings } = req.body;
  const isAdmin = req.user.isAdmin;

  try {
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Check if the user is an admin or the owner of the review
    if (review.user.toString() !== userId.toString() && !isAdmin) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this review" });
    }

    review.reviewText = reviewText || review.reviewText;
    review.ratings = ratings || review.ratings;
    const updatedReview = await review.save();

    await updateCollegeAverageRating(review.college);

    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: "Error updating review", error });
  }
};

const getCollegeReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      college: req.params.collegeId,
    }).populate("user", "username");
    if (!reviews) {
      return res
        .status(404)
        .json({ message: "No reviews found for this college" });
    }
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { addReview, updateReview, deleteReview, getCollegeReviews };