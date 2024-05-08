import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useUpdateUserMutation } from "@/store/api/userApi";
import toast from "react-hot-toast";

const EditUserForm = ({ user }) => {
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [role, setRole] = useState(user?.role);

  const [updateUser, { data, isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      name,
      email,
      role,
    };
    updateUser({ body, userId: user?._id });
  };

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success(data?.message);
    }
  }, [isError, isSuccess]);
  return (
    <form
      className="flex flex-col gap-10 shadow-lg p-5"
      onSubmit={handleSubmit}
    >
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col justify-start items-start gap-4">
        <Label htmlFor="role">Role</Label>
        <select
          onChange={(e) => setRole(e.target.value)}
          name="role"
          required
          value={role}
          className="bg-gray-50 p-3 border border-gray-300
         text-gray-900 text-sm rounded-lg"
        >
          {["admin", "user"].map((c) => {
            return (
              <option key={c} value={c}>
                {c}
              </option>
            );
          })}
        </select>
      </div>

      <Button
        className="w-[50%] mx-auto"
        variant="auth"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Updating..." : "Update"}
      </Button>
    </form>
  );
};

export default EditUserForm;
