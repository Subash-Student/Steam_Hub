import express from "express"
import multer from "multer"
import rateLimit from 'express-rate-limit';
import { addGame, adminLogin, deleteGame, editGame, getAllGames, getGameById } from "../controller/gameController.js";
import authMiddleware from "../middleware/auth.js";


const router = express.Router();




// Create rate limiter middleware
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

router.get("/all-games",apiLimiter,getAllGames);
router.get("/game/:id",apiLimiter,getGameById);

router.post("/admin-login",apiLimiter,adminLogin);
router.post("/add-game",multer().single("imageFile"),authMiddleware,apiLimiter,addGame);
router.put("/edit-game/:id",multer().single("imageFile"),authMiddleware,apiLimiter,editGame);
router.delete("/delete-game/:id",apiLimiter,authMiddleware,deleteGame);


export default router;