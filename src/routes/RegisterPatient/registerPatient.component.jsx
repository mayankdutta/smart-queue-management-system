import { useState } from "react";
import axios from "axios";

import PatientForm from "../../components/PatientForm/PatientForm.component";
import { Backend, DEFAULT_FORM_FIELDS } from "../../backendData";
import { useNavigate } from "react-router-dom";

const LINK = Backend.link;

export default function Register() {
  const [formFields, setFormFields] = useState(DEFAULT_FORM_FIELDS);
  const authenticationTokenNumber = localStorage.getItem("access-token");
  const navigate = useNavigate();

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

    try {
      await axios.post(
        `${LINK}/register_patient`,
        {
          ...formFields,
          motive: "",
          Address: formFields.address,
          explainCase: formFields.description,
          registeredBy: authenticationTokenNumber,
          currentPenalty: 1,
        },
        { headers: headers }
      );
      navigate("/");
    } catch (error) {
      console.warn(error);
    }
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
