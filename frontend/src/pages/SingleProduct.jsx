import { useParams } from "react-router-dom";
import { useGetSingleProductDetailsQuery } from "../store/api/productsApi";
import SingleProductDetails from "@/components/product/SingleProduct";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Metadata from "@/components/layout/Metadata";
import ReviewsGrid from "@/components/product/ReviewsGrid";
import ReviewForm from "@/components/product/ReviewForm";
import { useGetAllOrdersForUserQuery } from "@/store/api/orderApi";

const SingleProduct = () => {
  const { id } = useParams();
  const { data, isError, isLoading, error } =
    useGetSingleProductDetailsQuery(id);

  const { data: ordersData } = useGetAllOrdersForUserQuery();
  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError]);

  if (isLoading) {
    return <p className="text-center text-3xl">Loading...</p>;
  }

  const userOrdersItems = ordersData?.orders?.flatMap((order) => {
    return order.orderItems;
  });
  const findProductInUserOrders = userOrdersItems.find(
    (item) => item?.product === data?.product?._id
  );

  return (
    <>
      <Metadata
        title={data?.product?.name}
        description={data?.product?.description}
      />
      <SingleProductDetails product={data?.product} />
      {findProductInUserOrders ? (
        <ReviewForm productId={data?.product?._id} />
      ) : (
        <p className="text-center text-xl capitalize my-4 text-red-500">
          you have to purchase the product to add review to it
        </p>
      )}
      {data?.product?.reviews.length > 0 ? (
        <ReviewsGrid reviews={data?.product?.reviews} />
      ) : (
        <p className="text-center my-4 text-2xl text-red-500 capitalize">
          there is no reviews for that product{" "}
        </p>
      )}
    </>
  );
};

export default SingleProduct;
