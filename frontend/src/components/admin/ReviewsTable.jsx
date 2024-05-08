import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Trash2Icon } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import StarRatings from "react-star-ratings";
import { useDeleteReviewMutation } from "@/store/api/productsApi";
const ReviewsTable = ({ reviews, productId }) => {
  const [deleteReview, { isLoading, isSuccess, error, isError, data }] =
    useDeleteReviewMutation();
  console.log(productId);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success(data?.message);
    }
  }, [isSuccess, isError]);

  if (isLoading) {
    return <p className="text-center text-2xl font-bold my-8">Loading...</p>;
  }

  const handleDeleteReview = async (reviewId) => {
    const params = {
      productId,
      reviewId,
    };
    deleteReview(params);
  };

  return (
    <div className="flex flex-col w-full gap-4">
      <h3 className="text-2xl font-semibold">{reviews?.length} Reviews</h3>
      <Table className="w-full col-span-1 md:col-span-3">
        <TableCaption>A list of all Reviews</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[130px]">User Name</TableHead>
            <TableHead>User Email</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Comment</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews?.map((item) => (
            <TableRow key={item?._id}>
              <TableCell className="font-bold">{item?.user?.name}</TableCell>
              <TableCell>{item?.user?.email}</TableCell>

              <TableCell>
                <StarRatings
                  rating={item?.rating}
                  starRatedColor="orange"
                  numberOfStars={5}
                  name="rating"
                  starDimension="10px"
                  starSpacing="2px"
                />
              </TableCell>
              <TableCell>{item?.comment}</TableCell>
              <TableCell className="font-bold flex justify-center items-center gap-2">
                <Button
                  variant="outline"
                  className="text-red-500"
                  disabled={isLoading}
                  onClick={() => {
                    handleDeleteReview(item?._id);
                  }}
                >
                  <Trash2Icon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReviewsTable;
