import React from 'react';
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";

function Navbar() {
    const name = localStorage.getItem("name");
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate("/");
    }

    return (
        <div style={{display: "flex", gap: "2rem", backgroundColor: "yellow", margin: "8px 2px 2px 8px"}}>
            {
                !name ?
                    <>
                        <Link to={"/signup"}>
                            <h3>signup</h3>
                        </Link>
                        <Link to={"/login"}>
                            <h3>Login</h3>
                        </Link>
                    </>
                    :
                    <>
                        <h3> {name}</h3>
                        <button onClick={logout}>
                            <h3>Logout</h3>
                        </button>
                    </>
            }
        </div>
    );
}

export default Navbar;