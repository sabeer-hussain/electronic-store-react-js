import { Button, Card, Col, Container, Row } from "react-bootstrap";
import image from "../assets/logo.png";

const CategoryView = ({ category, viewCat, updateCat, deleteCat }) => {
  const imageStyle = {
    width: "100px",
    height: "100px",
    objectFit: "cover",
  };

  const deleteCategory = (categoryId) => {
    deleteCat(categoryId);
  };

  return (
    <div className="mb-3">
      <Card className="shadow-sm">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={2} className="text-center">
              <img
                src={
                  category.coverImage
                    ? category.coverImage.startsWith("http")
                      ? category.coverImage
                      : image
                    : image
                }
                alt=""
                style={imageStyle}
                className="rounded-circle"
              />
            </Col>

            <Col md={8}>
              <h5>{category.title}</h5>
              <p>{category.description}</p>
            </Col>

            <Col md={2}>
              <Container className="d-grid">
                <Button
                  size="sm"
                  variant="info"
                  onClick={(event) => viewCat(category)}
                >
                  View
                </Button>
                <Button
                  size="sm"
                  variant="warning"
                  className="mt-1"
                  onClick={(event) => updateCat(category)}
                >
                  Update
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  className="mt-1"
                  onClick={(event) => deleteCategory(category.categoryId)}
                >
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
