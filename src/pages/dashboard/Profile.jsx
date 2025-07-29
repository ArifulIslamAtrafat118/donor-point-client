import React, { useEffect, useState } from "react";
import useUserData from "../../api/useUserData";
import useLocationNames from "../../api/useLocationNames";

function Profile() {

  const { userData, loading } = useUserData();
  const {isLoadingNames, locationNames, fetchLocationNames } = useLocationNames();
  
  useEffect(() => {
    if (!loading) {
      fetchLocationNames({
        division: userData?.location?.division,
        district: userData?.location?.district,
        upazila: userData?.location?.upazila,
      });
    }
  }, [loading]);

  console.log(locationNames);
  if (loading || isLoadingNames) return <p>Loading...</p>;
  return <div>Profile</div>;
}

export default Profile;
