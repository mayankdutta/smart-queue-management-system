import React from 'react';
import {useEffect, useState} from "react";
import useHeap from "../../Hooks/useHeap";
import PrintQueue from "../PrintQueue/printQueue";
import Form from "../Form";
import "./Status.css"
import {Data, moreData} from "./data"

function Status() {
    const [appointments, setAppointments] = useState(moreData);

    const [patientName, setPatientName] = useState("");
    const [currentPatient, setCurrentPatient] = useState(0);

    const data = useHeap(appointments);

    useEffect(() => {
    }, [appointments]);

    const submitForm = (event) => {
        event.preventDefault();
        let lastElement = parseInt(appointments[appointments.length - 1].rank);
        setAppointments((prevState) => [
            ...prevState,
            {name: patientName, rank: lastElement + 1, penalty: 1},
        ]);
    };
    const handlePresent = () => {
        setAppointments((prevState) => data);
        // setAppointments((prevState) => [...prevState, data]);
        setAppointments((prevState) =>
            prevState.filter((value, index) => {
                return index !== currentPatient;
            })
        );
    };

    const handleAbsent = () => {
        setAppointments((prevState) => data);
        // setAppointments((prevState) => [...prevState, data]);
        setAppointments((prevState) =>
            prevState.map((value, index) => {
                return index === currentPatient
                    ? {
                        ...value,
                        rank: value.rank + value.penalty,
                        penalty: value.penalty + 1,
                    }
                    : value;
            })
        );
        // setAppointments(prevState => prevState.filter(value => value.rank !== null));
        console.log(appointments);
    };
    return (
        <div className={"App"}>
            {/*Initially Appointing the patients*/}

            <div className={"container"}>
                <div className={"container-left"}>
                    {data.length ? (
                        <div className="App-body">
                            Turn of patient : {data[currentPatient].name + "     "}
                            <br/>
                            <div className={"buttons"}>
                                <button className="button-green" onClick={handlePresent}>Present</button>
                                <button className="button-red" onClick={handleAbsent}>Absent</button>
                            </div>
                        </div>
                    ) : (
                        <h5>Empty Clinic.</h5>
                    )}
                    <Form
                        patientName={patientName}
                        setPatientName={setPatientName}
                        submitForm={submitForm}
                    />
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
