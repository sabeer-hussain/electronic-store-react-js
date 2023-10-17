import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";

const SingleOrderView = () => {
  return (
    <Card className="shadow-sm mb-5">
      <Card.Body>
        <Row>
          <Col>
            <b>OrderId: </b>asdfiasf6asidfhd98
          </Col>
          <Col>
            <b>Billing Name: </b>Sabeer Hussain
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Table bordered striped>
              <tbody>
                <tr>
                  <td>Billing Phone</td>
                  <td>87654362131</td>
                </tr>
                <tr>
                  <td>Items</td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>Payment Status</td>
                  <td>PAID</td>
                </tr>
                <tr>
                  <td>Order Status</td>
                  <td>PENDING</td>
                </tr>
                <tr>
                  <td>Ordered Date</td>
                  <td>24 March 2023</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Container className="text-center">
          <Button variant="info" size="sm">
            View Order Details
          </Button>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default SingleOrderView;
