import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import PrintQueue from '../PrintQueue/printQueue';
import './Status.css';
import { DEFAULT_COUNTER } from '../../backendData';
import Button from '../Button/button.component';
import Counter from '../Counter/counter.component';
import { PatientContext } from '../../contexts/patient.context';

const currentPatient = 0;

function Status() {
  const [occupied, setOccupied] = useState(false);
  const [time, setTime] = useState(1);

  const { appointments, handleAbsent } = useContext(PatientContext);

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
    <div className={'App'}>
      <div className={''}>
        {appointments.length ? (
          <div className="flex flex-col items-center ">
            <div className=" text-lg  tracking-widest ">Turn of patient</div>
            <div className=" text-4xl">{appointments[currentPatient].name}</div>
            <div className="flex  my-4 space-x-2">
              <h2 style={{ color: occupied ? 'green' : 'red' }}>
                {occupied ? <> Clinic occupied </> : <> Empty </>}
              </h2>

              <Button
                occupied={occupied}
                setOccupied={setOccupied}
                setTime={setTime}
              />
            </div>
          </div>
        ) : (
          <h5> No appointments for today.</h5>
        )}
        {!occupied && <Counter time={time} />}
      </div>

      <PrintQueue data={appointments} />
    </div>
  );
}

export default Status;
