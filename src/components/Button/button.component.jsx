// import './button.styles.css';
import { PatientContext } from '../../contexts/patient.context.jsx';
import { useContext } from 'react';

const Button = ({ occupied, setOccupied, setTime }) => {
  const { handlePresent } = useContext(PatientContext);

  return (
    <div className={'buttons'}>
      {!occupied && (
        <button
          className="button-red"
          onClick={() => {
            handlePresent();
            setOccupied(!occupied);
          }}
        >
          send patient inside
        </button>
      )}
      {occupied && (
        <button
          className="button-green"
          onClick={() => {
            setTime(1);
            setOccupied(!occupied);
          }}
        >
          patient done.
        </button>
      )}
    </div>
  );
};

export default Button;
