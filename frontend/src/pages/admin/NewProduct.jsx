import NewProductForm from "@/components/admin/NewProductForm";

const NewProduct = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <h3 className="text-2xl font-semibold">Create New Product</h3>
      <NewProductForm />
    </div>
  );
};

export default NewProduct;
