import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedLayout = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.userSlice);
  if (isAuthenticated) {
    return children;
  }

  return <Navigate to="/login" replace />;
};

export default ProtectedLayout;
