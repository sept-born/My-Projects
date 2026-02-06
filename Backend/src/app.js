import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
// routes import
import userRouter from "./routes/user.routes.js";
import RecipeRouter from "./routes/Recipe.routes.js";
import MealRouter from "./routes/MealLog.routes.js";
app.use("/api/v1/users", userRouter);
app.use("/api/v1/recipe", RecipeRouter);
app.use("/api/v1/meal", MealRouter);

export { app };
