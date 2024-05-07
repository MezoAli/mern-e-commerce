import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./pages/MainLayout";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import PaymentMethod from "./pages/PaymentMethod";
import SingleProduct from "./pages/SingleProduct";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UpdateProfile from "./pages/UpdateProfile";
import UpdatePassword from "./pages/UpdatePassword";
import UploadAvatar from "./pages/UploadAvatar";
import UserProfileLayout from "./components/layout/UserProfileLayout";
import ProtectedLayout from "./components/auth/ProtectedLayout";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import Cart from "./pages/Cart";
import ShippingInfo from "./pages/ShippingInfo";
import ConfirmOrder from "./pages/ConfirmOrder";
import SingleOrder from "./pages/SingleOrder";
import Invoice from "./pages/Invoice";
import Dashboard from "./pages/admin/Dashboard";
import AdminProtectedLayout from "./components/auth/AdminProtectedLayout";
import AdminLayout from "./components/layout/AdminLayout";
import NewProduct from "./pages/admin/NewProduct";
import Products from "./pages/admin/Products";
import AdminOrders from "./pages/admin/Orders";
import Reviews from "./pages/admin/Reviews";
import Users from "./pages/admin/Users";
import EditProduct from "./pages/admin/EditProduct";
import UploadProductImages from "./pages/admin/UploadProductImages";
import EditOrder from "./pages/admin/EditOrder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/profile",
        element: (
          <ProtectedLayout>
            <UserProfileLayout />
          </ProtectedLayout>
        ),
        children: [
          { path: "/profile", element: <Profile /> },
          {
            path: "/profile/update_profile",
            element: <UpdateProfile />,
          },
          { path: "/profile/update_password", element: <UpdatePassword /> },
          { path: "/profile/upload_avatar", element: <UploadAvatar /> },
        ],
      },
      {
        path: "/admin/dashboard",
        element: (
          <AdminProtectedLayout>
            <AdminLayout />
          </AdminProtectedLayout>
        ),
        children: [
          { path: "/admin/dashboard", element: <Dashboard /> },
          {
            path: "/admin/dashboard/product/new",
            element: <NewProduct />,
          },
          { path: "/admin/dashboard/products", element: <Products /> },
          {
            path: "/admin/dashboard/products/:productId",
            element: <EditProduct />,
          },
          {
            path: "/admin/dashboard/products/:productId/upload_images",
            element: <UploadProductImages />,
          },
          { path: "/admin/dashboard/orders", element: <AdminOrders /> },
          { path: "/admin/dashboard/orders/:orderId", element: <EditOrder /> },
          { path: "/admin/dashboard/reviews", element: <Reviews /> },
          { path: "/admin/dashboard/users", element: <Users /> },
        ],
      },
      ,
      {
        path: "/orders",
        element: (
          <ProtectedLayout>
            <Orders />
          </ProtectedLayout>
        ),
      },
      {
        path: "/orders/:orderId",
        element: (
          <ProtectedLayout>
            <SingleOrder />
          </ProtectedLayout>
        ),
      },
      {
        path: "/orders/invoice/:orderId",
        element: (
          <ProtectedLayout>
            <Invoice />
          </ProtectedLayout>
        ),
      },
      {
        path: "/payment_method",
        element: (
          <ProtectedLayout>
            <PaymentMethod />
          </ProtectedLayout>
        ),
      },
      { path: "/cart", element: <Cart /> },
      { path: "/shipping", element: <ShippingInfo /> },
      { path: "/confirm_order", element: <ConfirmOrder /> },
      { path: "/products/:id", element: <SingleProduct /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/password/forget", element: <ForgetPassword /> },
      { path: "/password/reset/:resetToken", element: <ResetPassword /> },
    ],
  },
]);

function App() {
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
