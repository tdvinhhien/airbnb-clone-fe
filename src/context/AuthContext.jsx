import React, { createContext, useContext, useState } from "react";
import { AuthAPI } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (credentials) => {
    const res = await AuthAPI.login(credentials);
    if (res.data?.content) {
      const { user, token } = res.data.content;
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("accessToken", token);
    }
    return res;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
  };

  const signup = async (data) => {
    return await AuthAPI.signup(data);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
