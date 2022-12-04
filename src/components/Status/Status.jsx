import React from "react";
import { useEffect, useState } from "react";
import useHeap from "../../Hooks/useHeap";
import PrintQueue from "../PrintQueue/printQueue";
import Form from "../Form/Form";
import "./Status.css";
import { Data, moreData } from "./data";
import CountDown from "../Countdown/Countdown";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Backend } from "../../backendData";
import PriorityQueue from "../../Algorithm/Heap.jsx";

const LINK = Backend.link;
const DEFAULT_COUNTER = Backend.counter;

function Status(url, config) {
  const [appointments, setAppointments] = useState(Data);
  const [patientName, setPatientName] = useState("");
  const [usersPatients, setUsersPatients] = useState([]);
  const [currentPatient, setCurrentPatient] = useState(0);
  const [trigger, setTrigger] = useState(0);
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
    } catch (err) {}
  }, []);

  useEffect(() => {
    const countTime = setInterval(() => {
      setTime((prev) => (prev % DEFAULT_COUNTER) + 1);
    }, 1000);
    return () => clearTimeout(countTime);
  }, [time]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleAbsent();
      setTime(1);
    }, DEFAULT_COUNTER * 1000);

    return () => clearInterval(interval);
  }, []);

  const fetchAllPatients = async () => {
    console.log("fetching all the patients");
    try {
      const data = await axios.get(`${LINK}/patients`);
      // console.log(data.data);
    } catch (err) {
      // console.log(err);
      handleAbsent();
    }
  };

  const fetchUserPatients = async () => {
    try {
      const data = await axios.get(`${LINK}/get_patient`, { headers: headers });
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
      response ? await fetchUserPatients() : alert("couldn't delete data");
    } catch (err) {
      // console.log(err);
    }
  };

  const submitForm = (event) => {
    event.preventDefault();
    let lastElement = parseInt(appointments[appointments.length - 1].rank);
    setAppointments((prevState) => [
      ...prevState,
      { name: patientName, rank: lastElement + 1, penalty: 1 },
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
    console.log(appointments);

    setAppointments((prevState) =>
      prevState.map((value, index) => {
        if (index === currentPatient) {
          return {
            ...value,
            rank: value.rank + value.penalty,
            penalty: value.penalty + 1,
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
    setTrigger((prev) => prev + 1);
  };

  return (
    <div className={"App"}>
      {/*Initially Appointing the patients*/}

      <div className={"container"}>
        <div className={"container-left"}>
          {appointments.length ? (
            <div className="App-body">
              Turn of patient :<span>{appointments[currentPatient].name}</span>
              <div className={"buttons"}>
                <button className="button-green" onClick={handlePresent}>
                  Present
                </button>
                <button className="button-red" onClick={handleAbsent}>
                  Absent
                </button>
              </div>
            </div>
          ) : (
            <h5>Empty Clinic.</h5>
          )}
          <div style= {{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <h3>Counter: </h3>
            <h1>{time}</h1>
          </div>

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
          <PrintQueue data={appointments} />
        </div>
      </div>
    </div>
  );
}

export default Status;
