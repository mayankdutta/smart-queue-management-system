import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

const Counter = ({ time }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h5" gutterBottom>
        Waiting for next patient
        <LinearProgress />
      </Typography>
      <Typography variant="h4" gutterBottom>
        <h1>{time}</h1>
      </Typography>
    </div>
  );
};

export default Counter;
