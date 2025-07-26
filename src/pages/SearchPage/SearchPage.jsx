import React, { useState } from "react";
import { motion } from "framer-motion";
import LocationSelector from "../../utils/LocationSelector";
import useSearchDonor from "../../api/useSearchDonor";
import { errorToast } from "../../utils/errorToast";
import { FaList, FaTh } from "react-icons/fa";

function SearchPage() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sectionOff, setSectionOff] = useState(true);
  const [formData, setFormData] = useState({
    bloodGroup: "",
  });
  const { searchDonor } = useSearchDonor();
  const handleLocationChange = (locationData) => {
    setFormData((prev) => ({
      ...prev,
      division: locationData.division,
      district: locationData.district,
      upazila: locationData.upazila,
    }));
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSectionOff(false);
    try {
      const donors = await searchDonor(formData);
      console.log(donors);
      setDonors(donors);
    } catch (error) {
      console.log(error);
      errorToast(error);
    } finally {
      setLoading(false);
    }
  };
  //   console.log("fomr data serch", formData);
  return (
    <section className=" bg-stone-200">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="py-8 lg:py-12 flex items-center justify-center bg-stone-200 dark:bg-gray-900 px-4"
      >
        <div className=" bg-red-300/10  p-8 md:mx-10 rounded-lg shadow-lg max-w-6xl w-full relative overflow-hidden">
          <div className="absolute -top-24 -right-20 opacity-10 pointer-events-none w-[300px]"></div>
          <h2 className="text-2xl lg:text-4xl font-semibold text-center mb-6 text-gray-800 dark:text-white">
            Search Donor
          </h2>
          <form
            onSubmit={handleSearch}
            className="p-8 rounded-lg space-y-4 text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-800"
          >
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              className="input cursor-pointer"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, bloodGroup: e.target.value }))
              }
            >
              <option value="" disabled>
                --Blood Group--
              </option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                (group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                )
              )}
            </select>
            <LocationSelector onLocationChange={handleLocationChange} />

            <button
              type="submit"
              className={`w-full cursor-pointer bg-gradient-to-r from-[#dc2626] to-[#b91c1c] hover:from-[#b91c1c] hover:to-[#7f1d1d] text-white font-semibold py-2 px-5 rounded-lg shadow-md transition duration-300`}
            >
              Search
            </button>
          </form>
        </div>
      </motion.div>
      { loading ? (
        <div className="h-17 lg:h-25 flex items-center justify-center dark:bg-gray-900">
          <p className=" text-center text-xl  lg:text-2xl xl:text-3xl text-gray-500 dark:text-gray-400">
            Searching Donors...
          </p>
        </div>
        
      ) :sectionOff ? (
        <p></p>
      ) : donors.length > 0 ? (
        <div className="text-red-600 text-center text-4xl">Will show search data here</div>
      ) : (
        <div className="h-17 lg:h-25 flex items-center justify-center dark:bg-gray-900">
          <p className=" text-center text-xl  lg:text-2xl xl:text-3xl text-gray-500 dark:text-gray-400">
            No donors found
          </p>
        </div>
      )}
    </section>
  );
}

export default SearchPage;
