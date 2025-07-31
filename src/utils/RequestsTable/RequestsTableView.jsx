import { useEffect } from "react";
import useLocationNames from "../../api/useLocationNames";
import TableRow from "./TableRow";

function RequestsTableView({ requests }) {
  const { locationNames, fetchLocationNames, isLoadingNames } =
    useLocationNames();
  useEffect(() => {
    if (requests.length && fetchLocationNames) {
      // Example: fetch for first request; adapt as needed
      const loc = requests[0].location;
      fetchLocationNames(loc);
    }
  }, [requests]); 

  if (!requests.length) {
    return (
      <p className="py-4 lg:py-10 text-xl lg:text-3xl text-center text-gray-500 dark:text-gray-400">Nothing Found</p>
    );
  }
  return (
    <table className="min-w-full divide-y divide-gray-800 dark:divide-gray-400 table-auto">
      <thead className="bg-gray-50 dark:bg-gray-700">
        <tr>
          {[
            "Recipient",
            "Location",
            "Date",
            "Time",
            "Blood Group",
            "Status",
            "Donor",
            "Actions",
          ].map((head) => (
            <th
              key={head}
              className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              {head}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
        {requests.map((req) => (
          <TableRow key={req._id} req={req} locationNames={locationNames} />
        ))}
      </tbody>
    </table>
  );
}

export default RequestsTableView;
