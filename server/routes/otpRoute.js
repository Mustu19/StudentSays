import { Router } from "express";
import getOtp  from "../controller/otpController.js";
const router = Router();

router.post('/getotp', getOtp);

export default router;