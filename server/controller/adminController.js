import {User} from "../models/authModel.js";
import {College} from "../models/collegeModel.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ isAdmin: false });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addCollege = async (req, res, next) => {
  try {
    console.log("name :",req.file.filename)
  const logo = `/uploads/${req.file.filename}`;
    const { name, description, website } = req.body;
    const collegeExist = await College.findOne({ name: name });
    
    if (collegeExist) {
      return res.status(400).json({ msg: "College already exists" });
    }
    const college = await College.create({ name, logo, description, website });
    res.status(201).json(college);
    console.log("clg is ",college);
  } catch (error) {
    next(error);
  }
};

const getAllColleges = async (req, res) => {
  try {
    const colleges = await College.find();
    res.status(200).json(colleges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCollegeById = async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    if (college) {
      res.json(college);
    } else {
      res.status(404).json({ message: 'College not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


const updateCollege = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, logo, description, website } = req.body;

    const updatedCollege = await College.findByIdAndUpdate(
      id,
      { name, logo, description, website },
      { new: true }
    );

    res.status(200).json(updatedCollege);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCollege = async (req, res) => {
  try {
    await College.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "College deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export default {getAllUsers, addCollege, getAllColleges , getCollegeById, updateCollege, deleteCollege, deleteUser}