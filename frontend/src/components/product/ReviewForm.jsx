import { useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";
import StarRatings from "react-star-ratings";
import { Button } from "../ui/button";
import { useAddReviewMutation } from "@/store/api/productsApi";
import toast from "react-hot-toast";

const ReviewForm = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleChangeRating = (newRating) => {
    setRating(newRating);
  };

  const [addReview, { isError, isLoading, isSuccess, error }] =
    useAddReviewMutation();

  const handleAddReview = async (e) => {
    e.preventDefault();
    const data = {
      productId,
      comment,
      rating,
    };

    addReview(data);
  };

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Review Added Successfully");
      setComment("");
      setRating(0);
    }
  }, [isError, isSuccess]);
  return (
    <form className="my-4 max-w-4xl mx-auto" onSubmit={handleAddReview}>
      <p className="text-xl font-semibold mb-3">Add review</p>
      <Textarea
        placeholder="Write your Review here ..."
        className="mb-4"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <StarRatings
        rating={rating}
        starRatedColor="orange"
        changeRating={handleChangeRating}
        numberOfStars={5}
        name="rating"
        starDimension="30px"
      />
      <Button className="my-6 block" variant="auth" disabled={isLoading}>
        {isLoading ? "Adding..." : " Add Review"}
      </Button>
      <hr className="my-4" />
    </form>
  );
};

export default ReviewForm;
