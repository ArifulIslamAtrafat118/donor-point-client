import React, { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";

function useAdminStats() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalDonors: 0,
    totalFunding: 40200,
    totalRequests: 0,
  });
  const axios = useAxiosSecure();
  useEffect(() => {
    try {
      setLoading(true);
      const getStats = async () => {
        const res = await axios.get("/admin/stats");
        setStats(res.data);
        return res.data;
      };
      getStats();
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { stats, loading };
}

export default useAdminStats;
