import GetDate from '../Date/date.components.jsx';
import { useState } from 'react';
// import './PatientForm.styles.scss';
import FormInput from '../formInput/formInput.components';

function titleCase(str) {
  return str
    .split(/(?=[A-Z])/)
    .map(function (word) {
      return word.replace(word[0], word[0].toUpperCase());
    })
    .join(' ');
}

const PatientForm = ({
  handleChange,
  handleSubmit,
  formFields,
  ButtonValue,
}) => {
  const [displayDate, setDisplayDate] = useState(false);

  const handleDisplayDate = () => {
    setDisplayDate(!displayDate);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="form"
    >
      <h1 className="text-2xl font-sans font-medium">
        {ButtonValue === 'Update' ? 'Update Patient' : 'Register New Patient'}
      </h1>

      <div className="flex flex-wrap justify-center space-y-4 space-x-4 items-center">
        {Object.keys(formFields).map((defaultFormField, i) => {
          if (
            defaultFormField[0] === '_' ||
            defaultFormField === 'registeredBy'
          ) {
          } else if (defaultFormField === 'date') {
            return (
              <div onClick={handleDisplayDate}>
                Select Dates
                <GetDate
                  key={i}
                  label={titleCase(defaultFormField)}
                  // required
                  name={defaultFormField}
                  value={formFields[defaultFormField]}
                  handleChange={handleChange}
                  days={60}
                />
              </div>
            );
          } else
            return (
              <FormInput
                key={i}
                label={titleCase(defaultFormField)}
                // required
                name={defaultFormField}
                value={formFields[defaultFormField]}
                onChange={handleChange}
              />
            );
        })}
      </div>
      <button type="submit" className="btn-submit">
        {ButtonValue}
      </button>
    </form>
  );
};

export default PatientForm;
