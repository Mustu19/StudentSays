import { Router } from "express";
import reviewController from "../controller/reviewController.js"
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = Router()

router.post("/addReview", authMiddleware, reviewController.addReview);
router.delete("/deleteReview/:id", authMiddleware, reviewController.deleteReview);
router.put("/updateReview/:id", authMiddleware, reviewController.updateReview);
router.get("/:collegeId/reviews", reviewController.getCollegeReviews);




export default router