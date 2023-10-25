import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const categoryView = () => {
  return <h1>This is category view</h1>;
};
const productsView = () => {
  return <h1>This is product view</h1>;
};

const Store = () => {
  return (
    <Container fluid className="px-5 pt-5">
      <Row>
        <Col md={2}>{categoryView()}</Col>
        <Col md={10}>{productsView()}</Col>
      </Row>
    </Container>
  );
};

export default Store;
