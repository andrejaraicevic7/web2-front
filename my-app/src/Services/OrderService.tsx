import axios from 'axios';
import { OrderModel } from '../Models/OrderModel';

export async function GetAllOrders(){
    return await axios.get(process.env.REACT_APP_API_URL+'/api/order/getAllOrders');
}

export async function ConfirmOrder(orderModel:OrderModel){
    return await axios.post(process.env.REACT_APP_API_URL+'/api/order/createOrder', orderModel)
}

export async function GetShopperCompletedOrders(email:string){
    return await axios.get(process.env.REACT_APP_API_URL+'/api/order/getCompletedOrders', {params : {email: email}});

}
export async function GetShopperNonCanceledOrders(email:string){    
    return await axios.get(process.env.REACT_APP_API_URL+'/api/order/getNonCanceledOrders', {params : {email: email}});
}

export async function GetSellerNewOrders(email:string){
    return await axios.get(process.env.REACT_APP_API_URL+'/api/order/getNewOrdersSeller', {params : {email: email}});
}

export async function GetSellerAllOrders(email:string){
    return await axios.get(process.env.REACT_APP_API_URL+'/api/order/getAllOrdersSeller', {params : {email: email}});
}

export async function CancelOrder(orderId:string){
    return await axios.post(process.env.REACT_APP_API_URL+'/api/order/cancelOrder?orderId=' + orderId)
}