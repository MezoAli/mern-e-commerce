import express from "express";
import dotenv from "dotenv";
import productRouter from "./routes/products.js";
import { connectDB } from "./config/connectDB.js";
const app = express();
dotenv.config({
  path: "backend/config/config.env",
});

app.use("/api/v1", productRouter);

const start = async () => {
  try {
    await connectDB();
    app.listen(process.env.PORT, () => {
      console.log(
        `server is listinening on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`
      );
    });
  } catch (error) {
    console.log(error);
  }
};

start();
