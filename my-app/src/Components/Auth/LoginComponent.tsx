import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { GoogleLogin, Login } from "../../Services/AuthService";
import { LoginModel } from "../../Models/LoginModel";
import { ProductModel } from "../../Models/ProductModel";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { CssBaseline, Paper } from "@mui/material";
import { UserModel } from "../../Models/UserModel";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import GoogleButton from "react-google-button";

export default function SignIn() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate();
  const handleSubmit = (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
    event.preventDefault();
    if(email != "" && password != ""){

      const loginModel:LoginModel = new LoginModel(email, password);
      const cart: ProductModel[] = [];

      Login(loginModel)
      .then(response =>{
        if(response.data == "User not verified"){
          toast.error(response.data);

        }
        else if (response.data == "" || response.data == undefined){
          toast.error("Wrong email or password, please try again");
        }
        else
        {
          toast.success("Logging in...");
          localStorage.setItem("userToken", response.data)
          localStorage.setItem("email", email);
          localStorage.setItem("cart", JSON.stringify(cart));
          localStorage.setItem("imageUrl", response.data.imageUrl);
        }
      }).finally(() => {
          navigate("../dashboard");
      })
      
      .catch(error =>{
            toast.error("Wrong email or password, please try again");
      });

    };
  }
  
  
  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      if (codeResponse) {
        axios
            .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`, {
                headers: {
                    Authorization: `Bearer ${codeResponse.access_token}`,
                    Accept: 'application/json'
                }
            })
            .then((res) => {
                const cart: ProductModel[] = [];
                const accountModel:UserModel = new UserModel(res.data.given_name, res.data.family_name, "", res.data.email, new Date(), res.data.id, 0, res.data.picture);
                GoogleLogin(accountModel).then(response =>{
                  if(response.data == "User not verified"){
                    toast.error("User not verified");
                  }
                  else{
                    localStorage.setItem("userToken", response.data)
                    localStorage.setItem("email", res.data.email);
                    localStorage.setItem("cart", JSON.stringify(cart));
                    localStorage.setItem("imageUrl", res.data.picture);
                    console.log(response);
                    navigate("../dashboard");
                    window.location.reload();
                  }
                }).catch(error => {
                  window.location.reload();
                  toast.error(error);
                })

            })
            .catch((err) => console.log(err));
    }
    },
    onError: (error) => console.log('Login Failed:', error),
    onNonOAuthError: (error) => console.log('Login Failed:', error)
  });


  return (
<div style={{ 
      backgroundImage: `url("https://img.freepik.com/free-vector/abstract-sky-background-with-glowing-wave_1017-18388.jpg?w=1800&t=st=1694465219~exp=1694465819~hmac=49c2ab6a88d737540840a1eb8d3e2d810387ef77024ed0ab0527482939de7e2b")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
    <Container component="main" maxWidth="lg">
        <div><Toaster/></div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Grid container>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: "url('https://images.pexels.com/photos/4968391/pexels-photo-4968391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Sign in to make your first order!
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Login
                </Button>
                <GoogleButton style={{marginLeft:"90px", marginTop:"10px"}} onClick={() => googleLogin()}/> 
                <Grid container style={{marginTop:"10px"}}
                 display="flex"
                 justifyContent="center"
                 alignItems="center">
                  <Grid item>
                    <Link href="/register" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
    </div>
  );
}