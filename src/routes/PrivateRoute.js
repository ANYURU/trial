import { Outlet, Navigate, useLocation } from "react-router-dom";
import { Sidebar, Navbar, MobileNav } from "../components";
import { useMediaQuery } from "../hooks";
import { useAuth } from "../auth/AuthContext";
import { useEffect, useState } from "react";
import { getProfile } from "../helpers/getProfile";
import { Loader } from "../components";
import { ToastContainer } from "react-toastify";

const PrivateRoute = ({ allowedRoles }) => {
  const matches = useMediaQuery("(min-width: 800px)");
  const { user, darkMode } = useAuth();
  const [profile, setProfile] = useState({});
  const [roles, setRoles] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    // Getting information that is required in all components.
    getProfile(user)
      .then((data) => {
        if (data) {
          const { roles } = data;
          setRoles(roles);
          setProfile(data);
        }
      })
      .then(() => setLoading(false))
      .catch((error) => console.log(error));
  }, [user]);

  return user?.role === "authenticated" ? (
    matches ? (
      <div className={`${darkMode ? "dark" : ""}`}>
        <div
          className={`flex flex-col min-h-screen  w-screen outline outline-green-700 overflow-y-auto bg-back dark:bg-dark-bg`}
        >
          <Navbar user={profile} showSidebar={showSidebar} />
          <div className={`min-h-screen w-screen outline-red-600`}>
            <div className="mt-[65px]">
              <Sidebar
                user={profile}
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
              />
            </div>
            <div className={`${showSidebar ? "ml-[265px]" : "ml-[85px]"}`}>
              {profile &&
                (allowedRoles !== undefined ? (
                  roles ? (
                    roles.find((role) => allowedRoles.includes(role)) ? (
                      <div className="flex-grow mx-5 overflow-y-auto h-full">
                        <ToastContainer />
                        {loading ? (
                          <Loader />
                        ) : (
                          <Outlet context={[profile, setProfile]} />
                        )}
                      </div>
                    ) : (
                      <div className="flex-grow mt-5 overflow-y-auto">
                        <Navigate
                          to="unauthorized"
                          state={{ from: location }}
                          replace
                        />
                      </div>
                    )
                  ) : (
                    <div className="flex-grow mx-5 mt-5 overflow-y-auto">
                      {loading ? (
                        <Loader />
                      ) : (
                        <Outlet context={[profile, setProfile]} />
                      )}
                    </div>
                  )
                ) : (
                  <div className="flex-grow mx-5 mt-5 overflow-y-auto">
                    {loading ? (
                      <Loader />
                    ) : (
                      <Outlet context={[profile, setProfile]} />
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className={`${darkMode ? "dark" : ""}`}>
        <div className={`sm-container bg-back dark:bg-dark-bg`}>
          <div className="">
            <MobileNav user={profile} />
          </div>
          <div className="flex flex-col h-screen px-2 mt-20">
            <Outlet context={[profile]} />
          </div>
        </div>
      </div>
    )
  ) : (
    <>
      <Navigate to="/" state={{ from: location }} replace />
    </>
  );
};

export default PrivateRoute;
