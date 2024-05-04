import ProductsTable from "@/components/admin/ProductsTable";
import Metadata from "@/components/layout/Metadata";
import { Input } from "@/components/ui/input";
import { useGetAllProductForAdminQuery } from "@/store/api/productsApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Products = () => {
  const { data, isLoading, error, isError } = useGetAllProductForAdminQuery();
  const [search, setSearch] = useState("");
  const filteredProducts = data?.products?.filter((product) => {
    return product?.name.toLowerCase().includes(search);
  });

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError]);

  if (isLoading) {
    return <p className="text-3xl text-center my-4 font-bold">Loading...</p>;
  }
  return (
    <>
      <Metadata title="Admin Products" />
      <Input
        type="text"
        placeholder="search by name"
        className="my-6"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {data?.products?.length > 0 && (
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 capitalize">
            {filteredProducts.length} Products
          </h3>
          <ProductsTable products={filteredProducts} />
        </div>
      )}
    </>
  );
};

export default Products;
