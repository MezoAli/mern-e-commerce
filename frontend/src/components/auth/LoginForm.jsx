import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "@/store/api/authApi";
import toast from "react-hot-toast";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [login, { isError, isSuccess, error, data, isLoading }] =
    useLoginUserMutation();
  console.log(data);
  const submitHnadler = async (e) => {
    e.preventDefault();
    login({ email, password });
  };

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Login Successfully");
      navigate("/");
    }
  }, [isError, isSuccess]);
  return (
    <form
      className="flex flex-col gap-10 shadow-lg p-5"
      onSubmit={submitHnadler}
    >
      <h2 className="text-3xl font-bold">Login</h2>
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
      <div className="flex flex-col gap-4">
        <Button variant="link" className="text-slate-500  block ml-auto">
          <Link to="/forget">Forget Password ?</Link>
        </Button>
        <Button
          className="w-[50%] mx-auto"
          variant="auth"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Authenticating..." : "Login"}
        </Button>
        <Button variant="link" className="text-slate-500 block ml-auto">
          <Link to="/register">New User ?</Link>
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
