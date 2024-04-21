import { useGetProductsQuery } from "@/store/api/productsApi";
import ProductCard from "./ProductCard";
import toast from "react-hot-toast";
import { useEffect } from "react";
import PaginationComp from "../pagination/Pagination";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "../ui/button";
import Filters from "../layout/Filters";

const ProductsGrid = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const keyword = searchParams.get("keyword") || "";
  const category = searchParams.get("category") || "";
  const seller = searchParams.get("seller") || "";
  const priceGTE = Number(searchParams.get("priceGTE")) || 0;
  const priceLTE = Number(searchParams.get("priceLTE")) || 100000;
  const rating = Number(searchParams.get("rating")) || 0;
  const params = {
    page,
    keyword,
    category,
    seller,
    rating,
    priceGTE,
    priceLTE,
  };
  const { data, isLoading, error, isError } = useGetProductsQuery(params);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError]);

  if (isLoading) {
    return <p className="text-center text-3xl">Loading...</p>;
  }

  if (data?.products?.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center gap-6">
        <p className="text-center text-3xl">No Products Found</p>
        <Button variant="auth">
          <Link to="/">Back To Home Page</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl text-slate-400 font-bold my-6">
        {keyword.trim() || category || seller || priceGTE || priceLTE || rating
          ? `${data?.filteredProductsCount} Products found`
          : "Latest Products"}
      </h2>
      <div className="flex gap-4">
        <Filters className="col-span-1 md:col-span-1 lg:col-span-1" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {data?.products?.map((product) => {
            return <ProductCard product={product} key={product._id} />;
          })}
        </div>
      </div>

      {data?.filteredProductsCount > data?.productsPerPage && (
        <PaginationComp
          productsPerPage={data?.productsPerPage}
          filteredProductsCount={data?.filteredProductsCount}
        />
      )}
    </div>
  );
};

export default ProductsGrid;
