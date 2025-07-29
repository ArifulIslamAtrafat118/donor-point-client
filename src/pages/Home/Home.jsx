import React, { useEffect, useState } from "react";
import Banner from "../../components/Banner";
import ContactUs from "../../components/ContactUs";
import FeaturedSection from "../../components/featuredSection/FeaturedSection";
function Home() {
  return (
    <>
      <Banner/>
      <ContactUs/>
      <FeaturedSection/>
    </>
  );
}

export default Home;
