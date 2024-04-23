import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedLayout = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.userSlice);
  if (loading) {
    return (
      <p className="text-center text-3xl my-10 font-semibold">Loading...</p>
    );
  }
  if (isAuthenticated) {
    return children;
  }

  return <Navigate to="/login" replace />;
};

export default ProtectedLayout;
