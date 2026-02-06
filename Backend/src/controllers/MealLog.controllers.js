import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { MealLog } from "../models/MealLog.model.js";
import { Recipe } from "../models/Recipe.model.js";

export const addMeal = asyncHandler(async (req, res) => {
  const { MealName, servings = 1, eatenAt } = req.body;
  if (!MealName) {
    throw new ApiError(400, "MealName is required");
  }

  // 1️⃣ Validate recipe exists
  const recipe = await Recipe.findOne({ title: MealName });
  if (!recipe) {
    throw new ApiError(404, "Recipe not found");
  }

  // 2️⃣ Normalize date (midnight)
  const mealDate = eatenAt ? new Date(eatenAt) : new Date();

  mealDate.setHours(0, 0, 0, 0);

  // 3️⃣ Find or create MealLo  g for that day
  let mealLog = await MealLog.findOne({
    user: req.user._id,
    date: mealDate,
  });

  if (!mealLog) {
    mealLog = await MealLog.create({
      user: req.user._id,
      date: mealDate,
      meals: [],
    });
  }

  // 4️⃣ Add meal
  mealLog.meals.push({
    recipe: recipe._id,
    servings,
    eatenAt: eatenAt || new Date(),
  });

  await mealLog.save();

  return res
    .status(201)
    .json(new ApiResponse(201, mealLog, "Meal added successfully"));
});

export const getMealsByDate = asyncHandler(async (req, res) => {
  const { date } = req.query; // YYYY-MM-DD

  if (!date) {
    throw new ApiError(400, "Date is required");
  }

  const queryDate = new Date(date);
  queryDate.setHours(0, 0, 0, 0);

  const mealLog = await MealLog.findOne({
    user: req.user._id,
    date: queryDate,
  }).populate("meals.recipe");

  return res
    .status(200)
    .json(new ApiResponse(200, mealLog, "Meals fetched successfully"));
});
export const getMealsByWeek = asyncHandler(async (req, res) => {
  const { startDate } = req.query; // YYYY-MM-DD (Monday)

  if (!startDate) {
    throw new ApiError(400, "Start date is required");
  }

  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  end.setHours(23, 59, 59, 999);

  const mealLogs = await MealLog.find({
    user: req.user._id,
    date: { $gte: start, $lte: end },
  }).populate("meals.recipe");

  return res
    .status(200)
    .json(new ApiResponse(200, mealLogs, "Weekly meals fetched successfully"));
});
