import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useResetPasswordMutation } from "@/store/api/userApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { resetToken } = useParams();
  const [confirmPassword, setConfirmPassword] = useState("");
  const { isAuthenticated } = useSelector((state) => state.userSlice);
  const navigate = useNavigate();
  const [update, { isError, isSuccess, error, isLoading, data }] =
    useResetPasswordMutation();

  const submitHnadler = async (e) => {
    e.preventDefault();
    const userData = {
      password,
      confirmPassword,
    };
    update({
      token: resetToken,
      body: userData,
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success(data?.message);
      navigate("/login");
    }
  }, [isError, isSuccess, isAuthenticated]);
  return (
    <form
      className="flex flex-col gap-10 shadow-lg p-5 max-w-xl mx-auto"
      onSubmit={submitHnadler}
    >
      <h2 className="text-3xl font-bold">Reset Password</h2>
      <div>
        <Label htmlFor="new_password">New Password</Label>
        <Input
          type="text"
          id="new_password"
          placeholder="please enter your new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="confirm_password">Confirm Password</Label>
        <Input
          type="text"
          id="confirm_password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <Button
        className="w-[50%] mx-auto"
        variant="auth"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Saving..." : "Save"}
      </Button>
    </form>
  );
};

export default ResetPassword;
