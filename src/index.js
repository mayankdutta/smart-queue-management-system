import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import LogIn from './components/Login';
import SignUp from './components/SignUp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Router>
		<Routes>
			<Route path='/' element={<App />} />
			<Route path='/login' element={<LogIn />} />
			<Route path='/signup' element={<SignUp />} />
		</Routes>
	</Router>
);