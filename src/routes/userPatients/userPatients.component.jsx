import { useContext } from 'react';
import { UserContext } from '../../contexts/user.context';
import { PatientContext } from '../../contexts/patient.context';
import PrintQueue from '../../components/PrintQueue/printQueue';

function UserPatients() {
  const { userData } = useContext(UserContext);

  const { usersPatients } = useContext(PatientContext);

  console.log("in users patients");
  return (
    <>
      {userData.name && userData.name.length > 0 && (
        <PrintQueue data={usersPatients} edit={true} />
      )}
    </>
  );
}

export default UserPatients;
