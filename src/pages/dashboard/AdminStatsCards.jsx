import React from "react";
import { FaUsers, FaHandHoldingHeart, FaTint } from "react-icons/fa";
import useAdminStats from "../../api/useAdminStats";

function AdminStatsCards() {
  const { stats } = useAdminStats();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Total Donors */}
      <div className="flex items-center gap-4 bg-gradient-to-br from-[#ffe2e6] to-[#ff1744]/40 dark:from-[#4b1c1c] dark:to-[#991b1b] p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
        <div className="p-4 bg-white/40 dark:bg-black/20 text-red-700 dark:text-red-200 rounded-full">
          <FaUsers size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {stats.totalDonors}
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Total Donors
          </p>
        </div>
      </div>

      {/* Total Funding */}
      <div className="flex items-center gap-4 bg-gradient-to-br from-[#ddfbe9] to-[#3bb78f]/40 dark:from-[#133825] dark:to-[#115e59] p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
        <div className="p-4 bg-white/40 dark:bg-black/20 text-emerald-700 dark:text-green-200 rounded-full">
          <FaHandHoldingHeart size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            ৳{stats.totalFunding}
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Total Funds Raised
          </p>
        </div>
      </div>

      {/* Total Donation Requests */}
      <div className="flex items-center gap-4 bg-gradient-to-br from-[#e1f0ff] to-[#3b82f6]/40 dark:from-[#172554] dark:to-[#1e40af] p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
        <div className="p-4 bg-white/40 dark:bg-black/20 text-blue-700 dark:text-blue-200 rounded-full">
          <FaTint size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {stats.totalRequests}
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Blood Requests
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminStatsCards;
