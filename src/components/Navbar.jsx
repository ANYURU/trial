import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useAuth } from "../auth/AuthContext";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import ProfileModal from "./Modals/ProfileModal";
import logo from "../assets/images/tube.svg";
import { object } from "yup";

function Navbar({ user, showSidebar }) {
  const [show, setShow] = useState(false);
  const { darkMode, toggleDarkMode } = useAuth();
  const navigate = useNavigate();
  const [imageLoad, setImageLoad] = useState(false);

  if (show) {
    window.onclick = (event) => {
      if (!event.target.matches(".dialog")) {
        setShow(false);
      }
    };
  }

  return (
    <div
      className={` dark:bg-dark-bg-700 z-20 bg-white fixed top-0 right-0 h-[65px] flex border-b-2 border-b-accent dark:border-b-dark-bg-600 navbar justify-between items-center p-2`}
    >
      <div className={`${!imageLoad && "animate-pulse bg-accent"} pl-4 w-[80px] h-10 `}>
        <img
          src={logo}
          alt="tube"
          width={50}
          loading="lazy"
          onLoad={() => setImageLoad(true)}
        />
      </div>

      {Object.keys(user).length > 0 && !user?.fullname && (
        <div
          className="bg-accent-red p-2 flex justify-center items-center text-white rounded-md cursor-pointer"
          onClick={() => {
            navigate("/application");
          }}
        >
          <p>Complete the application</p>
        </div>
      )}
      <div className="flex items-center">
        <div className="mx-3">
          <DarkModeSwitch
            style={{ marginBottom: "0" }}
            checked={darkMode}
            onChange={() => toggleDarkMode()}
            size={30}
          />
        </div>
        <div
          className="flex items-end relative mr-5"
          onClick={(event) => {
            setShow(!show);
            event.stopPropagation();
          }}
        >
          <div className="flex items-center cursor-pointer dialog">
            <div className="text-center">
              {Object.keys(user).length === 0 ? (
                <>
                  <p className="animate-pulse bg-accent h-3 w-20 mb-1"></p>
                  <p className="animate-pulse bg-accent h-3 w-14"></p>
                </>
              ) : (
                <>
                  <p className="mb-0 cursor-pointer dark:text-white">
                    Hello
                    {user?.fullname !== undefined && user.fullname !== null
                      ? ` ${user?.fullname.split(" ")[0]}`
                      : " You"}
                  </p>
                  <p
                    className={`text-sm ${
                      user?.member_status === "active"
                        ? "text-green-600"
                        : "text-accent-red"
                    }`}
                  >
                    {user?.member_status
                      ? user.member_status
                      : "Not registered"}
                  </p>
                </>
              )}
            </div>
            {Object.keys(user).length > 0 ? (
              user?.avatar ? (
                <div
                  className="w-10 h-10 bg-accent rounded-full mx-2 overflow-hidden bg-cover"
                  style={{ backgroundImage: `url(${user?.avatar})` }}
                ></div>
              ) : (
                <div className="w-10 h-10 bg-accent dark:bg-dark-bg-600 dark:text-secondary-text rounded-full mx-2 flex justify-center font-bold items-center overflow-hidden">
                  {user?.fullname !== undefined &&
                    user.fullname !== null &&
                    ` ${user?.fullname.split("")[0]}`}
                </div>
              )
            ) : (
              <div className="animate-pulse rounded-full mx-2 bg-accent h-10 w-10"></div>
            )}
            <i className="dark:text-white">
              <MdKeyboardArrowDown />
            </i>
          </div>
          <ProfileModal show={show} setShow={setShow} />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
