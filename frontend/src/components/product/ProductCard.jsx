import StarRatings from "react-star-ratings";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ProductCard = () => {
  return (
    <Card>
      <CardHeader>
        <img src="../../images/default_product.png" />
        <CardTitle>Product Name</CardTitle>
      </CardHeader>
      <CardContent>
        <StarRatings
          rating={5}
          starRatedColor="orange"
          numberOfStars={5}
          name="rating"
          starDimension="25px"
        />
        <p className="font-bold text-xl mt-4">$ 100</p>
      </CardContent>
      <CardFooter>
        <Button variant="auth" className="w-full font-semibold text-lg">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
