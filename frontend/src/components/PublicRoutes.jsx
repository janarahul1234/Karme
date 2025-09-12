import { Outlet, Navigate } from "react-router-dom";

const PublicRoutes = () => {
  const isAuthenticated = localStorage.getItem("token");

  return isAuthenticated ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PublicRoutes;
