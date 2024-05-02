import Sidebar from "@/components/layout/Sidebar";
import { Outlet } from "react-router-dom";
import { UserRound, LockIcon, ClipboardPlus, BookImage } from "lucide-react";

const MENU_ITEMS = [
  {
    name: "Profile",
    link: "/profile",
    icon: <UserRound />,
  },
  {
    name: "Update Profile",
    link: "/profile/update_profile",
    icon: <ClipboardPlus />,
  },
  {
    name: "Update Password",
    link: "/profile/update_password",
    icon: <LockIcon />,
  },
  {
    name: "Upload Avatar",
    link: "/profile/upload_avatar",
    icon: <BookImage />,
  },
];

const UserProfileLayout = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-center text-3xl font-bold mb-10">User Setting</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Sidebar className="col-span-1" MENU_ITEMS={MENU_ITEMS} />
        <div className="col-span-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserProfileLayout;
