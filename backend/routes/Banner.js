import express from "express";
import {
  createBanner,
  getBanner,
  updateBanner,
} from "../controllers/Banner.js";

const router = express.Router();

router.post("/", createBanner);
router.get("/:id", getBanner);
router.put("/:id", updateBanner);

export default router;
