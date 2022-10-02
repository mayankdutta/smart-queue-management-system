import * as React from 'react';
import axios from 'axios'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles'
import {Backend} from "../backendData";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";

const link = Backend.link;

const theme = createTheme();

export default function Update() {

    // const [register, setRegister] = React.useState(false);
    const [userData, setUserData] = React.useState({});
    const authenticationTokenNumber = localStorage.getItem("access-token");
    const navigate = useNavigate();
    const params = useParams();

    const headers = {
        'Content-type': "application/json",
        'access-token': (authenticationTokenNumber)
    };

    useEffect(() => {
        const fetchPatientDetails = async () => {
            try {
                let response = await axios.get(`${link}/update_patient/${params.id}`, {headers: headers});
                console.warn(response.data[0]);
                setUserData(response.data[0]);
            } catch (err) {
                console.warn(err);
            }
        }
        console.log("fetching patient data")
        fetchPatientDetails();
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let name = data.get('name')
        let contactNumber = data.get('contact')
        let contactNumberFamilyMember = data.get('family-contact')
        let Address = data.get('address')
        let doctor = data.get('doctor')
        let tokenNumber = data.get('token-number')

        let bodyTemperature = data.get('body-temperature')
        let age = data.get('age');
        let weight = data.get('weight');
        let bloodPressure = data.get('blood-pressure')
        let bloodType = data.get('blood-type')
        let motive = data.get('motive');
        let oxygenLevel = data.get('oxygen-level');
        let ellaborateCase = data.get('ellaborate-case');
        let typeOfCase = data.get('type-of-case')

        const headers = {
            'Content-type': "application/json",
            'access-token': (authenticationTokenNumber)
        };

        try {
            const response = await axios.post(`${link}/update_patient/${params}`, {
                    name: name,
                    contactNumber: contactNumber,
                    contactNumberFamilyMember: contactNumberFamilyMember,
                    Address: Address,
                    doctor: doctor,
                    registeredBy: authenticationTokenNumber,
                    tokenNumber: tokenNumber, // to be decided in backend.
                    currentPenalty: 1,

                    bodyTemperature: bodyTemperature,
                    age: age,
                    weight: weight,
                    bloodType: bloodType,
                    bloodPressure: bloodPressure,
                    motive: motive,
                    oxygenLevel: oxygenLevel,
                    explainCase: ellaborateCase,
                    typeOfCase: typeOfCase,
                }, {headers: headers}
            );
            console.log(response);
            navigate('/');
            // response.status === 200 ? setRegister(true) : setRegister(false)
        } catch (error) {
            console.warn(error)
        }
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
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoFocus
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    name="name"
                                    value={userData.name}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField

                                    name="Patient contact number"
                                    required
                                    fullWidth
                                    id="contact"
                                    label="Patient contact number"
                                    value={userData.contactNumber}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="family-contact"
                                    label="Family Contact"
                                    name="family-contact"
                                    value={userData.contactNumberFamilyMember}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="address"
                                    label="Address"
                                    name="address"
                                    value={userData.Address}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="doctor"
                                    label="Doctor"
                                    name="doctor"
                                    value={userData.doctor}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="register-by"
                                    label="Registered By"
                                    name="register-by"
                                    value={userData.registeredBy}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="body-temperature"
                                    fullWidth
                                    id="body-temperature"
                                    label="body-temperature"
                                    value={userData.bodyTemperature}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="token-number"
                                    required
                                    fullWidth
                                    id="token-number"
                                    label="Token Number"
                                    value={userData.tokenNumber}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="type-of-case"
                                    label="type of case"
                                    name="type-of-case"
                                    value={userData.typeOfCase}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="ellaborate-case"
                                    label="Ellaborate Case"
                                    name="ellaborate-case"
                                    value={userData.explainCase}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="oxygen-level"
                                    label="Oxygen Level"
                                    name="oxygen-level"
                                    value={userData.oxygenLevel}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="blood-pressure"
                                    label="Blood Pressure"
                                    name="blood-pressure"
                                    value={userData.bloodPressure}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="weight"
                                    label="weight"
                                    name="weight"
                                    value={userData.weight}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="age"
                                    label="Age"
                                    name="age"
                                    value={userData.age}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="curr-penalty"
                                    label="Current Penalty"
                                    name="curr-penalty"
                                    value={userData.currentPenalty}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Register
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}