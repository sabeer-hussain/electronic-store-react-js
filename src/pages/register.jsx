import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Base from "../components/Base";
import logo from "../assets/logo.png";

const Register = () => {
  const registerForm = () => {
    return (
      <Container>
        {/* single row ==> 12 grids (col) */}
        <Row>
          <Col sm={{ span: 8, offset: 2 }}>
            <Card className="my-3 border-0 shadow p-4">
              <Card.Body>
                <Container className="text-center mb-3">
                  <img src={logo} alt="Store logo" width={80} height={80} />
                </Container>

                <h3 className="mb-4 text-center text-uppercase">
                  Store Signup Here
                </h3>

                <Form>
                  {/* name field */}
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Enter your name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" />
                  </Form.Group>

                  {/* email field */}
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Enter your email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                  </Form.Group>

                  {/* password field */}
                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Enter new password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                    />
                  </Form.Group>

                  {/* confirm password field */}
                  <Form.Group className="mb-3" controlId="formConfirmPassword">
                    <Form.Label>Re-enter password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Re-Enter password"
                    />
                  </Form.Group>

                  {/* gender radio buttons */}
                  <Form.Group className="mb-3" controlId="formGender">
                    <Form.Label>Select Gender</Form.Label>
                    <div>
                      <Form.Check
                        inline
                        name="gender"
                        label="Male"
                        type={"radio"}
                        id={"gender"}
                      />
                      <Form.Check
                        inline
                        name="gender"
                        label="Female"
                        type={"radio"}
                        id={"gender"}
                      />
                    </div>
                  </Form.Group>

                  {/* about field */}
                  <Form.Group className="mb-3" controlId="formAbout">
                    <Form.Label>Write something about yourself</Form.Label>
                    <Form.Control
                      as={"textarea"}
                      rows="6"
                      placeholder="Write here"
                    />
                  </Form.Group>
                </Form>

                <Container>
                  <p className="text-center">
                    Already register ! <span> </span>
                    <a href="#">Login</a>
                  </p>
                </Container>

                <Container className="text-center">
                  <Button className="text-uppercase" variant="success">
                    Register
                  </Button>
                  <Button className="ms-2 text-uppercase" variant="danger">
                    Reset
                  </Button>
                </Container>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };
  return (
    <Base
      title="Electro Store / Signup"
      description="Fill the form correctly to register with us. By register with us you can use services that we provide."
    >
      {registerForm()}
    </Base>
  );
};

export default Register;
