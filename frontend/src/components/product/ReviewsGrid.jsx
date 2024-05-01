import ReviewItem from "./ReviewItem";

const ReviewsGrid = ({ reviews }) => {
  return (
    <div className="max-w-4xl mx-auto my-6">
      {reviews?.map((review) => {
        return <ReviewItem key={review?._id} review={review} />;
      })}
    </div>
  );
};

export default ReviewsGrid;
