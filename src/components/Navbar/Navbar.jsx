import React from 'react';
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import "./Navbar.css"

function Navbar() {
    const name = localStorage.getItem("name");
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/");
    }

    return (
        <div className={"nav"} style={{display: "flex", gap: "2rem", margin: "8px 2px 2px 8px"}}>
            {
                !name ?
                    <div className={"authenticate"}>
                        <Link to={"/signup"}>
                            <h3>signup</h3>
                        </Link>
                        <Link to={"/login"}>
                            <h3>Login</h3>
                        </Link>
                    </div>
                    :
                    <div className={"authenticate"}>
                        <h3> {name}</h3>
                        <button onClick={logout}>
                            Logout
                        </button>
                    </div>
            }
        </div>
    );
}

export default Navbar;