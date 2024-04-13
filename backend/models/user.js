import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter your name"],
      maxlength: [50, "name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "please enter your email"],
      unique: true,
    },
    password: {
      type: Number,
      required: [true, "please enter your name"],
      minlength: [6, "password should be at least 6 characters"],
      select: false,
    },
    avatar: {
      public_id: String,
      url: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

export default mongoose.model("User", UserSchema);
