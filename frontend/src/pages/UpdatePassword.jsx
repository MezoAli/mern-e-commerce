import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdatePasswordMutation } from "@/store/api/userApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [update, { isLoading, isError, error, isSuccess, data }] =
    useUpdatePasswordMutation();

  const handleUpdateUserPassword = async (e) => {
    e.preventDefault();
    update({ oldPassword, newPassword });
  };

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success(data?.message);
    }
  }, [isSuccess, isError]);
  return (
    <>
      <h2 className="text-center text-2xl mb-8 font-bold">Update Password</h2>
      <div>
        <form
          className="flex flex-col gap-6 max-w-lg mx-auto"
          onSubmit={handleUpdateUserPassword}
        >
          <div>
            <Label htmlFor="old_password">Old Password</Label>
            <Input
              type="text"
              className="text-lg py-4"
              id="old_password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="new_password">New Password</Label>
            <Input
              type="text"
              id="new_password"
              className="text-lg py-4"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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

export default UpdatePassword;
