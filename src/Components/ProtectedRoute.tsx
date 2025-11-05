import AdminContext from "@/context/AdminContext";
import { ReactNode } from "react";
import { Navigate } from "react-router";
import { useContext, useEffect } from "react";

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { getCurrentUser, currentUser, isLoading } = useContext(AdminContext);
  useEffect(() => {
    if (!currentUser && isLoading) {
      getCurrentUser();
    }
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return currentUser ? (
    <>{children}</>
  ) : (
    <Navigate to={"/admin/login"} replace />
  );
};

export default ProtectedRoute;
