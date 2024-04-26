import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LogOut, Search } from "lucide-react";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenuDemo } from "./DropdownMenu";
import { getAllSearchParams } from "@/lib/getAllSearchParams";
import { useLazyLogoutUserQuery } from "@/store/api/authApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useGetUserProfileQuery } from "@/store/api/userApi";
const Header = () => {
  const [keyword, setKeyword] = useState("");
  // const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const allSearchParams = getAllSearchParams(searchParams);
  const [logout, { isSuccess, isLoading, data: logoutData }] =
    useLazyLogoutUserQuery();

  const { data } = useGetUserProfileQuery();

  useEffect(() => {
    if (isSuccess) {
      toast.success(logoutData?.msg);
    }
  }, [isSuccess]);
  const { user, isAuthenticated } = useSelector((state) => state.userSlice);
  return (
    <header className="bg-black py-6 mb-4 text-white flex justify-between px-10">
      <Link to="/" className="text-2xl font-bold">
        Mezo-Shopping
      </Link>
      <div className="flex w-full max-w-lg items-center flex-grow">
        <Input
          type="email"
          placeholder="Search Product ..."
          className=" text-slate-500 text-lg placeholder:text-sm"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button
          onClick={() => setSearchParams({ ...allSearchParams, keyword })}
        >
          <Search />
        </Button>
      </div>
      <div className="flex justify-center items-center gap-6">
        <div className="flex items-center gap-1">
          <h3 className="text-xl">Cart</h3>
          <Badge className="text-xl" variant="cart">
            0
          </Badge>
        </div>
        {user && (
          <div className="flex gap-1 justify-center items-center">
            <Avatar>
              <AvatarImage
                src={`${
                  user?.avatar
                    ? user?.avatar?.url
                    : "../images/default_avatar.jpg"
                }`}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <DropdownMenuDemo user={user} />
          </div>
        )}

        {isAuthenticated ? (
          <Button
            variant="destructive"
            onClick={() => {
              logout();
              // navigate(0);
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            {isLoading ? "please Wait" : "Log Out"}
          </Button>
        ) : (
          <Button variant="auth">
            <Link to="/login">Login</Link>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
