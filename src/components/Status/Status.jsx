import React from 'react';
import {useEffect, useState} from "react";
import useHeap from "../../Hooks/useHeap";
import PrintQueue from "../PrintQueue/printQueue";
import Form from "../Form/Form";
import "./Status.css"
import {Data, moreData} from "./data"
import CountDown from "../Countdown/Countdown"
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {Backend} from "../../backendData";


const link = Backend.link;

function Status(url, config) {
    const [appointments, setAppointments] = useState(Data);
    const [patientName, setPatientName] = useState("");
    const [usersPatients, setUsersPatients] = useState([]);
    const [currentPatient, setCurrentPatient] = useState(0);
    const [trigger, setTrigger] = useState(0);
    const navigate = useNavigate();

    const data = useHeap(appointments);


    const [counter, setCounter] = useState(0);

    const authenticationTokenNumber = localStorage.getItem("access-token");
    const headers = {
        'Content-type': "application/json",
        'access-token': (authenticationTokenNumber)
    };


    useEffect(() => {
        try {
            fetchUserPatients();
        } catch (err) {
            console.warn(err);
        }

        // const interval = setInterval(() => {
        //     setCounter((prevCounter) => (prevCounter % 5 + 1));
        // }, 1000);
        //
        // return () => clearInterval(interval);
    }, []);

    const fetchUserPatients = async () => {
        try {
            const data = await axios.get(`${link}/get_patient/${authenticationTokenNumber}`,
                {headers: headers}
            );
            console.log(data.data);
            setUsersPatients(data.data);
        } catch (err) {
            console.log("couldn't fetch data from backend via get info");
            console.log(err);
        }
    }


    const deleteUserPatient = async (patientId) => {
        console.warn(patientId);
        try {
            let response = await axios.delete(`${link}/delete_patient/${patientId}`, {headers: headers});
            console.log(response);
            response ? await fetchUserPatients() : alert("couldn't delete data")
        } catch (err) {
            console.log(err);
        }
    }

    const submitForm = (event) => {
        event.preventDefault();
        let lastElement = parseInt(appointments[appointments.length - 1].rank);
        setAppointments((prevState) => [...prevState, {name: patientName, rank: lastElement + 1, penalty: 1},]);
    };
    const handlePresent = () => {
        setAppointments((prevState) => data);
        // setAppointments((prevState) => [...prevState, data]);
        setAppointments((prevState) => prevState.filter((value, index) => {
            return index !== currentPatient;
        }));
        console.warn("present")

        console.log(appointments)
    };

    const handleAbsent = () => {
        setAppointments((prevState) => data);
        // setAppointments((prevState) => [...prevState, data]);
        setAppointments((prevState) => prevState.map((value, index) => {
            return index === currentPatient ? {
                ...value, rank: value.rank + value.penalty, penalty: value.penalty + 1,
            } : value;
        }));
        // setAppointments(prevState => prevState.filter(value => value.rank !== null));
        console.log(appointments);
        console.warn("absent")
        setTrigger(prev => prev + 1);
    };


    return (
        <div className={"App"}>
            {/*Initially Appointing the patients*/}

            <div className={"container"}>
                <div className={"container-left"}>
                    {data.length ? (<div className="App-body">
                        Turn of patient :
                        <span>{data[currentPatient].name}</span>
                        <div className={"buttons"}>
                            <button className="button-green" onClick={handlePresent}>Present</button>
                            <button className="button-red" onClick={handleAbsent}>Absent</button>
                        </div>
                    </div>) : (<h5>Empty Clinic.</h5>)}
                    {/*<h1>Counter: {counter}</h1>*/}

                    {
                        authenticationTokenNumber &&
                        <PrintQueue data={usersPatients} edit={true} deleteUserPatient={deleteUserPatient}/>
                    }

                </div>
                <div className={"container-right"}>
                    {/* <PrintQueue data={data.slice(1, 31)}/> */}
                    <PrintQueue data={data}/>
                </div>
            </div>

        </div>
    );
}

export default Status;
