import express from "express";
import {
  createHeroSection,
  HeroSection,
  updateHeroSection,
} from "../controllers/Hero_Section.js";

const router = express.Router();

router.get("/:id", HeroSection);
router.post("/", createHeroSection);
router.put("/:id", updateHeroSection);

export default router;
