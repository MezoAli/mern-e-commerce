import Sidebar from "@/components/layout/Sidebar";
import { Outlet } from "react-router-dom";
import {
  UserRound,
  PlusIcon,
  PackageIcon,
  ReceiptTextIcon,
  LayoutDashboardIcon,
  StarIcon,
} from "lucide-react";
const MENU_ITEMS = [
  {
    name: "Dashboard",
    link: "/admin/dashboard",
    icon: <LayoutDashboardIcon />,
  },
  {
    name: "New Product",
    link: "/admin/dashboard/product/new",
    icon: <PlusIcon />,
  },
  {
    name: "Products",
    link: "/admin/dashboard/products",
    icon: <PackageIcon />,
  },
  {
    name: "Orders",
    link: "/admin/dashboard/orders",
    icon: <ReceiptTextIcon />,
  },
  {
    name: "Users",
    link: "/admin/dashboard/users",
    icon: <UserRound />,
  },
  {
    name: "Reviews",
    link: "/admin/dashboard/reviews",
    icon: <StarIcon />,
  },
];

const AdminLayout = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-center text-3xl font-bold mb-10">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Sidebar className="col-span-1" MENU_ITEMS={MENU_ITEMS} />
        <div className="col-span-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
