import { useContext, useState, useEffect, createContext } from "react";
import { supabase } from "../helpers/supabase";
import { io } from 'socket.io-client' 

// create a context for authentication
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const theme = localStorage.getItem("darkMode") || false;
  const [darkMode, setDarkMode] = useState(JSON.parse(theme));
  const [socket, setSocket] = useState(io("ws:https://tube-chat-server.herokuapp.com/", {autoConnect: false}))

  useEffect(() => {
    // get session data if there is an active session
    const session = supabase.auth.session();
    setUser(session?.user ?? null);
    setLoading(false);

    // listen for changes to auth
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
        
        if( event === 'SIGNED_IN' ) {
          socket.emit("login", session.user.id)
          setSocket(socket)
        }
      }
    );

    // cleanup the useEffect hook
    return () => {
      listener?.unsubscribe();
    };
  }, []);

  const html = document.querySelector("html");
  if (darkMode || localStorage.getItem("darkMode") === true) {
    html.classList.add("darkClass");
  } else {
    html.classList.remove("darkClass");
  }

  // create signUp, signIn, signOut functions, toggleDarkMode
  const value = {
    signUp: (data) => supabase.auth.signUp(data),
    signIn: (data) => supabase.auth.signIn(data),
    signOut: () => supabase.auth.signOut(),
    toggleDarkMode: () => {
      localStorage.setItem("darkMode", !darkMode);
      setDarkMode(() => !darkMode);
    },
    user,
    setUser,
    loading,
    setLoading,
    darkMode,
    socket,
    setSocket
  };

  // use a provider to pass down the value
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// export the useAuth hook
export const useAuth = () => {
  return useContext(AuthContext);
};
