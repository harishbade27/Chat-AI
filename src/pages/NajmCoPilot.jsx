import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import ChatInput from "../components/ChatInput";
import { lightTheme, darkTheme } from "../theme";
import { TbLayoutSidebarRightExpand } from "react-icons/tb";

const NajmCoPilot = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const theme = darkMode ? darkTheme : lightTheme;

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`min-h-screen flex ${theme.background}`}>
      {/* Sidebar toggle icon */}
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)} // Open sidebar
          className={`absolute left-4 top-4 text-lg cursor-pointer ${theme.subtext}`}
        >
          <TbLayoutSidebarRightExpand />
        </button>
      )}

      {/* Sidebar component, only rendered if sidebar is open */}
      {isSidebarOpen && (
        <Sidebar
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          theme={theme}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      )}

      {/* Topbar and main content */}
      <div className="flex flex-col flex-1">
        <div className="flex justify-end w-full">
          <Topbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} theme={theme} isSidebarOpen={isSidebarOpen} />
        </div>

        <main
          className={`flex-1 p-4 flex flex-col justify-center items-center text-center ${theme.text}`}
        >
          <ChatInput darkMode={darkMode} toggleDarkMode={toggleDarkMode} theme={theme} />
        </main>
      </div>
    </div>
  );
};

export default NajmCoPilot;
