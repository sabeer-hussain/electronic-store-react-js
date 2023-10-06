import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import UserContext from "../../context/UserContext";
import UserProfileView from "../../components/users/UserProfileView";
import { useContext, useEffect, useState } from "react";
import {
  getUser,
  updateUser,
  updateUserProfilePicture,
} from "../../services/UserService";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import defaultImage from "../../assets/default_profile.jpg";

const Profile = () => {
  const userContext = useContext(UserContext);

  const { userId } = useParams();

  const [user, setUser] = useState(null);

  // state for handle image
  const [image, setImage] = useState({
    placeholder: defaultImage,
    file: null,
  });

  // modals state
  const [show, setShow] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShowModal = () => setShow(true);

  useEffect(() => {
    // to get user data using context
    // if (userContext.userData) {
    //   getUserDataFromServer();
    // }

    // If we use params approach, then we dont need to use if condition bcoz userId will be available
    // in the profile url before we click the profile button.
    // console.log("data from url userid " + userId);
    getUserDataFromServer();
  }, []);

  const getUserDataFromServer = () => {
    // api call
    console.log(userContext);

    // const userId = userContext.userData.user.userId;
    getUser(userId)
      .then((data) => {
        console.log(data);
        setUser(data);
      })
      .catch((error) => {
        console.log(error);
        setUser(null);
        toast.error("Error in loading user information from server !!");
      });
  };

  const updateFieldHandler = (event, property) => {
    setUser({
      ...user,
      [property]: event.target.value,
    });
  };

  // update user data by calling api
  const updateUserData = () => {
    console.log("updating user data");
    if (user.name === undefined || user.name.trim() === "") {
      toast.error("user name required !!");
      return;
    }

    // ... rest of the field if needed

    setUpdateLoading(true);
    updateUser(user)
      .then((updatedUser) => {
        console.log(updatedUser);
        toast.success("User details updated !!");
        // update image:
        if (image.file == null) {
          setUpdateLoading(false);
          handleClose();
          return;
        }
        updateUserProfilePicture(image.file, user.userId)
          .then((data) => {
            console.log(data);
            toast.success(data.message);
            handleClose();
          })
          .catch((error) => {
            console.log(error);
            toast.error("Image not uploaded !!");
          })
          .finally(() => {
            setUpdateLoading(false);
          });
      })
      .catch((error) => {
        console.log(error);
        // if (error.response.status == 400) {
        //   toast.error(error.response.data.name);
        // }
        toast.error("Not updated !! Error");
        setUpdateLoading(false);
      });
  };

  // function for image change
  const handleProfileImageChange = (event) => {
    // const localFile = event.target.files[0];
    console.log(event.target.files[0]);
    if (
      event.target.files[0].type === "image/png" ||
      event.target.files[0].type === "image/jpeg"
    ) {
      // preview show
      const reader = new FileReader();
      reader.onload = (r) => {
        setImage({
          placeholder: r.target.result,
          file: event.target.files[0],
        });
        console.log(r.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      toast.error("Invalid File !!");
      image.file = null;
    }
  };

  // update view
  const updateViewModal = () => {
    return (
      <div>
        <Modal size="lg" animation={false} show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update the Informations</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card
              className="border-0 shadow-sm"
              style={{ borderRadius: "50px" }}
            >
              <Card.Body>
                <Table responsive hover>
                  <tbody>
                    <tr>
                      <td>Profile Image</td>
                      <td>
                        {/* image tag for preview */}
                        <Container className="text-center mb-3">
                          <img
                            src={image.placeholder}
                            alt=""
                            width={200}
                            height={200}
                            style={{ objectFit: "cover" }}
                          />
                        </Container>

                        <Form.Control
                          type="file"
                          onChange={handleProfileImageChange}
                        />
                        <p className="mt-2 text-muted">
                          Select Square size picture for better ui.
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>Name</td>
                      <td>
                        <Form.Control
                          type="text"
                          value={user.name}
                          onChange={(event) =>
                            updateFieldHandler(event, "name")
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>{user.email}</td>
                    </tr>
                    <tr>
                      <td>New Password</td>
                      <td>
                        <Form.Control
                          type="password"
                          placeholder="Enter new password here"
                          onChange={(event) =>
                            updateFieldHandler(event, "password")
                          }
                        />
                        <p>Leave the field blank for same password</p>
                      </td>
                    </tr>
                    <tr>
                      <td>Gender</td>
                      <td>
                        <Form.Check
                          inline
                          name="gender"
                          label="Male"
                          type={"radio"}
                          id={"gender"}
                          value={"male"}
                          checked={user.gender === "male"}
                          onChange={(event) =>
                            updateFieldHandler(event, "gender")
                          }
                        />
                        <Form.Check
                          inline
                          name="gender"
                          label="Female"
                          type={"radio"}
                          id={"gender"}
                          value={user.gender && "female"}
                          checked={user.gender === "female"}
                          onChange={(event) =>
                            updateFieldHandler(event, "gender")
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>About</td>
                      <td>
                        <Form.Control
                          as={"textarea"}
                          rows={"8"}
                          value={user.about}
                          onChange={(event) =>
                            updateFieldHandler(event, "about")
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Roles</td>
                      <td>
                        {user.roles.map((role) => (
                          <div key={role.roleId}>{role.roleName}</div>
                        ))}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={updateUserData}
              disabled={updateLoading}
            >
              <Spinner
                animation="border"
                size="sm"
                hidden={!updateLoading}
                className="me-2"
              />
              <span hidden={!updateLoading}>Updating...</span>
              <span hidden={updateLoading}>Save Changes</span>
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };

  return (
    <div>
      <Container className="mt-3">
        <Row>
          <Col md={{ span: 10, offset: 1 }}>
            {user ? (
              <>
                <UserProfileView
                  user={
                    //   {
                    //   name: "Sabeer Hussain",
                    //   email: "msabeerhussain007@gmail.com",
                    //   gender: "Male",
                    //   about: "I am java developer",
                    //   roles: [
                    //     { roldId: 1, roleName: "ADMIN" },
                    //     { roleId: 2, roleName: "NORMAL" },
                    //   ],
                    // }
                    user
                  }
                  userId={userId}
                  handleShowModal={handleShowModal}
                />
                {updateViewModal()}
              </>
            ) : (
              <Alert>
                <h3 className="text-center text-uppercase m-2">
                  User not loaded from server !
                </h3>
              </Alert>
            )}
            {/* {userContext.userData.user.userId} */}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
