import { useState, useEffect, useContext, createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const authorizationToken = `Bearer ${token}`;

  const API = import.meta.env.VITE_APP_URI_API;

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
    userAuthentication(serverToken); // Call userAuthentication after setting token
  };

  const isLoggedIn = !!token;
  console.log("isLoggedIn", isLoggedIn, token);

  const LogoutUser = () => {
    setToken("");
    setUser("");
    localStorage.removeItem("token");
  };

  const userAuthentication = async (authToken = authorizationToken) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API}/api/auth/user`, {
        method: "GET",
        headers: {
          Authorization: authToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("user data: ", data);
        setUser(data);
      } else {
        console.error("Error fetching user data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCollegeById = async (collegeId) => {
    try {
      const response = await fetch(`${API}/api/admin/colleges/${collegeId}/edit`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("Failed to fetch college");
        return null;
      }
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  useEffect(() => {
    if (token) {
      userAuthentication();
    } else {
      setIsLoading(false);
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        storeTokenInLS,
        LogoutUser,
        user,
        authorizationToken,
        isLoading,
        API,
        fetchCollegeById,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
