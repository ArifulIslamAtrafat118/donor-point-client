import React from "react";
import { Navigate, useLocation } from "react-router";
import useUserData from "../../api/useUserData";
import LoadingSpinner from "../../utils/LoadingSpinner";

function VolunteerRoute({ children }) {
  const location = useLocation();
  const { userData, loading } = useUserData();

  if (loading) return <LoadingSpinner />;

  if (!userData || userData?.role !== "volunteer") {
    return <Navigate to="/unauthorized" state={location} />;
  }

  return children;
}