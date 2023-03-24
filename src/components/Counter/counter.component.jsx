import { DEFAULT_COUNTER } from '../../backendData';

const Counter = ({ time }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="text-3xl">counter: </div>
      <div className="text-7xl">
        {time}
      </div>
    </div>
  );
};

export default Counter;
