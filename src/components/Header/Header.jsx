import { Link, NavLink, useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { BsSun, BsMoon } from "react-icons/bs";
import { motion, AnimatePresence, convertOffsetToTimes } from "framer-motion";
import { Tooltip } from "react-tooltip";
import Swal from "sweetalert2";
import useSwalTheme from "../../hooks/useSwalTheme";
import useTheme from "../../hooks/useTheme";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { currentUser, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { toggleTheme, darkMode } = useTheme();
  const { SwalTheme } = useSwalTheme();
  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    const isDarkMode = document.documentElement.classList.contains("dark");

    Swal.fire({
      icon: "success",
      title: "Logged out!",
      text: "",
      timer: 1000,
      timerProgressBar: true,
      ...SwalTheme,
    });

    navigate("/");
  };

  const navItems = [
    { name: "donation requests", path: "/donation-requests" },
    { name: "funding", path: "/funding", private: true },
    { name: "dashboard", path: "/dashboard", private: true },
  ];

  return (
    <header className="bg-gradient-to-br from-[#2196F3]  to-[#0D9488]  dark:from-white/10 dark:to-[#155e75] shadow-md sticky top-0 z-50 pt-2">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          to="/"
          className="text-xl xl:text-3xl font-bold text-[#E53935]"
        >
          <span>DonorPoint</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-black dark:text-white">
          {navItems.map(
            ({ name, path, private: isPrivate }) =>
              (!isPrivate ||  currentUser)&&(name!=="dashboard") && (
                <NavLink
                  to={path}
                  key={path}
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link pb-2 border-b-1 border-green-600"
                      : "nav-link pb-2"
                  }
                >
                  {name}
                </NavLink>
              )
          )}
          {/* <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "nav-link pb-2 border-b-1 border-green-600"
                : "nav-link pb-2"
            }
          >
            Home
          </NavLink>
          */}
          <button onClick={toggleTheme} className="ml-2 cursor-pointer">
            {darkMode ? <BsSun size={18} /> : <BsMoon size={18} />}
          </button>
          {!currentUser ? (
            <NavLink
              to="/sign-in"
              className="ml-4 bg-[#0e4a5a] hover:bg-[#0e4a5ab5] text-white px-4 py-2 rounded"
            >
              SignIn / SignUp
            </NavLink>
          ) : (
            <div className="relative ml-4" ref={dropdownRef}>
              <a
                data-tooltip-id="userImage"
                data-tooltip-content={currentUser.displayName}
                data-tooltip-variant="success"
                className=""
              >
                <img
                  src={currentUser.photoURL}
                  alt="User"
                  className="w-9 h-9 rounded-full border-2 border-green-500 cursor-pointer"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                />
              </a>
              <Tooltip id="userImage" place="bottom-end" />

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10 overflow-hidden">
                  <div className="flex items-center gap-3 p-4 border-b border-gray-100 dark:border-gray-700">
                    <img
                      src={currentUser.photoURL}
                      alt="user"
                      className="w-10 h-10 rounded-full border-2 border-green-400"
                    />
                    <div className="overflow-hidden">
                      <p className="font-semibold text-sm truncate">
                        {currentUser.displayName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-300 truncate">
                        {currentUser.email}
                      </p>
                    </div>
                  </div>

                  <ul className="text-sm py-2 px-4 text-gray-700 dark:text-gray-200 space-y-2">
                    <li>
                      <NavLink
                        to="/dashboard"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-2 py-1 hover:bg-green-100 dark:hover:bg-green-900 rounded"
                      >
                        Dashboard
                      </NavLink>
                    </li>
                  </ul>

                  <div className="border-t border-gray-100 dark:border-gray-700 p-3">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-sm text-red-600 hover:text-red-800 cursor-pointer"
                    >
                      <FiLogOut /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700 dark:text-white"
        >
          {menuOpen ? (
            <HiOutlineX size={26} className="dark:text-white" />
          ) : (
            <HiOutlineMenuAlt3 size={26} className="dark:text-white" />
          )}
        </button>
      </div>

      {/* Mobile Slide Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-gray-900 dark:bg-black text-white w-3/4 sm:w-1/2 md:hidden shadow-lg p-6"
          >
            {currentUser ? (
              <div className="flex items-center mb-6">
                <img
                  src={currentUser.photoURL}
                  alt="user"
                  className="w-10 h-10 rounded-full mr-3 border-2 border-green-400"
                />
                <div>
                  <p className="font-semibold">{currentUser.displayName}</p>
                  <p className="text-xs text-gray-300">{currentUser.email}</p>
                </div>
              </div>
            ) : (
              <div className="mb-8"></div>
            )}

            <ul className="space-y-4 flex flex-col ">
              {navItems.map(
                ({ name, path, private: isPrivate }) =>
                  (!isPrivate || currentUser) && (
                    <li key={path} className="">
                      <NavLink
                        to={path}
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center gap-3 hover:text-green-400 transition bg-black dark:bg-gray-800"
                            : "flex items-center gap-3 hover:text-green-400 transition"
                        }
                        onClick={() => setMenuOpen(false)}
                      >
                        {name}
                      </NavLink>
                    </li>
                  )
              )}
            </ul>

            <div className="mt-6">
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 text-sm hover:text-green-400"
              >
                {darkMode ? <BsSun /> : <BsMoon />}
                {darkMode ? "Light" : "Dark"}
              </button>
            </div>

            <div className="mt-6">
              {currentUser ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm text-red-400 hover:text-red-600"
                >
                  <FiLogOut /> Logout
                </button>
              ) : (
                <NavLink
                  to="/sign-in"
                  className=" bg-[#0e4a5a] hover:bg-green-600 text-white px-4 py-1.5 rounded"
                >
                  SignIn / SignUp
                </NavLink>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
