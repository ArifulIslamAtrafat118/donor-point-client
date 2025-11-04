import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useDonationRequests from "../api/useDonationRequestsData";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import { FiX } from "react-icons/fi";
import useLocationNames from "../api/useLocationNames";
import useSwalTheme from "../hooks/useSwalTheme";

function DonationRequestDetails() {
  const { getDonationRequestById, confirmDonation } = useDonationRequests();
  const { fetchLocationNames } = useLocationNames();
  const { currentUser } = useAuth();
  const [location, setLocation] = useState({});
  const [reqData, setReqData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [donateOpen, setDonateOpen] = useState(false);
  const { id } = useParams();
  const { SwalTheme } = useSwalTheme();

  useEffect(() => {
    const fetchRequest = async () => {
      const data = await getDonationRequestById(id);
      setReqData(data);
    };
    fetchRequest();
  }, [id]);
  useEffect(() => {
    const run = async () => {
      const names = await fetchLocationNames(reqData?.location);
      setLocation(names);
      setLoading(false);
    };
    run();
  }, [reqData]);

  const handleConfirm = async () => {
    await confirmDonation(id, {
      donor: {
        name: currentUser.displayName,
        email: currentUser.email,
        uid: currentUser.uid,
      },
      status: "inprogress",
    });

    const updated = await getDonationRequestById(id);
    setReqData(updated);
    setDonateOpen(false);
    Swal.fire({
      icon: "Success",
      title: "Donation confirmed!",
      text: `You will donate ${reqData.category} at ${reqData.hospitalName}`,
      ...SwalTheme,
    });
  };

  if (loading || !reqData) return <p className="p-4">Loading...</p>;

  return (
    <main className="max-w-5xl mx-auto bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-8 lg:pl-16 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-600 dark:text-blue-400">
        Donation Request Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base">
        <p>
          <span className="font-semibold">Recipient Name:</span>{" "}
          {reqData.recipientName}
        </p>
        <p>
          <span className="font-semibold">Blood Group:</span>{" "}
          {reqData.bloodGroup}
        </p>
        <p>
          <span className="font-semibold">Category:</span> {reqData.category}
        </p>
        <p>
          <span className="font-semibold">Hospital Name:</span>{" "}
          {reqData.hospitalName}
        </p>
        <p className="md:col-span-2">
          <span className="font-semibold">Full Address:</span>{" "}
          {reqData.fullAddress}
        </p>
        <p>
          <span className="font-semibold">Date:</span> {reqData.donationDate}
        </p>
        <p>
          <span className="font-semibold">Time:</span> {reqData.donationTime}
        </p>
        <p className="md:col-span-2">
          <span className="font-semibold">Message:</span>{" "}
          {reqData.requestMessage}
        </p>
        <p>
          <span className="font-semibold">Status:</span>{" "}
          <span
            className={`capitalize px-2 py-0.5 rounded-full text-white ${
              reqData.status === "pending"
                ? "bg-yellow-500"
                : reqData.status === "inprogress"
                ? "bg-blue-500"
                : "bg-green-600"
            }`}
          >
            {reqData.status}
          </span>
        </p>
        <p className="">
          <span className="font-semibold">Location:</span> {location?.district},{" "}
          {location?.upazila}
        </p>
      </div>

      {reqData.status === "pending" && (
        <div className="text-center mt-8">
          <button
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-md"
            onClick={() => setDonateOpen(true)}
          >
            Donate Now
          </button>
        </div>
      )}

      {/* Donation Modal */}
      {donateOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative bg-white dark:bg-gray-900 p-6 rounded-xl w-full max-w-lg shadow-lg">
            <button
              onClick={() => setDonateOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              <FiX size={20} />
            </button>
            <h3 className="text-xl font-bold mb-6 text-center text-gray-700 dark:text-gray-200">
              Confirm Your Donation
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleConfirm();
              }}
              className="space-y-4"
            >
              <div>
                <label className="block mb-1 font-medium">Donor Name</label>
                <input
                  type="text"
                  value={currentUser.displayName}
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Donor Email</label>
                <input
                  type="email"
                  value={currentUser.email}
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setDonateOpen(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold"
                >
                  Confirm Donation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default DonationRequestDetails;
