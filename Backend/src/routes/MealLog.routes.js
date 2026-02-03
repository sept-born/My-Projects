// getUserProfile is incomplete
import { Router } from "express";
import {
  getMealsByDate,
  getMealsByWeek,
  addMeal,
} from "../controllers/MealLog.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/addMeal").post(verifyJWT, addMeal);
router.route("/getMealsByWeek").post(verifyJWT, getMealsByWeek);
router.route("/getMealsByDate").post(verifyJWT, getMealsByDate);

export default router;
