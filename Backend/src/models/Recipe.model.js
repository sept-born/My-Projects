import mongoose, { Schema } from "mongoose";

const RecipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    nutrition: {
      calories: Number,
      protein: Number,
      carbs: Number,
      fat: Number,
    },

    ingredients: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    instructions: {
      type: String,
      required: true,
      trim: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timeStamps: true }
);

export const Recipe = mongoose.model("Recipe", RecipeSchema);
