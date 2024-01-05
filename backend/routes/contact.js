import express from "express";
import {
  getContact,
  updateContact,
  createContact,
} from "../controllers/contact.js";

const router = express.Router();

router.post("/", createContact);
router.get("/:id", getContact);
router.put("/:id", updateContact);

export default router;
