import Navbar from './components/Navbar/Navbar';
import Status from './components/Status/Status';
import RegisterPatient from './routes/RegisterPatient/registerPatient.component';
import UserPatients from './routes/userPatients/userPatients.component';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LogIn from './routes/Login/login.component';
import Details from './components/detailsPage';
import SignUp from './routes/Signup/Signup.component';
import UpdatePatient from './routes/UpdatePatient/UpdatePatient.component';
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <main>
          <Navbar />
          <Routes>
            <Route path={'/'} element={<Status />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/register_patient" element={<RegisterPatient />} />
            <Route path="/user_patient" element={<UserPatients />} />
            <Route path="/update_patient/:id" element={<UpdatePatient />} />
            <Route path="/details" element={<Details />} />
            {/*
                        <Route path='/patients' element={<SIGNUP setRefresh={setRefresh}/>}/>
                        <Route path='/delete_patient' element={<SIGNUP setRefresh={setRefresh}/>}/>
                        <Route path='/get_patient' element={<SIGNUP setRefresh={setRefresh}/>}/>
                        <Route path='/register_patient' element={<SIGNUP setRefresh={setRefresh}/>}/>
                             */}
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
