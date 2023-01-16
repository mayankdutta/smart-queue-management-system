import React from "react";
import { useEffect, useState } from "react";
import useHeap from "../../Hooks/useHeap";
import PrintQueue from "../PrintQueue/printQueue";
import Form from "../Form/Form";
import "./Status.css";
import { Data, moreData } from "./data";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URI, DEFAULT_COUNTER } from "../../backendData";
import PriorityQueue from "../../Algorithm/Heap.jsx";
import Button from "../Button/button.component";
import Counter from "../Counter/counter.component";

const tribonacci = [1, 3, 5, 9, 17, 31, 55, 81, 149, 274, 504, 927];

function Status() {
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
    } catch (err) {}
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
      const data = await axios.get(`${SERVER_URI}/patients`);

      let newData = [];
      for (let i = 0; i < Data.length; i++) {
        newData.push(Data[i]);
      }
      data.data.map((d) => {
        newData.push({
          name: d.name,
          rank: Data.length + newData.length + 1,
          penalty: 1,
          initialOrder: Data.length + newData.length + 1,
        });
      });

      setAppointments(newData);
    } catch (err) {
      console.log(err);
      handleAbsent();
    }
  };

  const fetchUserPatients = async () => {
    console.log("fetching user patient");
    try {
      const data = await axios.get(`${SERVER_URI}/get_patient`, {
        headers: headers,
      });
      setUsersPatients(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUserPatient = async (patientId) => {
    try {
      let response = await axios.delete(
        `${SERVER_URI}/delete_patient/${patientId}`,
        {
          headers: headers,
        }
      );
      if (response) {
        await fetchAllPatients();
        await fetchUserPatients();
      } else {
        alert("couldn't delete contact to administrator");
      }
      // response ? await fetchUserPatients() : alert("couldn't delete data");
    } catch (err) {
      console.log(err);
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
  };

  const handleAbsent = () => {
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

    setAppointments((prev) =>
      prev.sort((a, b) =>
        a.rank === b.rank ? a.initialOrder - b.initialOrder : a.rank - b.rank
      )
    );
  };

  return (
    <div className={"App"}>
      <div className={"container"}>
        <div className={"container-left"}>
          {appointments.length ? (
            <div className="App-body">
              Turn of patient :<span>{appointments[currentPatient].name}</span>
              <h2 style={{ color: occupied ? "green" : "red" }}>
                {occupied ? <> Clinic occupied </> : <> Empty </>}
              </h2>
              <Button
                occupied={occupied}
                setOccupied={setOccupied}
                handlePresent={handlePresent}
                setTime={setTime}
              />
            </div>
          ) : (
            <h5> No appointments for today.</h5>
          )}
          {!occupied && <Counter time={time} />}

          {authenticationTokenNumber && (
            <PrintQueue
              data={usersPatients}
              edit={true}
              deleteUserPatient={deleteUserPatient}
            />
          )}
        </div>
        <div className={"container-right"}>
          <PrintQueue data={appointments} />
        </div>
      </div>
    </div>
  );
}

export default Status;
