import { Col, Container, Row } from "react-bootstrap";
import UserProfileView from "../../components/users/UserProfileView";

const Profile = () => {
  return (
    <div>
      <Container className="mt-3">
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <UserProfileView
              user={{
                name: "Sabeer Hussain",
                email: "msabeerhussain007@gmail.com",
                gender: "Male",
                about: "I am java developer",
                roles: [{ roleName: "ADMIN" }, { roleName: "NORMAL" }],
              }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
