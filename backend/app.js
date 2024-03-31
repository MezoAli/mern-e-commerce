import express from "express";
import dotenv from "dotenv";
import productRouter from "./routes/products.js";
const app = express();
dotenv.config({
  path: "backend/config/config.env",
});

app.use("/api/v1", productRouter);

app.listen(process.env.PORT, () => {
  console.log(
    `server is listinening on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});
