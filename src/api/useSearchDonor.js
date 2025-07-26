import useAxiosSecure from "../hooks/useAxiosSecure";

const useSearchDonor = () => {
  const axios = useAxiosSecure();

  const searchDonor = async (filters) => {
    try {
      const response = await axios.post("/donors/search", filters); 
      return response.data;
    } catch (error) {
      console.error("Donor search failed:", error);
      throw error;
    }
  };

  return { searchDonor };
};

export default useSearchDonor;
