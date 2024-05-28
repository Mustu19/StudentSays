import express from "express";
import adminController from "../controller/adminController.js";
import adminMiddleware from "../middleware/adminMiddlware.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const fileExtension = file.originalname.split(".").pop();
    cb(null, `${file.fieldname}_${Date.now()}.${fileExtension}`);
  },
});

const upload = multer({ storage: storage });

router.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  adminController.getAllUsers
);
router.delete(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  adminController.deleteUser
);
router.post(
  "/colleges/addCollege",
  upload.single('logo'),
  authMiddleware,
  adminMiddleware,
  adminController.addCollege
);
router.get(
  "/colleges",
  authMiddleware,
  adminMiddleware,
  adminController.getAllColleges
);
router.put(
  "/colleges/:id/edit",
  authMiddleware,
  adminMiddleware,
  adminController.updateCollege
);
router.get(
  "/colleges/:id/edit",
  authMiddleware,
  adminMiddleware,
  adminController.getCollegeById
);
router.delete(
  "/colleges/:id",
  authMiddleware,
  adminMiddleware,
  adminController.deleteCollege
);

export default router;
