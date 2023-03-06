// import './button.styles.css';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { PatientContext } from '../../contexts/patient.context.jsx';
import { useContext } from 'react';

const ActionButton = ({ occupied, setOccupied, setTime }) => {
  const { handlePresent } = useContext(PatientContext);

  return (
    <div className={'buttons'}>
      {!occupied && (
        <Button
          variant="contained"
          endIcon={<SendIcon />}
        color="error"
          onClick={() => {
            handlePresent();
            setOccupied(!occupied);
          }}
        >
          Send Patient Inside
        </Button>

      )}
      {occupied && (
        <Button
          variant="contained"
          endIcon={<CheckCircleIcon />}
        color="success"
          onClick={() => {
            setTime(1);
            setOccupied(!occupied);
          }}
        >
          patient done.
        </Button>
      )}
    </div>
  );
};

export default ActionButton;
