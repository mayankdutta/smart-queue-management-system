import React from "react";
import {useEffect, useState} from "react";
import useHeap from "../../Hooks/useHeap";
import PrintQueue from "../PrintQueue/printQueue";
import Form from "../Form/Form";
import "./Status.css";
import {Data, moreData} from "./data";
import CountDown from "../Countdown/Countdown";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {Backend} from "../../backendData";
import PriorityQueue from "../../Algorithm/Heap.jsx";

const LINK = Backend.link;
const DEFAULT_COUNTER = Backend.counter;
const tribonacci = [1, 2, 4, 7, 13, 24, 44, 81, 149, 274, 504, 927];

function Status(url, config) {
    const [appointments, setAppointments] = useState(Data);
    const [patientName, setPatientName] = useState("");
    const [usersPatients, setUsersPatients] = useState([]);
    const [currentPatient, setCurrentPatient] = useState(0);
    const [occupied, setOccupied] = useState(false);
    const navigate = useNavigate();
    const [time, setTime] = useState(1);

    const authenticationTokenNumber = localStorage.getItem("access-token");
    const headers = {
        "Content-type": "application/json",
        "access-token": authenticationTokenNumber,
    };

    useEffect(() => {
        try {
            fetchAllPatients();
            fetchUserPatients();
        } catch (err) {
        }
    }, []);

    useEffect(() => {
        const countTime = setInterval(() => {
            setTime((prev) => (occupied ? 1 : prev % DEFAULT_COUNTER) + 1);
        }, 1000);
        return () => clearTimeout(countTime);
    }, [time, occupied]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!occupied) {
                handleAbsent();
            }
            setTime(1);
        }, DEFAULT_COUNTER * 1000);

        return () => clearInterval(interval);
    }, [occupied]);

    const fetchAllPatients = async () => {
        console.log("fetching all the patients");
        try {
            const data = await axios.get(`${LINK}/patients`);
            console.log(data.data);

            let newData = [];
            for (let i = 0; i < Data.length; i++) {
                newData.push( Data[i]);
            }
            data.data.map((d) => {
                newData.push({name: d.name, rank: Data.length + newData.length + 1, penalty: 1, initialOrder: Data.length + newData.length + 1});
            });

            setAppointments(newData);
        } catch (err) {
            // console.log(err);
            handleAbsent();
        }
    };

    const fetchUserPatients = async () => {
        try {
            const data = await axios.get(`${LINK}/get_patient`, {headers: headers});
            // console.log(data.data);
            setUsersPatients(data.data);
        } catch (err) {
            console.log("couldn't fetch data from backend via get info");
            // console.log(err);
        }
    };

    const deleteUserPatient = async (patientId) => {
        try {
            let response = await axios.delete(`${LINK}/delete_patient/${patientId}`, {
                headers: headers,
            });
            // console.log(response);
          if (response) {
            await fetchAllPatients();
            await fetchUserPatients();
          } else {
            alert("contact to administrator");
          }
            // response ? await fetchUserPatients() : alert("couldn't delete data");
        } catch (err) {
            // console.log(err);
        }
    };

    const submitForm = (event) => {
        event.preventDefault();
        let lastElement = parseInt(appointments[appointments.length - 1].rank);
        setAppointments((prevState) => [
            ...prevState,
            {name: patientName, rank: lastElement + 1, penalty: 1},
        ]);
    };
    const handlePresent = () => {
        setAppointments((prevState) =>
            prevState.filter((value, index) => {
                return index !== currentPatient;
            })
        );
        console.warn("present");

        // console.log(appointments);
    };

    const handleAbsent = () => {
        // console.log(appointments);

        setAppointments((prevState) =>
            prevState.map((value, index) => {
                if (index === currentPatient) {
                    return {
                        ...value,
                        rank: Math.min(value.rank + tribonacci[value.penalty], 40),
                        penalty: Math.min(value.penalty + 1, tribonacci.length - 1),
                    };
                } else {
                    return value;
                }
            })
        );

        function compare(a, b) {
            if (a.rank === b.rank) {
                return a.initialOrder - b.initialOrder;
            }
            return a.rank - b.rank;
        }

        setAppointments((prev) => prev.sort(compare));
    };

    return (
        <div className={"App"}>
            {/*Initially Appointing the patients*/}

            <div className={"container"}>
                <div className={"container-left"}>
                    {appointments.length ? (
                        <div className="App-body">
                            Turn of patient :<span>{appointments[currentPatient].name}</span>
                            <div>
                                {occupied ? (
                                    <h2 style={{color: "green"}}>Clinic occupied</h2>
                                ) : (
                                    <h2 style={{color: "red"}}>Empty</h2>
                                )}
                            </div>
                            <div className={"buttons"}>
                                {!occupied && <button
                                    className="button-red"
                                    onClick={() => {
                                        handlePresent();
                                        setOccupied(!occupied);
                                    }}
                                >
                                    send patient inside
                                </button>}
                                {occupied && <button
                                    className="button-green"
                                    onClick={() => {
                                        setTime(1);
                                        setOccupied(!occupied);
                                    }}
                                >
                                    patient done.
                                </button>}
                            </div>
                        </div>
                    ) : (
                        <h5> No appointments for today.</h5>
                    )}
                    {!occupied && (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <h3>Counter: </h3>
                            <h1>{time}</h1>
                        </div>
                    )}

                    {authenticationTokenNumber && (
                        <PrintQueue
                            data={usersPatients}
                            edit={true}
                            deleteUserPatient={deleteUserPatient}
                        />
                    )}
                </div>
                <div className={"container-right"}>
                    {/* <PrintQueue data={data.slice(1, 31)}/> */}
                    <PrintQueue data={appointments}/>
                </div>
            </div>
        </div>
    );
}

export default Status;
