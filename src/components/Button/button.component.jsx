import "./button.styles.css"

const Button = ({ occupied, setOccupied, handlePresent, setTime }) => {
  return (
    <div className={"buttons"}>
      {!occupied && (
        <button
          className="button-red"
          onClick={() => {
            handlePresent();
            setOccupied(!occupied);
          }}
        >
          send patient inside
        </button>
      )}
      {occupied && (
        <button
          className="button-green"
          onClick={() => {
            setTime(1);
            setOccupied(!occupied);
          }}
        >
          patient done.
        </button>
      )}
    </div>
  );
};

export default Button;
