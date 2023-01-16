const Counter = ({ time }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h3>Counter: </h3>
      <h1>{time}</h1>
    </div>
  );
};

export default Counter;
