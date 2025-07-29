import React from "react";
import { useAuth } from "../../context/AuthContext";
import WelcomeBanner from "./WelcomeBanner";
import useRoleBasedLinks from "../../hooks/useRoleBasedLinks";
import AdminStatsCards from "./AdminStatsCards";

function DashboardHome() {
  const { currentUser } = useAuth();
  const { userRole } = useRoleBasedLinks();

  return (
    <section className=" bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Welcome Message Banner */}
      <WelcomeBanner />
      {/* Stats  */}
      {userRole === "admin" && <AdminStatsCards />}
    </section>
  );
}

export default DashboardHome;
