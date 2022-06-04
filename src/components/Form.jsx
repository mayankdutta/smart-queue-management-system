import React from 'react';

const Form = ({patientName, setPatientName, submitForm}) => {
    return (
        <form onSubmit={submitForm}>
            <label>Patients</label>
            <input type={"text"}
                   placeholder={"patient Name"}
                   value={patientName}
                   onChange={e => setPatientName(e.target.value)}
            />
            <br/>

            <button>Submit</button>
        </form>
    );
};

export default Form;