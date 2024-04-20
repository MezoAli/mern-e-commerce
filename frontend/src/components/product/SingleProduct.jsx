import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import StarRatings from "react-star-ratings";
import { Button } from "../ui/button";

const SingleProductDetails = ({ product }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-[80px] max-w-4xl mx-auto">
      <div className="col-span-2 mt-20">
        <Carousel>
          <CarouselContent>
            {product?.images?.map((img) => {
              return (
                <CarouselItem key={img.public_id}>
                  <img
                    src={img.url}
                    alt={product.name}
                    className="h-[300px] w-full rounded-lg"
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="col-span-3 flex flex-col gap-8">
        <h2 className="text-2xl font-bold">{product?.name}</h2>
        <p className="text-slate-400">Product #{product?._id}</p>
        <div className="flex justify-start items-center gap-4">
          <StarRatings
            rating={product?.ratings}
            starRatedColor="orange"
            numberOfStars={5}
            name="rating"
            starDimension="23px"
          />
          <p> ({product?.numOfReviews}) Reviews</p>
        </div>
        <p className="text-2xl font-bold">$ {product?.price}</p>
        <div className="flex justify-start items-center gap-5">
          <Button>-</Button>
          <p>1</p>
          <Button>+</Button>
          <Button variant="auth">Add To Cart</Button>
        </div>
        <div className="flex justify-start items-center gap-4 text-xl font-bold">
          <p>Status : </p>
          {product?.stock === 0 ? (
            <p className="text-red-500">Out Of Stock</p>
          ) : (
            <p>{product?.stock} left</p>
          )}
        </div>
        <p className="text-xl font-semibold">Description</p>
        <p>{product?.description}</p>
        <p>Sold by : {product?.seller}</p>
      </div>
    </div>
  );
};

export default SingleProductDetails;
