// getUserProfile is incomplete
import { Router } from "express";
import {
  AddRecipe,
  deleteRecipe,
  EditRecipe,
  getRecipe,
} from "../controllers/Recipe.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/AddRecipe").post(verifyJWT, AddRecipe);
router.route("/deleteRecipe").post(verifyJWT, deleteRecipe);
router.route("/EditRecipe").post(verifyJWT, EditRecipe);
router.route("/getRecipe").get(verifyJWT, getRecipe);

export default router;
