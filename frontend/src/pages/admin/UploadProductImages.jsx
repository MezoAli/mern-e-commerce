import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useDeleteSingleProductImageMutation,
  useGetSingleProductDetailsQuery,
  useUploadProductImagesMutation,
} from "@/store/api/productsApi";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Trash2Icon } from "lucide-react";

const UploadProductImages = () => {
  const { productId } = useParams();
  const [images, setImages] = useState([]);
  const inputRef = useRef();
  const [previewImages, setPreviewImages] = useState([]);
  const { data: productData } = useGetSingleProductDetailsQuery(productId);

  const [uploadImages, { data, isError, error, isSuccess, isLoading }] =
    useUploadProductImagesMutation();

  const [
    deleteImage,
    {
      data: deleteImageData,
      isLoading: deleteImageIsLoading,
      isSuccess: deleteImageIsSuccess,
      isError: deleteImageIsError,
      error: deleteImageError,
    },
  ] = useDeleteSingleProductImageMutation();

  const handleDeleteImage = async (publicId) => {
    const imageData = { body: { publicId }, productId };
    deleteImage(imageData);
  };

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
    if (images?.length === 0) {
      toast.error("please select image first");
      return;
    }
    uploadImages({ productId, body: images });
  };

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success(data?.message);
      setPreviewImages([]);
      setImages([]);
    }
  }, [isError, isSuccess]);

  useEffect(() => {
    if (deleteImageIsError) {
      toast.error(deleteImageError?.data?.message);
    }

    if (deleteImageIsSuccess) {
      toast.success(deleteImageData?.message);
    }
  }, [deleteImageIsError, deleteImageIsSuccess]);

  const handleDeleteImagesPreview = (image) => {
    setPreviewImages((prev) => {
      const newState = prev.filter((img) => img !== image);
      return newState;
    });
    setImages((prev) => {
      const newState = prev.filter((img) => img !== image);
      return newState;
    });
  };

  return (
    <div>
      <h2 className="text-center text-2xl font-bold mb-10">Upload Images</h2>
      {productData?.product?.images.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-semibold">Product Original Images</h3>
          {productData?.product?.images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-slate-200 rounded-xl mb-6 p-4">
              {productData?.product?.images?.map((image) => {
                return (
                  <div
                    className="flex flex-col justify-center items-center gap-2"
                    key={`${image?._id}`}
                  >
                    <img
                      alt={`product_image-${image?.public_id}`}
                      src={image?.url}
                      className="rounded-lg w-40 h-40"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={deleteImageIsLoading}
                      onClick={() => handleDeleteImage(image?.public_id)}
                    >
                      <Trash2Icon />
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {previewImages.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-semibold">Newly Selected images</h3>
          {previewImages.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-slate-200 rounded-xl mb-6 p-4">
              {previewImages?.map((image, index) => {
                return (
                  <div
                    key={`product_image-${index}`}
                    className="flex flex-col justify-center items-center gap-2"
                  >
                    <img
                      alt={`product_image-${index}`}
                      src={image}
                      className="rounded-lg w-40 h-40"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        handleDeleteImagesPreview(image);
                      }}
                    >
                      <Trash2Icon />
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      <form
        className="grid w-full max-w-sm items-center gap-8 mx-auto"
        onSubmit={handleSubmit}
      >
        <Label htmlFor="picture" className="text-semibold text-lg">
          Images
        </Label>
        <Input
          id="picture"
          type="file"
          multiple
          onChange={handleImage}
          ref={inputRef}
          onClick={() => {
            if (inputRef.current) inputRef.current.value = "";
          }}
        />
        <Button type="submit" variant="auth" disabled={isLoading}>
          {isLoading ? "uploading..." : "Upload"}
        </Button>
      </form>
    </div>
  );
};

export default UploadProductImages;
