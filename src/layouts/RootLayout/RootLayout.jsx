import React from "react";
import { Outlet } from "react-router";
import Footer from "../../components/Footer";
import Header from "../../components/Header/Header";

function RootLayout() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1  dark:bg-gray-900  bg-gradient-to-b from-red-50 to-red-100/95 dark:from-gray-700 dark:to-gray-800 ">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default RootLayout;
