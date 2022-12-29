import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

const PatientForm = ({
  handleChange,
  handleSubmit,
  formFields,
  ButtonValue,
}) => {
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
              {Object.keys(formFields).map((defaultFormField) => (
                <Grid
                  item
                  xs={12}
                  sm={defaultFormField.length < 6 ? 6 : 12}
                  key={defaultFormField}
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

              <Grid item xs={12} sm={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {ButtonValue}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default PatientForm;
