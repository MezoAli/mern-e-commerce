import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config({
  path: "backend/config/config.env",
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const uploadFile = (file, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(
      file,
      (result) => {
        resolve({
          public_Id: result.public_Id,
          url: result.url,
        });
      },
      {
        folder,
        resource_type: "auto",
      }
    );
  });
};

export const deleteFile = async (file) => {
  const res = await cloudinary.v2.uploader.destroy(file);
  if (res?.result === "ok") return true;
  return false;
};
