import React, { useState } from "react";
import { FaList, FaTh } from "react-icons/fa";

function ShowSearchResult({donors}) {
  const [view, setView] = useState("card");

  return (
    <section className="py-12 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">Donors</h2>
          <div className="flex items-center gap-3">
            <button onClick={() => setView("card")}>
              <FaTh className={`${view === "card" ? "text-green-600" : ""}`} />
            </button>
            <button onClick={() => setView("table")}>
              <FaList
                className={`${view === "table" ? "text-green-600" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Card View */}
        {view === "card" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {donors.map((donor) => (
              <div
                key={donor._id || donor.name}
                className="bg-green-50 dark:bg-gray-800 p-5 rounded-lg shadow hover:shadow-2xl transform hover:scale-105 transition duration-300"
              >
                <img
                  src={donor.avatar}
                  alt={donor.name}
                  className={`w-24 h-24 object-cover rounded-full mx-auto border-4 ${
                    donor.status === "active"
                      ? "border-green-500"
                      : "border-red-400"
                  } `}
                />
                <h3 className="text-xl font-semibold text-center mt-4">
                  {donor.name}
                </h3>
                <p className="text-sm text-center">Email: {donor.email}</p>
                {/* <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                    {donor.gender} ({donor.age})
                  </p> */}
                <p className="text-sm text-center">
                  Blood Group:{" "}
                  <span className="font-bold text-red-600">
                    {donor.bloodGroup}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Table View */}
        {view === "table" && (
          <div className="overflow-x-auto mt-6">
            <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800 text-left">
                  <th className="p-3 border border-gray-300 dark:border-gray-700">
                    Avatar
                  </th>
                  <th className="p-3 border border-gray-300 dark:border-gray-700">
                    Name
                  </th>
                  <th className="p-3 border border-gray-300 dark:border-gray-700">
                    Email
                  </th>
                  <th className="p-3 border border-gray-300 dark:border-gray-700">
                    Gender (Age)
                  </th>
                  <th className="p-3 border border-gray-300 dark:border-gray-700">
                    Blood Group
                  </th>
                </tr>
              </thead>
              <tbody>
                {donors.map((g) => (
                  <tr
                    key={g._id || g.name}
                    className="hover:bg-green-50 dark:hover:bg-gray-800"
                  >
                    <td className="p-3 border border-gray-300 dark:border-gray-700">
                      <img
                        src={g.avatar}
                        alt={g.name}
                        className="w-10 h-10 object-cover rounded-full"
                      />
                    </td>
                    <td className="p-3 border border-gray-300 dark:border-gray-700">
                      {g.name}
                    </td>
                    <td className="p-3 border border-gray-300 dark:border-gray-700">
                      {g.email}
                    </td>
                    <td className="p-3 border border-gray-300 dark:border-gray-700">
                      {g.gender} ({g.age})
                    </td>
                    <td className="p-3 border border-gray-300 dark:border-gray-700">
                      {g.bloodGroup}
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

export default ShowSearchResult;
