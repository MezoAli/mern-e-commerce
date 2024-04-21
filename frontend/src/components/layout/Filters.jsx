import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useSearchParams } from "react-router-dom";
import { getAllSearchParams } from "@/lib/getAllSearchParams";

const Filters = () => {
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const allSearchParams = getAllSearchParams(searchParams);
  console.log(allSearchParams);
  console.log(searchParams);
  const handlePriceFilter = () => {
    if (minPrice) {
      setSearchParams({ ...allSearchParams, priceGTE: minPrice });
    }
    if (maxPrice) {
      setSearchParams({ ...allSearchParams, priceLTE: maxPrice });
    }

    if (minPrice && maxPrice) {
      setSearchParams({
        ...allSearchParams,
        priceLTE: maxPrice,
        priceGTE: minPrice,
      });
    }
  };

  const clearFilters = () => {
    setMaxPrice("");
    setMinPrice("");
    setSearchParams({});
  };
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Filters</h2>
      <hr />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-start gap-2">
          <h3 className="text-xl font-semibold">Price</h3>
          <div className="flex justify-between items-start gap-2">
            <Input
              placeholder="min"
              value={minPrice}
              onChange={(e) => setMinPrice(+e.target.value)}
            />
            <Input
              placeholder="max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(+e.target.value)}
            />
          </div>
          <Button variant="auth" className="w-full" onClick={handlePriceFilter}>
            Apply
          </Button>
        </div>
        <hr />
      </div>
      <hr />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-start gap-2">
          <h3 className="text-xl font-semibold">Category</h3>
          <div className="flex justify-between items-start gap-2">
            <Input placeholder="min" />
            <Input placeholder="max" />
          </div>
          <Button variant="auth" className="w-full">
            Apply
          </Button>
        </div>
        <hr />
      </div>
      <Button onClick={clearFilters} variant="destructive">
        Clear Filters
      </Button>
    </div>
  );
};

export default Filters;
