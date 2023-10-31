import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Base from "../components/Base";
import digitalServices from "../assets/digital_services.png";
import onlineServices from "../assets/online_services.png";

function Services() {
  return (
    <Base
      title="Services we provide"
      description="In this page we will discuss about the services that we provide."
      buttonEnabled={true}
      buttonLink="/"
      buttonType="warning"
      buttonText="Home"
    >
      <Container className="my-3">
        <Row className="d-flex justify-content-center">
          <Col md={3}>
            <Card>
              <Card.Img
                variant="top"
                src={digitalServices}
                style={{
                  width: "250px",
                  height: "250px",
                  objectFit: "contain",
                }}
              />
              <Card.Body>
                <Card.Title>Digital Services</Card.Title>
                <Card.Text>We provide digital services</Card.Text>
                <Button variant="primary">More about Digital Service</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Img
                variant="top"
                src={onlineServices}
                style={{
                  width: "250px",
                  height: "250px",
                  objectFit: "contain",
                }}
              />
              <Card.Body>
                <Card.Title>Online Services</Card.Title>
                <Card.Text>We provide online services</Card.Text>
                <Button variant="primary">More about Online Service</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Img
                variant="top"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWUwIaU8oXbzoc6xhKKVkhroFSxfbpl08tBw&usqp=CAU"
                style={{
                  width: "250px",
                  height: "250px",
                  objectFit: "contain",
                }}
              />
              <Card.Body>
                <Card.Title>Ecommerce Services</Card.Title>
                <Card.Text>We provide ecom services</Card.Text>
                <Button variant="primary">More about Ecommerce Service</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
}

export default Services;
