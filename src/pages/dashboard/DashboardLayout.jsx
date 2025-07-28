import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import { HiMenuAlt3, HiX, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";
import useTheme from "../../hooks/useTheme";
import useRoleBasedLinks from "../../hooks/useRoleBasedLinks";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { currentUser } = useAuth();
  const { darkMode } = useTheme();
  const { userRole, roleLinks } = useRoleBasedLinks();


  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`flex flex-col justify-between bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
          collapsed ? "w-14 md:w-20" : "w-64"
        }`}
      >
        {/* Top Section */}
        <div>
          {/* Logo and toggle */}
          <div className="flex items-center justify-between p-4">
            {collapsed ? (
              <Link to="/" className="text-xl font-bold text-red-600">
                🩸
              </Link>
            ) : (
              <Link
                to="/"
                className="text-xl lg:text-3xl font-bold text-red-600"
              >
                DonorPoint
              </Link>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden text-black dark:text-white md:block p-1 focus:outline-none"
            >
              {collapsed ? (
                <HiChevronRight size={24} />
              ) : (
                <HiChevronLeft size={24} />
              )}
            </button>
          </div>

          {/* Nav Links */}
          <nav className="mt-6">
            {roleLinks[userRole].map(({ name, to, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                    isActive ? "bg-gray-200 dark:bg-gray-700" : ""
                  }`
                }
              >
                <Icon className="text-red-500" size={20} />
                {!collapsed && (
                  <span className="ml-3 text-gray-800 dark:text-gray-200">
                    {name}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom Profile */}
        <Link to="/dashboard/profile">
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            {collapsed ? (
              <img
                src={currentUser.photoURL}
                alt="user"
                className="w-10 h-10 rounded-full border-2 border-green-400 mx-auto"
              />
            ) : (
              <div className="flex items-center gap-3">
                <img
                  src={currentUser.photoURL}
                  alt="user"
                  className="w-10 h-10 rounded-full border-2 border-green-400"
                />
                <div className="overflow-hidden">
                  <p className="font-semibold text-sm truncate text-gray-500 dark:text-gray-300 ">
                    {currentUser.displayName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-300 truncate">
                    {userRole}
                  </p>
                </div>
              </div>
            )}
          </div>
        </Link>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Hello {currentUser.displayName} 👋🏼
          </h1>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
