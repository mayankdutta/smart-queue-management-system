import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Toast = ({ status, setStatus }) => {
  return (
    <Stack
      spacing={2}
      sx={{ width: '15%', marginLeft: '8px', cursor: 'pointer' }}
      onClick={() => setStatus('')}
    >
      {status === 'loading' && (
        <Alert severity="info">Loading Please Wait</Alert>
      )}
      {status === 'failure' && (
        <Alert severity="error">Wrong credentials</Alert>
      )}
      {status === 'warning' && (
        <Alert severity="warning">This is an info alert — check it out!</Alert>
      )}
      {status === 'success' && (
        <Alert severity="success">Successfully Logged in</Alert>
      )}
    </Stack>
  );
};

export default Toast;
