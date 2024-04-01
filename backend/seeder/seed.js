import mongoose from "mongoose";
import Product from "../models/product.js";
import data from "./data.js";

const seedAllProducts = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/mezo-shopping");
    await Product.deleteMany();
    await Product.insertMany(data);
    console.log("all products added successfully");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedAllProducts();
