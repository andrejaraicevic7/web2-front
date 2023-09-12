import { Avatar, Drawer, IconButton, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PasswordIcon from '@mui/icons-material/Password';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import InventoryIcon from '@mui/icons-material/Inventory';
import StoreIcon from '@mui/icons-material/Store';
import HistoryIcon from '@mui/icons-material/History';
import jwt from 'jwt-decode';
import { ChangeEvent, useState } from "react";
import { GetUserData, UploadImage } from "../../Services/UserService";
import toast, { Toaster } from "react-hot-toast";

function SidebarComponent(){

    const [imageUrl, setImageUrl] = useState("")
    const loggedInEmail = localStorage.getItem("email");
    const navigate = useNavigate();
    const token =  localStorage.getItem("userToken");
    const decodedToken:any = jwt(token!);
    const logout = () => {
        localStorage.clear();
        navigate('../../login');
    }

    GetUserData(loggedInEmail!).then(response =>{
        setImageUrl(response.data.accountImage);
    })
    
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
        UploadImage(e.target.files[0], loggedInEmail!).then(response=>{
            toast.success("Image updated!");
            setImageUrl(response.data);
            localStorage.setItem("imageUrl", response.data);
        });
        }
    };
    if(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] == "admin")
    {
        return(
            <Drawer
                anchor='left'
                open={true}
                variant="persistent"                
                ModalProps={{
                    keepMounted: false,
                  }}
            >
                <div><Toaster/></div>
                <List>
                    <ListItem>
                        <ListItemText style={{textAlign: 'center'}}>
                                Admin portal
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <div className="px-5">
                                <div className="overlay px-5">
                                    <input accept="image/*" id="icon-button-file" type="file" onChange={handleFileChange}/>
                                </div>
                            <label htmlFor="icon-button-file">
                                <IconButton color="primary" component="span">
                                <Avatar alt={"img"} src={process.env.REACT_APP_API_URL+'/'+imageUrl} sx={{ width: 100, height: 100 }}/>
                                </IconButton>
                            </label>           
                        </div>
                    </ListItem>
                    <ListItem>
                        <ListItemButton href="/dashboard/sellers">
                            <ListItemIcon>
                                <PersonIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Sellers"/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton href="/dashboard/orders">
                            <ListItemIcon>
                                <ShoppingCartIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Orders"/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton href="/dashboard/updateAccount">
                            <ListItemIcon>
                                <AccountCircleIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Update account"/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton href="/dashboard/updatePassword">
                            <ListItemIcon>
                                <PasswordIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Update password"/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton onClick={logout}>
                            <ListItemIcon>
                                <LogoutIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Log out"/>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
            );
    
    }
    else if(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] == "seller"){
        return(
            <Drawer
                anchor='left'
                open={true}
                variant="persistent"                
                ModalProps={{
                    keepMounted: false,
                  }}
            >
                <div><Toaster/></div>
                <List>
                <ListItem>
                    <ListItemText style={{textAlign: 'center'}}>
                            Seller portal
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <div className="px-5">
                            <div className="overlay px-5">
                                <input accept="image/*" id="icon-button-file" type="file" onChange={handleFileChange}/>
                            </div>
                        <label htmlFor="icon-button-file">
                            <IconButton color="primary" component="span">
                            <Avatar alt={"img"} src={process.env.REACT_APP_API_URL+'/'+imageUrl} sx={{ width: 100, height: 100 }}/>
                            </IconButton>
                        </label>           
                    </div>
                </ListItem>
                    <ListItem>
                        <ListItemButton href="/dashboard/addProduct">
                            <ListItemIcon>
                                <AddIcon/>
                            </ListItemIcon>
                            <ListItemText primary="New product"/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton href="/dashboard/orders">
                            <ListItemIcon>
                                <ShoppingCartIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Orders"/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton href="/dashboard/products">
                            <ListItemIcon>
                                <InventoryIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Products"/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton href="/dashboard/updateAccount">
                            <ListItemIcon>
                                <AccountCircleIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Update account"/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton href="/dashboard/updatePassword">
                            <ListItemIcon>
                                <PasswordIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Update password"/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton onClick={logout}>
                            <ListItemIcon>
                                <LogoutIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Log out"/>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
            );
    }
    else if(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] == "shopper"){
        return (
            <Drawer
            anchor='left'
            open={true}
            variant="persistent"                
            ModalProps={{
                keepMounted: false,
              }}
        >
            <div><Toaster/></div>
            <List>
            <ListItem>
                    <ListItemText style={{textAlign: 'center'}}>
                            Shopper portal
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <div className="px-5">
                            <div className="overlay px-5">
                                <input accept="image/*" id="icon-button-file" type="file" onChange={handleFileChange}/>
                            </div>
                        <label htmlFor="icon-button-file">
                            <IconButton color="primary" component="span">
                            <Avatar alt={"img"} src={process.env.REACT_APP_API_URL+'/'+imageUrl} sx={{ width: 100, height: 100 }}/>
                            </IconButton>
                        </label>           
                    </div>
                </ListItem>
                <ListItem>
                    <ListItemButton href="/dashboard/newOrder">
                        <ListItemIcon>
                            <StoreIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Shop"/>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton href="/dashboard/currentOrder">
                        <ListItemIcon>
                            <ShoppingCartIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Cart"/>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton href="/dashboard/myOrders">
                        <ListItemIcon>
                            <HistoryIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Completed orders"/>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton href="/dashboard/updateAccount">
                        <ListItemIcon>
                            <AccountCircleIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Update account"/>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton href="/dashboard/updatePassword">
                        <ListItemIcon>
                            <PasswordIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Update password"/>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton onClick={logout}>
                        <ListItemIcon>
                            <LogoutIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Log out"/>
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
        );
    }
    else{
        return (
            <div></div>
        );
    }
    
}
export default SidebarComponent;

