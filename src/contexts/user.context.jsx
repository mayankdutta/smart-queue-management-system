import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext({
  name: null,
  setName: () => null,
});

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    name: "", 
    accessToken: ""
  })

  const value = {userData, setUserData};
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
