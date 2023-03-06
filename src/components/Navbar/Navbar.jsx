import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/user.context';
// import './Navbar.css';

import ButtonAppBar from './NavBar.styles';

function Navbar() {
  const { userData, userLogout } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = () => {
    userLogout();
    navigate('/');
  };

  const pages = [
    ['HOME', '/'],
    ['REGISTER PATIENTS', '/register_patient'],
    ['YOUR PATIENTS', '/registered_patients'],
  ];

  const setting_login = [
    ['PROFILE', '/profile'],
    ['ACCOUNT', '/account'],
    ['DASHBOARD', '/dashboard'],
    ['LOGOUT', '/logout'],
  ];

  const setting_logout = [
    ['LOGIN', '/login'],
    ['REGISTER', '/signup'],
  ];

  return (
    <ButtonAppBar
      pages={pages}
      settings={userData.name ? setting_login : setting_logout}
    logout={logout}
    />
  );
}

export default Navbar;
