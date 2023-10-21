import { useEffect } from "react";
import { getAllUsers } from "../../services/UserService";
import { useState } from "react";
import { USER_PAGE_SIZE } from "../../services/HelperService";
import { Card, Col, Container, Row } from "react-bootstrap";
import SingleUserView from "../../components/SingleUserView";
import InfiniteScroll from "react-infinite-scroll-component";

const AdminUsers = () => {
  const [usersData, setUsersData] = useState(undefined);

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    getUsers(currentPage, USER_PAGE_SIZE, "name", "asc");
  }, []);

  useEffect(() => {
    if (currentPage > 0) {
      getUsers(currentPage, USER_PAGE_SIZE, "name", "asc");
    }
  }, [currentPage]);

  const getUsers = (pageNumber, pageSize, sortBy, sortDir) => {
    getAllUsers(pageNumber, pageSize, sortBy, sortDir)
      .then((data) => {
        console.log(data);
        if (currentPage == 0) {
          setUsersData({
            ...data,
          });
        } else {
          setUsersData({
            content: [...usersData.content, ...data.content],
            lastPage: data.lastPage,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const userView = () => {
    return (
      <Container>
        <Row>
          <Col>
            <Card className="shadow-sm">
              <Card.Body>
                <h3>User List</h3>
                <InfiniteScroll
                  dataLength={usersData.content.length}
                  next={loadNextPage}
                  hasMore={!usersData.lastPage}
                  loader={<h3 className="text-center my-3">Loading...</h3>}
                  endMessage={
                    <p className="text-center my-3 text-muted">
                      All users loaded
                    </p>
                  }
                >
                  {usersData.content.map((user) => (
                    <SingleUserView key={user.userId} user={user} />
                  ))}
                </InfiniteScroll>
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
