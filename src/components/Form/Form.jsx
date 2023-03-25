import React from 'react';
// import './Form.css';

const Form = ({ patientName, setPatientName, submitForm }) => {
  return (
    <form onSubmit={submitForm} className="App-body">
      <input
        type={'text'}
        placeholder={'Enter patient Name'}
        value={patientName}
        onChange={(e) => setPatientName(e.target.value)}
      />
      <button> Submit</button>
    </form>
  );
};

export default Form;
