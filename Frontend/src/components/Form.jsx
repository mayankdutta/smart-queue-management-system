import React from 'react';

const Form = ({patientName, setPatientName, submitForm}) => {
    return (
        <form onSubmit={submitForm} className = "App-body">
            {/* <label>Patients</label> */}
            <input type={"text"}
                   placeholder={"Enter patient Name"}
                   value={patientName}
                   onChange={e => setPatientName(e.target.value)}
            />
            <button className='button-green'>Submit</button>
        </form>
    );
};

export default Form;