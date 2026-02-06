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
router.route("/EditRecipe/:recipeId").put(verifyJWT, EditRecipe);
router.delete("/delete/:recipeId", verifyJWT, deleteRecipe);
router.route("/getRecipe").get(verifyJWT, getRecipe);

export default router;
