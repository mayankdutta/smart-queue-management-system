import { useState } from 'react';
import { createContext } from 'react';
import { USER } from '../backendData';
import axios from 'axios';

export const UserContext = createContext({
  name: localStorage.getItem('name'),
  accessToken: localStorage.getItem('accessToken'),
});

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    name: localStorage.getItem('name'),
    accessToken: localStorage.getItem('accessToken'),
  });

  const setLocalStorage = ({ name, accessToken }) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('name', name);
  };

  const userSignup = async ({ name, email, password }) => {
    const response = await axios.post(`${USER.REGISTER}`, {
      name: name,
      email: email,
      password: password,
    });

    const accessToken = response.data.accessToken;

    setLocalStorage({ name: name, accessToken: accessToken });
  };

  const userLogin = async ({ email, password }) => {
    const response = await axios.post(`${USER.LOGIN}`, {
      email: email,
      password: password,
    });

    console.log(response.status);

    const name = response.data.name;
    const accessToken = response.data.accessToken;

    setLocalStorage({ name: name, accessToken: accessToken });
    setUserData({ name: name, accessToken: accessToken });
  };

  const userLogout = () => {
    localStorage.clear();
    setUserData({
      name: '',
      accessToken: '',
    });
  };

  const value = { userData, userLogin, userLogout, userSignup };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
