import Navbar from "./components/Navbar/Navbar";
import Status from "./components/Status/Status";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LogIn from "./components/Login";
import SignUp from "./components/SignUp";
import React, {useState} from "react";
import "./App.css"

function App() {
    const [refresh, setRefresh] = useState(false);
    return (
        <>
            <BrowserRouter>
                <main>
                    <Navbar/>
                    <Routes>
                        <Route path={"/"} element={<Status/>}/>
                        <Route path='/login' element={<LogIn setRefresh={setRefresh}/>}/>
                        <Route path='/signup' element={<SignUp setRefresh={setRefresh}/>}/>
                    </Routes>
                </main>
            </BrowserRouter>
        </>
    );
}

export default App;
