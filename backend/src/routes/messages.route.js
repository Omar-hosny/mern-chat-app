import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  getAllContacts,
  getChatByPartnerId,
  getChatPartners,
  sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

// message routes
router.use(authMiddleware);
router.get("/contacts", getAllContacts);
router.get("/chats", getChatPartners);
router.get("/:id", getChatByPartnerId);
router.post("/send/:id", sendMessage);

export default router;
