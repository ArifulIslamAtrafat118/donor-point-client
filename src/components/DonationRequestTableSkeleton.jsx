import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function DonationRequestTableSkeleton({ rows = 5 }) {
  const baseColor = "#e0e0e0";
  const highlightColor = "#f5f5f5";
  const darkBaseColor = "#2d3748";
  const darkHighlightColor = "#4a5568";

  const isDarkMode = document.documentElement.classList.contains("dark");

  return (
    <main>
      <div className="max-w-7xl mx-auto overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <table className="min-w-full divide-y divide-gray-800 dark:divide-gray-400 table-auto">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {["Recipient", "Location", "Date", "Time", "Blood Group", "View"].map((head) => (
                <th
                  key={head}
                  className="px-4 py-2 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y text-gray-500 dark:text-gray-400 divide-gray-200 dark:divide-gray-700">
            {Array.from({ length: rows }).map((_, idx) => (
              <tr key={idx} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                {[...Array(5)].map((_, colIdx) => (
                  <td key={colIdx} className="px-4 py-3">
                    <Skeleton
                      height={20}
                      baseColor={isDarkMode ? darkBaseColor : baseColor}
                      highlightColor={isDarkMode ? darkHighlightColor : highlightColor}
                    />
                  </td>
                ))}
                <td className="px-4 py-3">
                  <Skeleton
                    circle
                    width={20}
                    height={20}
                    baseColor={isDarkMode ? darkBaseColor : baseColor}
                    highlightColor={isDarkMode ? darkHighlightColor : highlightColor}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default DonationRequestTableSkeleton;
