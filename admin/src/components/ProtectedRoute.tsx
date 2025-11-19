import AdminContext from "@/context/AdminContext";
import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { useContext, useEffect } from "react";

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { getCurrentUser, currentUser, isLoading } = useContext(AdminContext);

  useEffect(() => {
    if (isLoading && !currentUser) {
      getCurrentUser();
    }
  }, [getCurrentUser, currentUser]);

  if (currentUser) {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-2xl font-semibold text-indigo-600">Loading...</h1>
      </div>
    );
  }

  return <Navigate to={"/admin/login"} replace />;
};

export default ProtectedRoute;
