import { Outlet, Navigate, useLocation } from "react-router-dom";
import { Sidebar, Navbar, MobileNav } from "../components";
import { useMediaQuery } from "../hooks";
import { useAuth } from "../auth/AuthContext";
import { useEffect, useState } from "react";
import { getProfile } from "../helpers/getProfile";
import { Spinner } from "../components";
import ErrorBoundary from "../components/ErrorBoundary";
import Chat from '../components/Chat/Chat'
import { supabase } from "../helpers/supabase";

const PrivateRoute = ({ allowedRoles }) => {
  const matches = useMediaQuery("(min-width: 800px)");
  const [ disabled, setDisabled ] = useState(true)

  const [showSidebar, setShowSidebar] = useState(
    !JSON.parse(localStorage.getItem("sidebarCollapsed")) || false
  );

  const { user, darkMode } = useAuth();
  const [profile, setProfile] = useState({});
  const [roles, setRoles] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [members, setMembers] = useState([])


  const fetch_members = async () => {
    const {data, error} = await supabase.rpc('possible_chats')

    if (error) console.log(error)
    setMembers(data)
}


  useEffect(() => {
    // Getting information that is required in all components.
        
    getProfile(user)
      .then((data) => {
        if (data) {
          const { roles } = data;
          setRoles(roles);
          setProfile(data);
          setDisabled(!(roles && roles?.length > 0))
        }
      })
      .then(() => setLoading(false))
      .then(fetch_members())
      .catch((error) => console.log(error));

  }, [user?.session]);
  
  return user?.role === "authenticated" ? (
    matches ? (
      <div className={`${darkMode ? "dark" : ""}`}>
        <div
          className={`flex flex-col min-h-screen  w-screen bg-back dark:bg-dark-bg border-red-200 border-2`}
        >
          <Navbar user={profile} showSidebar={showSidebar} />
          <div
            className={`h-[calc(100vh-68px)] overflow-hidden mt-[65px] w-screen flex flex-col`}
          >
            <Sidebar
              user={profile}
              showSidebar={showSidebar}
              setShowSidebar={setShowSidebar}
              disabled={disabled}
            />
            <div
              className={`${
                showSidebar ? "ml-[265px]" : "ml-[85px]"
              } flex-grow`}
            >
              {profile &&
                (allowedRoles !== undefined ? (
                  roles ? (
                    roles.find((role) => allowedRoles.includes(role)) ? (
                      loading ? (
                        <div className="flex-grow mx-5 my-2 overflow-y-auto h-full">
                          <Spinner />
                        </div>
                      ) : (
                        <ErrorBoundary>
                          <Outlet context={[user, profile, setProfile, roles]} />
                        </ErrorBoundary>
                      )
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
                        <Spinner />
                      ) : (
                        <ErrorBoundary>
                          <Outlet context={[user, profile, setProfile, roles]} />
                        </ErrorBoundary>
                      )}
                    </div>
                  )
                ) : (
                  <div className="flex-grow mx-5 mt-5 overflow-y-auto">
                    {loading ? (
                      <Spinner />
                    ) : (
                      <ErrorBoundary>
                        <Outlet context={[user, profile, setProfile, roles]} />
                      </ErrorBoundary>
                    )}
                  </div>
                ))}
            </div> 
          </div>
          {/* <Chat user={user} profile={profile} members={members}/> */}
        </div>
      </div>
    ) : (
      <div className={`${darkMode ? "dark" : ""}`}>
        <div className={`sm-container bg-back dark:bg-dark-bg`}>
          <div className="">
            <MobileNav user={profile} />
          </div>
          <div className="flex flex-col min-h-[calc(100vh-70px)] px-2 mt-[70px]">
            <ErrorBoundary>
              <Outlet context={[profile]} />
            </ErrorBoundary>
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
