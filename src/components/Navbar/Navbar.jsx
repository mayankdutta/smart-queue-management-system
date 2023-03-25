import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/user.context';
import './Navbar.css';

function Navbar() {
  const { userData, userLogout } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = () => {
    userLogout();
    navigate('/');
  };

  return (
    <div
      className={
        'py-2 px-4 my-2 mx-2 rounded-lg flex  justify-between bg-slate-200'
      }
    >
      <div className="flex">
        <Link to={'/'}>
          <div className={'btn-page'}> home</div>
        </Link>

        <Link
          className={'btn-page'}
          to={userData.name ? '/register_patient' : '/login'}
        >
          register_patient
        </Link>

        {userData.name && (
          <Link className="btn-page" to={'user_patient'}>
            user_patients{' '}
          </Link>
        )}
      </div>

      <div className={'flex space-x-2 '}>
        {!userData.name ? (
          <>
            <Link to={'/signup'}>
              <h3 className={'btn-signup'}> Register</h3>
            </Link>
            <Link to={'/login'}>
              <h3 className={'btn-login'}>Login</h3>
            </Link>
          </>
        ) : (
          <>
            <h3 className={'btn-signup'}> {userData.name}</h3>
            <h3
              className={'btn-login'}
              style={{ cursor: 'pointer' }}
              onClick={logout}
            >
              Logout
            </h3>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
