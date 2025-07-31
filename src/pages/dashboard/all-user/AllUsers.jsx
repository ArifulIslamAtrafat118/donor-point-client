import React, { useEffect, useRef, useState } from "react";
import './allUser.css'
import useUserData from "../../../api/useUserData";
import { MdBlock } from "react-icons/md";
import {
  FiMoreVertical,
  FiX,
  FiCheck,
  FiUserPlus,
  FiUserMinus,
  FiShield,
  FiTrash2,
} from "react-icons/fi";
import useAdminActions from "../../../api/useAdminActions";
import { successToast } from "../../../utils/toast/successToast";
import { FaCrown } from "react-icons/fa6";

function AllUsers() {
  const [allUser, setAllUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getAllUserData, loading: dataLoading } = useUserData();
  const [filter, setFilter] = useState("All");
  const [menuOpenFor, setMenuOpenFor] = useState(null);
  const menuRefs = useRef({});
  const {
    promoteToVolunteer,
    promoteToAdmin,
    revertToDonor,
    activateUser,
    blockUser,
  } = useAdminActions();
  // console.log(dataLoading);
  const filteredUser =
    filter === "All"
      ? allUser
      : allUser.filter(
          (user) => user.status?.toLowerCase() === filter.toLowerCase()
        );

  useEffect(() => {
    const run = async () => {
      const data = await getAllUserData();
      setAllUser(data);
    };
    run();
  }, [loading]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !Object.values(menuRefs.current).some((ref) =>
          ref?.contains(event.target)
        )
      ) {
        setMenuOpenFor(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenuToggle = (uid) => {
    setMenuOpenFor((prev) => (prev === uid ? null : uid));
  };

  const handleUserActivate = async (uid) => {
    try {
      setLoading(true);
      const res = await activateUser(uid);
      if (res.success) successToast(res.message);
      // console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setMenuOpenFor(null);
    }
  };
  const handleUserBlock = async (uid) => {
    try {
      setLoading(true);
      const res = await blockUser(uid);
      if (res.success) successToast(res.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setMenuOpenFor(null);
    }
  };
  const handleMakeVolunteer = async (uid) => {
    try {
      setLoading(true);
      const res = await promoteToVolunteer(uid);
      if (res.success) successToast(res.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setMenuOpenFor(null);
    }
  };
  const handleRemoveVolunteer = async (uid) => {
    try {
      setLoading(true);
      const res = await revertToDonor(uid);
      if (res.success) successToast(res.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setMenuOpenFor(null);
    }
  };
  const handleMakeAdmin = async (uid) => {
    try {
      setLoading(true);
      const res = await promoteToAdmin(uid);
      if (res.success) successToast(res.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setMenuOpenFor(null);
    }
  };
  const handleDelete = async (uid) => console.log("Delete User:", uid);

  return (
    <section className="py-12 bg-green-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="max-w-7xl mx-auto px-2 lg:px-4">
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {["All", "Active", "Blocked"].map((level) => (
            <button
              key={level}
              className={`px-4 py-1.5 rounded-full border ${
                filter === level
                  ? "btn-filter"
                  : "border-gray-300 text-gray-700 dark:text-gray-200"
              } hover:bg-gradient-to-l from-[#ff37f2] to-[#405aff] hover:text-white transition`}
              onClick={() => setFilter(level)}
            >
              {level}
            </button>
          ))}
        </div>

        {filteredUser.length === 0 ? (
          <p className="text-center text-red-500">No users found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm">
              <thead>
                <tr className="bg-green-100 dark:bg-gray-700">
                  <th className="text-left px-4 py-2">Image</th>
                  <th className="text-left px-4 py-2">Name</th>
                  <th className="text-left px-4 py-2">Email</th>
                  <th className="text-left px-4 py-2">Role</th>
                  <th className="text-left px-4 py-2">Status</th>
                  <th className="text-left px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUser.map((user, index) => (
                  <tr key={user._id} className="border-t dark:border-gray-700">
                    <td className="px-4 py-2">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">{user.name}</td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {user.email}
                    </td>
                    <td className="px-4 py-2 capitalize">{user.role}</td>
                    <td className="px-4 py-2 capitalize">{user.status}</td>
                    <td className="px-4 py-2 relative">
                      {user.email === "arifulislam118@outlook.com" ? (
                        <span className="text-xl lg:text-3xl ml-3">
                         👑
                        </span>
                      ) : (
                        <button
                          onClick={() => handleMenuToggle(user._id)}
                          className="ml-5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                        >
                          <FiMoreVertical size={20} />
                        </button>
                      )}
                      {menuOpenFor === user._id && (
                        <div
                          ref={(el) => (menuRefs.current[user._id] = el)}
                          className={`absolute z-10 right-0 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-xl ${
                            index >= filteredUser.length - 2
                              ? "bottom-full mb-2"
                              : "mt-2"
                          }`}
                        >
                          {user.role !== "admin" &&
                            user.role !== "volunteer" &&
                            user.status === "active" && (
                              <button
                                onClick={() => handleUserBlock(user.uid)}
                                className="w-full flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                              >
                                <MdBlock className="mr-2" /> Block
                              </button>
                            )}
                          {user.status === "blocked" && (
                            <button
                              onClick={() => handleUserActivate(user.uid)}
                              className="w-full flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              <FiCheck className="mr-2" /> Activate
                            </button>
                          )}
                          {user.role === "donor" && (
                            <>
                              <button
                                onClick={() => handleMakeVolunteer(user.uid)}
                                className="w-full flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                              >
                                <FiUserPlus className="mr-2" /> Make Volunteer
                              </button>
                              <button
                                onClick={() => handleMakeAdmin(user.uid)}
                                className="w-full flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                              >
                                <FiShield className="mr-2" /> Make Admin
                              </button>
                            </>
                          )}
                          {user.role === "volunteer" && (
                            <>
                              <button
                                onClick={() => handleRemoveVolunteer(user.uid)}
                                className="w-full flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                              >
                                <FiUserMinus className="mr-2" /> Revert to Donor
                              </button>
                              <button
                                onClick={() => handleMakeAdmin(user.uid)}
                                className="w-full flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                              >
                                <FiShield className="mr-2" /> Make Admin
                              </button>
                            </>
                          )}
                          {user.role === "admin" &&
                            user.email !== "arifulislam118@outlook.com" && (
                              <>
                                <button
                                  onClick={() =>
                                    handleRemoveVolunteer(user.uid)
                                  }
                                  className="w-full flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                  <FiUserMinus className="mr-2" /> Revert to
                                  Donor
                                </button>
                              </>
                            )}
                          {/* <button
                            onClick={() => handleDelete(user.uid)}
                            className="w-full flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600"
                          >
                            <FiTrash2 className="mr-2" /> Delete
                          </button> */}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default AllUsers;
