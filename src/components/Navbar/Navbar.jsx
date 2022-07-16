import React from 'react';
import {Link} from "react-router-dom";

function Navbar() {
    return (
        <div style={{display: "flex" , gap: "2rem"}}>
            <Link to={""}>
                <h4 style={{backgroundColor: "yellow"}}>Option 1</h4>
            </Link>
            <Link to={"/login"}>
                <h4 style={{backgroundColor: "yellow"}}>Login</h4>
            </Link>
            <Link to={"/signup"}>
                <h4 style={{backgroundColor: "yellow"}}>Signup</h4>
            </Link>
        </div>
    );
}

export default Navbar;