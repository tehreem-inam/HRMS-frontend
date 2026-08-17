import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RoleProtectedRoute = ({
  allowedRoles,
  children,
}) => {
  const {
    user,
    isAuthenticated,
    isInitialized,
  } = useSelector((state) => state.auth);

  // Wait until auth initialization completes
  if (!isInitialized) {
    return null;
  }

  // Not logged in
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  const role = user?.role?.name;

  // Logged in but unauthorized
  if (!allowedRoles.includes(role)) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return children;
};

export default RoleProtectedRoute;