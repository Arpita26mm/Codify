import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const authorizationToken = token ? `Bearer ${token}` : null;

  const storeTokenInLS = (serverToken) => {
    //                                            now this has become a reusable func...
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  let isLoggedIn = !!token; // True/False
  console.log("is logged in ", isLoggedIn);

  //tackling logout functionality
  const LogoutUser = () => {
    setToken(null);
    return localStorage.removeItem("token");
  };

  //JWT Authentication - to get currently loggedIn user's data

  const userAuthentication = async () => {
    if (!token) return;
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/user`,
        {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      if (response.ok) {
        const data = await response.json(); //converting data to json
        console.log("user Data", data.userData);
        setUser(data.userData);
      } else {
        //Handle Invalid token case
        LogoutUser();
      }
    } catch (error) {
      console.log("Error fetching user data");
      LogoutUser();
    }
  };

  useEffect(() => {
    userAuthentication();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        storeTokenInLS,
        LogoutUser,
        user,
        authorizationToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the provider");
  }
  return authContextValue;
};
