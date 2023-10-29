import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { formatDate } from "../services/HelperService";
import { Link } from "react-router-dom";

const SingleOrderView = ({ order, openViewOrderModal, openEditOrderModal }) => {
  return (
    <Card className="shadow-sm mb-5">
      <Card.Body>
        <Row>
          <Col>
            <b>OrderId: </b>
            {order.orderId}
          </Col>
          <Col>
            <b>Ordered By: </b>
            <Link
              className="text-muted"
              to={`/users/profile/${order.user.userId}`}
            >
              {order.user.name}
            </Link>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Table
              bordered
              striped
              className={
                order.paymentStatus === "PAID"
                  ? "table-success"
                  : "table-danger"
              }
            >
              <tbody>
                <tr>
                  <td>Billing Name</td>
                  <td className="fw-bold">{order.billingName}</td>
                </tr>
                <tr>
                  <td>Billing Phone</td>
                  <td className="fw-bold">{order.billingPhone}</td>
                </tr>
                <tr>
                  <td>Items</td>
                  <td className="fw-bold">{order.orderItems.length}</td>
                </tr>
                <tr
                  className={
                    order.paymentStatus === "NOT_PAID"
                      ? "table-danger"
                      : "table-success"
                  }
                >
                  <td>Payment Status</td>
                  <td className="fw-bold">{order.paymentStatus}</td>
                </tr>
                <tr>
                  <td>Order Status</td>
                  <td className="fw-bold">{order.orderStatus}</td>
                </tr>
                <tr>
                  <td>Ordered Date</td>
                  <td className="fw-bold">{formatDate(order.orderedDate)}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Container className="text-center">
          {openEditOrderModal && (
            <Button
              onClick={(event) => openEditOrderModal(event, order)}
              variant="danger"
              size="sm"
              className="me-2"
            >
              Update
            </Button>
          )}

          {!openEditOrderModal && order.paymentStatus === "NOT_PAID" && (
            <Button
              onClick={(event) => openEditOrderModal(event, order)}
              variant="success"
              size="sm"
              className="me-2"
            >
              Pay to Complete Order
            </Button>
          )}

          <Button
            variant="info"
            size="sm"
            onClick={(event) => openViewOrderModal(event, order)}
          >
            Order Details
          </Button>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default SingleOrderView;
