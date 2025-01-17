import React from "react";
import { useRBAC } from "@/context/v2";
import { Navigate, useLocation } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredPermissions?: string[];
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, requiredPermissions = [] }) => {
  const { user, permissions } = useRBAC();
  const location = useLocation();

  if (!user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  const hasRequiredPermissions = requiredPermissions.every((permission) =>
    permissions.some((p) => p.name === permission),
  );

  if (requiredPermissions.length > 0 && !hasRequiredPermissions) {
    return <Navigate to='/unauthorized' replace />;
  }

  return <>{children}</>;
};
