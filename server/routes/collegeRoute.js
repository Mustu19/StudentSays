import { Router } from "express";
import adminMiddleware from "../middleware/adminMiddlware.js";
import collegeController from "../controller/collegeController.js";
import {authMiddleware} from "../middleware/authMiddleware.js";
// import upload from '../middleware/uploadMiddlware.js';
const router = Router();

router.route("/").get(collegeController.getCollege);
router.route("/:id").get(collegeController.getCollegeById);
export default router;
