import Metadata from "@/components/layout/Metadata";
import ProductCard from "@/components/product/ProductCard";

const Home = () => {
  return (
    <>
      <Metadata title="Buy best products online" />
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl text-slate-400 font-bold my-6">
          Latest Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </>
  );
};

export default Home;
