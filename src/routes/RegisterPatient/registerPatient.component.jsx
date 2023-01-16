import { useContext, useState } from "react";
import { PatientContext } from "../../contexts/patient.context";
import PatientForm from "../../components/PatientForm/PatientForm.component";
import { DEFAULT_FORM_FIELDS } from "../../backendData";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formFields, setFormFields] = useState(DEFAULT_FORM_FIELDS);
  const authenticationTokenNumber = localStorage.getItem("access-token");
  const navigate = useNavigate();
  const { appointments, addNewPatient } = useContext(PatientContext);

  // console.log(appointments.length, appointments[appointments.length - 1].rank);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const headers = {
      "Content-type": "application/json",
      "access-token": authenticationTokenNumber,
    };

    addNewPatient({
      ...formFields,
      registeredBy: authenticationTokenNumber,
      currentPenalty: appointments[appointments.length - 1].rank,
    });

    navigate("/");
  };

  return (
    <PatientForm
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      formFields={formFields}
      ButtonValue={"Register"}
    />
  );
}
