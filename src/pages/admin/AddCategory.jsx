import { useState } from "react";
import { Button, Card, Container, Form, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { addCategory } from "../../services/CategoryService";

const AddCategory = () => {
  const [category, setCategory] = useState({
    title: "",
    description: "",
    coverImage: "",
  });

  const [loading, setLoading] = useState(false);

  const handleFieldChange = (event, property) => {
    event.preventDefault();
    setCategory({
      ...category,
      [property]: event.target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(category);

    // client side validation
    if (category.title === undefined || category.title.trim() === "") {
      toast.error("Category title required !!");
      return;
    }
    if (
      category.description === undefined ||
      category.description.trim() === ""
    ) {
      toast.error("Category description required !!");
      return;
    }

    // call server api to add category
    setLoading(true);
    addCategory(category)
      .then((data) => {
        // success
        console.log(data);
        toast.success("Category Added");
        setCategory({
          title: "",
          description: "",
          coverImage: "",
        });
      })
      .catch((error) => {
        console.log(error);
        toast.success("Error in adding category !!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const clearForm = (event) => {
    event.preventDefault();
    setCategory({
      title: "",
      description: "",
      coverImage: "",
    });
  };
  return (
    <>
      <Container fluid>
        <Card className="border border-0 shadow-sm">
          {/* {JSON.stringify(category)} */}
          <Card.Body>
            <h5>Add Category Here</h5>
            <Form onSubmit={handleFormSubmit}>
              <Form.Group className="mt-3">
                <Form.Label>Category Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter here"
                  value={category.title}
                  onChange={(event) => handleFieldChange(event, "title")}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Category Description</Form.Label>
                <Form.Control
                  as={"textarea"}
                  rows={6}
                  placeholder="Enter here"
                  value={category.description}
                  onChange={(event) => handleFieldChange(event, "description")}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Category Cover Image Url</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter here"
                  value={category.coverImage}
                  onChange={(event) => handleFieldChange(event, "coverImage")}
                ></Form.Control>
              </Form.Group>
              <Container className="text-center mt-2">
                <Button
                  type="submit"
                  variant="success"
                  size="sm"
                  disabled={loading}
                >
                  <Spinner
                    variant={"border"}
                    size={"sm"}
                    className="me-2"
                    hidden={!loading}
                  />
                  <span hidden={!loading}>Please wait...</span>
                  <span hidden={loading}>Add Category</span>
                </Button>
                <Button
                  className="ms-2"
                  variant="danger"
                  size="sm"
                  onClick={clearForm}
                >
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
