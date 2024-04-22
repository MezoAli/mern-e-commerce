import { ArrowBigDown, LogOut, Settings, BookAIcon, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

export function DropdownMenuDemo({ user }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          {user?.name} <ArrowBigDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>
          <Link
            to="/dashboard"
            className="flex gap-1 text-lg justify-center items-center"
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            to="/orders"
            className="flex gap-1 text-lg justify-center items-center"
          >
            <BookAIcon className="mr-2 h-4 w-4" />
            <span>Orders</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`bg-orange-500 hover:bg-orange-500 flex justify-start`}
        >
          <Link
            to="/profile"
            className={`flex gap-1 text-lg justify-center items-center w-full ml-0`}
          >
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
