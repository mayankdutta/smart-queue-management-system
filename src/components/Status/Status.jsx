import React, { useContext } from "react";
import { useEffect, useState } from "react";
import PrintQueue from "../PrintQueue/printQueue";
import "./Status.css";
import { DEFAULT_COUNTER } from "../../backendData";
import Button from "../Button/button.component";
import Counter from "../Counter/counter.component";
import { PatientContext } from "../../contexts/patient.context";

const tribonacci = [1, 3, 5, 9, 17, 31, 55, 81, 149, 274, 504, 927];
const currentPatient = 0;

function Status() {
  const [occupied, setOccupied] = useState(false);
  const [time, setTime] = useState(1);

  const { appointments, setAppointments, usersPatients } =
    useContext(PatientContext);

  const authenticationTokenNumber = localStorage.getItem("access-token");

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
            <PrintQueue data={usersPatients} edit={true} />
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
