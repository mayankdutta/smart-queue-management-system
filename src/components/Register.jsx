import * as React from 'react';
import axios from 'axios'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme();

export default function Register() {

  const [register, setRegister] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let name = data.get('name')
    let contactNumber = data.get('contact')
    let contactNumberFamilyMember = data.get('family-contact')
    let Address = data.get('address')
    let doctor = data.get('doctor')
    let registeredBy = data.get('register-by')
    let tokenNumber = data.get('token-number')
    let currentPenalty = data.get('curr-panelty')

    axios.post('#', {
      name: name,
      contactNumber: contactNumber,
      contactNumberFamilyMember: contactNumberFamilyMember,
      Address: Address,
      doctor: doctor,
      registeredBy: registeredBy,
      tokenNumber: tokenNumber,
      currentPenalty: currentPenalty
    })
      .then(response => {
        response.status === 'success' ? setRegister(true) : setRegister(false)
      })
      .catch(error => { console.log("Error : ", error) })
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="contact"
                  required
                  fullWidth
                  id="contact"
                  label="Contact"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="family-contact"
                  label="Family Contact"
                  name="family-contact"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="doctor"
                  label="Doctor"
                  name="doctor"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="register-by"
                  label="Registered By"
                  name="register-by"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="token-number"
                  required
                  fullWidth
                  id="token-number"
                  label="Token Number"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="curr-panelty"
                  label="Current Panelty"
                  name="curr-panelty"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider >
  )
}