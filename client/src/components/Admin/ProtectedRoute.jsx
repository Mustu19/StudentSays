import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/Auth";

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return user && user.isAdmin ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
