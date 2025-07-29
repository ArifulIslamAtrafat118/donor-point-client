import React from "react";
import { Navigate, useLocation } from "react-router";
import LoadingSpinner from "../../utils/LoadingSpinner";
import useUserData from "../../api/useUserData";

function AdminRoute({ children }) {
  const location = useLocation();
  const { userData, loading } = useUserData();

  if (loading) return <LoadingSpinner />;

  if (!userData || userData?.role !== "admin") {
    return <Navigate to="/unauthorized" state={location} />;
  }

  return children;
}

export default AdminRoute;