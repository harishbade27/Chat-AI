import React from "react";
import { FiSend } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

const ChatInput = ({ theme }) => {
  const prompts = [
    "Show my Pay slips",
    "Salary Breakdown",
    "Pay slips History",
    "Payment Details",
  ];

  return (
    <div className={`w-full max-w-4xl mx-auto mt-10 flex flex-col items-center px-4 ${theme.text}`}>
      {/* Heading Section */}
      <div className="flex flex-col items-center mb-6 w-full">
        <FaStar className="text-yellow-400 text-3xl mb-2" />
        <h2 className={`text-lg font-semibold text-center ${theme.text}`}>
          Hi, I’m Najm Co-Pilot
        </h2>
        <p className={`text-sm mt-1 text-center ${theme.text}`}>
          How can I help you?
        </p>

        {/* Mobile Prompts - 2 column grid */}
        <div className="grid grid-cols-2 gap-2 mt-4 w-full md:hidden">
          {prompts.map((label) => (
            <button
              key={label}
              className="px-3 py-1.5 text-sm text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-700 rounded-md"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Input */}
      <div className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm flex items-center px-4 py-4 mb-4">
        <input
          placeholder="Ask Najm Co-Pilot"
          className={`flex-1 h-12 outline-none placeholder-gray-400 dark:placeholder-gray-500 text-sm bg-transparent ${theme.text} text-gray-900 dark:text-gray-100`}
        />
        <button
          type="button"
          className="ml-2 p-2 rounded-full bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-600 dark:text-blue-300 transition"
        >
          <FiSend className="w-5 h-5 -rotate-45" />
        </button>
      </div>

      {/* Desktop Prompts */}
      <div className="hidden md:flex flex-wrap justify-center gap-2">
        {prompts.map((label) => (
          <button
            key={label}
            className="px-3 py-1.5 text-sm text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-700 rounded-md"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatInput;
