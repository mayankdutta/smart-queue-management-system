import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext({
  name: localStorage.getItem("name"),
  accessToken: localStorage.getItem("accessToken"),
});

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    name: localStorage.getItem("name"),
    accessToken: localStorage.getItem("accessToken"),
  });

  const userLogin = (user) => {
    localStorage.setItem("accessToken", user.accessToken);
    localStorage.setItem("name", user.name);
    setUserData(user);
  };

  const userLogout = () => {
    localStorage.clear();
    setUserData({
      name: "",
      accessToken: "",
    });
  };

  const value = { userData, userLogin, userLogout };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
/*
 localStorage.setItem("access-token", response.data.accessToken);
 localStorage.setItem("name", name.toString()); 
*/
