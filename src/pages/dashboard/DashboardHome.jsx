import React from "react";
import { useAuth } from "../../context/AuthContext";
import WelcomeBanner from "./WelcomeBanner";
import useRoleBasedLinks from "../../hooks/useRoleBasedLinks";
import AdminStatsCards from "./AdminStatsCards";
import useUserData from "../../api/useUserData";
import WelcomeSectionSkeleton from "./WelcomeBannerSkeleton";

function DashboardHome() {
  const { currentUser } = useAuth();
  const { userData, loading } = useUserData();
  const role = userData?.role;

  return (
    <section className=" bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Welcome Message Banner */}
      {loading ? (
        <WelcomeSectionSkeleton />
      ) : (
        <WelcomeBanner role={role} displayName={userData.name} />
      )}
      {/* Stats  */}
      {role === "admin" && <AdminStatsCards />}
    </section>
  );
}

export default DashboardHome;
