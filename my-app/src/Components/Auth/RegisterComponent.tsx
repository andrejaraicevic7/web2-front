import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { RegisterModel } from "../../Models/RegisterModel";
import { Register } from "../../Services/AuthService";
import toast, { Toaster } from "react-hot-toast";
export default function () {

    const navigate = useNavigate();

    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [dateOfBirth, setDateOfBirth] = React.useState<Dayjs | null>(dayjs('1940-01-01'));
    const [lastname, setLastname] = useState("")
    const [address, setAddress] = useState("")
    const [email, setEmail] = useState("")
    const [accountType, setAccountType] = useState("2")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("") 

    
    const registerAction = (event: { preventDefault: () => void; }) =>{
      event.preventDefault();
      const regModel:RegisterModel = new RegisterModel(name, lastname, address, Number(accountType) ,password, confirmPassword,email, new Date(dateOfBirth?.toString() as string), username);
      
      if(password != confirmPassword){
          toast.error("Passwords do not match, please try again");
          return;
      }

      Register(regModel)
          .then(response =>{
              if(response.status === 204){
                  toast.success("Successfully registered!");
                  navigate("../login");
              }
          })
          .catch(error =>{
              toast.error(error.response.data);
          })
  }
    
  return (

    
<Container component="main" maxWidth="sm">
      <div><Toaster/></div>
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
              <Typography component="h1" variant="h6">
                Create your account!
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={registerAction}
                sx={{ mt: 0 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  value={username}
                  onChange={(e)=>{setUsername(e.target.value)}}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e)=>{setEmail(e.target.value)}}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={(e)=>{setPassword(e.target.value)}}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="repeatedPassword"
                  label="Repeat Password"
                  type="password"
                  id="repeatedPassword"
                  autoComplete="current-password"
                  value={confirmPassword}
                  onChange={(e)=>{setConfirmPassword(e.target.value)}}
                  />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  value={name}
                  onChange={(e)=>{setName(e.target.value)}}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="lastname"
                  label="Lastname"
                  name="lastname"
                  value={lastname}
                  onChange={(e)=>{setLastname(e.target.value)}}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  value={address}
                  onChange={(e)=>{setAddress(e.target.value)}}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <DatePicker 
                        value={dateOfBirth}
                        onChange={(newValue) => setDateOfBirth(newValue)}
                    />
                </LocalizationProvider>
                <InputLabel id="demo-simple-select-label">Account type</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={accountType}
                    label="Account type"
                    onChange={(e)=>{setAccountType(e.target.value)}}
                    
                >
                    <MenuItem value={0}>Administrator</MenuItem>
                    <MenuItem value={1}>Shopper</MenuItem>
                    <MenuItem value={2}>Seller</MenuItem>
                </Select>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Register
                </Button>
                <Grid container
                 display="flex"
                 justifyContent="center"
                 alignItems="center">
                  <Grid item>
                    <Link href="/login" variant="body2">
                      {"Already have an account? Log in"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
    </Container>
  );
}