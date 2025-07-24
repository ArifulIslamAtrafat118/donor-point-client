import React from "react";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <section className="bg-white min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-4xl mx-auto text-center">
        {/* Fluid SVG Illustration */}
        <div className="w-full max-w-2xl mx-auto">
          <svg
            className="w-full h-auto"
            viewBox="0 0 800 600"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="none" fillRule="evenodd">
              <circle fill="#FF6B6B" cx="400" cy="300" r="300" opacity="0.15" />
              <path
                fill="#FF6B6B"
                d="M320 260a20 20 0 1 1 40 0v80a20 20 0 1 1-40 0v-80zm120 0a20 20 0 1 1 40 0v80a20 20 0 1 1-40 0v-80z"
              />
              <text
                x="400"
                y="470"
                textAnchor="middle"
                fontSize="80"
                fontWeight="bold"
                fill="#FF6B6B"
              >
                404
              </text>
            </g>
          </svg>
        </div>

        {/* Error Text */}
        <h1 className="text-5xl font-bold text-gray-800 mt-8 mb-4">
          Page Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
          Sorry! The page you're looking for doesn’t exist. It may have been moved or deleted.
        </p>

        {/* Action Button */}
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-red-500 text-white text-lg rounded-lg shadow hover:bg-red-600 transition"
        >
          ⬅ Go to Homepage
        </Link>
      </div>
    </section>
  );
};

export default ErrorPage;
