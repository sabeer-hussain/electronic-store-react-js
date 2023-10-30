import { useEffect } from "react";
import { getAllUsers, searchUsers } from "../../services/UserService";
import { useState } from "react";
import { USER_PAGE_SIZE } from "../../services/HelperService";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import SingleUserView from "../../components/SingleUserView";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";

const AdminUsers = () => {
  const [usersData, setUsersData] = useState(undefined);
  const [previousUsers, setPreviousUsers] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

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

  // search user
  const handleSearchUsers = () => {
    if (searchQuery === undefined || searchQuery.trim() === "") {
      return;
    }

    // call server api to search
    searchUsers(searchQuery)
      .then((data) => {
        if (data.content.length <= 0) {
          toast.info("No result found");
          return;
        }
        setPreviousUsers(usersData);
        setUsersData(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in searching the users", {
          position: "top-right",
        });
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
                <Form.Group className="mb-2">
                  <Form.Label>Search User</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder="Search here"
                      onChange={(event) => {
                        if (event.target.value.trim() === "") {
                          if (previousUsers) {
                            setUsersData(previousUsers);
                          }
                        }
                        setSearchQuery(event.target.value);
                      }}
                      value={searchQuery}
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={handleSearchUsers}
                    >
                      Search
                    </Button>
                  </InputGroup>
                </Form.Group>
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
