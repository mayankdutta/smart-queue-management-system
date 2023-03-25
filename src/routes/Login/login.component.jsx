import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import { UserContext } from '../../contexts/user.context';

import FormInput from '../../components/formInput/formInput.components';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LogIn() {
  const navigate = useNavigate();
  const [toastId, setToastId] = React.useState();

  const [loginData, setLoginData] = React.useState({
    email: '',
    password: '',
  });
  const { userLogin } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await userLogin({
        email: loginData.email,
        password: loginData.password,
      });

      toast.update(toastId, {
        render: 'Success',
        type: 'success',
        isLoading: false,
      });
      navigate('/');
    } catch (err) {
      toast.update(toastId, {
        render: 'Login Failed',
        type: 'error',
        isLoading: false,
      });
      console.warn(err.message);
    }
  };

  const CloseButton = ({ closeToast }) => (
    <p style={{ cursor: 'poiner' }} className="" onClick={closeToast}>
      ❌
    </p>
  );

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setLoginData({ ...loginData, [name]: value });
  };

  const toastLoading = () => {
    setToastId(
      toast.loading('please wait', {
        position: toast.POSITION.BOTTOM_LEFT,
        closeButton: CloseButton,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        autoClose: 2000,
      })
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="form"
    >
      <div className="auth-style">
        <FormInput
          label="Email Address"
          name="email"
          id="email"
          type="email"
          value={loginData.email}
          onChange={handleChange}
          autoFocus
        />
        <FormInput
          label="Password"
          name="password"
          id="password"
          type="password"
          value={loginData.password}
          onChange={handleChange}
        />
        <button className="btn-submit " type="submit" onClick={toastLoading}>
          Login
        </button>
        <ToastContainer />
      </div>
    </form>
  );
}
