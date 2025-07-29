import React from "react";
import { motion } from "framer-motion";

const WelcomeBanner = ({ role, displayName }) => {
  return (
    <section className="relative bg-gradient-to-r from-[#FF1744]/10 via-white/40 to-white dark:from-[#1c1c1c] dark:via-gray-900 dark:to-gray-900 rounded-lg overflow-hidden p-6 md:p-10 mb-8 shadow-md">
      <svg
        className="absolute right-0 top-0 w-32 md:w-64 lg:w-80 opacity-10 pointer-events-none"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#FF1744"
          d="M37.6,-62.2C51.2,-55.3,67.4,-50.4,76.7,-39.6C86,-28.9,88.5,-12.4,83.7,2.2C79,16.9,66.9,29.7,56.4,44.6C46,59.5,37.2,76.6,23.6,82.4C10,88.2,-8.3,82.6,-22.1,73.1C-35.9,63.5,-45.2,50.1,-55.1,37.1C-65,24.1,-75.6,11.5,-74.8,0.5C-74,-10.6,-61.9,-21.3,-52.5,-33.2C-43.2,-45.1,-36.5,-58.3,-25.8,-68.6C-15.2,-79,-0.6,-86.5,10.9,-81.6C22.4,-76.7,29.7,-59.2,37.6,-62.2Z"
          transform="translate(100 100)"
        />
      </svg>

      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
          Welcome back, <span className="text-[#FF1744]">{displayName}</span> 👋🏼
        </h1>
        <p className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-300">
          You're logged in as a <strong>{role}</strong>. Glad to have you here.
        </p>

        {role === "donor" && (
          <p className="mt-4 text-sm italic text-[#b91c1c] dark:text-red-300">
            ❤️ Your donation could be someone’s second chance at life. Thank you
            for being a real-life hero.
          </p>
        )}
      </motion.div>
    </section>
  );
};

export default WelcomeBanner;
