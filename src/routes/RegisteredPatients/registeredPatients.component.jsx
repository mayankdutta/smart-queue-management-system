import PrintQueue from '../../components/PrintQueue/printQueue';
import { PatientContext } from '../../contexts/patient.context';
import { UserContext } from '../../contexts/user.context';
import { useContext, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

const RegisteredPatients = () => {
  const { userData } = useContext(UserContext);
  const { usersPatients } = useContext(PatientContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData.name) {
    } else {
      navigate('/login');
    }
  }, []);

  return <PrintQueue data={usersPatients} edit={true} />;
};

export default RegisteredPatients;
