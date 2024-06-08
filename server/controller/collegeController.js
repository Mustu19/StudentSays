import { College } from "../models/collegeModel.js";
import { Review } from "../models/reviewModel.js";

// Get all colleges
const getColleges = async (req, res, next) => {
  try {
    const colleges = await College.find().populate("reviews");
    res.status(200).json(colleges);
  } catch (error) {
    next(error);
  }
};

// Get college by ID
const getCollegeById = async (req, res, next) => {
  try {
    const college = await College.findById(req.params.id).populate("reviews");
    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    // Calculate average rating from reviews
    if (college.reviews.length > 0) {
      const totalRatings = college.reviews.reduce(
        (acc, review) => acc + review.averageRating,
        0
      );
      college.averageRating = totalRatings / college.reviews.length;
    } else {
      college.averageRating = 0;
    }

    res.status(200).json(college);
  } catch (error) {
    next(error);
  }
};

export default { getColleges, getCollegeById };
