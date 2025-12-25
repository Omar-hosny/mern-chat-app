import express from "express";

const router = express.Router();

router.get("/signup", (req, res) => {
  res.send("Hello World! from signup api");
});
router.get("/signin", (req, res) => {
  res.send("Hello World! from signin api");
});
router.get("/logout", (req, res) => {
  res.send("Hello World! from logout api");
});

export default router;
