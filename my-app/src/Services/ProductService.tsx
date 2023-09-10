import axios from 'axios';
import { ProductModel } from '../Models/ProductModel';

export async function AddProduct(product:ProductModel){
    return await axios.post(process.env.REACT_APP_API_URL+'/api/product/new', product);
}

export async function GetProducts(){
    return await axios.get(process.env.REACT_APP_API_URL+'/api/product/all');
}

export async function GetSellerProducts(sellerId:string){
    return await axios.get(process.env.REACT_APP_API_URL+'/api/product/sellerProducts', {params : {sellerId: sellerId}});
}