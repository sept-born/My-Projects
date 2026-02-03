import mongoose, { Schema } from "mongoose";

const MealLogSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    meals: [
      {
        recipe: {
          type: Schema.Types.ObjectId,
          ref: "Recipe",
          required: true,
        },

        servings: {
          type: Number,
          default: 1,
        },

        eatenAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export const MealLog = mongoose.model("MealLog", MealLogSchema);
