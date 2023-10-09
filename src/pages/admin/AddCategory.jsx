import { Button, Card, Container, Form } from "react-bootstrap";

const AddCategory = () => {
  return (
    <>
      <Container fluid>
        <Card className="border border-0 shadow-sm">
          <Card.Body>
            <h5>Add Category Here</h5>
            <Form>
              <Form.Group className="mt-3">
                <Form.Label>Category Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter here"
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Category Description</Form.Label>
                <Form.Control
                  as={"textarea"}
                  rows={6}
                  placeholder="Enter here"
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Category Cover Image Url</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter here"
                ></Form.Control>
              </Form.Group>
              <Container className="text-center mt-2">
                <Button variant="success" size="sm">
                  Add Category
                </Button>
                <Button className="ms-2" variant="danger" size="sm">
                  Clear
                </Button>
              </Container>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default AddCategory;
