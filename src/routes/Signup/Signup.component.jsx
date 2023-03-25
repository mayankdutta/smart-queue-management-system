import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import { useEffect, useContext, useState } from 'react';
import { UserContext } from '../../contexts/user.context';

import FormInput from '../../components/formInput/formInput.components';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp() {
  const [toastId, setToastId] = useState();
  const navigate = useNavigate();
  const { userLogin, userSignup } = useContext(UserContext);

  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { firstName, lastName, email, password } = registerData;

    try {
      await userSignup({
        name: firstName + ' ' + lastName,
        email: email,
        password: password,
      });

      toast.update(toastId, {
        render: 'Success',
        type: 'success',
        isLoading: false,
      });
      navigate('/');
    } catch (err) {
      toast.update(toastId, {
        render: 'Signup Failed',
        type: 'error',
        isLoading: false,
      });
      console.warn(err.message);
    }
  };

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    console.log(name + ' , ' + value);

    setRegisterData({ ...registerData, [name]: value });
  };

  const toastLoading = () => {
    setToastId(
      toast.loading('please wait', {
        position: toast.POSITION.BOTTOM_LEFT,
      })
    );
  };
  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="auth-style">
        <FormInput
          onChange={handleChange}
          label="First Name"
          name="firstName"
          type="text"
          value={registerData.firstName}
          id=""
        />
        <FormInput
          onChange={handleChange}
          label="Last Name"
          name="lastName"
          type="text"
          value={registerData.lastName}
          id=""
        />
        <FormInput
          onChange={handleChange}
          label="Email"
          name="email"
          type="email"
          value={registerData.email}
          id=""
        />
        <FormInput
          onChange={handleChange}
          label="Password"
          name="password"
          type="password"
          value={registerData.password}
          id=""
        />

        <button type="submit" onClick={toastLoading} className="btn-submit">
          Register
        </button>

        <Link
          href="/login"
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
        >
          Already have an account? Sign in
        </Link>

        <ToastContainer />
      </div>
    </form>
  );
}
