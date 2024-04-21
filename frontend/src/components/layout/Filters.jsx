import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useSearchParams } from "react-router-dom";
import { getAllSearchParams } from "@/lib/getAllSearchParams";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CATEGORIES } from "@/constants";
import StarRatings from "react-star-ratings";

const Filters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const initialCategory = searchParams.get("category") || "";
  const initialRating = +searchParams.get("rating") || 4;
  const [category, setCategory] = useState(initialCategory);
  const [rating, setRating] = useState(initialRating);

  useEffect(() => {
    searchParams.has("priceGTE")
      ? setMinPrice(searchParams.get("priceGTE"))
      : "";
    searchParams.has("priceLTE")
      ? setMaxPrice(searchParams.get("priceLTE"))
      : "";
  }, []);

  const allSearchParams = getAllSearchParams(searchParams);
  const handlePriceFilter = () => {
    setSearchParams({
      ...allSearchParams,
      priceLTE: maxPrice,
      priceGTE: minPrice,
    });
  };

  const handleCategoryFilter = () => {
    setSearchParams({ ...allSearchParams, category });
  };

  const handleRatingFilter = () => {
    setSearchParams({ ...allSearchParams, rating });
  };

  const clearFilters = () => {
    setMaxPrice("");
    setMinPrice("");
    setCategory("");
    setRating("");
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

      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-start gap-2">
          <h3 className="text-xl font-semibold">Category</h3>
          <RadioGroup
            defaultValue={category}
            onValueChange={(e) => setCategory(e)}
          >
            {CATEGORIES.map((item) => {
              return (
                <div key={item} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={item === "All" ? "" : item}
                    id={item}
                    className="text-orange-500"
                  />
                  <Label htmlFor={item}>{item}</Label>
                </div>
              );
            })}
          </RadioGroup>
          <Button
            variant="auth"
            className="w-full"
            onClick={handleCategoryFilter}
          >
            Apply
          </Button>
        </div>
        <hr />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-start gap-2">
          <h3 className="text-xl font-semibold">Rating</h3>
          <RadioGroup defaultValue={rating} onValueChange={(e) => setRating(e)}>
            {[1, 2, 3, 4, 5].map((item) => {
              return (
                <div key={item} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={item}
                    id={item}
                    className="text-orange-500"
                  />
                  <Label htmlFor={item}>
                    <StarRatings
                      rating={item}
                      starRatedColor="orange"
                      numberOfStars={5}
                      name="rating"
                      starDimension="10px"
                    />
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
          <Button
            variant="auth"
            className="w-full"
            onClick={handleRatingFilter}
          >
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
