import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";

function useUserData() {
  const { currentUser } = useAuth();
  const axios = useAxiosSecure();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser?.uid) {
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/user/${currentUser.uid}/data`);
        setUserData(response.data);
      } catch (err) {
        console.error("Failed to fetch user data", err);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser?.uid, axios]);

  const getAllUserData = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/user/all-user");
      return await res.data;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  return { userData, getAllUserData, loading };
}

export default useUserData;
