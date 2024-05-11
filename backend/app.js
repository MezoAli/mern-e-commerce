import express from "express";
import dotenv from "dotenv";
import productRouter from "./routes/products.js";
import userRouter from "./routes/user.js";
import orderRouter from "./routes/order.js";
import paymentRouter from "./routes/stripe_checkout.js";
import { connectDB } from "./config/connectDB.js";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/error.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __direname = path.dirname(__filename);
const app = express();

process.on("uncaughtException", (err) => {
  console.log(err);
  console.log("shutting sown due to uncaught exceptions");
  process.exit(1);
});
dotenv.config({
  path: "backend/config/config.env",
});
app.use(
  express.json({
    limit: "10mb",
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);
app.use(cookieParser());

app.use("/api/v1", productRouter);
app.use("/api/v1", paymentRouter);
app.use("/api/v1/auth", userRouter);
app.use("/api/v1", orderRouter);

if (process.env.NODE_ENV === "PRODUCTION") {
  app.use(express.static(path.join(__direname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__direname, "../frontend/dist/index.html"));
  });
}

app.use(errorMiddleware);
let server;
const start = async () => {
  try {
    await connectDB();
    server = app.listen(process.env.PORT, () => {
      console.log(
        `server is listinening on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`
      );
    });
  } catch (error) {
    console.log(error);
  }
};

start();

process.on("unhandledRejection", (err) => {
  console.log(err);
  console.log("shutting down server");
  server.close(() => {
    process.exit(1);
  });
});
