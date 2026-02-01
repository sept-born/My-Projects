import mongoose, { Schema } from "mongoose";

const MealLogSchema = new Schema(
  {
    meals: [
      {
        meal: {
          type: Schema.Types.ObjectId, // Reference to a Meal or Recipe document
          ref: "Recipe", // Replace "Recipe" with your actual meal model name
          required: true,
        },
        serving: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
  },
  { TimeStamps: true }
);

export const MealLog = mongoose.model("MealLog", MealLogSchema);
