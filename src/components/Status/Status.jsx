import React, { useContext } from "react";
import { useEffect, useState } from "react";
import PrintQueue from "../PrintQueue/printQueue";
import "./Status.css";
import { DEFAULT_COUNTER } from "../../backendData";
import Button from "../Button/button.component";
import Counter from "../Counter/counter.component";
import { PatientContext } from "../../contexts/patient.context";

const currentPatient = 0;

function Status() {
  const [occupied, setOccupied] = useState(false);
  const [time, setTime] = useState(1);

  const authenticationTokenNumber = localStorage.getItem("access-token");

  const { appointments, handleAbsent, usersPatients } =
    useContext(PatientContext);

  useEffect(() => {
    const countTime = setInterval(() => {
      setTime((prev) => (occupied ? 1 : prev % DEFAULT_COUNTER) + 1);
    }, 1000);
    return () => clearTimeout(countTime);
  }, [time, occupied]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!occupied) {
        handleAbsent(currentPatient);
      }
      setTime(1);
    }, DEFAULT_COUNTER * 1000);

    return () => clearInterval(interval);
  }, [occupied]);

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
