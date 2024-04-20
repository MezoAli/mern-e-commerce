import { useGetProductsQuery } from "@/store/api/productsApi";
import ProductCard from "./ProductCard";
import toast from "react-hot-toast";
import { useEffect } from "react";
import PaginationComp from "../pagination/Pagination";
import { useSearchParams } from "react-router-dom";

const ProductsGrid = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const params = { page };
  const { data, isLoading, error, isError } = useGetProductsQuery(params);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError]);

  if (isLoading) {
    return <p className="text-center text-3xl">Loading...</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {data?.products?.map((product) => {
          return <ProductCard product={product} key={product._id} />;
        })}
      </div>
      {data?.noOfAllProducts > data?.noOfProducts && (
        <PaginationComp
          productsPerPage={data?.productsPerPage}
          noOfAllProducts={data?.noOfAllProducts}
        />
      )}
    </>
  );
};

export default ProductsGrid;
