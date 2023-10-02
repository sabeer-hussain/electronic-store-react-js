import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import Base from "../components/Base";
import logo from "../assets/logo.png";
import { useState } from "react";
import { loginUser } from "../services/user.service";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    isError: false,
    errorData: null,
  });

  const [loading, setLoading] = useState(false);

  // handle change
  const handleChange = (event, property) => {
    // console.log(event);
    // console.log(property);
    setData({ ...data, [property]: event.target.value });
  };

  // clear data
  const clearData = () => {
    setData({
      email: "",
      password: "",
    });

    setError({
      isError: false,
      errorData: null,
    });
  };

  // submit form - do login function
  const submitForm = (event) => {
    event.preventDefault();

    console.log(data);

    // validate client side
    if (data.email === undefined || data.email.trim() === "") {
      toast.error("Email required !!");
      return;
    }

    if (data.password === undefined || data.password.trim() === "") {
      toast.error("Password required !!");
      return;
    }

    // all right:
    // call login api
    setLoading(true);
    loginUser(data)
      .then((userData) => {
        // success handler
        console.log(userData);
        toast.success("User Logged In successfully !!");
        setError({
          isError: false,
          errorData: null,
        });
      })
      .catch((error) => {
        // error handler
        console.log(error);
        toast.error(error.response.data.message);
        setError({
          isError: true,
          errorData: error,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const loginForm = () => {
    return (
      <Container>
        {/* single row ==> 12 grids (col) */}
        <Row>
          {/* {JSON.stringify(data)} */}

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

                <Form noValidate onSubmit={submitForm}>
                  {/* email login field */}
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Enter your email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={data.email}
                      onChange={(event) => handleChange(event, "email")}
                    />
                  </Form.Group>

                  {/* password login field */}
                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Enter your password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      value={data.password}
                      onChange={(event) => handleChange(event, "password")}
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
                    <Button type="submit" variant="success" disabled={loading}>
                      <Spinner
                        animation="border"
                        size="sm"
                        className="me-2"
                        hidden={!loading}
                      />
                      <span hidden={!loading}>Wait...</span>
                      <span hidden={loading}>Login</span>
                    </Button>
                    <Button
                      className="ms-2"
                      variant="danger"
                      onClick={clearData}
                    >
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
