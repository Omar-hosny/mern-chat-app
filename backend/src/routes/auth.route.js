import express from "express";
import { signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
// router.get("/signin", (req, res) => {
//   res.send("Hello World! from signin api");
// });
// router.get("/logout", (req, res) => {
//   res.send("Hello World! from logout api");
// });

export default router;
