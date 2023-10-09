import { Button, Card, Col, Container, Row } from "react-bootstrap";
import image from "../assets/sabeer.jpg";

const CategoryView = () => {
  const imageStyle = {
    width: "100px",
    height: "100px",
  };

  return (
    <div className="mb-3">
      <Card className="shadow-sm">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={2} className="text-center">
              <img
                src={image}
                alt=""
                style={imageStyle}
                className="rounded-circle"
              />
            </Col>

            <Col md={8}>
              <h5>Category Title</h5>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Quisquam nulla officiis quidem totam aut maxime voluptatem ut
                dolores, eos quia.
              </p>
            </Col>

            <Col md={2}>
              <Container className="d-grid">
                <Button size="sm" variant="info">
                  View
                </Button>
                <Button size="sm" variant="warning" className="mt-1">
                  Update
                </Button>
                <Button size="sm" variant="danger" className="mt-1">
                  Delete
                </Button>
              </Container>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CategoryView;
