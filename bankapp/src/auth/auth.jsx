import { useState, createContext, useContext } from "react";
import { useDispatch } from "react-redux";
import {  Userlogin } from "../redux/actions/AuthAction"; // Assuming this exists

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

  // Check for user data in localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const Login = async (username, password) => {
    try {
        console.log(username, password);
        
      // Dispatch login action and await for the result
      const responseData =await Userlogin({username, password}); // Ensure login is an async action

      // If login is successful, store user and token in localStorage
      if (responseData && responseData.user && responseData.user.token) {
        localStorage.setItem("user", JSON.stringify(responseData.user.customer));
        localStorage.setItem("token", responseData.user.token);
        localStorage.setItem("role", responseData.user.role);
        setUser(responseData.user.customer);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = () => {
    // Clear token and user from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    setUser(null);
  };
  const getuser = () => {
    return localStorage.getItem("user");
  };
  const getRole = () => {
    return localStorage.getItem("role");
  };
  return (
    <AuthContext.Provider value={{ user, Login, logout,getuser,getRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
