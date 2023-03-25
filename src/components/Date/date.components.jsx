import React, { useState } from 'react';
import './date.styles.scss';
import { getDates, formatDate } from '../../utils/date.utils';

const GetDate = ({ days, handleChange, name, label, value }) => {
  const [dateArray, setDateArray] = React.useState(
    getDates(new Date(), new Date().addDays(days))
  );
  const [selectedDate, setSelectedDate] = useState(value);

  const handleClickDate = (date) => {
    setSelectedDate(date);
    handleChange(date);
    console.log(date);
  };

  console.log('selected date: ', selectedDate);
  return (
    <div className="max-w-7xl border-2 border-black">
      <div className="dates">
        {dateArray?.map((date) => {
          const currentDate = formatDate(
            date.getDate(),
            date.getMonth(),
            date.getFullYear()
          );

          return (
            <div
              onClick={() => handleClickDate(currentDate)}
              className={
                currentDate === selectedDate ? 'date + selectedDate' : 'date'
              }
              name={name}
              label={label}
              key={date.getTime() + date.getMilliseconds()}
            >
              {currentDate}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GetDate;
