import './App.css';
import jwt from 'jwt-decode';
import axios from 'axios';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import LoginComponent from './Components/Auth/LoginComponent';
import "bootstrap/dist/css/bootstrap.min.css"
import RegisterComponent from './Components/Auth/RegisterComponent';
import SidebarComponent from './Components/Sidebar/SidebarComponent';
import AllSellersComponent from './Components/Dashboard/Admin/AllSellersComponent';
import AllOrdersComponent from './Components/Dashboard/Admin/AllOrdersComponent';
import UpdateAccountComponent from './Components/Dashboard/Shared/UpdateAccountComponent';
import UpdatePasswordComponent from './Components/Dashboard/Shared/UpdatePasswordComponent';
import AddNewProductComponent from './Components/Dashboard/Seller/AddNewProductComponent';
import AllProductsComponent from './Components/Dashboard/Seller/AllProductsComponent';
import SellerOrdersComponent from './Components/Dashboard/Seller/SellersOrdersComponent';
import CurrentOrderComponent from './Components/Dashboard/Shopper/CurrentOrderComponent';
import ShopperLandingPageComponent from './Components/Dashboard/Shopper/ShopperLandingPageComponent';
import CompletedOrdersComponent from './Components/Dashboard/Shopper/CompletedOrdersComponent';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

function App() {

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
  });
  const customTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#3f51b5',
      },
      secondary: {
        main: '#f50057',
      },
    },
  });
  const navigate = useNavigate();
  axios.interceptors.response.use(response => {
    return response;
  }, error => {
  if (error.response.status === 401) {
    localStorage.clear();
    navigate("../../login");
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
    <ThemeProvider theme={darkTheme}>
            <CssBaseline />
        <div style={{display: 'table'}}>
          <div style={{ display: 'table-cell', width: '30%'}}>
            <SidebarComponent/>
          </div>
          <main style={{ display: 'table-cell', width:'70%'}}>
            <Outlet /> 
          </main>
      </div>
      </ThemeProvider>
  );
  const DashboardLayoutSeller = () => (
    <ThemeProvider theme={lightTheme}>
            <CssBaseline />
        <div style={{display: 'table'}}>
          <div style={{ display: 'table-cell', width: '30%'}}>
            <SidebarComponent/>
          </div>
          <div style={{ display: 'table-cell', width:'70%'}}>
            <Outlet /> 
          </div>
      </div>
      </ThemeProvider>
  );
  const DashboardLayoutShopper= () => (
    <ThemeProvider theme={customTheme}>
            <CssBaseline />
        <div style={{display: 'table'}}>
          <div style={{ display: 'table-cell', width: '30%'}}>
            <SidebarComponent/>
          </div>
          <div style={{ display: 'table-cell', width:'70%'}}>
            <Outlet /> 
          </div>
      </div>
      </ThemeProvider>
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
              
              <Route path="/dashboard/updateAccount" element ={<UpdateAccountComponent/>}/>
              <Route path="/dashboard/updatePassword" element ={<UpdatePasswordComponent/>}/> 
            
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
           <Route element={<DashboardLayoutSeller />} >
          <Route path="/dashboard" element ={<AddNewProductComponent/>}/>
              <Route path="/dashboard/addProduct" element ={<AddNewProductComponent/>}/>
              <Route path="/dashboard/orders" element ={<SellerOrdersComponent/>}/>
              <Route path="/dashboard/products" element ={<AllProductsComponent/>}/>
              <Route path="/dashboard/updateAccount" element ={<UpdateAccountComponent/>}/>
              <Route path="/dashboard/updatePassword" element ={<UpdatePasswordComponent/>}/>

          </Route>
          <Route path="/" element={<LoginComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/register" element={<RegisterComponent />} />
        </Routes>
         );
        }
        else if(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] == "shopper"){
          return (
            <Routes>
             { <Route element={<DashboardLayoutShopper />} >
             <Route path="/dashboard" element={<ShopperLandingPageComponent/>} />
              <Route path="/dashboard/newOrder" element={<ShopperLandingPageComponent />} />
              <Route path="/dashboard/currentOrder" element={<CurrentOrderComponent />} />
              <Route path="/dashboard/updateAccount" element ={<UpdateAccountComponent/>}/>\
              <Route path="/dashboard/myOrders" element ={<CompletedOrdersComponent/>}/>
              <Route path="/dashboard/updatePassword" element ={<UpdatePasswordComponent/>}/>

            </Route> } 
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

