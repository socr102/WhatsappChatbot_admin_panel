import React from "react";
import { useEffect , useState } from 'react';
import axios from "axios";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Form,
  Row,
  Col,
} from "react-bootstrap";

function OrderList() {

  const [orders, setOrder] = useState([]); 


  useEffect(() => {
    getAllOrders();
  } ,[]);


  const getAllOrders = () => {
    axios.get("http://127.0.0.1:8000/api/orders/")
    .then((res) => setOrder(res.data))
    .catch((err) => console.log(err));
  } ;



  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">OrdersList</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Category</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Quantity</th>
                      <th className="border-0">PhoneNumber</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order,index) => (
                      <tr key={index+1}>
                        <td>{index+1}</td>
                        <td>{order.category_id}</td>
                        <td>{order.product}</td>
                        <td>{order.quantity}</td>
                        <td>{order.phonenumber}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>

      </Container>

    </>
  );
}

export default OrderList;
