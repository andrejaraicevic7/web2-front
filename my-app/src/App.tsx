import './App.css';
import jwt from 'jwt-decode';
import axios from 'axios';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import LoginComponent from './Components/Auth/LoginComponent';
import RegisterComponent from './Components/Auth/RegisterComponent';
import SidebarComponent from './Components/Sidebar/SidebarComponent';
import AllSellersComponent from './Components/Dashboard/Admin/AllSellersComponent';
import AllOrdersComponent from './Components/Dashboard/Admin/AllOrdersComponent';

function App() {


  const navigate = useNavigate();
  axios.interceptors.response.use(response => {
    return response;
  }, error => {
  if (error.response.status === 401) {
    //localStorage.clear();
    //navigate("../../login");
  }
    return error;
  }); 

   axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem("userToken");
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  }); 

  const DashboardLayoutAdmin = () => (
      
    <div>
      <div className="screens-container" >
        <main className="main">
        <SidebarComponent />
          <Outlet /> 
        </main>
      </div>
    </div>

  );


  const token =  localStorage.getItem("userToken");
    if(token == null){
      return(
        <Routes>
          <Route path="/" element={<LoginComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/register" element={<RegisterComponent />} />
    
        </Routes>
      )
    }
    else{
        const decodedToken:any = jwt(token!);
        if(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] == "admin"){
          return (
            <Routes>
            { 
              <Route element={<DashboardLayoutAdmin />} >
            
              <Route path="/dashboard" element ={<AllSellersComponent/>}/>
              <Route path="/dashboard/sellers" element ={<AllSellersComponent/>}/>
              <Route path="/dashboard/orders" element ={<AllOrdersComponent/>}/>
              {/* 
              <Route path="/dashboard/updateAccount" element ={<UpdateAccountComponent/>}/>
            <Route path="/dashboard/updatePassword" element ={<UpdatePasswordComponent/>}/> */}
            
             </Route> 
            }
            <Route path="/" element={<LoginComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/register" element={<RegisterComponent />} />

          </Routes>    
          );       
        }
        else if(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] == "seller"){
          return (
          <Routes>
          {/* <Route element={<DashboardLayoutSeller />} >
          <Route path="/dashboard" element ={<AddProductComponent/>}/>
              <Route path="/dashboard/addProduct" element ={<AddProductComponent/>}/>
              <Route path="/dashboard/orders" element ={<SellerOrdersComponent/>}/>
              <Route path="/dashboard/products" element ={<SellerProducts/>}/>
              <Route path="/dashboard/updateAccount" element ={<UpdateAccountComponent/>}/>
              <Route path="/dashboard/updatePassword" element ={<UpdatePasswordComponent/>}/>

          </Route> */}
          <Route path="/" element={<LoginComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/register" element={<RegisterComponent />} />
        </Routes>
         );
        }
        else if(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] == "shopper"){
          return (
            <Routes>
           {/*  { <Route element={<DashboardLayoutShopper />} >
             <Route path="/dashboard" element={<AllProductsComponent/>} />
              <Route path="/dashboard/newOrder" element={<AllProductsComponent />} />
              <Route path="/dashboard/currentOrder" element={<CurrentOrderComponent />} />
              <Route path="/dashboard/updateAccount" element ={<UpdateAccountComponent/>}/>\
              <Route path="/dashboard/myOrders" element ={<ShopperOrdersComponent/>}/>
              <Route path="/dashboard/updatePassword" element ={<UpdatePasswordComponent/>}/>

            </Route> } */}
            <Route path="/" element={<LoginComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/register" element={<RegisterComponent />} />
          </Routes>    
          ); 
        }
        return(
          <Routes>
            <Route path="/" element={<LoginComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/register" element={<RegisterComponent />} />

          </Routes>
        )
    }
}

export default App;

