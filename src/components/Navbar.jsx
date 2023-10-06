import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "./../assets/logo.png";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserContext";

const CustomNavbar = () => {
  const userContext = useContext(UserContext);

  const doLogout = () => {
    // userContext.setIsLogin(false);
    // userContext.setUserData(null);

    // but the above 2 lines of code are implemented before localStorage.
    // now when the user is logged out successfully, we will call doLogout() function of UserProvider
    // which will do this above things in UserProvider and also it will remove the user data from localStorage.
    userContext.logout();
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      // className="bg-navbar-color"
    >
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <img src={logo} alt="logo" width={25} height={25} />
          <span className="ms-1 mt-1">ElectroStore</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto">
            <Nav.Link as={NavLink} to="/services">
              Features
            </Nav.Link>
            <NavDropdown title="Categories" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                Branded Phones
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Smart TVs</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Laptops</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">More</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={NavLink} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact">
              Contact Us
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={NavLink} to="/cart">
              Cart ( 40 )
            </Nav.Link>
            {userContext.isLogin ? (
              <>
                {userContext.isAdminUser && (
                  <>
                    <Nav.Link as={NavLink} to="/admin/home">
                      AdminDashboard
                    </Nav.Link>
                  </>
                )}
                <Nav.Link
                  as={NavLink}
                  to={`/users/profile/${userContext.userData.user.userId}`}
                >
                  {userContext.userData.user.email}
                </Nav.Link>
                <Nav.Link as={NavLink} to="/users/orders">
                  Orders
                </Nav.Link>
                <Nav.Link onClick={doLogout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register">
                  Signup
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
