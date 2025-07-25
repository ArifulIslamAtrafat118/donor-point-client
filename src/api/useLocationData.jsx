import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";

function useLocationData() {
  const [allDivisions, setDivisions] = useState([]);
  const [allDistricts, setDistricts] = useState([]);
  const [allUpazilas, setUpazilas] = useState([]);
  const [error, setError] = useState(null);
  const axios = useAxiosSecure();

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const [divRes, distRes, upaRes] = await Promise.all([
          axios.get("/divisions"),
          axios.get("/districts"),
          axios.get("/upazilas"),
        ]);

        setDivisions(divRes.data?.divisions || []);
        setDistricts(distRes.data?.districts || []);
        setUpazilas(upaRes.data?.upazilas || []);
      } catch (err) {
        console.error("Error fetching location data:", err);
        setError("Failed to load location data. Please try again.");
      }
    };

    fetchLocationData();
  }, [axios]);

  return { allDivisions, allDistricts, allUpazilas, error };
}

export default useLocationData;
