import { useContext, useEffect, useState } from "react";
import { getOrdersOfUser } from "../../services/OrderService";
import UserContext from "../../context/UserContext";
import { toast } from "react-toastify";
import SingleOrderView from "../../components/SingleOrderView";
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { formatDate, getProductImageUrl } from "../../services/HelperService";

const Order = () => {
  const { userData, isLogin } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (isLogin) {
      loadOrdersOfUser();
    }
  }, [isLogin]);

  const loadOrdersOfUser = async () => {
    try {
      const result = await getOrdersOfUser(userData.user.userId);
      console.log(result);
      setOrders(result);
    } catch (error) {
      console.log(error);
      toast.error("Error in loading orders");
    }
  };

  const openViewOrderModal = (event, order) => {
    // console.log("view order button clicked");
    // console.log(event);
    // console.log(order);
    setSelectedOrder({ ...order });
    handleShow();
  };

  // view order modal
  const viewOrderModal = () => {
    return (
      selectedOrder && (
        <>
          <Modal size="lg" animation={false} show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                <h3>Order details</h3>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col>
                  <b>OrderId: </b>
                  {selectedOrder.orderId}
                </Col>
                <Col>
                  <b>Billing Name: </b>
                  {selectedOrder.billingName}
                </Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <Table bordered striped>
                    <tbody>
                      <tr>
                        <td>Billing Phone</td>
                        <td className="fw-bold">
                          {selectedOrder.billingPhone}
                        </td>
                      </tr>
                      <tr>
                        <td>Items</td>
                        <td className="fw-bold">
                          {selectedOrder.orderItems.length}
                        </td>
                      </tr>
                      <tr
                        className={
                          selectedOrder.paymentStatus === "NOT_PAID"
                            ? "table-danger"
                            : "table-success"
                        }
                      >
                        <td>Payment Status</td>
                        <td className="fw-bold">
                          {selectedOrder.paymentStatus}
                        </td>
                      </tr>
                      <tr>
                        <td>Order Status</td>
                        <td className="fw-bold">{selectedOrder.orderStatus}</td>
                      </tr>
                      <tr>
                        <td>Ordered Date</td>
                        <td className="fw-bold">
                          {formatDate(selectedOrder.orderedDate)}
                        </td>
                      </tr>
                      <tr>
                        <td>Billing Address</td>
                        <td className="fw-bold">
                          {selectedOrder.billingAddress}
                        </td>
                      </tr>
                      <tr>
                        <td>Delivered Date</td>
                        <td className="fw-bold">
                          {selectedOrder.deliveredDate
                            ? formatDate(selectedOrder.deliveredDate)
                            : ""}
                        </td>
                      </tr>
                      <tr>
                        <td>Order Amount</td>
                        <td className="fw-bold">
                          ₹ {selectedOrder.orderAmount}
                        </td>
                      </tr>
                    </tbody>
                  </Table>

                  <Card>
                    <Card.Body>
                      <h3>Order Items</h3>
                      <ListGroup>
                        {selectedOrder.orderItems.map((item) => (
                          <ListGroup.Item
                            action
                            className="mt-3"
                            key={item.orderItemId}
                          >
                            <Row>
                              <Col md={1} className="d-flex align-items-center">
                                <img
                                  style={{ width: "40px" }}
                                  src={getProductImageUrl(
                                    item.product.productId
                                  )}
                                  alt=""
                                />
                              </Col>
                              <Col md={11}>
                                <h5>{item.product.title}</h5>
                                <Badge pill>Quantity: {item.quantity}</Badge>
                                <Badge bg={"success"} pill className="ms-2">
                                  Amount for this item: ₹ {item.totalPrice}
                                </Badge>
                                <p className="text-muted mt-3">
                                  Product Id : {item.product.productId}
                                </p>
                              </Col>

                              {/* <Container className="text-center my-3">
                                <Button variant="info" size="sm">
                                View Product
                                </Button>
                              </Container> */}
                            </Row>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )
    );
  };

  const ordersView = () => {
    return (
      <Card className="shadow-sm mt-2">
        <Card.Body>
          <h3 className="my-4 mx-2">Your Previous Orders</h3>
          {orders.map((order) => {
            return (
              <SingleOrderView
                key={order.orderId}
                order={order}
                openViewOrderModal={openViewOrderModal}
                // openEditOrderModal={openEditOrderModal}
              />
            );
          })}

          {orders.length <= 0 && (
            <Alert className="border border-0 text-center" variant="dark">
              <h3>No Items in Your order</h3>
            </Alert>
          )}
        </Card.Body>
      </Card>
    );
  };

  return (
    <>
      <Container>
        <Row>
          <Col
            md={{
              span: 10,
              offset: 1,
            }}
          >
            {ordersView()}
            {viewOrderModal()}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Order;
