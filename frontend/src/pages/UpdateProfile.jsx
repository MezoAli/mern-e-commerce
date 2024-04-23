import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateUserProfileMutation } from "@/store/api/userApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const UpdateProfile = () => {
  const { user } = useSelector((state) => state.userSlice);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const [update, { isLoading, isError, error, isSuccess }] =
    useUpdateUserProfileMutation();

  const handleUpdateUserProfile = async (e) => {
    e.preventDefault();
    update({ name, email });
  };

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("User Profile Updated Successfully");
    }
  }, [isSuccess, isError]);
  return (
    <>
      <h2 className="text-center text-2xl mb-8 font-bold">Update Profile</h2>
      <div>
        <form
          className="flex flex-col gap-6 max-w-lg mx-auto"
          onSubmit={handleUpdateUserProfile}
        >
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              className="text-lg py-4"
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              className="text-lg py-4"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button type="submit" variant="auth" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update"}
          </Button>
        </form>
      </div>
    </>
  );
};

export default UpdateProfile;
