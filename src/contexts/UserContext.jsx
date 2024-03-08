import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const UserContext = createContext({
  isLoggedIn: false,
  userInfo: {},
  login: () => {},
  logout: () => {},
});

function storeRolesInLocalStorage(userInfo) {
  console.log("Loggin userINFO from context");
  console.log(userInfo);
  if (!userInfo || !userInfo.roles) {
    return;
  }

  const roleNames = userInfo.roles.map((role) => role.name);
  localStorage.setItem("userRoles", JSON.stringify(roleNames));
}

const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [formError, setFormError] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [userImage, setUserImage] = useState(null);

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
      setFormError(null);
    } catch (error) {
      console.error("Login error:", error);
      if (error.response && error.response.status === 400) {
        setFormError("Invalid username or password");
      } else {
        setFormError("An error occurred. Please try again later");
      }
    }
  };

  const register = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/register",
        formData
      );

      console.log("Registration Response:", response);
      toast.success("Registered succesfully!");
      setFormError(null);
    } catch (error) {
      console.error("Registration error:", error);
      if (error.response && error.response.data.detail) {
        setFormError(error.response.data.detail);
      } else {
        setFormError("An error occurred. Please try again later");
      }
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserInfo(null);
    setCartCount(0);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("cartCount");
    localStorage.removeItem("userRoles");
  };

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/users/myInfo",
        { withCredentials: true }
      );
      console.log("Fetched user data from user context?");
      setUserInfo(response.data);
      console.log(response.data);
      storeRolesInLocalStorage(response.data);
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
        loginError: formError,
        registerError: formError,
        setCartCount,
        cartCount,
        setUserImage,
        userImage,
        register,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
