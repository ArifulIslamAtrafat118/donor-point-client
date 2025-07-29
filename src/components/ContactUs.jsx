import React from "react";

const ContactUs = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        
        {/* Contact Info */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Contact Us</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We'd love to hear from you. Reach out with your questions, feedback, or just to say hello!
          </p>
          
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div>
              <span className="font-semibold">📞 Phone:</span> +880 1704039559
            </div>
            <div>
              <span className="font-semibold">✉️ Email:</span> support@donorpoint.org
            </div>
            <div>
              <span className="font-semibold">📍 Address:</span> Faridpur, Bangladesh
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              id="name"
              required
              className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-red-500 focus:border-red-500"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-red-500 focus:border-red-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Message
            </label>
            <textarea
              id="message"
              rows="3"
              required
              className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-red-500 focus:border-red-500"
              placeholder="Type your message here..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
