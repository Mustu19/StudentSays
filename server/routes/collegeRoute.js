import { Router } from "express";
import adminMiddleware from "../middleware/adminMiddlware.js";
import collegeController from "../controller/collegeController.js";
import {authMiddleware} from "../middleware/authMiddleware.js";
const router = Router();

router.route("/").get(collegeController.getCollege);
router
  .route("/")
  .post(authMiddleware, adminMiddleware, collegeController.addCollege);
router.route("/:id").get(collegeController.getCollegeById);
export default router;
