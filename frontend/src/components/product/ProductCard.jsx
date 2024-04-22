import StarRatings from "react-star-ratings";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Card className="flex flex-col justify-around">
      <CardHeader>
        <img
          src={product?.images[0]?.url}
          alt={product?.name}
          className="h-[200px] mb-6"
        />
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="mt-10">
        <div className="flex justify-between items-center gap-4">
          <StarRatings
            rating={product?.ratings}
            starRatedColor="orange"
            numberOfStars={5}
            name="rating"
            starDimension="15px"
          />
          <p> ({product?.numOfReviews}) </p>
        </div>
        <p className="font-bold text-xl mt-4">$ {product?.price}</p>
      </CardContent>
      <CardFooter>
        <Button variant="auth" className="w-full font-semibold text-lg">
          <Link to={`/products/${product?._id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
