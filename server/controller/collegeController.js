import { College } from "../models/collegeModel.js";

const getCollege = async (req, res, next) => {
  try {
    const colleges = await College.find();
    res.status(200).json(colleges);
  } catch (error) {
    next(error);
  }
};

const getCollegeById = async (req, res, next) => {
  try {
    const college = await College.findById(req.params.id);
    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }
    res.status(200).json(college);
  } catch (error) {
    next(error);
  }
};

export default {getCollege, getCollegeById}
