import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Base from "../components/Base";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";

const Login = () => {
  const loginForm = () => {
    return (
      <Container>
        {/* single row ==> 12 grids (col) */}
        <Row>
          <Col sm={{ span: 8, offset: 2 }}>
            <Card
              className="my-3 border-0 shadow p-4"
              style={{
                position: "relative",
                top: -60,
              }}
            >
              <Card.Body>
                <Container className="text-center mb-3">
                  <img src={logo} alt="Store logo" width={80} height={80} />
                </Container>

                <h3 className="mb-4 text-center text-uppercase">Store Login</h3>

                <Form>
                  {/* email login field */}
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Enter your email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                  </Form.Group>

                  {/* password login field */}
                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Enter your password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                    />
                  </Form.Group>

                  <Container className="text-center">
                    {/* <p>
                      Forget password ? <span> </span>
                      <NavLink to="/forget">Click here</NavLink>
                    </p> */}
                    <p>
                      If not registered ? <span> </span>
                      <NavLink to="/register">Click here</NavLink>
                    </p>
                  </Container>

                  <Container className="text-center text-uppercase">
                    <Button variant="success"></Button>
                    <Button className="ms-2" variant="danger">
                      Reset
                    </Button>
                  </Container>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };
  return (
    <Base title="Electro Store / Login" description="Login Here">
      {loginForm()}
    </Base>
  );
};

export default Login;
