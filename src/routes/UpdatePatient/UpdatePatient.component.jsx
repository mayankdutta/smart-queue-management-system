import { useState } from "react";
import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import PatientForm from "../../components/PatientForm/PatientForm.component";

import { Backend, DEFAULT_FORM_FIELDS } from "../../backendData";

const LINK = Backend.link;

export default function Update() {
  const [formFields, setFormFields] = useState(DEFAULT_FORM_FIELDS);
  const authenticationTokenNumber = localStorage.getItem("access-token");
  const navigate = useNavigate();
  const params = useParams();

  const headers = {
    "Content-type": "application/json",
    "access-token": authenticationTokenNumber,
  };

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        let response = await axios.get(`${LINK}/update_patient/${params.id}`, {
          headers: headers,
        });
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

    const headers = {
      "Content-type": "application/json",
      "access-token": authenticationTokenNumber,
    };

    try {
      const response = await axios.put(
        `${LINK}/update_patient/${params.id}`,
        {
          ...formFields,
          registeredBy: authenticationTokenNumber,
        },
        { headers: headers }
      );
      console.log(response);
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
      ButtonValue={"Update"}
    />
  );
}
