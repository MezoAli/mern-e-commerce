import mongoose from "mongoose";

export const connectDB = async () => {
  let uri;
  if (process.env.NODE_ENV === "DEVELOPMENT") uri = process.env.MONGO_LOCAL_URI;
  if (process.env.NODE_ENV === "PRODUCTION") uri = process.env.MONGO_URI;
  const con = await mongoose.connect(uri);
  console.log(`mongodb connected with host ${con.connection?.host}`);
};
