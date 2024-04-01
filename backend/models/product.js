import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      maxlength: [200, "Product name can't exceed 200 characters"],
    },
    seller: {
      type: String,
      required: [true, "Product seller is required"],
      maxlength: [200, "Product seller can't exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      maxlength: [5, "Product price can't exceed 5 digits"],
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        public_id: {
          type: String,
          required: true,
        },
      },
    ],
    ratings: {
      type: Number,
      default: 0,
    },
    // reviews: [
    //   {
    //     user: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "User",
    //       required: [true, "User is required"],
    //     },
    //     rating: {
    //       type: Number,
    //       required: true,
    //     },
    //     comment: {
    //       type: String,
    //       required: true,
    //     },
    //   },
    // ],
    category: {
      type: String,
      enum: [
        "Laptops",
        "Cameras",
        "Home",
        "Electronics",
        "Accessories",
        "Headphones",
        "Food",
        "Books",
        "Sports",
        "Outdoor",
      ],
    },
    stock: {
      type: Number,
      required: [true, "Product stock is required"],
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: [true, "User is required"],
    // },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", ProductSchema);
