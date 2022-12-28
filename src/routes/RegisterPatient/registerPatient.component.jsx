import { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Backend } from "../../backendData";
import { useNavigate } from "react-router-dom";

const link = Backend.link;

const theme = createTheme();

const defaultFormFields = {
  name: "",
  age: "",
  weight: "",
  contactNumber: "",
  contactNumberFamilyMember: "",
  address: "",
  doctor: "",
  tokenNumber: "",
  bodyTemperature: "",
  bloodPressure: "",
  bloodType: "",
  oxygenLevel: "",
  description: "",
  typeOfCase: "",
  currentPenalty: "",
  registeredBy: "",
};

export default function Register() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const authenticationTokenNumber = localStorage.getItem("access-token");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log("printing name: ", name, [name]);
    console.log("printing value: ", value);
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();


    const headers = {
      "Content-type": "application/json",
      "access-token": authenticationTokenNumber,
    };

    try {
      const response = await axios.post(
        `${link}/register_patient`,
        {
          ...formFields,
          motive: "",
          explainCase: formFields.description,
          registeredBy: authenticationTokenNumber,
          currentPenalty: 1
        },
        { headers: headers }
      );
      console.log(response);
      navigate("/");
      // response.status === 200 ? setRegister(true) : setRegister(false)
    } catch (error) {
      console.warn(error);
    }
  };
  function titleCase(str) {
    return str
      .split(/(?=[A-Z])/)
      .map(function (word) {
        return word.replace(word[0], word[0].toUpperCase());
      })
      .join(" ");
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Register New Patient
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              {Object.keys(defaultFormFields).map((defaultFormField) => 
                  <Grid item xs={12} sm = {defaultFormField.length < 6 ? 6 : 12} key={defaultFormField}>
                    <TextField
                      fullWidth
                      required
                      id={defaultFormField}
                      label={titleCase(defaultFormField)}
                      name={defaultFormField}
                      value={formFields.key}
                      onChange={handleChange}
                    />
                  </Grid>

              )}

              <Grid item xs={12} sm={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
