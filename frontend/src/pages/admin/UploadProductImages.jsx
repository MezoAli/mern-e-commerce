import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUploadProductImagesMutation } from "@/store/api/productsApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const UploadProductImages = () => {
  const { productId } = useParams();
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const navigate = useNavigate();

  const [uploadImages, { data, isError, error, isSuccess, isLoading }] =
    useUploadProductImagesMutation();

  const handleImage = (e) => {
    const allImages = Array.from(e.target.files);

    allImages?.forEach((image) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(image);
      fileReader.onload = () => {
        if (fileReader.readyState === 2) {
          setImages((prev) => [...prev, fileReader.result]);
          setPreviewImages((prev) => [...prev, fileReader.result]);
        }
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    uploadImages({ productId, body: images });
  };

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success(data?.message);
      navigate(`/products/${productId}`);
    }
  }, [isError, isSuccess]);

  return (
    <div>
      <h2 className="text-center text-2xl font-bold mb-10">Upload Images</h2>
      {previewImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 bg-slate-200 rounded-xl mb-6 p-4">
          {previewImages?.map((image, index) => {
            return (
              <img
                key={`product_image-${index}`}
                alt={`product_image-${index}`}
                src={image}
                className="rounded-lg w-52 h-52"
              />
            );
          })}
        </div>
      )}
      <form
        className="grid w-full max-w-sm items-center gap-8 mx-auto"
        onSubmit={handleSubmit}
      >
        <Label htmlFor="picture" className="text-semibold text-lg">
          Images
        </Label>
        <Input id="picture" type="file" multiple onChange={handleImage} />
        <Button type="submit" variant="auth" disabled={isLoading}>
          {isLoading ? "uploading..." : "Upload"}
        </Button>
      </form>
    </div>
  );
};

export default UploadProductImages;
