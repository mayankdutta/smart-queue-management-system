import { useState, useContext } from "react";
import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import PatientForm from "../../components/PatientForm/PatientForm.component";

import { SERVER_URI, DEFAULT_FORM_FIELDS } from "../../backendData";
import { PatientContext } from "../../contexts/patient.context";

export default function Update() {
  const [formFields, setFormFields] = useState(DEFAULT_FORM_FIELDS);
  const authenticationTokenNumber = localStorage.getItem("access-token");
  const navigate = useNavigate();
  const params = useParams();
  const { appointments, updatePatient } = useContext(PatientContext);

  const headers = {
    "Content-type": "application/json",
    "access-token": authenticationTokenNumber,
  };

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        let response = await axios.get(
          `${SERVER_URI}/update_patient/${params.id}`,
          {
            headers: headers,
          }
        );
        setFormFields({
          ...response.data[0],
        });
      } catch (err) {
        console.warn(err);
      }
    };
    console.log("FETCHING PATIENT DATA");
    fetchPatientDetails();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
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
    navigate("/");
  };

  return (
    <PatientForm
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      formFields={formFields}
      ButtonValue={"Update"}
    />
  );
}
