import { createContext, useState, useEffect } from "react";
import axios from "axios";
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
  const [loginError, setLoginError] = useState(null);
  const [cartCount, setCartCount] = useState(0);

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
      fetchCartCount();
      localStorage.setItem("isLoggedIn", "true");
      setLoginError(null);
    } catch (error) {
      console.error("Login error:", error);
      if (error.response && error.response.status === 400) {
        // Check for 400
        setLoginError("Invalid username or password");
      } else {
        setLoginError("An error occurred. Please try again later");
      }
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserInfo(null);
    setCartCount(0);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("cartCount");
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

  const fetchCartCount = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8082/api/cart/view-cart",
        {
          withCredentials: true,
        }
      );
      console.log(response.data.cartItems);
      const initialCount = calculateCartCount(response.data.cartItems);
      setCartCount(initialCount);
      localStorage.setItem("cartCount", initialCount);
    } catch (error) {
      console.error("Error fetching initial cart count:", error);
    }
  };

  const calculateCartCount = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  useEffect(() => {
    console.log("Inside the use effect of context");
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedCartCount = localStorage.getItem("cartCount");
    if (storedIsLoggedIn) {
      fetchUserInfo();
      setIsLoggedIn(true);

      if (storedCartCount) {
        setCartCount(parseInt(storedCartCount, 10));
      } else {
        fetchCartCount();
      }
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        userInfo,
        login,
        logout,
        fetchUserInfo,
        setUserInfo,
        loginError,
        setCartCount,
        cartCount,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
