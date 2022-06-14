import { NavLink } from "react-router-dom";
import { menuData } from "../helpers/menuData";
import logo from "../assets/images/tube-no-bg.png";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useState, Fragment } from "react";
import { IconContext } from "react-icons/lib";

function MobileMenu({ user, setShowMenu }) {
  const role = !user
    ? "member"
    : user?.roles && user?.roles.includes("admin")
    ? "admin"
    : "member";

  const [show, setShow] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [disabled] = useState(!(user || user?.roles));
  // const lit = menuData.admin.filter(item => item.sublinks).map(item => item.sublinks)

  const lit = menuData[`${role}`]
    .filter((item) => item.sublinks)
    .map((item) => item.sublinks);

  return (
    <div className="bg-white dark:bg-dark-bg-700 h-screen w-11/12 top-0 left-0 bottom-0 shadow-sm z-20">
      <div className="bg-white dark:bg-dark-bg-700 flex justify-center items-center mb-6">
        <img src={logo} alt="tube" width={110} />
      </div>
      {menuData.admin.map((item, index) => (
        <Fragment key={index}>
          <NavLink
            key={index}
            to={`/${item.link}`}
            className={`flex justify-between mx-2 my-1 px-3 py-1 rounded-lg hover:bg-accent dark:hover:bg-dark-bg-600 ${
              disabled &&
              item?.link !== "dashboard" &&
              item?.link !== "profile" &&
              `disabled-link`
            }`}
            onClick={() => {
              setSelectedIndex(index);
              
              if (index === 0 || index === menuData[`${role}`].length - 1) {
                setShowMenu(false);
              }
            }}
          >
            <div className="flex items-center dark:text-secondary-text">
              <IconContext.Provider value={{ className: `font-bold text-lg` }}>
                <i className="mx-2">{item.icon}</i>
              </IconContext.Provider>
              <span className="font-semibold">{item.label}</span>
            </div>
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
          </NavLink>
          {index === selectedIndex &&
            index > 0 &&
            index < menuData[`${role}`].length - 1 && (
              <div className="bg-accent dark:bg-dark-bg-600 mx-3 rounded-lg my-2 py-1 px-3 cursor-pointer dark:text-secondary-text">
                {lit[index - 1].map((item, index) => (
                  <NavLink
                    key={index}
                    to={`${item.link}`}
                    className="flex px-2 py-1 rounded-md hover:bg-gray-200 hover:dark:bg-dark-bg-700"
                    onClick={() => setShowMenu(false)}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            )}
        </Fragment>
      ))}
    </div>
  );
}

export default MobileMenu;
