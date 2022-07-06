import { NavLink } from "react-router-dom";
import { menuData } from "../helpers/menuData";
import { MdKeyboardArrowDown } from "react-icons/md";
import React, { useState, useEffect } from "react";
import { IconContext } from "react-icons/lib";
import { useMediaQuery } from "../hooks";
import { HiOutlineChevronDoubleLeft } from "react-icons/hi";

export default function Sidebar({ user, showSidebar, setShowSidebar }) {
  const role = !user
    ? "member"
    : user?.roles && user?.roles.includes("admin")
    ? "admin"
    : user?.roles && user?.roles.includes("super_admin")
    ? "super_admin"
    : "member";

  useEffect(() => {
    setDisabled(!(user?.roles?.length > 0))
  }, [user])

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [disabled, setDisabled ] = useState(true);
  const lit = menuData[`${role}`]
    .filter((item) => item.sublinks && item.sublinks)
    .map((item) => item.sublinks && item.sublinks);

  console.log(disabled)
  console.log('disabled value', !user?.roles?.length > 0)

  return (
    <div
      className={`h-full fixed  bg-white pt-4 z-20 ease-in-out duration-100  ${
        showSidebar ? "sidebar w-[260px]" : "minibar w-[80px]"
      } dark:bg-dark-bg-700`}
    >
      {menuData[`${role}`].map((item, index) => (
        <React.Fragment key={index}>
          <div
            className={`${
              disabled && item?.link !== "dashboard" && `cursor-not-allowed`
            }`}
          >
            <NavLink
              key={item.link}
              to={`/${item.link}`}
              className={`group flex justify-between my-1 px-3 ${
                !showSidebar ? "py-2" : "py-[5px]"
              } hover:bg-accent rounded-md
               w-full
               dark:hover:bg-dark-bg-600 ${
                 disabled && item?.link !== "dashboard" && `disabled-link`
               }`}
              onClick={() => {
                setSelectedIndex(index);
              }}
            >
              <div className="flex items-center dark:text-secondary-text ">
                <IconContext.Provider
                  value={{ className: `font-bold text-lg` }}
                >
                  <i className="mx-2">{item.icon}</i>
                </IconContext.Provider>
                {showSidebar && (
                  <span className="font-semibold">{item.label}</span>
                )}
              </div>

              {!showSidebar && (
                <div className="relative hidden group-hover:block">
                  <div className="absolute text-white left-[12px] -top-2 bg-black z-50 rounded p-1 bg-opacity-90 before:block before:absolute before:-inset-1 before:rotate-45 before:w-2 before:h-2 before:top-3 before:-left-1	 before:bg-black before:bg-opacity-90 before:z-90">
                    <div className="px-2">{item.label}</div>

                    {index > 0 &&
                      role !== "super_admin" &&
                      index < menuData[`${role}`].length - 1 &&
                      lit[index - 1].map((item, index) => (
                        <div className="mx-2 rounded-md py-1 px-2 cursor-pointer dark:text-secondary-text text-sm">
                          <NavLink
                            key={index}
                            to={`${item.link}`}
                            className="flex px-2 py-[1px]"
                          >
                            {item.label}
                          </NavLink>
                        </div>
                      ))}
                  </div>
                </div>
              )}
              {showSidebar && role !== "super_admin" && (
                  index !== 0 && index < menuData[`${role}`].length - 1 && (
                    <i
                      className={`${
                        index === selectedIndex ? "rotate-180" : ""
                      } transition ease-in-out font-bold flex justify-center items-center`}
                    >
                      <MdKeyboardArrowDown />
                    </i>
                  )
              )}
            </NavLink>
          </div>
          {showSidebar &&
            role !== "super_admin" &&
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
      <div
        className={`fixed bottom-0 flex h-14 justify-center items-center gap-4 dark:text-secondary-text cursor-pointer hover:bg-accent ${
          showSidebar ? "w-[260px]" : "w-[80px]"
        } dark:hover:bg-dark-bg-600 border-t-2 border-t-accent dark:border-t-dark-bg-600`}
        onClick={() => {
          localStorage.setItem("sidebarCollapsed", showSidebar);
          setShowSidebar(!showSidebar);
        }}
      >
        <i
          className={`${
            showSidebar ? "" : "rotate-180"
          } transition ease-in-out`}
        >
          <HiOutlineChevronDoubleLeft />
        </i>
        {showSidebar && <p>Collapse sidebar</p>}
      </div>
    </div>
  );
}
