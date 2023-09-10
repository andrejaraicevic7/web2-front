import axios from "axios";
import { RegisterModel } from "../Models/RegisterModel";
import { LoginModel } from "../Models/LoginModel";

export async function Register(regModel:RegisterModel){
    return await axios.post(process.env.REACT_APP_API_URL+'/api/auth/register', regModel);
}

export async function Login(loginModel:LoginModel){
    return await axios.post(process.env.REACT_APP_API_URL+'/api/auth/login', loginModel);

}
export async function GoogleLogin(regModel:RegisterModel){
    return await axios.post(process.env.REACT_APP_API_URL+'/api/auth/socialLogin', regModel);
}