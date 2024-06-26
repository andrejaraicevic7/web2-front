import {  useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import Box from "@mui/material/Box";
import { Toaster } from "react-hot-toast";
import { Button, Container, CssBaseline, Grid, InputLabel, MenuItem, Paper, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { UserModel } from "../../../Models/UserModel";
import { GetUserData, UpdateAccount, UploadImage } from "../../../Services/UserService";

export default function(){
    
    const navigate = useNavigate();
    const token = localStorage.getItem("userToken");
    if(token == null || token == ''){
        navigate("../login");
    }
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [lastname, setLastname] = useState("")
    const [address, setAddress] = useState("")
    const [email, setEmail] = useState("")
    const [imageUrl, setImageUrl] = useState("")

    const updateAccount = () => {
        const userToUpdate:UserModel = new UserModel(name, lastname, address, email, new Date(dateOfBirth), username, 0, "");

        UpdateAccount(userToUpdate).then(response=>{
            setName(response.data.name);
            setUsername(response.data.username);
            setDateOfBirth(response.data.dateOfBirth.slice(0, 10));
            setLastname(response.data.lastname);
            setEmail(response.data.email);
            setAddress(response.data.address);

        })
    }

    const loggedInEmail = localStorage.getItem("email");
    if(loggedInEmail != undefined){
     useEffect(() => {
        const getUserData = async() =>{
            const response = await GetUserData(loggedInEmail);
            setName(response.data.name);
            setUsername(response.data.username);
            if(response.data.dateOfBirth != undefined){
                setDateOfBirth(response.data.dateOfBirth.slice(0, 10));
            }
            setLastname(response.data.lastname);
            setEmail(response.data.email);
            setAddress(response.data.address);
            setImageUrl(response.data.accountImage);
        }
        getUserData();


    }, []);

  
}
    return (
        <Container>
      <div><Toaster/></div>
      <Box
      sx={{
        ml: 50
      }}
      >
        <Grid container>
          <CssBaseline />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
          
          >
            <Box
              sx={{
                my: 8,
                mx: 9,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h6">
                Update account
              </Typography>
              <Box
                sx={{ mt: 0,  display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minWidth:"300px"}}
                
              >
                   <TextField
                  margin="normal"
                  disabled
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
                        value={dayjs(dateOfBirth)}
                        onChange={(newValue) => setDateOfBirth(newValue!.toString())}
                    />
                </LocalizationProvider>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={updateAccount}
                >
                  Update
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
    )
}