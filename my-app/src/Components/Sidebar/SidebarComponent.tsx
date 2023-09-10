import { Drawer, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import jwt from 'jwt-decode';

function SidebarComponent(){

    const navigate = useNavigate();
    const token =  localStorage.getItem("userToken");
    const decodedToken:any = jwt(token!);
    const logout = () => {
        /* localStorage.clear();
        navigate('../../login'); */
    }

    if(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] == "admin")
    {
        return(
            <Drawer
                anchor='left'
                open={true}
                variant="temporary"
                ModalProps={{
                    keepMounted: false,
                  }}
            >
                <Link href="/dashboard/sellers">Sellers</Link>
                <Link href="/dashboard/orders">Orders</Link>
                <Link href="/dashboard/updateAccount">Update account</Link>
                <Link href="/dashboard/updatePassword">Update password</Link>
                <Link onClick={logout}>Log out</Link>
            </Drawer>
            );
    
    }
    else{
        return(
            <div></div>
        );
    }
    
}
export default SidebarComponent;

