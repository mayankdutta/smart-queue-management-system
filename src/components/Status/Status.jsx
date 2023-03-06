import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import PrintQueue from '../PrintQueue/printQueue';
// import './Status.css';
import { DEFAULT_COUNTER } from '../../backendData';
import ActionButton from '../Button/button.component';
import Counter from '../Counter/counter.component';
import { PatientContext } from '../../contexts/patient.context';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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
    <Box
      sx={{
        width: '100%',
        /* maxWidth: 500, */ display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
      }}
    >
      <Box sx={{}}>
        {appointments.length ? (
          <div className="App-body">
            <Box
              sx={{
                width: '100%',
                /* maxWidth: 500, */ display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography variant="h5" gutterBottom>
                {' '}
                next patient :{' '}
              </Typography>
              <Typography variant="h4" gutterBottom>
                {' '}
                <span>{appointments[currentPatient].name}</span>{' '}
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  /* maxWidth: 500, */ display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h6" gutterBottom>
                  {' '}
                  Clinic is{' '}
                </Typography>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{ color: occupied ? 'green' : 'red' }}
                >
                  {' '}
                  {occupied ? <> OCCUPIED </> : <> EMPTY </>}{' '}
                </Typography>
              </Box>
              <ActionButton
                occupied={occupied}
                setOccupied={setOccupied}
                setTime={setTime}
              />
            </Box>
          </div>
        ) : (
          <h5> No appointments for today.</h5>
        )}
        {!occupied && <Counter time={time} />}
      </Box>

      <PrintQueue data={appointments} />
    </Box>
  );
}

export default Status;
