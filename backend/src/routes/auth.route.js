import express from "express";
import {
  logout,
  signin,
  signup,
  updateProfile,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logout);

router.post("/update-profile", authMiddleware, updateProfile);
// check authentication if user is logged in or not
router.get("/check", authMiddleware, (req, res) => {
  res.status(200).json(req.user);
});

export default router;
