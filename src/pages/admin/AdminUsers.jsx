import { useEffect } from "react";
import { getAllUsers } from "../../services/UserService";
import { useState } from "react";
import { USER_PAGE_SIZE } from "../../services/HelperService";
import { Card, Col, Container, Row } from "react-bootstrap";
import SingleUserView from "../../components/SingleUserView";

const AdminUsers = () => {
  const [usersData, setUsersData] = useState(undefined);

  useEffect(() => {
    getUsers(0, USER_PAGE_SIZE, "name", "asc");
  }, []);

  const getUsers = (pageNumber, pageSize, sortBy, sortDir) => {
    getAllUsers(pageNumber, pageSize, sortBy, sortDir)
      .then((data) => {
        console.log(data);
        setUsersData({
          ...data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const userView = () => {
    return (
      <Container>
        <Row>
          <Col>
            <Card className="shadow-sm">
              <Card.Body>
                <h3>User List</h3>
                {usersData.content.map((user) => (
                  <SingleUserView user={user} />
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };

  return <>{usersData && userView()}</>;
};

export default AdminUsers;
