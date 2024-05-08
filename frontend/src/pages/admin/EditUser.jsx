import EditUserForm from "@/components/admin/EditUserForm";
import { useGetUserDetailsForAdminQuery } from "@/store/api/userApi";
import { useParams } from "react-router-dom";

const EditUser = () => {
  const { userId } = useParams();
  const { data, isLoading, error } = useGetUserDetailsForAdminQuery(userId);

  if (isLoading) {
    return <p className="text-center text-2xl font-bold my-8">Loading...</p>;
  }

  if (!data?.user) {
    return (
      <p className="text-center text-red-500 font-bold text-3xl">
        {error?.data?.message}
      </p>
    );
  }

  return (
    <div className="w-full flex flex-col gap-8 max-w-lg mx-auto">
      <h3 className="text-2xl font-semibold text-center">Update User</h3>
      <EditUserForm user={data?.user} />
    </div>
  );
};

export default EditUser;
