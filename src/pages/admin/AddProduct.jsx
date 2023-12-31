import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormGroup,
  InputGroup,
  Row,
} from "react-bootstrap";
import { toast } from "react-toastify";
import {
  addProductImage,
  createProductInCategory,
  createProductWithoutCategory,
} from "../../services/ProductService";
import { getCategories } from "../../services/CategoryService";
import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: 0,
    discountedPrice: 0,
    quantity: 1,
    live: false,
    stock: true,
    image: undefined,
    imagePreview: undefined,
  });
  const [categories, setCategories] = useState(undefined);
  const [selectedCategoryId, setSelectedCategoryId] = useState("none");

  // for rich text editor
  const editorRef = useRef();

  useEffect(() => {
    getCategories(0, 1000)
      .then((data) => {
        console.log(data);
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in loading categories");
      });
  }, []);

  // function for image change
  const handleFileChange = (event) => {
    if (
      event.target.files[0].type === "image/png" ||
      event.target.files[0].type === "image/jpeg"
    ) {
      // preview show
      const reader = new FileReader();
      reader.onload = (r) => {
        setProduct({
          ...product,
          imagePreview: r.target.result,
          image: event.target.files[0],
        });
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      toast.error("Invalid File !!");
      setProduct({
        ...product,
        image: undefined,
        imagePreview: undefined,
      });
    }
  };

  const clearForm = () => {
    editorRef.current.setContent("");
    setProduct({
      title: "",
      description: "",
      price: 0,
      discountedPrice: 0,
      quantity: 1,
      live: false,
      stock: true,
      image: undefined,
      imagePreview: undefined,
    });
    setSelectedCategoryId("none");
  };

  // handle/submit add product form
  const submitAddProductForm = (event) => {
    event.preventDefault();

    // client side validations
    if (product.title === undefined || product.title.trim() === "") {
      toast.error("Title is required !!");
      return;
    }
    if (
      product.description === undefined ||
      product.description.trim() === ""
    ) {
      toast.error("Description required !!");
      return;
    }
    if (product.price <= 0) {
      toast.error("Invalid Price !!");
      return;
    }
    if (
      product.discountedPrice <= 0 ||
      product.discountedPrice >= product.price
    ) {
      toast.error("Invalid Discounted Price !!");
      return;
    }
    if (product.quantity <= 0) {
      toast.error("Invalid Quantity !!");
      return;
    }
    // remaining validations (validate data) if any

    if (selectedCategoryId === "none") {
      // call create product without category api
      createProductWithoutCategory(product)
        .then((data) => {
          console.log(data);
          toast.success("Product is created !!");

          if (!product.image) {
            clearForm();
            return;
          }

          // image upload
          addProductImage(product.image, data.productId)
            .then((data) => {
              console.log(data);
              toast.success("Image uploaded");
              clearForm();
            })
            .catch((error) => {
              console.log(error);
              toast.error("Error in uploading image");
            });
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error in creating product !! check product details");
        });
    } else {
      // call create product within category api
      createProductInCategory(product, selectedCategoryId)
        .then((data) => {
          console.log(data);
          toast.success("Product is created !!");

          if (!product.image) {
            clearForm();
            return;
          }

          // image upload
          addProductImage(product.image, data.productId)
            .then((data) => {
              console.log(data);
              toast.success("Image uploaded");
              clearForm();
            })
            .catch((error) => {
              console.log(error);
              toast.error("Error in uploading image");
            });
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error in creating product !! check product details");
        });
    }
  };

  const formView = () => {
    return (
      <>
        <Card className="shadow-sm">
          {/* {JSON.stringify(product)} */}
          <Card.Body>
            <h5>Add Product Here</h5>
            <Form onSubmit={submitAddProductForm}>
              {/* product title */}
              <FormGroup className="mt-3">
                <Form.Label>Product Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter here"
                  value={product.title}
                  onChange={(event) =>
                    setProduct({
                      ...product,
                      title: event.target.value,
                    })
                  }
                />
              </FormGroup>

              {/* product description */}
              <Form.Group className="mt-3">
                <Form.Label>Product Description</Form.Label>

                {/* <Form.Control
                  as={"textarea"}
                  rows={6}
                  placeholder="Enter here"
                  value={product.description}
                  onChange={(event) =>
                    setProduct({
                      ...product,
                      description: event.target.value,
                    })
                  }
                /> */}

                {/* using tinymce rich text editor */}
                <Editor
                  apiKey=""
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  init={{
                    height: 380,
                    menubar: true,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | blocks | " +
                      "bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                  onEditorChange={() => {
                    setProduct({
                      ...product,
                      description: editorRef.current.getContent(),
                    });
                  }}
                />
              </Form.Group>

              <Row>
                <Col>
                  {/* product price */}
                  <Form.Group className="mt-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter here"
                      value={product.price}
                      onChange={(event) =>
                        setProduct({
                          ...product,
                          price: event.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col>
                  {/* product discounted price */}
                  <Form.Group className="mt-3">
                    <Form.Label>Discounted Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter here"
                      value={product.discountedPrice}
                      onChange={(event) => {
                        if (event.target.value > product.price) {
                          toast.error("Invalid Discount value !!");
                          return;
                        }
                        setProduct({
                          ...product,
                          discountedPrice: event.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* product quantity */}
              <Form.Group className="mt-3">
                <Form.Label>Product Quantity</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter here"
                  value={product.quantity}
                  onChange={(event) =>
                    setProduct({
                      ...product,
                      quantity: event.target.value,
                    })
                  }
                />
              </Form.Group>

              <Row className="mt-3 px-1">
                <Col>
                  {/* product is in live or not */}
                  <Form.Check
                    type="switch"
                    label={"Live"}
                    checked={product.live}
                    onChange={(event) => {
                      setProduct({
                        ...product,
                        live: event.target.checked,
                      });
                    }}
                  />
                </Col>
                <Col>
                  {/* product is in stock or not */}
                  <Form.Check
                    type="switch"
                    label={"Stock"}
                    checked={product.stock}
                    onChange={(event) => {
                      setProduct({
                        ...product,
                        stock: event.target.checked,
                      });
                    }}
                  />
                </Col>
              </Row>

              {/* product image */}
              <Form.Group className="mt-3">
                <Container
                  hidden={!product.imagePreview}
                  className="text-center py-4 border border-2"
                >
                  <p className="text-muted">Image Preview</p>
                  <img
                    src={product.imagePreview}
                    alt=""
                    className="img-fluid"
                    style={{ maxHeight: "250px" }}
                  />
                </Container>
                <Form.Label>Select product image</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={"file"}
                    onChange={(event) => handleFileChange(event)}
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={(event) => {
                      setProduct({
                        ...product,
                        imagePreview: undefined,
                        image: undefined,
                      });
                    }}
                  >
                    Clear
                  </Button>
                </InputGroup>
              </Form.Group>

              {/* product category */}
              {/* {JSON.stringify(selectedCategoryId)} */}
              <Form.Group className="mt-3">
                <Form.Label>Select Category</Form.Label>
                <Form.Select
                  value={selectedCategoryId}
                  onChange={(event) => {
                    setSelectedCategoryId(event.target.value);
                  }}
                >
                  <option value="none">NONE</option>
                  {categories
                    ? categories.content.map((category) => (
                        <option
                          key={category.categoryId}
                          value={category.categoryId}
                        >
                          {category.title}
                        </option>
                      ))
                    : ""}
                </Form.Select>
              </Form.Group>

              <Container className="mt-3 text-center">
                <Button type="submit" variant="success" size="sm">
                  Add Product
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  className="ms-1"
                  onClick={clearForm}
                >
                  Clear Data
                </Button>
              </Container>
            </Form>
          </Card.Body>
        </Card>
      </>
    );
  };

  return <div>{formView()}</div>;
};

export default AddProduct;
