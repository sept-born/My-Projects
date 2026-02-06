import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Recipe } from "../models/Recipe.model.js";
import { User } from "../models/users.model.js";
const EditRecipe = asyncHandler(async (req, res) => {
  const { recipeId } = req.params;
  const { title, nutrition, ingredients, instructions } = req.body;

  //  Find recipe
  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    throw new ApiError(404, "Recipe not found");
  }

  // Authorization check
  if (recipe.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not allowed to edit this recipe");
  }

  //  Update fields
  if (title) recipe.title = title;
  if (nutrition) recipe.nutrition = nutrition;
  if (ingredients) recipe.ingredients = ingredients;
  if (instructions) recipe.instructions = instructions;

  await recipe.save();

  return res
    .status(200)
    .json(new ApiResponse(200, recipe, "Recipe updated successfully"));
});
const AddRecipe = asyncHandler(async (req, res) => {
  //   console.log("checkpoint -0 ");

  const { title, nutrition, ingredients, instructions } = req.body;
  const owner = req.user._id;

  const existRecipe = await Recipe.findOne({ title });
  if (existRecipe) {
    throw new ApiError(409, "Recipe with same name exist");
  }
  const recipe = await Recipe.create({
    title,
    nutrition,
    ingredients,
    instructions,
    owner,
  });
  const createdRecipe = await Recipe.findById(recipe._id).select(
    "-nutrition -ingredients -instructions"
  );
  if (!createdRecipe) {
    throw new ApiError(500, "Something went wrong while adding the Recipe");
  }
  req.user.personalRecipe.push(recipe._id);
  await req.user.save();

  return res
    .status(201)
    .json(new ApiResponse(200, createdRecipe, "Recipe added Successfully"));
});
const getRecipe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate(
    "personalRecipe",
    " -owner"
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, user.personalRecipe, "Recipe fetched Successfully")
    );
});
const deleteRecipe = asyncHandler(async (req, res) => {
  const { recipeId } = req.params;

  // Find recipe
  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    throw new ApiError(404, "Recipe not found");
  }

  // Authorization check (VERY IMPORTANT)
  if (recipe.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not allowed to delete this recipe");
  }

  //  Delete
  await Recipe.findByIdAndDelete(recipeId);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Recipe deleted successfully"));
});
export { AddRecipe, deleteRecipe, EditRecipe, getRecipe };
