import useHeap from "./Hooks/useHeap";
import { useEffect, useState } from "react";
import Form from "./components/Form";
import PrintQueue from "./components/printQueue";
import './App.css'

function App() {
  const [appointments, setAppointments] = useState([
    { name: "P0", rank: 1, penalty: 1 },
    { name: "P1", rank: 2, penalty: 1 },
    { name: "P2", rank: 3, penalty: 1 },
    { name: "P3", rank: 4, penalty: 1 },
    { name: "P4", rank: 5, penalty: 1 },
    { name: "P5", rank: 6, penalty: 1 },
    { name: "P6", rank: 7, penalty: 1 },
    { name: "P7", rank: 8, penalty: 1 },
    { name: "P8", rank: 9, penalty: 1 },
  ]);

  const [patientName, setPatientName] = useState("");
  const [currentPatient, setCurrentPatient] = useState(0);

  const data = useHeap(appointments);

  useEffect(() => { }, [appointments]);

  const submitForm = (event) => {
    event.preventDefault();
    let lastElement = parseInt(appointments[appointments.length - 1].rank);
    setAppointments((prevState) => [
      ...prevState,
      { name: patientName, rank: lastElement + 1, penalty: 1 },
    ]);
  };
  const handlePresent = () => {
    setAppointments((prevState) => data);
    setAppointments((prevState) =>
      prevState.filter((value, index) => {
        return index !== currentPatient;
      })
    );
  };

  const handleAbsent = () => {
    setAppointments((prevState) => data);
    setAppointments((prevState) =>
      prevState.map((value, index) => {
        return index === currentPatient
          ? {
            ...value,
            rank: value.rank + value.penalty,
            penalty: value.penalty + 1,
          }
          : value;
      })
    );
    // setAppointments(prevState => prevState.filter(value => value.rank !== null));
    console.log(appointments);
  };

  return (
    <div className = "App">
      {/*Initially Appointing the patients*/}
      <h1>Queue</h1>
      <PrintQueue data={data} i={currentPatient} />

      {data.length ? (
        <div className="App-body">
          Turn of patient : {data[currentPatient].name + "     "}
          <button className = "button-green" onClick={handlePresent}>Present</button>
          <button className = "button-red" onClick={handleAbsent}>Absent</button>
        </div>
      ) : (
        <h5>Empty Clinic.</h5>
      )}
      <Form
        patientName={patientName}
        setPatientName={setPatientName}
        submitForm={submitForm}
      />
    </div>
  );
}

export default App;
