import { Badge, ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const SideMenu = () => {
  return (
    <>
      <ListGroup>
        <ListGroup.Item as={NavLink} to="/admin/home" action>
          Home
        </ListGroup.Item>
        <ListGroup.Item as={NavLink} to="/admin/add-category" action>
          Add Category
        </ListGroup.Item>
        <ListGroup.Item as={NavLink} to="/admin/categories" action>
          View Categories
        </ListGroup.Item>
        <ListGroup.Item as={NavLink} to="/admin/add-product" action>
          Add Product
        </ListGroup.Item>
        <ListGroup.Item as={NavLink} to="/admin/products" action>
          View Products
        </ListGroup.Item>
        <ListGroup.Item as={NavLink} to="/admin/orders" action>
          Orders
        </ListGroup.Item>
        <ListGroup.Item
          as={NavLink}
          to="/admin/users"
          className="d-flex justify-content-between align-items-start"
          action
        >
          Users
          <Badge bg="danger" pill>
            New
          </Badge>
        </ListGroup.Item>
        <ListGroup.Item as={NavLink} to="/users/home" action>
          Dashboard
        </ListGroup.Item>
        <ListGroup.Item action>Logout</ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default SideMenu;
