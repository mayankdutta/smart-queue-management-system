import { useState, useContext } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import PatientForm from '../../components/PatientForm/PatientForm.component';

import { DEFAULT_FORM_FIELDS } from '../../backendData';
import { PatientContext } from '../../contexts/patient.context';

export default function Update() {
  const [formFields, setFormFields] = useState(DEFAULT_FORM_FIELDS);
  const navigate = useNavigate();
  const params = useParams();
  const { appointments, updatePatient, fetchPatientDetails } =
    useContext(PatientContext);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        let response = await fetchPatientDetails(params.id);
        setFormFields({
          ...response.data[0],
        });
      } catch (err) {
        console.warn(err);
      }
    };
    console.log('FETCHING PATIENT DATA');
    fetchPatient();
  }, []);

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

    updatePatient(
      {
        ...formFields,
        currentPenalty: appointments[appointments.length - 1].rank,
      },
      params.id
    );
    navigate('/');
  };

  return (
    <PatientForm
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      formFields={formFields}
      ButtonValue={'Update'}
    />
  );
}
