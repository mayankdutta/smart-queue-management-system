import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import "./Navbar.css";

function Navbar() {
  const { userData, userLogout } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = () => {
    userLogout();
    navigate("/");
  };

  return (
    <div className={"nav"}>
      <Link to={"/"}>
        <div className={"home"}> home</div>
      </Link>
      {!userData.name ? (
        <Link className={"home"} to={"/login"}>
          Register Patient
        </Link>
      ) : (
        <Link className={"home"} to={"/register_patient"}>
          Register Patient
        </Link>
      )}
      {!userData.name ? (
        <div className={"authenticate"}>
          <Link to={"/signup"}>
            <h3 className={"signup"}> Register</h3>
          </Link>
          <Link to={"/login"}>
            <h3 className={"login"}>Login</h3>
          </Link>
        </div>
      ) : (
        <div className={"authenticate"}>
          <h3 className={"username"}> {userData.name}</h3>
          <h3
            className={"logout"}
            style={{ cursor: "pointer" }}
            onClick={logout}
          >
            Logout
          </h3>
        </div>
      )}
    </div>
  );
}

export default Navbar;
