import { createContext, useState, useEffect } from "react";
import axios from "axios"; // Or any other HTTP client library
import { useNavigate } from "react-router-dom";

export const UserContext = createContext({
  isLoggedIn: false,
  userInfo: {},
  login: () => {},
  logout: () => {},
});

const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const login = async (username, password) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        {
          username,
          password,
        },
        { withCredentials: true }
      );
      console.log("Login Response:", response);
      console.log("Logged in I guess");
      await fetchUserInfo();
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserInfo(null);
  };

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/users/myInfo",
        { withCredentials: true }
      );
      console.log("Fetched user data from user context?");
      setUserInfo(response.data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    console.log("Inside the use effect of context");
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (storedIsLoggedIn) {
      fetchUserInfo();
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ isLoggedIn, userInfo, login, logout, fetchUserInfo }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
