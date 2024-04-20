import { useParams } from "react-router-dom";
import { useGetSingleProductDetailsQuery } from "../store/api/productsApi";
import SingleProductDetails from "@/components/product/SingleProduct";
import { useEffect } from "react";
import toast from "react-hot-toast";

const SingleProduct = () => {
  const { id } = useParams();
  const { data, isError, isLoading, error } =
    useGetSingleProductDetailsQuery(id);
  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError]);

  if (isLoading) {
    return <p className="text-center text-3xl">Loading...</p>;
  }

  return <SingleProductDetails product={data?.product} />;
};

export default SingleProduct;
