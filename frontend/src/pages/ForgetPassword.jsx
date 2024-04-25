import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForgetPasswordMutation } from "@/store/api/userApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const { isAuthenticated } = useSelector((state) => state.userSlice);
  const navigate = useNavigate();
  const [update, { isError, isSuccess, error, isLoading }] =
    useForgetPasswordMutation();

  const submitHnadler = async (e) => {
    e.preventDefault();
    const userData = {
      email,
    };
    update(userData);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Check your Email for reset link");
    }
  }, [isError, isSuccess, isAuthenticated]);
  return (
    <form
      className="flex flex-col gap-10 shadow-lg p-5 max-w-xl mx-auto"
      onSubmit={submitHnadler}
    >
      <h2 className="text-3xl font-bold">Forget Password</h2>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          placeholder="please enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <Button
        className="w-[50%] mx-auto"
        variant="auth"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Sending..." : "Send"}
      </Button>
    </form>
  );
};

export default ForgetPassword;
