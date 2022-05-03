import { useContext, useState, useEffect, createContext } from 'react';
import { supabase } from '../helpers/supabase';
import { getProfile } from '../helpers/getProfile';

// create a context for authentication
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // create state values for user data and loading
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // get session data if there is an active session
    const session = supabase.auth.session();

    setUser(session?.user ?? null);
    setLoading(false);

    // listen for changes to auth
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if(event === 'SIGNED_IN') {
          if(session?.user) {
            console.log("voila")
            const { user } = session
            getProfile(user)
            .then((profile) => {
              console.log(profile)
              session?.user ? setUser({...session?.user, profile: { ...profile }}) : setUser(null)
              setLoading(false);
            })
            .catch(error => console.log(error))
          }
        }        
      }
    );

    // cleanup the useEffect hook
    return () => {
      listener?.unsubscribe();
    };
  }, []);

  // create signUp, signIn, signOut functions
  const value = {
    signUp: data => supabase.auth.signUp(data),
    signIn: data => supabase.auth.signIn(data),
    signOut: () => supabase.auth.signOut(),
    user, setUser
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