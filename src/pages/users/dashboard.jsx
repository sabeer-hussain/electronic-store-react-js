import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import UserContext from "../../context/user.context";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

const Dashboard = () => {
  const userContext = useContext(UserContext);

  // private dashboard view
  const dashboardView = () => {
    return (
      <div>
        <h1>This is User dashboard</h1>

        {/* nested route */}
        <Outlet />
      </div>
    );
  };

  // not logged in view
  const notLoggedInView = () => {
    return (
      <Container>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <Card className="border-0 shadow mt-3">
              <Card.Body className="text-center">
                <h3>You are not logged In !!</h3>
                <p>Please do login to view the page</p>
                <Button as={NavLink} to="/login" variant="success">
                  Login Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };

  // managing private routes using conditional rendering
  return userContext.isLogin ? dashboardView() : notLoggedInView();
};

export default Dashboard;
