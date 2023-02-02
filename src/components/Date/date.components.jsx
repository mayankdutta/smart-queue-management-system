import React from "react";
import "./date.styles.scss";

const month = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

const nth = function (d) {
  if (d > 3 && d < 21) return "th";
  switch (d % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

const GetDate = ({ days }) => {
  console.log(days);
  Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  function getDates(startDate, stopDate) {
    let dateArray = new Array();
    let currentDate = startDate;

    while (currentDate <= stopDate) {
      dateArray.push(new Date(currentDate));
      currentDate = currentDate.addDays(1);
    }
    return dateArray;
  }

  const [dateArray, setDateArray] = React.useState(getDates(new Date(), new Date().addDays(days)));
  console.log(dateArray);

  const handleClickDate = (date) => {
    console.log(date);
  };

  return (
    <div className="datesContainer">
      <div className="dates">
        {dateArray?.map((date) => {
          const currentDate =
            date.getDate() +
            nth(parseInt(date.getDate())) +
            " " +
            month[date.getMonth()] +
            " " +
            date.getFullYear();

          return (
            <div
              onClick={() => handleClickDate(currentDate)}
              className="date"
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
