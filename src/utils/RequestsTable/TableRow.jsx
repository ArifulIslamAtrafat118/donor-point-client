import React, { useEffect, useRef, useState } from "react";
import {
  FiMoreVertical,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiCheck,
  FiX,
} from "react-icons/fi";
import { Link } from "react-router";

function TableRow({ req, locationNames }) {
  const [menuOpenFor, setMenuOpenFor] = useState(null);
  const menuRef = useRef(null);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpenFor(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleMenuToggle = (id) => {
    setMenuOpenFor((prev) => (prev === id ? null : id));
  };

  const handleEdit = (id) => navigate(`/dashboard/edit-request/${id}`);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      // Call delete hook here
    }
  };
 
  return (
    <tr key={req._id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
      <td className="px-4 py-3">{req.recipientName}</td>
      <td className="px-4 py-3">
        {locationNames?.district}, {locationNames?.upazila}
      </td>
      <td className="px-4 py-3">{req.donationDate}</td>
      <td className="px-4 py-3">{req.donationTime}</td>
      <td className="px-4 py-3">{req.bloodGroup}</td>
      <td className="px-4 py-3 capitalize">{req.status}</td>
      <td className="px-4 py-3">
        {req.status === "inprogress" && req.donor && (
          <div>
            <p>{req.donor?.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {req.donor?.email}
            </p>
          </div>
        )}
      </td>
      <td className="px-4 py-3 relative">
        <button
          onClick={() => handleMenuToggle(req._id)}
          className="ml-5  hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
        >
          <FiMoreVertical size={20} />
        </button>
        {menuOpenFor === req._id && (
          <div
            ref={menuRef}
            className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10"
          >
            {req.status === "inprogress" && (
              <>
                <button
                  onClick={() => handleStatusChange(req._id, "done")}
                  className="w-full flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FiCheck className="mr-2" /> Mark as Done
                </button>
                <button
                  onClick={() => handleStatusChange(req._id, "canceled")}
                  className="w-full flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FiX className="mr-2" /> Cancel
                </button>
              </>
            )}
            <button
              onClick={() => handleEdit(req._id)}
              className="w-full flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FiEdit2 className="mr-2" /> Edit
            </button>
            <button
              onClick={() => handleDelete(req._id)}
              className="w-full flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FiTrash2 className="mr-2" /> Delete
            </button>
            <Link to={`/donation-request-details/${req._id}`}>
              <button className="w-full flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                <FiEye className="mr-2" /> View
              </button>
            </Link>
          </div>
        )}
      </td>
    </tr>
  );
}

export default TableRow;
