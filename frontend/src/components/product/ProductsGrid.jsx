import { useGetProductsQuery } from "@/store/api/productsApi";
import ProductCard from "./ProductCard";

const ProductsGrid = () => {
  const { data, isLoading } = useGetProductsQuery();
  console.log(data);

  if (isLoading) {
    return <p className="text-center text-3xl">Loading...</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {data?.products?.map((product) => {
        return <ProductCard product={product} key={product._id} />;
      })}
    </div>
  );
};

export default ProductsGrid;
