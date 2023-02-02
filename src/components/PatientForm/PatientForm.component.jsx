import GetDate from "../Date/date.components.jsx";
import { useState } from "react";
import "./PatientForm.styles.scss";
import FormInput from "../formInput/formInput.components";

function titleCase(str) {
  return str
    .split(/(?=[A-Z])/)
    .map(function (word) {
      return word.replace(word[0], word[0].toUpperCase());
    })
    .join(" ");
}

const PatientForm = ({ handleChange, handleSubmit, formFields, ButtonValue }) => {
  const [displayDate, setDisplayDate] = useState(false);
  const handleDisplayDate = () => {
    console.log(displayDate);
    setDisplayDate(!displayDate);
  };

  return (
    <center>
    <form onSubmit={handleSubmit}>
      <h1>{ButtonValue === "Update" ? "Update Patient" : "Register New Patient"}</h1>
      {Object.keys(formFields).map((defaultFormField) => {
        if (defaultFormField[0] === "_" || defaultFormField === "registeredBy") {
        } else
          return (
            <FormInput
              label={titleCase(defaultFormField)}
              // required
              name={defaultFormField}
              value={formFields[defaultFormField]}
              onChange={handleChange}
            />
          );
      })}

      <div onClick={handleDisplayDate} className="date-selector">
        Click here to select Date
      {displayDate && <GetDate days={60} />}
      </div>

      <button type="submit">{ButtonValue}</button>
    </form>
    </center>
  );
};

export default PatientForm;
