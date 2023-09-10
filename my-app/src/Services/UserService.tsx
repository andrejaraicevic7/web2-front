import axios from 'axios';
import { UserModel } from '../Models/UserModel';

export async function GetShoppers(){
    return await axios.get(process.env.REACT_APP_API_URL+'/api/users/getShoppers');
}
export async function GetSellers(){
    return await axios.get(process.env.REACT_APP_API_URL+'/api/users/getSellers');
}

export async function BlockSeller(sellerId:string){
    return await axios.post(process.env.REACT_APP_API_URL + '/api/users/blockSeller?sellerId=' + sellerId);
}

export async function VerifySeller(sellerId:string){
    return await axios.post(process.env.REACT_APP_API_URL + '/api/users/verifySeller?sellerId=' + sellerId);
}

export async function UpdateAccount(user: UserModel){
    return await axios.post(process.env.REACT_APP_API_URL + '/api/users/updateAccount', user);

}

export async function UpdatePassword(email:string, oldPassword:string, newPassword:string, repeatedPassword:string){
    const query:string = "email="+email+"&oldPassword="+oldPassword+"&newPassword="+newPassword+"&repeatedPassword="+repeatedPassword;
    return await axios.post(process.env.REACT_APP_API_URL + '/api/users/updatePassword?'+ query);
}

export async function GetUserData(email:string){
    return await axios.get(process.env.REACT_APP_API_URL + '/api/users/getUserData', {params : {email: email}});
}

export async function UploadImage(image:any, email:string){
    var formData = new FormData();
    formData.append("image", image);
    return await axios.post(process.env.REACT_APP_API_URL + '/api/users/uploadImage', formData, {params: {"email": email}});

}