import { useEffect, useState } from "react";
import { getAllOrders } from "../../services/OrderService";
import { ADMIN_ORDER_PAGE_SIZE } from "../../services/HelperService";
import { Card, Col, Container, Row } from "react-bootstrap";
import SingleOrderView from "../../components/SingleOrderView";

const AdminOrders = () => {
  const [ordersData, setOrdersData] = useState(undefined);

  const [fakeOrders, setFakeOrders] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  useEffect(() => {
    // single time on load
    getOrdersLocally();
  }, []);

  const getOrdersLocally = async () => {
    try {
      const data = await getAllOrders(
        0,
        ADMIN_ORDER_PAGE_SIZE,
        "orderedDate",
        "desc"
      );
      console.log(data);
      setOrdersData(data);
    } catch (e) {
      console.log("error");
      console.log(e);
    }
  };

  const ordersView = () => {
    return (
      <Card className="shadow-sm">
        <Card.Body>
          <h3 className="my-4 mx-2">All Orders are here</h3>
          {ordersData.content.map((order) => {
            return <SingleOrderView order={order} />;
          })}
        </Card.Body>
      </Card>
    );
  };

  return (
    <>
      <Container>
        <Row>
          <Col>{ordersData && ordersView()}</Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminOrders;
