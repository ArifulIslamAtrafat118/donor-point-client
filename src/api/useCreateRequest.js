import useAxiosSecure from "../hooks/useAxiosSecure";

function useCreateRequest() {
  const axios = useAxiosSecure();
  const createRequest = async (reqData) => {
    try {
      const res = await axios.post("/donor/create-donation-request", reqData);
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return { createRequest };
}

export default useCreateRequest;
