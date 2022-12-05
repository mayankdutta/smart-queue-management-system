import Navbar from "./components/Navbar/Navbar";
import Status from "./components/Status/Status";
import RegisterPatient from "./components/RegisterPatients";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LogIn from "./components/Login";
import Details from './components/detailsPage'
import SignUp from "./components/SignUp";
import UpdatePatient from "./components/UpdatePatients"
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
                        <Route path='/register_patient' element={<RegisterPatient/>}/>
                        <Route path='/update_patient/:id' element={<UpdatePatient/>}/>
                        <Route path='/details' element={<Details/>}/>
                        {
                            /*
                        <Route path='/patients' element={<SIGNUP setRefresh={setRefresh}/>}/>
                        <Route path='/delete_patient' element={<SIGNUP setRefresh={setRefresh}/>}/>
                        <Route path='/get_patient' element={<SIGNUP setRefresh={setRefresh}/>}/>
                        <Route path='/register_patient' element={<SIGNUP setRefresh={setRefresh}/>}/>
                             */
                        }

                    </Routes>
                </main>
            </BrowserRouter>
        </>
    );
}

export default App;
