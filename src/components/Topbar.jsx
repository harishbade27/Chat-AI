import React from "react";
import { FiBell, FiSun, FiMoon } from "react-icons/fi";
import { BsGlobe } from "react-icons/bs";
import Avatar from "../assets/images/avatar.png";

const Topbar = ({ theme, darkMode, toggleDarkMode, isSidebarOpen }) => {

    const iconStyle = {
        color: !darkMode ? "#667085" : undefined,
    };

    return (
        <header
            className={`w-full flex items-center justify-between px-10 mt-0.5 py-2 ${theme.background} ${theme.text}`}
        >
            <div
                className={`text-lg font-bold transition-all duration-300 ease-in-out
    hidden md:block ${isSidebarOpen ? "ml-80 px-3 fixed" : "ml-0 px-3"}
  `}
            >
                Najm Co-Pilot
            </div>

            <div
                className={`text-lg font-bold transition-all duration-300 ease-in-out
    block md:hidden px-3 ${isSidebarOpen ? "hidden" : ""}
  `}  >
                Najm Co-Pilot
            </div>

            <div className="flex items-center gap-4 ml-auto">
                <FiBell className="text-xl cursor-pointer" style={iconStyle} />
                <BsGlobe className="text-xl cursor-pointer" style={iconStyle} />
                <button onClick={toggleDarkMode} className="focus:outline-none">
                    {darkMode ? (
                        <FiSun className="text-xl cursor-pointer" style={iconStyle} />
                    ) : (
                        <FiMoon className="text-xl cursor-pointer" style={iconStyle} />
                    )}
                </button>
                <div className="w-7 h-7 rounded-full overflow-hidden cursor-pointer">
                    <img
                        src={Avatar}
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </header>

    );
};

export default Topbar;
