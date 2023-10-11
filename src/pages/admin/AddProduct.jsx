import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormGroup,
  Row,
} from "react-bootstrap";

const AddProduct = () => {
  const formView = () => {
    return (
      <>
        <Card className="shadow-sm">
          <Card.Body>
            <h5>Add Product Here</h5>
            <Form>
              {/* product title */}
              <FormGroup className="mt-3">
                <Form.Label>Product Title</Form.Label>
                <Form.Control type="text" placeholder="Enter here" />
              </FormGroup>

              {/* product description */}
              <Form.Group className="mt-3">
                <Form.Label>Product Description</Form.Label>
                <Form.Control
                  as={"textarea"}
                  rows={6}
                  placeholder="Enter here"
                />
              </Form.Group>

              <Row>
                <Col>
                  {/* product price */}
                  <Form.Group className="mt-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" placeholder="Enter here" />
                  </Form.Group>
                </Col>
                <Col>
                  {/* product discounted price */}
                  <Form.Group className="mt-3">
                    <Form.Label>Discounted Price</Form.Label>
                    <Form.Control type="number" placeholder="Enter here" />
                  </Form.Group>
                </Col>
              </Row>

              {/* product quantity */}
              <Form.Group className="mt-3">
                <Form.Label>Product Quantity</Form.Label>
                <Form.Control type="number" placeholder="Enter here" />
              </Form.Group>

              <Row className="mt-3 px-1">
                <Col>
                  {/* product is in live or not */}
                  <Form.Check type="switch" label={"Live"} />
                </Col>
                <Col>
                  {/* product is in stock or not */}
                  <Form.Check type="switch" label={"Stock"} />
                </Col>
              </Row>

              {/* product image */}
              <Form.Group className="mt-3">
                <Form.Label>Select product image</Form.Label>
                <Form.Control type={"file"} />
              </Form.Group>

              <Container className="mt-3 text-center">
                <Button variant="success" size="sm">
                  Add Product
                </Button>
                <Button variant="danger" size="sm" className="ms-1">
                  Clear Data
                </Button>
              </Container>
            </Form>
          </Card.Body>
        </Card>
      </>
    );
  };

  return <div>{formView()}</div>;
};

export default AddProduct;
