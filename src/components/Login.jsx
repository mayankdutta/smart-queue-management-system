import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Backend } from "../backendData";
import { useEffect } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const theme = createTheme();
const link = Backend.link;

export default function LogIn({ setRefresh }) {
  const navigate = useNavigate();
  const [status, setStatus] = React.useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("access-token");
    if (accessToken) {
      setRefresh(true);
      navigate("/");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let email = data.get("email");
    let password = data.get("password");
    setStatus((prev) => (prev = "loading"));

    try {
      const response = await axios.post(`${link}/login`, {
        email: email,
        password: password,
      });
      console.warn(response);
      localStorage.setItem("access-token", response.data.accessToken);
      localStorage.setItem("name", response.data.name);
      setRefresh(true);
      setStatus("success");
      navigate("/");
    } catch (err) {
      setStatus("failure");
      console.warn(err.message);
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Log In
              </Button>
              <Grid container>
                <Grid item xs>
                  {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      <Stack
        spacing={2}
        sx={{ width: "15%", marginLeft: "8px", cursor: "pointer" }}
        onClick={() => setStatus("")}
      >
        {status === "loading" && (
          <Alert severity="info">Loading Please Wait</Alert>
        )}
        {status === "failure" && (
          <Alert severity="error">Wrong credentials</Alert>
        )}
        {status === "warning" && (
          <Alert severity="warning">
            This is an info alert — check it out!
          </Alert>
        )}
        {status === "success" && (
          <Alert severity="success">Successfully Logged in</Alert>
        )}
      </Stack>
    </>
  );
}
