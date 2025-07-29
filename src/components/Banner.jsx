import { motion } from "framer-motion";
import { Link } from "react-router";

const Banner = () => {
  return (
    <section className="relative bg-gradient-to-r from-[#FF1744]/10 via-white/40 to-white dark:from-[#1c1c1c] dark:via-gray-900 dark:to-gray-900 overflow-hidden py-12 md:py-20">
      {/* SVG background shape */}
      <svg
        className="absolute top-0 left-0 w-96 md:w-[500px] opacity-10 dark:opacity-20 "
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#FF1744"
          d="M37.6,-62.2C51.2,-55.3,67.4,-50.4,76.7,-39.6C86,-28.9,88.5,-12.4,83.7,2.2C79,16.9,66.9,29.7,56.4,44.6C46,59.5,37.2,76.6,23.6,82.4C10,88.2,-8.3,82.6,-22.1,73.1C-35.9,63.5,-45.2,50.1,-55.1,37.1C-65,24.1,-75.6,11.5,-74.8,0.5C-74,-10.6,-61.9,-21.3,-52.5,-33.2C-43.2,-45.1,-36.5,-58.3,-25.8,-68.6C-15.2,-79,-0.6,-86.5,10.9,-81.6C22.4,-76.7,29.7,-59.2,37.6,-62.2Z"
          transform="translate(100 100)"
        />
      </svg>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 items-center gap-10">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Save Lives with a Drop <br />
            <span className="text-[#FF1744]">Join the Donor Community</span>
          </h1>
          <p className="mt-4 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
            Donate blood, be a hero. Your little help means the world to someone
            in need.
          </p>

          {/* CTA Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              to="/sign-up"
              className="bg-[#FF1744] hover:bg-[#d31538] text-white px-6 py-3 rounded-lg font-semibold shadow transition"
            >
              Join as a Donor
            </Link>
            <Link
              to="/search"
              className="border border-[#FF1744] text-[#FF1744] hover:bg-[#ffebf0] dark:hover:bg-[#2e2e2e] px-6 py-3 rounded-lg font-semibold shadow transition"
            >
              Search Donors
            </Link>
          </div>
          <svg
            className="absolute bottom-0 right-0 w-96 md:w-[500px] opacity-10 dark:opacity-20 z-10"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Heart shape */}
            <path
              fill="#FF1744"
              d="M100 30
       C100 10, 130 10, 130 30
       C130 50, 100 70, 100 80
       C100 70, 70 50, 70 30
       C70 10, 100 10, 100 30
       Z"
              transform="translate(0 0)"
            />

            {/* Tree base (roots or soil blob) */}
            <path
              fill="#A1887F"
              d="M60 150
       C60 140, 140 140, 140 150
       C140 160, 60 160, 60 150
       Z"
            />
          </svg>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="hidden md:flex justify-center"
        >
          <img
            src="https://i.ibb.co/1tHPtDbr/Pngtree-blood-donation-7081472.png"
            alt="Blood Donation Illustration"
            className="w-full max-w-md md:max-w-full"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
