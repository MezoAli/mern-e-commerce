import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CATEGORIES } from "@/constants";
import { useCreateProductMutation } from "@/store/api/productsApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const [createProduct, { isError, error, isSuccess, isLoading }] =
    useCreateProductMutation();
  const navigate = useNavigate();
  const [state, setState] = useState({});

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Product Created Successfully");
      navigate("/admin/dashboard/products");
    }
  }, [isError, isSuccess]);

  const handleChange = (e) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: state?.name,
      description: state?.description,
      price: +state?.price,
      stock: +state?.stock,
      category: state?.category,
      seller: state?.seller,
    };

    createProduct(data);
  };
  return (
    <div className="w-full flex flex-col gap-4">
      <h3 className="text-2xl font-semibold">Create New Product</h3>
      <form
        className="flex flex-col gap-4 shadow-lg p-5"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2">
          <Label>Name</Label>
          <Input
            type="text"
            placeholder="name"
            name="name"
            required
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Description</Label>
          <Textarea
            type="text"
            placeholder="description"
            name="description"
            required
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-center items-center gap-3">
          <div className="flex flex-col gap-2 w-full">
            <Label>Price</Label>
            <Input
              type="text"
              placeholder="Price"
              name="price"
              required
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Label>Stock</Label>
            <Input
              type="text"
              placeholder="Stock"
              name="stock"
              required
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex justify-center items-center gap-3">
          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-900"
            >
              Select Category
            </label>
            <select
              onChange={handleChange}
              name="category"
              required
              id="category"
              className="bg-gray-50 border border-gray-300
               text-gray-900 text-sm rounded-lg focus:ring-blue-500
                focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
                 "
            >
              {CATEGORIES.map((c) => {
                return (
                  <option key={c} value={c}>
                    {c}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Label>Seller Name</Label>
            <Input
              type="text"
              placeholder="Seller"
              name="seller"
              required
              onChange={handleChange}
            />
          </div>
        </div>
        <Button variant="auth" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create"}
        </Button>
      </form>
    </div>
  );
};

export default NewProduct;
