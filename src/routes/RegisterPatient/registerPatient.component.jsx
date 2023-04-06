import { useContext, useState } from 'react';
import { PatientContext } from '../../contexts/patient.context';
import PatientForm from '../../components/PatientForm/PatientForm.component';
import { DEFAULT_FORM_FIELDS } from '../../backendData';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [formFields, setFormFields] = useState(DEFAULT_FORM_FIELDS);
  const authenticationTokenNumber = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  const { appointments, addNewPatient } = useContext(PatientContext);

  const handleChange = (event) => {
    let name = 'nil',
      value = 'nil';

    if (typeof event === 'string') {
      name = 'date';
      value = event;
    } else {
      name = event.target.name;
      value = event.target.value;
    }

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    addNewPatient({
      ...formFields,
      registeredBy: authenticationTokenNumber,
      currentPenalty: 1 || appointments[appointments.length - 1].rank,
    });

    navigate('/');
  };

  return (
    <PatientForm
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      formFields={formFields}
      ButtonValue={'Register'}
    />
  );
}
