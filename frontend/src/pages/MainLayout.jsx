import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto min-h-[600px] px-10 my-10">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
