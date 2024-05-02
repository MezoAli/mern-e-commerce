import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminProtectedLayout = ({ children }) => {
  const { loading, user } = useSelector((state) => state.userSlice);
  if (loading) {
    return (
      <p className="text-center text-3xl my-10 font-semibold">Loading...</p>
    );
  }
  if (user?.role === "admin") {
    return children;
  }

  return <Navigate to="/" replace />;
};

export default AdminProtectedLayout;
