import express from "express";
import dotenv from "dotenv";
const app = express();
dotenv.config({
  path: "backend/config/config.env",
});

app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
});

app.listen(process.env.PORT, () => {
  console.log(`server is listinening on port ${process.env.PORT}...`);
});
