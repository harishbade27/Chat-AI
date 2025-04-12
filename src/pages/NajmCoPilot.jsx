import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import ChatInput from "../components/ChatInput";
import { lightTheme, darkTheme } from "../theme";
import { TbLayoutSidebarRightExpand } from "react-icons/tb";

const NajmCoPilot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const theme = darkMode ? darkTheme : lightTheme;

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleNewChat = () => {
    setInput("");
    setMessages((prevMessages) =>
      prevMessages.filter((msg) => msg.role !== "user" && msg.role !== "ai")
    );
  };

  return (
    <div className={`min-h-screen flex ${theme.background}`}>
      {/* Sidebar */}
      {isSidebarOpen && (
        <Sidebar
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          theme={theme}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          handleNewChat={handleNewChat}
        />
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1 w-full">
        <div className="fixed top-[-10px] left-0 right-0 w-full">
          <Topbar
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            theme={theme}
            isSidebarOpen={isSidebarOpen}
          />
        </div>

        {/* Sidebar Toggle Icon */}
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className={`fixed top-1 left-4 z-50 text-2xl p-1 rounded-full bg-white dark:bg-gray-800 shadow-md ${theme.subtext}`}
          >
            <TbLayoutSidebarRightExpand />
          </button>
        )}

        {/* Content below Topbar */}
        <main
          className={`flex-1 p-4 pt-20 flex flex-col justify-center items-center text-center ${theme.text}`}
        >
          <ChatInput
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            theme={theme}
            input={input}
            setInput={setInput}
            messages={messages}
            setMessages={setMessages}
            isSidebarOpen={isSidebarOpen}
          />
        </main>
      </div>
    </div>
  );
};

export default NajmCoPilot;
