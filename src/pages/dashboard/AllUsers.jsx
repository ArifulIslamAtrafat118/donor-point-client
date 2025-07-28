import React, { useEffect, useState } from "react";
import useUserData from "../../api/useUserData";
import { Link } from "react-router";

function AllUsers() {
  const [allUser, setAllUser] = useState([]);
  const { getAllUserData, loading } = useUserData();
  const [filter, setFilter] = useState("All");

  const filteredUser =
    filter === "All"
      ? allUser
      : allUser.filter((user) => user.stauts === filter);
  useEffect(() => {
    const run = async () => {
      setAllUser(await getAllUserData());
    };
    run();
  }, []);
  //   console.log(allUser);
  return (
    <section className="py-12 bg-green-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {["All", "Active", "Blocked"].map((level) => (
            <button
              key={level}
              className={`px-4 py-1.5 rounded-full border ${
                filter === level
                  ? "bg-green-500 text-white"
                  : "border-gray-300 text-gray-700 dark:text-gray-200"
              } hover:bg-green-600 hover:text-white transition`}
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
            <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <thead>
                <tr className="bg-green-100 dark:bg-gray-700">
                  <th className="text-left px-4 py-2">Image</th>
                  <th className="text-left px-4 py-2">Name</th>
                  <th className="text-left px-4 py-2">Email</th>
                  <th className="text-left px-4 py-2">Role</th>
                  <th className="text-left px-4 py-2">Status</th>
                  <th className="text-left px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUser.map((user) => (
                  <tr key={user._id} className="border-t dark:border-gray-700">
                    <td className="px-4 py-2">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.role}</td>
                    <td className="px-4 py-2">{user.status}</td>
                    <td className="px-4 py-2">
                      <span className="text-green-600 hover:text-green-800 font-extrabold text-xl">
                        ...
                      </span>
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
