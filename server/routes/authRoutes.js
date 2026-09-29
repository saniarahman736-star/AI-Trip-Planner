import express from "express";
import authMiddleware from "../middleware/authmiddleware.js";
import {register,login} from "../controllers/authController.js";
const router=express.Router();
router.post("/register",register);
router.post("/login",login);
router.get("/profile",authMiddleware,(req,res)=>{
    res.json({
        success:true,
        user:req.user,
    });
});
export default router;