import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { PATIENTS } from '../backendData';
import StoredData from '../utils/Data.json';
import { UserContext } from './user.context';
import { currentDate } from '../utils/date.utils';

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
  const todayDate = currentDate().toString();
  const [appointments, setAppointments] = useState(StoredData);
  const [usersPatients, setUsersPatients] = useState([]);
  const { userData } = useContext(UserContext);

  const headers = {
    'Content-type': 'application/json',
    'access-token': userData.accessToken,
  };

  const fetchAllPatients = async () => {
    console.log('fetching all the patients');
    try {
      console.log('today date: ', todayDate);

      const data = await axios.get(`${PATIENTS.ALL_PATIENTS}`);

      let newData = [];
      for (let i = 0; i < StoredData.length; i++) {
        if (StoredData[i]['date'] === todayDate) {
          newData.push({
            name: StoredData[i]['name'],
            rank: newData.length + 1,
            penalty: 1,
            initialOrder: i + 1,
          });
        }
      }

      data.data.map((d) => {
        newData.push({
          name: d.name,
          rank: newData.length + 1,
          penalty: 1,
          initialOrder: newData.length + 1,
        });
      });

      console.log(newData);
      setAppointments(newData);
    } catch (err) {
      console.log(err);
      // handleAbsent();
    }
  };

  const fetchUserPatients = async () => {
    console.log('fetching user patient');
    console.log('headers: ', headers);

    try {
      const data = await axios.get(`${PATIENTS.PATIENT}`, {
        headers: headers,
      });
      setUsersPatients(data.data);
      console.log('user patient: ', data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (userData.name && userData.name.length) fetchUserPatients();
  }, [userData.name]);

  useEffect(() => {
    try {
      fetchAllPatients();
    } catch (err) {}
  }, []);

  const addNewPatient = async (patient) => {
    try {
      await axios.post(`${PATIENTS.REGISTER}`, patient, {
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
      const response = await axios.put(`${PATIENTS.UPDATE}/${params_id}`, patient, {
        headers: headers,
      });
      await fetchAllPatients();
      await fetchUserPatients();
    } catch (error) {
      console.warn(error);
    }
  };

  const fetchPatientDetails = async (id) => {
    let response = await axios.get(`${PATIENTS.UPDATE}/${id}`, {
      headers: headers,
    });
    return response;
  };

  const deleteUserPatient = async (patientId) => {
    try {
      let response = await axios.delete(`${PATIENTS.DELETE}/${patientId}`, {
        headers: headers,
      });
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
      prev.filter((_, index) => {
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
      prev.sort((a, b) => (a.rank === b.rank ? a.initialOrder - b.initialOrder : a.rank - b.rank))
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
    fetchPatientDetails,
  };

  return <PatientContext.Provider value={value}>{children}</PatientContext.Provider>;
};
/*


 */
