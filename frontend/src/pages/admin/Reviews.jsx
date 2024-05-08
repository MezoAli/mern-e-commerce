import ReviewsTable from "@/components/admin/ReviewsTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLazyGetReviewsForProductQuery } from "@/store/api/productsApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Reviews = () => {
  const [productId, setProductId] = useState("");
  const [fetchReviews, { data, isError, error, isLoading }] =
    useLazyGetReviewsForProductQuery();
  console.log(data);
  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchReviews(productId);
  };

  const navigate = useNavigate();

  if (isError) {
    return (
      <div className="w-full flex flex-col gap-4 justify-center items-center">
        <p className="text-center text-red-500 text-2xl">
          {error?.data?.message}
        </p>
        <Button
          variant="destructive"
          className="w-[50%]"
          onClick={() => navigate(0)}
        >
          Refresh Page
        </Button>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-8 max-w-xl mx-auto">
      <form
        className="flex flex-col justify-start items-start gap-4"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col justify-start items-start w-full gap-4">
          <Label className="text-xl font-semibold">Product Id</Label>
          <Input
            type="text"
            placeholder="please type product Id to view it's reviews"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
        </div>
        <Button variant="auth" className="block mx-auto" type="submit">
          {isLoading ? "Fetching..." : "Fetch Reviews"}
        </Button>
      </form>
      {data?.reviews?.length > 0 && <ReviewsTable reviews={data?.reviews} />}
    </div>
  );
};

export default Reviews;
