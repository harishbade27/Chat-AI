import React, { useState } from "react";
import Logo from "../assets/images/Logo.png";
import Company from "../assets/images/Grp.png";
import {
  FiSearch,
  FiMessageSquare,
  FiUser,
  FiInbox,
  FiCheckCircle,
  FiChevronDown,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import { MdSwapHoriz } from "react-icons/md";
import { TbLayoutSidebarRightExpand } from "react-icons/tb";
import { BsThreeDotsVertical } from "react-icons/bs";
import { darkTheme } from "../theme";

const Sidebar = ({ theme, darkMode, isSidebarOpen, setIsSidebarOpen, toggleDarkMode }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const chatHistory = [
    { id: 1, title: "Pay Slips Information" },
    { id: 2, title: "Updated Bank Details" },
    { id: 3, title: "Leave Approved" },
  ];

  const handleToggleTheme = () => {
    toggleDarkMode(!darkMode)
  }

  return (
    <aside
      className={`h-screen transition-all duration-300 ease-in-out flex flex-col justify-between shadow-sm p-4 
        ${isSidebarOpen ? "w-80" : "w-20"} 
        ${darkMode ? theme.background : "bg-white"} 
        ${theme.text} 
        md:w-80 md:block ${isSidebarOpen ? "md:w-80" : "md:w-20"} 
        ${isSidebarOpen ? "z-30 fixed inset-0" : "z-20"}`}
    >
      {/* Mobile Modal Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <img src={Logo} alt="Logo" className="w-6 h-6" />
            {isSidebarOpen && (
              <h1 className="text-[22px] font-semibold leading-[22px]">
                <span className={`${theme.text}`}>Sahab</span>
                <span className={`${theme.subtext}`}> Payroll</span>
              </h1>
            )}
          </div>
          <div className="flex items-center gap-3">
            <FiSearch
              className={`text-lg cursor-pointer ${theme.subtext}`}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            />
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <TbLayoutSidebarRightExpand className={`text-lg cursor-pointer ${theme.subtext}`} />
            </button>
          </div>
        </div>

        {/* Search */}
        {isSidebarOpen && isSearchOpen && (
          <div className="relative mb-4">
            <FiSearch className={`absolute left-3 top-3 ${theme.subtext}`} />
            <input
              type="text"
              placeholder="Search..."
              className={`w-full pl-10 pr-3 py-2 border rounded text-sm ${theme.card} ${theme.text}`}
            />
          </div>
        )}

        {/* Company Selector */}
        {isSidebarOpen && (
          <div className="mb-4 space-y-1">
            <div className={`w-full border rounded-lg px-3 py-2 ${theme.card} flex items-center justify-between cursor-pointer`}>
              <div className="flex items-center gap-2">
                <img src={Company} alt="Company Logo" className="w-6 h-6 rounded-full" />
                <span className={`text-sm font-medium ${theme.subtext}`}>Comm - IT India Pvt Ltd</span>
              </div>
              <svg
                className={`w-4 h-4 ${theme.subtext}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            <div className={`w-full border rounded-lg px-3 py-2 ${theme.card} cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3`}>
              <MdSwapHoriz className={`text-2xl ${theme.subtext}`} />
              <span className={`text-sm font-semibold ${theme.subtext}`}>Switch to Portal</span>
            </div>
          </div>
        )}

        {/* New Chat */}
        {isSidebarOpen && (
          <div className={`w-full px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3`}>
            <svg
              className={`w-5 h-5 ${theme.subtext}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 16V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2h6l4 3v-3h4a2 2 0 002-2z" />
            </svg>
            <span className={`text-sm font-semibold ${theme.subtext}`}>New Chat</span>
          </div>
        )}

        {/* Recent Chats */}
        {isSidebarOpen && (
          <div className="mt-4 mb-6">
            <p className={`text-xs font-medium mb-2 ${theme.subtext}`}>Recent Chats</p>
            <div className="space-y-1">
              {chatHistory.map((chat) => (
                <div
                  key={chat.id}
                  className={`group flex items-center justify-between px-3 py-2 text-sm font-medium cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded ${theme.text}`}
                >
                  <div className="flex items-center gap-2">
                    <FiMessageSquare className={`text-lg ${theme.subtext}`} />
                    <span>{chat.title}</span>
                  </div>
                  <BsThreeDotsVertical className={`hidden group-hover:block text-lg ${theme.subtext}`} />
                </div>
              ))}
              <div className={`flex items-center gap-2 px-3 py-2 text-sm font-medium cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded ${theme.text}`}>
                <span>View more</span>
                <FiChevronDown className={`text-lg ${theme.subtext}`} />
              </div>
            </div>
          </div>
        )}

        {/* Explore Section */}
        {isSidebarOpen && (
          <div className="space-y-1">
            <p className={`text-xs font-medium mb-2 ${theme.subtext}`}>Explore</p>

            <div className={`flex items-center gap-2 px-3 py-2 text-sm font-medium cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded ${theme.text}`}>
              <FiUser className={`text-lg ${theme.subtext}`} />
              <span>My Info</span>
            </div>

            <div className={`flex items-center gap-2 px-3 py-2 text-sm font-medium cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded ${theme.text}`}>
              <FiInbox className={`text-lg ${theme.subtext}`} />
              <span>Inbox</span>
            </div>

            <div className={`flex items-center gap-2 px-3 py-2 text-sm font-medium cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded ${theme.text}`}>
              <FiCheckCircle className={`text-lg ${theme.subtext}`} />
              <span>My Approval</span>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Theme Toggle Button */}
      <div className="block md:hidden mt-4">
        <button
          onClick={handleToggleTheme}
          className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg shadow transition-all duration-200 
          ${darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-800"}`}
        >
          {darkMode ? (
            <>
              <FiMoon className="text-lg" />
              <span>Dark Mode</span>
            </>
          ) : (
            <>
              <FiSun className="text-lg" />
              <span>Light Mode</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
