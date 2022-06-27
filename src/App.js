import Navbar from "./components/Navbar/Navbar";
import Status from "./components/Status/Status";
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
    return (
        <>
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route path={"/"} element={<Status/>}/>
                </Routes>
            </BrowserRouter>

        </>
    );
}

export default App;
