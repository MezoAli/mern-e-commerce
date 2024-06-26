import EditProductForm from "@/components/admin/EditProductForm";
import { useGetSingleProductDetailsQuery } from "@/store/api/productsApi";
import { useParams } from "react-router-dom";

const EditProduct = () => {
  const { productId } = useParams();
  const { data, isLoading, isError, error } =
    useGetSingleProductDetailsQuery(productId);
  if (isLoading) {
    return <p className="text-center text-2xl font-bold my-8">Loading...</p>;
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 font-bold text-3xl">
        {error?.data?.message}
      </p>
    );
  }
  return (
    <div className="w-full flex flex-col gap-4">
      <h3 className="text-2xl font-semibold">Update Product</h3>
      <EditProductForm product={data?.product} />
    </div>
  );
};

export default EditProduct;
