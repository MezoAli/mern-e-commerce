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
      ,
      { path: "/orders", element: <Orders /> },
      { path: "/payment_method", element: <PaymentMethod /> },
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
