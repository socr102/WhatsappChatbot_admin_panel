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
  Modal,
  Container,
  Form,
  OverlayTrigger,
  Tooltip,
  Row,
  Col,
} from "react-bootstrap";

function CategoryList() {

  const [categorys, setCategory] = useState([]); 
  const [showModal, setShowModal] = React.useState(false); 
  const [name, setNameField] = useState("")
  const [price, setPriceField] = useState(0)
  const [id, setIDField] = useState(0)


  useEffect(() => {
    getAllCategorys();
  } ,[]);


  const getAllCategorys = () => {
    axios.get("http://127.0.0.1:8000/api/categorys/")
    .then((res) => setCategory(res.data))
    .catch((err) => console.log(err));
  } ;


  const inputsHandler = (e) =>{

    if (e.target.name=="name"){
      setNameField(e.target.value);
    }
    else if(e.target.name=="price"){
      setPriceField(e.target.value);
    }
    else if(e.target.name=="id"){
      setIDField(e.target.value);
    }
  }


  const submitButton = () =>{
    const item = {name:name,price:price}
    if (id!=0) {
      axios
        .put(`http://127.0.0.1:8000/api/categorys/${id}/`, item)
        .then((res) => getAllCategorys());

      setShowModal(false);
      setNameField("");
      setPriceField(0);
      setIDField(0);

      return;
    }
    axios
      .post("http://127.0.0.1:8000/api/categorys/", item)
      .then((res) => getAllCategorys());

    setShowModal(false);
    setNameField("");
    setPriceField(0);
    setIDField(0);
  }

  const deleteItem = (item) => {
    axios
      .delete(`http://127.0.0.1:8000/api/categorys/${item.id}/`)
      .then((res) => getAllCategorys());
  }

  const editItem = (item) => {
    setNameField(item.name);
    setPriceField(item.price);
    setIDField(item.id);
    setShowModal(true);
  }


  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">Category</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Button
                  className="btn-fill btn-wd"
                  variant="info"
                  onClick={() => setShowModal(true)}
                >
                  Create
                </Button>
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Price</th>
                      <th className="border-0">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categorys.map((category,index) => (
                      <tr key={index+1}>
                        <td>{index+1}</td>
                        <td>{category.name}</td>
                        <td>{category.price}</td>
                        <td>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-488980961">
                                Edit Category..
                              </Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="info"
                              onClick={() => editItem(category)}

                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-506045838">Remove..</Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="danger"
                              onClick={() => deleteItem(category)}
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>

      </Container>
      {/* Mini Modal */}
      <Modal
          className="modal-mini modal-primary"
          show={showModal}
          onHide={() => setShowModal(false)}
      >
          <Modal.Header className="justify-content-center">
            <div className="modal-profile">
              <i className="nc-icon nc-cart-simple"></i>
            </div>
          </Modal.Header>

          <Modal.Body >
            <Form >
              <Form.Group className="mb-3" name="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter category name" name="name" onChange={inputsHandler} value={name}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" placeholder="Price" name="price" onChange={inputsHandler} value={price} />
              </Form.Group>
              <Form.Control type="hidden" name="id" onChange={inputsHandler} value={id} />
              <Button variant="btn-simple" onClick={ submitButton }>
                Submit
              </Button>
              <Button
                variant="btn-simple"
                onClick={() => setShowModal(false)}
              >Close</Button>
            </Form>
          </Modal.Body>
      </Modal>
      {/* End Modal */}
    </>
  );
}

export default CategoryList;
