import express from "express";
import {
  createMessage,
  getMessages,
  countMessages,
} from "../controllers/Message.js";

const router = express.Router();

router.post("/", createMessage);
router.get("/", getMessages);
router.get("/count-messages", countMessages);

export default router;
