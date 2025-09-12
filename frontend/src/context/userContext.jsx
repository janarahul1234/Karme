import { createContext, useContext, useState } from "react";

const UserContext = createContext();

const INITIAL_VALUE = {};

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const value = localStorage.getItem("user");
      return value ? JSON.parse(value) : INITIAL_VALUE;
    } catch (error) {
      console.error("Failed to load user:", error);
      return INITIAL_VALUE;
    }
  });

  const login = (userData, token) => {
    try {
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);
      setUser(userData);
    } catch (error) {
      console.error("Failed to login user:", error);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(INITIAL_VALUE);
    } catch (error) {
      console.error("Failed to logout user:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used inside a UserProvider");
  }
  return context;
};

export default UserProvider;
