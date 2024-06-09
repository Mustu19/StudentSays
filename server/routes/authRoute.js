import { Router } from "express";
import authController from "../controller/authController.js";
import validate from "../middleware/validateMiddleware.js";
import { signupSchema , signinSchema } from "../validator/authValidator.js";
import {authMiddleware} from "../middleware/authMiddleware.js";
const router = Router();

router.route("/").get(authController.home);
router.route("/signup").post(validate(signupSchema) , authController.signup);
router.route("/signin").post(validate(signinSchema), authController.signin);
router.route("/user").get(authMiddleware, authController.user);
router.route("/forgotPassword").post(authController.forgotPassword);
router.route("/resetPassword/:resetToken").put(authController.resetPassword);

export default router;