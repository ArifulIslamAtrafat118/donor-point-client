// import React, { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router";
// import useDonationRequests from "../../api/useDonationRequests";
// import { useAuth } from "../../context/AuthContext";
// import RequestsTableView from "../../utils/RequestsTable/RequestsTableView";

// const MyDonationRequests = () => {
//   const { currentUser } = useAuth();
//   const { getDonationRequestsByUser } = useDonationRequests();
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!currentUser?.uid) return;

//     const fetchData = async () => {
//       try {
//         const res = await getDonationRequestsByUser(currentUser?.uid);
//         setRequests(res);
//       } catch (err) {
//         console.error("Failed to fetch donation requests:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [currentUser?.uid]);

//   console.log("req", requests);

//   if (loading) {
//     return <p className="p-4 text-center">Loading...</p>;
//   }

//   if (!requests.length) {
//     <p className="text-gray-500 dark:text-gray-400">No Request Create Yet</p>
//   }

//   return (
//     <section className=" dark:bg-gray-900 text-gray-800 dark:text-gray-100">
//         <h1 className="text-center text-xl lg:text-3xl mb-4 lg:mb-8 font-semibold"></h1>
//       <div className="overflow-x-auto bg-gray-100 dark:bg-gray-800 rounded-lg shadow p-4">
//         <RequestsTableView requests={requests} />
//       </div>
//     </section>
//   );
// };

// export default MyDonationRequests;

import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import useDonationRequests from "../../api/useDonationRequestsData";
import { useAuth } from "../../context/AuthContext";
import RequestsTableView from "../../utils/RequestsTable/RequestsTableView";

const MyDonationRequests = () => {
  const { currentUser } = useAuth();
  const { getDonationRequestsByUser } = useDonationRequests();
  // const[filter, setFilter] = useState("all")
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("all");
  const [allRequests, setAllRequests] = useState([]);
  const [requests, setRequests] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(1);
  const limit = 3;

  useEffect(() => {
    if (!currentUser?.uid) return;
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await getDonationRequestsByUser(currentUser?.uid);
        setAllRequests(res);
      } catch (err) {
        console.error("Failed to fetch donation requests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser?.uid]);


  useEffect(() => {
    setFiltered(
      status === "all"
        ? allRequests
        : allRequests.filter(
            (req) => req.status?.toLowerCase() === status.toLowerCase()
          )
    );
    setPage(1);
  }, [status, allRequests]);

  useEffect(() => {
    if (filtered) {
      const start = limit * (page - 1);
      const end = start + limit;
      setRequests(filtered.slice(start, end));
      setTotalPage(Math.ceil(filtered.length / limit));
    }
  }, [page, limit, filtered]);

  return (
    <section className=" text-gray-800 dark:text-gray-100">
      <h1 className="mb-6 lg:mb-2 text-center text-2xl lg:text-3xl font-semibold">
        My Requests
      </h1>
      <div className="flex justify-between items-center mb-4 lg:mb-8 ">
        <span></span>
        <fieldset className=" flex gap-2">
          <label htmlFor="" className="text-lg lg:text-2xl ">
            Status:
          </label>
          <select
            onChange={(e) => setStatus(e.target.value)}
            name="filteredStatus"
            className="px-2 md:px-4 py-1 border rounded uppercase"
          >
            {["all", "pending", "inprogress", "done", "canceled"].map(
              (status) => (
                <option
                  key={status}
                  value={status}
                  className="text-gray-600 dark:text-gray-300 uppercase"
                >
                  {status}
                </option>
              )
            )}
          </select>
        </fieldset>
      </div>
      <div className="overflow-x-auto bg-gray-100 dark:bg-gray-800 rounded-lg shadow p-4">
        {loading ? (
          <p className="p-4 text-xl lg:text-3xl text-center text-gray-800 dark:text-gray-100">
            Loading...
          </p>
        ) : (
          <RequestsTableView requests={requests} />
        )}
      </div>
      {!loading && requests.length > 0 && (
        <div className="data-and-pagination mt-3 flex flex-col gap-3 md:flex-row  justify-between items-center">
          <div className="showing-data text-gray-400 dark:text-gray-600">
            <span className=""> Showing </span>
            <span className="text-gray-800 dark:text-gray-300 font-semibold">
              {page}
            </span>
            <span className=""> from </span>
            <span className="text-gray-800 dark:text-gray-300 font-semibold">
              {totalPage}
            </span>
            <span> pages</span>
          </div>
          <div className="pagination">
            <div className="pagination-buttons dark:bg-[#0d0e1f] gap-2 md:gap-3">
              <button
                onClick={() => setPage((prev) => prev - 1)}
                disabled={page == 1}
                className="cursor-pointer disabled:cursor-not-allowed"
              >
                <img
                  src="data:image/svg+xml,%3csvg%20width='24'%20height='25'%20viewBox='0%200%2024%2025'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M12%206.5L6%2012.5L12%2018.5'%20stroke='%23EEE0FF'%20stroke-opacity='0.3'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M19%206.5L13%2012.5L19%2018.5'%20stroke='url(%23paint0_linear_449_2907)'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear_449_2907'%20x1='19.5'%20y1='19'%20x2='19.5'%20y2='5'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0.0001'%20stop-color='%23E855DE'/%3e%3cstop%20offset='0.827956'%20stop-color='%236D0FEB'/%3e%3cstop%20offset='1'%20stop-color='%235400EE'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e"
                  alt="Arrow Right"
                />
              </button>
              {page === 1 ? (
                <div className="flex items-center gap-4 lg:text-xl">
                  <span className="active">{page}</span>
                  <span>{page + 1}</span>
                  <span>{page + 2}</span>
                </div>
              ) : page === totalPage ? (
                <div className="flex items-center gap-4 lg:text-xl">
                  <span>{page - 2}</span>
                  <span>{page - 1}</span>
                  <span className="active">{page}</span>
                </div>
              ) : (
                <div className="flex items-center gap-4 lg:text-xl">
                  <span>{page - 1}</span>
                  <span className="active">{page}</span>
                  <span>{page + 1}</span>
                </div>
              )}
              {/* <span className={`${page === 1 ? "acitve" : ""}`}>
              {page === 1 ? 1 : page - 1}
            </span>
            <span className="active">{(page === 1) ? page + 1 : page}</span>
            <span className={`${page === totalPage ? "acitve" : ""}`}>
              {page === totalPage ? page : page + 1}
            </span> */}
              <button
                onClick={() => setPage((prev) => prev + 1)}
                disabled={page == totalPage}
                className="cursor-pointer disabled:cursor-not-allowed"
              >
                <img
                  src="data:image/svg+xml,%3csvg%20width='24'%20height='25'%20viewBox='0%200%2024%2025'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M12%2018.5L18%2012.5L12%206.5'%20stroke='%23EEE0FF'%20stroke-opacity='0.3'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M5%2018.5L11%2012.5L5%206.5'%20stroke='url(%23paint0_linear_449_2904)'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear_449_2904'%20x1='4.49999'%20y1='6'%20x2='4.49999'%20y2='20'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0.0001'%20stop-color='%23E855DE'/%3e%3cstop%20offset='0.827956'%20stop-color='%236D0FEB'/%3e%3cstop%20offset='1'%20stop-color='%235400EE'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e"
                  alt="Arrow Left"
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MyDonationRequests;
