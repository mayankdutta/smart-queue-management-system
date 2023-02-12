import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { UserContext } from "../../contexts/user.context";
import toast, { Toaster } from "react-hot-toast";

import FormInput from "../../components/formInput/formInput.components";

export default function LogIn() {
  const navigate = useNavigate();
  const [status, setStatus] = React.useState("");

  const [loginData, setLoginData] = React.useState({
    email: "",
    password: "",
  });
  const { userLogin } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading");

    try {
      userLogin({
        email: loginData.email,
        password: loginData.password,
      });

      setStatus("success");
      navigate("/");
    } catch (err) {
      setStatus("failure");
      console.warn(err.message);
    }
  };

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    console.log(name, value);
    setLoginData({ ...loginData, [name]: value });
  };

  return (
    <>
      <center>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>
        </form>
      </center>
    </>
  );
}
