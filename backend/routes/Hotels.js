import express from "express";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getHotel,
  getHotelRooms,
  getHotels,
  updateHotel,
  countHotels,
} from "../controllers/hotel.js";
import { verifyAdmin } from "../middlewares/Auth.js"; // Correct import path
const router = express.Router();

// CREATE
router.post("/", verifyAdmin, createHotel);
router.get("/count-hotels", countHotels);

// UPDATE
router.put("/:id", verifyAdmin, updateHotel);
// DELETE
router.delete("/:id", verifyAdmin, deleteHotel);
// GET

router.get("/find/:id", getHotel);
// GET ALL

router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);

export default router;
