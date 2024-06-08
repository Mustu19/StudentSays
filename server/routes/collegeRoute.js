import { Router } from "express";
import collegeController from "../controller/collegeController.js";
const router = Router();

router.route("/").get(collegeController.getColleges);
router.route("/:id").get(collegeController.getCollegeById);
export default router;
