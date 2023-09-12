import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Countdown from 'react-countdown';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionSummary from '@mui/material/AccordionSummary';
import { Button, Typography } from "@mui/material";
import { Row, Col, Container } from "react-bootstrap";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { toast, Toaster} from "react-hot-toast";
import { OrderModel } from "../../../Models/OrderModel";
import { CancelOrder, GetShopperCompletedOrders, GetShopperNonCanceledOrders } from "../../../Services/OrderService";


const CompletedOrdersComponent = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("userToken");
    if(token == null || token == ''){
        navigate("../login");
    }
    const user = localStorage.getItem("email");

    const [nonCanceledOrders, setNonCanceledOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);

    useEffect(() => {
      const getCompletedOrders = async() => {
        const response = await GetShopperCompletedOrders(user!);
        setCompletedOrders(response.data);
      }
      getCompletedOrders();
    }, []);

    useEffect(() => {
        const getNonCanceledOrders = async() =>{
            const response = await GetShopperNonCanceledOrders(user!)
            setNonCanceledOrders(response.data);
        }
        getNonCanceledOrders();
    }, []);

    const cancelOrder = (order:OrderModel) => {
        var date = new Date(order.orderPlacedTime);
        date.setHours(date.getHours() + 1);
        if(new Date().getTime() > date.getTime()){
          console.log(order);

          CancelOrder(order.id).then(response => { 
            toast.success("Order " + order.id + " canceled!");
        })
      }
        else{

          toast.error("Can't cancel the order yet! You can cancel the order at " + date)

        }
    }
    
    return (
        <div className="container mt-5 ml-5">
          <div><Toaster/></div>
            <Accordion defaultExpanded={true}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                  In progress orders
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>Current orders</Typography>
              </AccordionSummary>
              <AccordionDetails>
              <Row>
                  {nonCanceledOrders.map((nonCanceledOrders, k) => (
                          <Col key={k} xs={12} md={4} lg={3}>
                              <Card sx={{ maxWidth: 345, width: 300 }}>
                                  <CardHeader>
                                  </CardHeader>
                                      <CardContent>
                                      <Typography variant="body2" color="text.secondary">
                                              Order id: {nonCanceledOrders['id']}
                                      </Typography>
                                      <Typography variant="body2" color="text.secondary">
                                          Time left:
                                      </Typography>
                                      <Countdown date={new Date(nonCanceledOrders['orderCompletedTime'])}></Countdown>
                                      <Typography variant="body2" color="text.secondary">
                                          Order address: {nonCanceledOrders['customerAddress']}
                                      </Typography>
                                      <Button disabled={new Date(nonCanceledOrders['orderCompletedTime']).getTime() < new Date().getTime()} variant="contained" size="small" color="error" type="submit" style={{marginLeft:"87px", marginTop:"10px"}} onClick={() => cancelOrder(nonCanceledOrders)}>Cancel</Button>
                                  </CardContent>
                              </Card>
                          </Col>
                      ))}
                  </Row>
              </AccordionDetails>
            </Accordion> 
            <Accordion defaultExpanded={false}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                  Completed orders
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>See completed orders </Typography>
              </AccordionSummary>
              <AccordionDetails>
              <Row>
                  {completedOrders.map((completedOrders, k) => (
                          <Col key={k} xs={12} md={4} lg={3}>
                              <Card sx={{ maxWidth: 345, width: 300 }}>
                                  <CardHeader>
                                  </CardHeader>
                                      <CardContent>
                                      <Typography variant="body2" color="text.secondary">
                                          Order id: {completedOrders['id']}
                                      </Typography>
                                      <Typography variant="body2" color="text.secondary">
                                          Order completed time: {completedOrders['orderCompletedTime']}
                                      </Typography>
                                      <Typography variant="body2" color="text.secondary">
                                          Order address: {completedOrders['customerAddress']}
                                      </Typography>
                                  </CardContent>
                              </Card>
                          </Col>
                      ))}
                  </Row>
              </AccordionDetails>
            </Accordion> 
        </div>    
    )
}
export default CompletedOrdersComponent;