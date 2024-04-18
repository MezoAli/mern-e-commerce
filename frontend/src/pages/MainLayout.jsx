import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="max-w-7xl min-h-[650px]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
