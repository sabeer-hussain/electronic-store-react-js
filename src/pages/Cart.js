import { useContext, useState } from "react";
import CartContext from "../context/CartContext";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import SingleCartItemView from "../components/users/SingleCartItemView";
import { Link } from "react-router-dom";

function Cart() {
  const { cart, setCart, addItem, removeItem } = useContext(CartContext);
  const [orderPlacedClicked, setOrderPlacedClicked] = useState(false);

  const getTotalCartAmount = () => {
    let amount = 0;
    cart.items.forEach((item) => {
      amount += item.totalPrice;
    });
    return amount;
  };

  const orderFormView = () => {
    return (
      <Form>
        {/* billing name */}
        <Form.Group className="mt-3">
          <Form.Label>Billing Name</Form.Label>
          <Form.Control type="text" placeholder="Enter here" />
        </Form.Group>
        {/* billing phone */}
        <Form.Group className="mt-3">
          <Form.Label>Billing Phone</Form.Label>
          <Form.Control type="number" placeholder="Enter here" />
        </Form.Group>
        {/* billing address */}
        <Form.Group className="mt-3">
          <Form.Label>Billing Address</Form.Label>
          <Form.Control as={"textarea"} rows={6} placeholder="Enter here" />
        </Form.Group>
        <Container className="mt-3 text-center">
          <Button variant="success" size="sm">
            Create Order & Proceed to Pay
          </Button>
        </Container>
      </Form>
    );
  };

  const cartView = () => {
    return (
      <>
        <Card className="mt-3 shadow-sm">
          <Card.Body>
            <Row className="px-5">
              <Col>
                <h3>Cart</h3>
              </Col>
              <Col>
                <h3 className="text-end">{cart.items.length} Items</h3>
              </Col>
            </Row>
            <Row className="px-5 mt-3">
              <Col>
                {cart.items.map((item) => (
                  <SingleCartItemView item={item} />
                ))}
              </Col>
            </Row>
            <Container className="px-5">
              <h3 className="text-end px-5">
                Total Amount : ₹ {getTotalCartAmount()}
              </h3>
            </Container>
            <Container className="text-center">
              {!orderPlacedClicked && (
                <Button
                  size="sm"
                  onClick={(event) => setOrderPlacedClicked(true)}
                >
                  Place Order
                </Button>
              )}
            </Container>
          </Card.Body>
        </Card>
      </>
    );
  };

  return (
    <div className="">
      <Container fluid={orderPlacedClicked} className="px-5">
        <Row>
          <Col md={orderPlacedClicked ? 8 : 12} className="animation">
            {cart &&
              (cart.items.length > 0 ? (
                cartView()
              ) : (
                <Alert
                  variant="danger"
                  className="mt-3 border border-0 shadow-sm text-center"
                >
                  <h3>No Items in the Cart</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Aut, distinctio.
                  </p>
                  <Button variant="info" as={Link} to="/store">
                    Starting Adding Product in Cart
                  </Button>
                </Alert>
              ))}

            {!cart && (
              <Alert
                variant="info"
                className="mt-3 border border-0 shadow-sm text-center"
              >
                <h3>You are not logged in</h3>
                <p>In order to access your Cart, do login first</p>
                <Button variant="success" as={Link} to="/login">
                  Login
                </Button>
              </Alert>
            )}
          </Col>
          {orderPlacedClicked && (
            <Col md={4}>
              <Card className="mt-3 shadow-sm bg-dark text-white">
                <Card.Body>
                  <h4>Fill the form to complete order</h4>
                  {orderFormView()}
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default Cart;
