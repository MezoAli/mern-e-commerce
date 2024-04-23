import { UserRound, LockIcon, ClipboardPlus, BookImage } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
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
const Sidebar = () => {
  const location = useLocation();

  return (
    <ul className="flex flex-col gap-5 my-10">
      {MENU_ITEMS.map((item) => {
        return (
          <li
            key={item.name}
            className={`w-full flex justify-start items-center gap-4 hover:bg-orange-500 p-2 rounded-lg
            ${location.pathname === item.link ? "bg-orange-500" : ""}
            `}
          >
            {item.icon}
            <Link to={item.link} className="w-full text-lg font-semibold">
              {item.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Sidebar;
