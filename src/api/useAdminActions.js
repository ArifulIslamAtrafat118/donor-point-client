import useAxiosSecure from "../hooks/useAxiosSecure"; 

const useAdminActions = () => {
  const axios = useAxiosSecure();

  const promoteToVolunteer = async (uid) => {
    const res = await axios.patch(`/admin/${uid}/promote-volunteer`);
    return res.data;
  };

  const promoteToAdmin = async (uid) => {
    const res = await axios.patch(`/admin/${uid}/promote-admin`);
    return res.data;
  };
  const revertToDonor = async (uid) => {
    const res = await axios.patch(`/admin/${uid}/revert-to-donor`);
    return res.data;
  };

  const activateUser = async (uid) => {
    const res = await axios.patch(`/admin/${uid}/activate`);
    return res.data;
  };

  const blockUser = async (uid) => {
    const res = await axios.patch(`/admin/${uid}/block`);
    return res.data;
  };

  return {
    promoteToVolunteer,
    promoteToAdmin,
    revertToDonor,
    activateUser,
    blockUser,
  };
};

export default useAdminActions;
