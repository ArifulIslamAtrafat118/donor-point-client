import { useAuth } from "../context/AuthContext";
import React from "react";
import { HiChevronRight } from "react-icons/hi";
import { MdSpaceDashboard, MdRequestPage } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import { FaUsers } from "react-icons/fa6";
import { FaDonate, FaHandHoldingHeart } from "react-icons/fa";
import useUserData from "../api/useUserData";

function useRoleBasedLinks() {
  const { currentUser } = useAuth();
  const { userData } = useUserData();
  const userRole = userData?.role || "donor";

  const donorLinks = [
    { name: "Dashboard", to: "/dashboard", icon: MdSpaceDashboard },
    {
      name: "My Requests",
      to: "/dashboard/my-donation-requests",
      icon: MdRequestPage,
    },
    {
      name: "Create Request",
      to: "/dashboard/create-donation-request",
      icon: IoIosCreate,
    },
  ];

  const adminLinks = [
    { name: "Dashboard", to: "/dashboard", icon: MdSpaceDashboard },
    { name: "All Users", to: "/dashboard/all-users", icon: FaUsers },
    {
      name: "All Requests",
      to: "/dashboard/all-blood-donation-request",
      icon: MdRequestPage,
    },
    {
      name: "Content",
      to: "/dashboard/content-management",
      icon: HiChevronRight,
    },
    { name: "Funding", to: "/dashboard/funding", icon: FaHandHoldingHeart },
  ];

  const volunteerLinks = [
    { name: "Dashboard", to: "/dashboard", icon: MdSpaceDashboard },
    {
      name: "All Requests",
      to: "/dashboard/all-blood-donation-request",
      icon: MdRequestPage,
    },
    {
      name: "Content",
      to: "/dashboard/content-management",
      icon: HiChevronRight,
    },
    { name: "Funding", to: "/dashboard/funding", icon: FaHandHoldingHeart },
  ];

  const roleLinks = {
    donor: donorLinks,
    admin: adminLinks,
    volunteer: volunteerLinks,
  };
  return { userRole, roleLinks };
}

export default useRoleBasedLinks;
