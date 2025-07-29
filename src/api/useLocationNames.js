import { useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";

const useLocationNames = () => {
  const axios = useAxiosSecure();
  const [locationNames, setLocationNames] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLocationNames = async (location) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/location/location-names", location);

      setLocationNames(response.data);
      return response.data;
    } catch (err) {
      console.error("Error fetching location names:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { locationNames, fetchLocationNames, isLoadingNames:loading, error };
};

export default useLocationNames;
