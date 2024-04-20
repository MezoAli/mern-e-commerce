import Metadata from "@/components/layout/Metadata";
import ProductsGrid from "@/components/product/ProductsGrid";

const Home = () => {
  return (
    <>
      <Metadata title="Buy best products online" />
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl text-slate-400 font-bold my-6">
          Latest Products
        </h2>
        <ProductsGrid />
      </div>
    </>
  );
};

export default Home;
