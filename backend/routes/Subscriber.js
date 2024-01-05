import express from "express";
import {
  createSubscriber,
  getSubscribers,
  recentSubscribers,
  countSubscribers,
} from "../controllers/Subscriber.js";

const router = express.Router();

router.post("/", createSubscriber);
router.get("/", getSubscribers);
router.get("/recent-subscribers", recentSubscribers);
router.get("/count-subscribers", countSubscribers);

export default router;
