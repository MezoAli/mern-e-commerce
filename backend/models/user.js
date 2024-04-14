import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
      type: String,
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

UserSchema.methods.generateToken = function () {
  const token = jwt.sign(
    { id: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES,
    }
  );

  return token;
};

UserSchema.methods.comparePassword = async function (password) {
  const result = bcrypt.compare(password, this.password);
  return result;
};

export default mongoose.model("User", UserSchema);
