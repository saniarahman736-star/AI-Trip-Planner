import express from "express";
import authMiddleware from "../middleware/authmiddleware.js";
import {trip,getMyTrips,getTripById,deleteTrip} from "../controllers/tripController.js";
const router=express.Router();
router.post("/trip",authMiddleware,trip);
router.get("/my-trip",authMiddleware,getMyTrips);
router.get("/:id",authMiddleware,getTripById);
router.delete("/:id",authMiddleware,deleteTrip);
export default router;