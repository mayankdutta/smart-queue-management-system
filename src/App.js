import Navbar from "./components/Navbar/Navbar";
import Status from "./components/Status/Status";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LogIn from "./components/Login";
import SignUp from "./components/SignUp";
import React from "react";

function App() {
    return (
        <>
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route path={"/"} element={<Status/>}/>
                    <Route path='/login' element={<LogIn />} />
                    <Route path='/signup' element={<SignUp />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
