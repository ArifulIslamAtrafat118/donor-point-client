import useAxiosSecure from "../hooks/useAxiosSecure";

const useDonationRequests = () => {
  const axios = useAxiosSecure();

  const getAllDonationRequests = async ({ page = 1, limit = 10, status = "all" }) => {
    const res = await axios.get("/donation-request", {
      params: { page, limit, status },
    });
    return res.data; 
  };

  const getPendingDonationRequests = async () => {
    const res = await axios.get("/pending-donation-request");
    return res.data;
  };

  const getDonationRequestsByUser = async (uid) => {
    const res = await axios.get(`/donation-request/user/${uid}`);
    return res.data; 
  };

  const getRecentRequestByUser = async(uid)=>{
   const res = await axios.get(`/requests/user/${uid}/recent`);
   return res.data;
  }

  const getDonationRequestById = async (id) => {
    const res = await axios.get(`/donation-request/${id}`);
    return res.data; 
  };

  return {
    getAllDonationRequests,
    getPendingDonationRequests,
    getDonationRequestsByUser,
    getRecentRequestByUser,
    getDonationRequestById,
  };
};

export default useDonationRequests;
