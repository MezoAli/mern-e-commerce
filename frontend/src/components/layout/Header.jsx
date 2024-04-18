import React from "react";
import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenuDemo } from "./DropdownMenu";
const Header = () => {
  return (
    <div className="bg-black py-6 mb-4 text-white flex justify-between px-3">
      <Link to="/" className="text-2xl font-bold">
        Mezo-Shopping
      </Link>
      <div className="flex w-full max-w-lg items-center flex-grow">
        <Input
          type="email"
          placeholder="Search Product ..."
          className=" text-black"
        />
        <Button>
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
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <DropdownMenuDemo />
        </div>
        <Button variant="auth">Login</Button>
      </div>
    </div>
  );
};

export default Header;
