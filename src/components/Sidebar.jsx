import React, { useState, useEffect, useRef } from "react";
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
import { FiTrash2 } from "react-icons/fi";

const Sidebar = ({ darkMode, toggleDarkMode, theme, isSidebarOpen, setIsSidebarOpen, handleNewChat }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [showMoreChats, setShowMoreChats] = useState(false);
  const [activeChatOptionsId, setActiveChatOptionsId] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const optionRefs = useRef({});


  useEffect(() => {
    try {
      const storedChats = JSON.parse(localStorage.getItem("chatHistory")) || [];
      const validChats = storedChats.filter(chat => chat.id);
      setChatHistory(validChats);
    } catch (e) {
      console.error("Invalid chat history:", e);
      setChatHistory([]);
    }
  }, []);


  const saveChatHistory = (chats) => {
    localStorage.setItem("chatHistory", JSON.stringify(chats));
    setChatHistory(chats);
  };

  const clearChatHistory = () => {
    localStorage.removeItem("chatHistory");
    setChatHistory([]);
  };

  const deleteChatHistory = (chatId) => {
    const updatedChats = chatHistory.filter((chat) => chat.id !== chatId);
    saveChatHistory(updatedChats);
    setActiveChatOptionsId(null);
  };

  const handleToggleTheme = () => {
    toggleDarkMode(!darkMode);
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest(".chat-options") && !e.target.closest(".dropdown-menu")) {
      setActiveChatOptionsId(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  const sidebarItem = `flex items-center gap-2 px-3 py-2 text-sm font-medium cursor-pointer 
    hover:bg-gray-100 dark:hover:bg-gray-700 
    hover:text-black dark:hover:text-white 
    rounded`;

  const visibleChats = showMoreChats ? chatHistory : chatHistory.slice(0, 3);

  const handleChatOptionClick = (chatId) => {
    if (activeChatOptionsId === chatId) {
      setActiveChatOptionsId(null);
    } else {
      const refEl = optionRefs.current[chatId];
      if (refEl) {
        const rect = refEl.getBoundingClientRect();
        setDropdownPosition({ top: rect.top + window.scrollY + 20, left: rect.left });
      }
      setActiveChatOptionsId(chatId);
    }
  };

  return (
    <aside
      className={`h-screen transition-all duration-300 ease-in-out flex flex-col justify-between shadow-sm px-4 pt-2
        ${isSidebarOpen ? "w-80" : "w-20"} 
        ${darkMode ? theme.background : "bg-white"} 
        ${theme.text} 
        md:w-80 md:block ${isSidebarOpen ? "md:w-80" : "md:w-20"} 
        ${isSidebarOpen ? "z-30 fixed inset-0" : "z-20"}`}
    >
      {isSidebarOpen && (
        <div
          className="fixed bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <div>
        {/* Top Logo & Search Toggle */}
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
              className={`text-2xl cursor-pointer ${theme.subtext}`}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            />
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`top-2 left-4 text-2xl p-1 rounded-full bg-white dark:bg-gray-800 shadow-md ${theme.subtext}`}
            >
              <TbLayoutSidebarRightExpand />
            </button>
          </div>
        </div>

        {/* Search Box */}
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

        {/* Company Switch */}
        {isSidebarOpen && (
          <div className="mb-4 space-y-1">
            <div
              className={`w-full border rounded-lg px-3 py-2 ${theme.card} flex items-center justify-between cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white`}
            >
              <div className="flex items-center gap-2">
                <img src={Company} alt="Company Logo" className="w-6 h-6 rounded-full" />
                <span className={`text-sm font-medium ${theme.subtext}`}>Comm - IT India Pvt Ltd</span>
              </div>
              <FiChevronDown className={`w-4 h-4 ${theme.subtext}`} />
            </div>

            <div className={`${sidebarItem} ${theme.card}`}>
              <MdSwapHoriz className={`text-2xl ${theme.subtext}`} />
              <span className={`text-sm font-semibold ${theme.subtext}`}>Switch to Portal</span>
            </div>
          </div>
        )}

        {/* Add Chat */}
        {isSidebarOpen && (
          <div className={`${sidebarItem}`} onClick={() => {
            handleNewChat();
            if (window.innerWidth < 768) {
              setIsSidebarOpen(false);
            }
          }} >
            <svg
              className={`w-5 h-5 ${theme.subtext}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 10h.01M12 10h.01M16 10h.01M21 16V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2h6l4 3v-3h4a2 2 0 002-2z"
              />
            </svg>
            <span className={`text-sm font-semibold ${theme.subtext}`}>New Chat</span>
          </div>
        )}

        {/* Recent Chats */}
        {isSidebarOpen && (
          <div className="mt-4 mb-6">
            <p className={`text-xs font-medium mb-2 ${theme.subtext}`}>Recent Chats</p>
            <div className="space-y-1 overflow-y-auto" style={{ maxHeight: "250px" }}>
              {chatHistory.length === 0 ? (
                <p className="text-center text-sm text-gray-500">No Chat History</p>
              ) : (
                visibleChats.map((chat) => (
                  <div
                    key={chat.id}
                    className={`relative group ${sidebarItem} ${theme.text} flex items-center justify-between`}
                  >
                    <div className="flex items-center gap-2">
                      <FiMessageSquare className={`text-lg ${theme.subtext}`} />
                      <div>
                        <p className="font-semibold">{chat.title}</p>
                        <p className="text-xs">
                          {chat.content.length > 50 ? chat.content.slice(0, 50) + "..." : chat.content}
                        </p>
                      </div>
                    </div>
                    <div
                      className="chat-options cursor-pointer"
                      ref={(el) => (optionRefs.current[chat.id] = el)}
                    >
                      <BsThreeDotsVertical
                        className={`text-lg ${theme.subtext}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleChatOptionClick(chat.id);
                        }}
                      />
                    </div>
                  </div>
                ))
              )}

              {chatHistory.length > 3 && (
                <div
                  className={`${sidebarItem} ${theme.text}`}
                  onClick={() => setShowMoreChats(!showMoreChats)}
                >
                  <span>{showMoreChats ? "View less" : "View more"}</span>
                  <FiChevronDown className={`text-lg ${theme.subtext}`} />
                </div>
              )}
            </div>

            {/* Clear Chat */}
            {chatHistory.length > 0 && (
              <div className="w-full text-right mt-2">
                <button
                  onClick={clearChatHistory}
                  className="text-sm text-red-500 hover:underline"
                >
                  Clear Chat
                </button>
              </div>
            )}
          </div>
        )}

        {/* Explore */}
        {isSidebarOpen && (
          <div className="space-y-1">
            <p className={`text-xs font-medium mb-2 ${theme.subtext}`}>Explore</p>
            <div className={`${sidebarItem} ${theme.text}`}>
              <FiUser className={`text-lg ${theme.subtext}`} />
              <span>My Info</span>
            </div>
            <div className={`${sidebarItem} ${theme.text}`}>
              <FiInbox className={`text-lg ${theme.subtext}`} />
              <span>Inbox</span>
            </div>
            <div className={`${sidebarItem} ${theme.text}`}>
              <FiCheckCircle className={`text-lg ${theme.subtext}`} />
              <span>My Approval</span>
            </div>
          </div>
        )}
      </div>

      {/* Fixed Dropdown (on top) */}
      {activeChatOptionsId && (
        <div
          className="dropdown-menu absolute w-32 bg-white dark:bg-gray-800 shadow-md rounded border border-gray-200 dark:border-gray-700 z-50"
          style={{
            top: dropdownPosition.top,
            left: dropdownPosition.left - 120,
          }}
        >
          <div
            className="flex items-center gap-2 p-2 text-sm hover:bg-red-100 dark:hover:bg-red-600 text-red-600 cursor-pointer"
            onClick={() => deleteChatHistory(activeChatOptionsId)}
          >
            <FiTrash2 className="text-base" />
            <span>Delete</span>
          </div>
        </div>
      )}

      <div className="block md:hidden mb-20 mt-4">
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
