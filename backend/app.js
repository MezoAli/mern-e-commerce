import express from "express";
import dotenv from "dotenv";
import productRouter from "./routes/products.js";
import { connectDB } from "./config/connectDB.js";
import errorMiddleware from "./middlewares/error.js";
const app = express();
dotenv.config({
  path: "backend/config/config.env",
});

app.use(express.json());

app.use("/api/v1", productRouter);
app.use(errorMiddleware);

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
