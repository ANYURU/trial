import { NavLink } from "react-router-dom";
import { menuData } from "../helpers/menuData";
import logo from "../assets/images/tube-no-bg.png";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import React, { useState } from "react";
import { IconContext } from "react-icons/lib";
import { useMediaQuery } from "../hooks";
import { HiOutlineChevronDoubleLeft, HiOutlineChevronDoubleRight } from "react-icons/hi";

export default function Sidebar({ user, showSidebar, setShowSidebar }) {
  const role = !user
    ? "member"
    : user?.roles && user?.roles.includes("admin")
    ? "admin"
    : "member";

  const [show, setShow] = useState(true);
//   const [showSidebar, setShowSidebar] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [disabled] = useState(!(user || user?.roles));
  const lit = menuData[`${role}`]
    .filter((item) => item.sublinks)
    .map((item) => item.sublinks);

  const matches = useMediaQuery("(min-width: 800px)");

  return (
    <div className={`h-full fixed  bg-white pt-4  ${showSidebar ? "sidebar" : "minibar" } dark:bg-dark-bg-700`}>
      {/* <div className="bg-white h-[110px] dark:bg-dark-bg-700 flex justify-center items-center mb-6">
        { showSidebar && <img src={logo} alt="tube" width={110} loading="lazy" /> }
      </div> */}
      {menuData[`${role}`].map((item, index) => (
        <React.Fragment key={index}>
          <NavLink
            key={item.link}
            to={`/${item.link}`}
            className={`flex justify-between mx-2 my-1 px-3 py-1 rounded-lg hover:bg-accent dark:hover:bg-dark-bg-600 ${
              disabled &&
              item?.link !== "dashboard" &&
              item?.link !== "profile" &&
              `disabled-link`
            }`}
            onClick={() => {
              setSelectedIndex(index);
            }}
          >
            <div className="flex items-center dark:text-secondary-text">
              <IconContext.Provider value={{ className: `font-bold text-lg` }}>
                <i className="mx-2">{item.icon}</i>
              </IconContext.Provider>
              {showSidebar && <span className="font-semibold">{item.label}</span>}
            </div>
            {showSidebar &&
                <IconContext.Provider
                value={{
                    className: `font-bold text-lg dark:text-secondary-text`,
                }}
                >
                <i>
                    {index !== 0 &&
                    index < menuData[`${role}`].length - 1 &&
                    (show && index === selectedIndex ? (
                        <MdKeyboardArrowUp />
                    ) : (
                        <MdKeyboardArrowDown />
                    ))}
                </i>
                </IconContext.Provider>
            }
          </NavLink>
          {showSidebar &&
            index === selectedIndex &&
            index > 0 &&
            index < menuData[`${role}`].length - 1 && (
              <div className="bg-accent dark:bg-dark-bg-600 mx-3 rounded-lg my-2 py-1 px-3 cursor-pointer dark:text-secondary-text">
                {lit[index - 1].map((item, index) => (
                  <NavLink
                    key={index}
                    to={`${item.link}`}
                    className="flex px-2 py-1 rounded-md hover:bg-gray-200 hover:dark:bg-dark-bg-700"
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            )}
        </React.Fragment>
      ))}
      {matches && (
        <div className={`fixed bottom-0 flex h-14 justify-center items-center gap-4 dark:text-secondary-text cursor-pointer hover:bg-accent ${showSidebar ? "w-[260px]" : "w-[80px]"} dark:hover:bg-dark-bg-600 border-t-2 border-t-accent dark:border-t-dark-bg-600`}
        onClick={() => setShowSidebar(!showSidebar)}
        >
            {showSidebar ?
            <>
                <HiOutlineChevronDoubleLeft />
                Collapse Sidebar
            </>
          :
                <HiOutlineChevronDoubleRight />
            }
        </div>
      )}
    </div>
  );
}
