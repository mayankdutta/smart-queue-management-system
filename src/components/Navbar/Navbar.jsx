import React from 'react';
import {Link} from "react-router-dom";

function Navbar() {
    return (
        <>
            <Link to={""}>
                <h4 style={{backgroundColor: "yellow"}}>Option 1</h4>
            </Link>
        </>
    );
}

export default Navbar;