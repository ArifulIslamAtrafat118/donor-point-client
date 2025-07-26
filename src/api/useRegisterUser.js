import useAxiosSecure from "../hooks/useAxiosSecure";

const useRegisterUser = () => {
  const axios = useAxiosSecure();

  const registerUser = async (userData, uid) => {
    // console.log({ uid });
    if (!uid) {
      throw new Error("UID not available.");
    }

    const payload = {
      uid: uid,
      name: userData.name,
      email: userData.email,
      avatar: userData.avatar,
      bloodGroup: userData.bloodGroup,
      location: {
        division: { ...userData.location.division, type: "division" },
        district: { ...userData.location.district, type: "district" },
        upazila: { ...userData.location.upazila, type: "upazila" },
      },
    };

    const response = await axios.post("/user/register", payload);
    return response.data;
  };

  return { registerUser };
};

export default useRegisterUser;
