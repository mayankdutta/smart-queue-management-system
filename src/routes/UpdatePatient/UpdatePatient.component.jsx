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
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

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

export default function Update() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const authenticationTokenNumber = localStorage.getItem("access-token");
  const navigate = useNavigate();
  const params = useParams();

  console.log("params: ", params.id);

  const headers = {
    "Content-type": "application/json",
    "access-token": authenticationTokenNumber,
  };

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        let response = await axios.get(`${link}/update_patient/${params.id}`, {
          headers: headers,
        });
        console.log("response received: ", response.data[0]);
        // setUserData(response.data[0]);
        setFormFields({
          ...response.data[0],
          description: response.data[0].explainCase,
          address: response.data[0].Address,
        });
      } catch (err) {
        console.warn(err);
      }
    };
    console.log("FETCHING PATIENT DATA");
    fetchPatientDetails();
  }, []);

  function titleCase(str) {
    return str
      .split(/(?=[A-Z])/)
      .map(function (word) {
        return word.replace(word[0], word[0].toUpperCase());
      })
      .join(" ");
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
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
        `${link}/update_patient/${params.id}`,
        {
          ...formFields,
          motive: "no motive as of now",
          explainCase: formFields.description,
          registeredBy: authenticationTokenNumber,
        },
        { headers: headers }
      );
      console.log(response);
      navigate("/");
      // response.status === 200 ? setRegister(true) : setRegister(false)
    } catch (error) {
      console.warn(error);
      console.log("in the path", `${link}/update_patient/${params.id}`);
      console.log("form fields: ", formFields);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Update Patient
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              {Object.keys(defaultFormFields).map((defaultFormField) => (
                <Grid
                  item
                  xs={12}
                  key={defaultFormField}
                  sm={defaultFormField.length < 6 ? 6 : 12}
                >
                  <TextField
                    fullWidth
                    required
                    id={defaultFormField}
                    label={titleCase(defaultFormField)}
                    name={defaultFormField}
                    value={formFields[defaultFormField]}
                    onChange={handleChange}
                  />
                </Grid>
              ))}
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Update
              </Button>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
