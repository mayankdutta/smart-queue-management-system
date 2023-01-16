import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { SERVER_URI } from "../backendData";
import { Data, moreData } from "../components/Status/data";

const authenticationTokenNumber = localStorage.getItem("access-token");
const headers = {
  "Content-type": "application/json",
  "access-token": authenticationTokenNumber,
};

export const PatientContext = createContext({
  appointments: [],
  usersPatients: [],
  setAppointments: () => null,
  setUsersPatients: () => null,
  fetchAllPatients: () => null,
  fetchUserPatients: () => null,
  addNewPatient: () => null,
  updatePatient: () => null,
});

const TRIBONACCI_SERIES = [1, 3, 5, 9, 17, 31, 55, 81, 149, 274, 504, 927];

export const PatientProvider = ({ children }) => {
  const [appointments, setAppointments] = useState(Data);
  const [usersPatients, setUsersPatients] = useState([]);

  const fetchAllPatients = async () => {
    console.log("fetching all the patients");
    try {
      const data = await axios.get(`${SERVER_URI}/patients`);

      let newData = [];
      for (let i = 0; i < Data.length; i++) {
        newData.push(Data[i]);
      }
      data.data.map((d) => {
        newData.push({
          name: d.name,
          rank: Data.length + newData.length + 1,
          penalty: 1,
          initialOrder: Data.length + newData.length + 1,
        });
      });

      setAppointments(newData);
    } catch (err) {
      console.log(err);
      // handleAbsent();
    }
  };

  const fetchUserPatients = async () => {
    console.log("fetching user patient");
    try {
      const data = await axios.get(`${SERVER_URI}/get_patient`, {
        headers: headers,
      });
      setUsersPatients(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    try {
      fetchAllPatients();
      fetchUserPatients();
    } catch (err) {}
  }, []);

  const addNewPatient = async (patient) => {
    try {
      await axios.post(`${SERVER_URI}/register_patient`, patient, {
        headers: headers,
      });

      await fetchAllPatients();
      await fetchUserPatients();
    } catch (error) {
      console.warn(error);
    }
  };

  const updatePatient = async (patient, params_id) => {
    console.log(patient);
    try {
      const response = await axios.put(
        `${SERVER_URI}/update_patient/${params_id}`,
        patient,
        { headers: headers }
      );
      await fetchAllPatients();
      await fetchUserPatients();
    } catch (error) {
      console.warn(error);
    }
  };

  const deleteUserPatient = async (patientId) => {
    try {
      let response = await axios.delete(
        `${SERVER_URI}/delete_patient/${patientId}`,
        {
          headers: headers,
        }
      );
      if (response) {
        await fetchAllPatients();
        await fetchUserPatients();
      } else {
        alert("couldn't delete contact to administrator");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlePresent = (currentPatient = 0) => {
    setAppointments((prev) =>
      prev.filter((value, index) => {
        return index !== currentPatient;
      })
    );
  };

  const handleAbsent = (currentPatient) => {

    setAppointments((prev) =>
      prev.map((value, index) => {
        if (index === currentPatient) {
          return {
            ...value,
            rank: Math.min(value.rank + TRIBONACCI_SERIES[value.penalty], 40),
            penalty: Math.min(value.penalty + 1, TRIBONACCI_SERIES.length - 1),
          };
        } else {
          return value;
        }
      })
    );

    setAppointments((prev) =>
      prev.sort((a, b) =>
        a.rank === b.rank ? a.initialOrder - b.initialOrder : a.rank - b.rank
      )
    );
  };

  const value = {
    appointments,
    handlePresent,
    handleAbsent,
    usersPatients,
    addNewPatient,
    updatePatient,
    deleteUserPatient,
  };

  return (
    <PatientContext.Provider value={value}>{children}</PatientContext.Provider>
  );
};
