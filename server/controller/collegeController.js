import { College } from "../models/collegeModel.js";

const addCollege = async (req, res, next) => {
  try {
    const { name, logo, description, website } = req.body;
    const collegeExist = await College.findOne({ name: name });

    if (collegeExist) {
      return res.status(400).json({ msg: "College already exists" });
    }
    const college = await College.create({ name, logo, description, website });

    res.status(201).json(college);
  } catch (error) {
    next(error);
  }
};

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

export default {addCollege, getCollege, getCollegeById}
