import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenuDemo } from "./DropdownMenu";
import { getAllSearchParams } from "@/lib/getAllSearchParams";
const Header = () => {
  const [keyword, setKeyword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const allSearchParams = getAllSearchParams(searchParams);
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
        <div className="flex gap-1 justify-center items-center">
          <Avatar>
            <AvatarImage src="../images/default_avatar.jpg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <DropdownMenuDemo />
        </div>
        <Button variant="auth">Login</Button>
      </div>
    </header>
  );
};

export default Header;
