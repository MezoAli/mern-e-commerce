import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "@/store/api/authApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [register, { isError, isSuccess, error, data, isLoading }] =
    useRegisterUserMutation();
  const { isAuthenticated } = useSelector((state) => state.userSlice);
  console.log(data);
  const submitHnadler = async (e) => {
    e.preventDefault();
    register({ email, password, name });
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
      navigate("/");
    }
  }, [isError, isSuccess, isAuthenticated]);
  return (
    <form
      className="flex flex-col gap-10 shadow-lg p-5"
      onSubmit={submitHnadler}
    >
      <h2 className="text-3xl font-bold">Register</h2>
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          type="name"
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
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          placeholder="***********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <Button
        className="w-[50%] mx-auto"
        variant="auth"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Creating..." : "Register"}
      </Button>
    </form>
  );
};

export default RegisterForm;
