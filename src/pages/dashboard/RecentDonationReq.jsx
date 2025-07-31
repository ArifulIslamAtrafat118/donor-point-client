import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import useDonationRequests from "../../api/useDonationRequestsData";
import { useAuth } from "../../context/AuthContext";
import RequestsTableView from "../../utils/RequestsTable/RequestsTableView";

const RecentDonationReq = () => {
  const { currentUser } = useAuth();
  const { getRecentRequestByUser } = useDonationRequests();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser?.uid) return;

    const fetchData = async () => {
      try {
        const res = await getRecentRequestByUser(currentUser?.uid);
        setRequests(res);
      } catch (err) {
        console.error("Failed to fetch donation requests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser?.uid]);

  console.log("req", requests);

  if (loading) {
    return <p className="py-4 lg:py-8 text-center">Loading...</p>;
  }

  if (!requests.length) {
    return null;
  }

  return (
    <section className="">
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <RequestsTableView requests={requests} />
      </div>
      <div className="mt-4 md:mt-6 lg:mt-8 text-center">
        <Link
          to="/dashboard/my-donation-requests"
          className="bg-gradient-to-r from-[#0d0e1f] via-[#1f2235] to-[#343850] 
             hover:from-[#343850] hover:via-[#1f2235] hover:to-[#0d0e1f]
             text-white px-6 py-3 rounded-xl font-semibold 
             shadow-md hover:shadow-xl
             transition-all duration-300 ease-in-out
             text-center max-w-72 block mx-auto"
        >
          view my all request
        </Link>
      </div>
    </section>
  );
};

export default RecentDonationReq;
