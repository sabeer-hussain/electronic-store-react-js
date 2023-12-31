import { Navigate, Outlet } from "react-router-dom";
import { isAdminUser } from "../../auth/HelperAuth";
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import { Col, Container, Row } from "react-bootstrap";
import SideMenu from "../../components/admin/SideMenu";
import useJwtTokenExpiration from "../../hooks/useJwtTokenExpiration";

const AdminDashboard = () => {
  useJwtTokenExpiration();

  const userContext = useContext(UserContext);

  const dashboardView = () => {
    return (
      <div>
        <Container fluid className="px-5 py-5">
          <Row>
            <Col md={{ span: 3 }}>
              <SideMenu />
            </Col>
            <Col md={9} className="ps-3 pt-2">
              <Outlet />
            </Col>
          </Row>
        </Container>
      </div>
    );
  };
  return isAdminUser() ? dashboardView() : <Navigate to="/users/home" />;
};

export default AdminDashboard;
