import * as React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const Details = () => {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [contact, setContact] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [gender, setGender] = React.useState('');

  const [age, setAge] = React.useState(0);
  const [dp, setDp] = React.useState('');

  React.useEffect(() => {
    const getDetails = async () => {
      await axios
        .get('https://randomuser.me/api')
        .then((res) => {
          setFirstName(res.data.results[0].name.first);
          setLastName(res.data.results[0].name.last);
          setEmail(res.data.results[0].email);
          setContact(res.data.results[0].phone);
          setGender(res.data.results[0].gender);

          setAge(res.data.results[0].dob.age);
          setDp(res.data.results[0].picture.medium);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getDetails();
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
          Full Name : {firstName} {lastName}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
          Gender : {gender}
        </Typography>
        <Typography variant="h5" component="div">
          {bull}
          {bull}
          {bull}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.primary">
          Contact Number : {contact}
        </Typography>
        <Typography variant="body2">Email : {email}</Typography>
        <Typography variant="body2">Age: {age}</Typography>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
};

export default Details;
