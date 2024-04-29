import StarRatings from "react-star-ratings";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const ReviewItem = ({ review }) => {
  return (
    <div className="flex justify-start gap-4 items-center mb-5">
      <Avatar>
        <AvatarImage
          src={`${
            review?.user?.avatar
              ? review?.user?.avatar?.url
              : "../../images/default_avatar.jpg"
          }`}
        />
        <AvatarFallback>{review?.user?.name}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col justify-start items-start">
        <h3 className="text-xl font-semibold">{review?.user?.name}</h3>
        <StarRatings
          rating={review?.rating}
          starRatedColor="orange"
          numberOfStars={5}
          name="rating"
          starDimension="25px"
        />
        <p className="text-slate-700">{review?.comment}</p>
      </div>
      <hr />
    </div>
  );
};

export default ReviewItem;
