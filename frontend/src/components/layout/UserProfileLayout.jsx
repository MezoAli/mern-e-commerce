import Sidebar from "@/components/layout/Sidebar";
import { Outlet } from "react-router-dom";

const UserProfileLayout = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-center text-3xl font-bold mb-10">User Setting</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Sidebar className="col-span-1" />
        <div className="col-span-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserProfileLayout;
