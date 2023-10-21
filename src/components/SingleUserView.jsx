import { Badge, Card, Col, Row } from "react-bootstrap";
import { getUserImage } from "../services/UserService";
import { useEffect, useState } from "react";
import defaultImage from "../assets/default_profile.jpg";
import { Link } from "react-router-dom";

const SingleUserView = ({ user }) => {
  const [userImage, setUserImage] = useState(undefined);

  useEffect(() => {
    getUserImageFromServer(user.userId);
  }, []);

  const getUserImageFromServer = async (userId) => {
    // api call
    setUserImage(await getUserImage(userId));
  };
  return (
    <>
      <Card className="mt-3 border border-0 shadow-sm">
        <Card.Body>
          <Row>
            <Col md={1} className="d-flex align-items-center">
              <img
                style={{ width: "80px", height: "80px", objectFit: "cover" }}
                className="rounded-circle"
                src={user.imageName ? userImage : defaultImage}
                alt=""
                onError={(event) => {
                  console.log("error");
                  event.currentTarget.setAttribute("src", defaultImage);
                }}
              />
            </Col>
            <Col md={11} className="ps-5">
              <Link to={`/users/profile/${user.userId}`}>
                <h5>{user.name}</h5>
              </Link>
              <p className="text-muted">{user.about}</p>
              <p className="text-muted">{user.email}</p>
              {user.roles.map((role) => (
                <Badge
                  bg={role.roleName === "ROLE_ADMIN" ? "success" : "info"}
                  key={role.roleId}
                  pill
                  className="mx-2"
                >
                  {role.roleName}
                </Badge>
              ))}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default SingleUserView;
