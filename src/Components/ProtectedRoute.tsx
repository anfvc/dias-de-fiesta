import { ReactNode } from "react";
import { Navigate } from "react-router";

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");

  return token ? <>{children}</> : <Navigate to={"/admin/login"} replace />;
};

export default ProtectedRoute;
