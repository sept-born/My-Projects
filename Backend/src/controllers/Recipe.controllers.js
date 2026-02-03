import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Recipe } from "../models/Recipe.model.js";
import { User } from "../models/users.model.js";
const EditRecipe = asyncHandler(async (req, res) => {
  return res.status(200).json({ success: true });
});
const AddRecipe = asyncHandler(async (req, res) => {
  //   console.log("checkpoint -0 ");

  const { title, nutrition, ingredients, instructions } = req.body;
  const owner = req.user._id;
  console.log("checkpoint -1 ");

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
  console.log("checkpoint -2 ");
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
  const user = await User.findById(req.user._id).populate("personalRecipe");

  return res
    .status(200)
    .json(
      new ApiResponse(200, user.personalRecipe, "Recipe fetched Successfully")
    );
});
const deleteRecipe = asyncHandler(async (req, res) => {
  return res.status(200).json({ success: true });
});

// getUserProfile is incomplete
export { AddRecipe, deleteRecipe, EditRecipe, getRecipe };
