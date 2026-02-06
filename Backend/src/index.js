import "./config/env.js"; // ✅ MUST be first import

import connectDB from "./db/index.js";
import { app } from "./app.js";

// console.log("PWD =", process.cwd());
// console.log("CORS_ORIGIN =", process.env.CORS_ORIGIN);

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });
