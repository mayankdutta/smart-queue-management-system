import { useState } from 'react';
import { createContext } from 'react';
import { USER } from '../backendData';
import axios from 'axios';

export const UserContext = createContext({
  name: localStorage.getItem('name'),
  accessToken: localStorage.getItem('accessToken'),
  email: localStorage.getItem('email'),
});

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    name: localStorage.getItem('name'),
    accessToken: localStorage.getItem('accessToken'),
    email: localStorage.getItem('email')
  });

  const setLocalStorage = ({ email ,name, accessToken }) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
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

    setLocalStorage({ name: name, accessToken: accessToken, email: email });
    setUserData({ name: name, accessToken: accessToken, email: email });
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
