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

export const uploadImage = (file, folder) => {
  return new Promise(async (resolve, reject) => {
    const result = await cloudinary.v2.uploader.upload(file, {
      folder,
      resource_type: "auto",
    });
    resolve({
      public_id: result.public_id,
      url: result.url,
    });
  });
};

export const deleteImage = async (file) => {
  const res = await cloudinary.v2.uploader.destroy(file);

  if (res.result === "ok") {
    return true;
  } else {
    return false;
  }
};
