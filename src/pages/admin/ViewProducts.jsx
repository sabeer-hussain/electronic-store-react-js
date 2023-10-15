import { useEffect, useState } from "react";
import {
  getAllProducts,
  getProductImage,
  searchProducts,
  updateCategoryOfProduct,
  updateProduct,
  updateProductImage,
} from "../../services/ProductService";
import { toast } from "react-toastify";
import SingleProductView from "../../components/admin/SingleProductView";
import { PRODUCT_PAGE_SIZE } from "../../services/HelperService";
import {
  Card,
  Container,
  Row,
  Col,
  Table,
  Button,
  Form,
  Pagination,
  Modal,
  FormGroup,
  InputGroup,
} from "react-bootstrap";
import UserContext from "../../context/UserContext";
import { useContext } from "react";
import defaultImage from "../../assets/default_profile.jpg";
import ShowHtml from "../../components/ShowHtml";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import { getCategories } from "../../services/CategoryService";

const ViewProducts = () => {
  const userContext = useContext(UserContext);

  const [previousProducts, setPreviousProducts] = useState(undefined);
  const [products, setProducts] = useState(undefined);
  const [currentProduct, setCurrentProduct] = useState(undefined);
  const [productImage, setProductImage] = useState(undefined);
  // for rich text editor
  const editorRef = useRef(null);
  const [categories, setCategories] = useState(undefined);
  const [imageUpdate, setImageUpdate] = useState({
    image: undefined,
    imagePreview: undefined,
  });
  const [categoryChangeId, setCategoryChangeId] = useState(undefined);
  const [searchQuery, setSearchQuery] = useState("");

  // view product state variables and functions
  const [show, setShow] = useState(false);

  const closeProductViewModal = () => {
    setProductImage(undefined);
    setShow(false);
  };

  const openProductViewModal = (event, product) => {
    console.log(product);
    setCurrentProduct(product);
    setShow(true);
  };

  // #END view product modal state variables and functions

  // edit product state variables and functions
  const [showEditModal, setShowEditModal] = useState(false);

  const closeEditProductModal = () => {
    setProductImage(undefined);
    setShowEditModal(false);
  };

  const openEditProductModal = (event, product) => {
    setCurrentProduct(product);
    setShowEditModal(true);
  };

  // #END edit product state variables and functions

  useEffect(() => {
    getProducts(0, PRODUCT_PAGE_SIZE, "addedDate", "desc");
  }, []);

  useEffect(() => {
    if (currentProduct) {
      getProductImageFromServer();
    }
  }, [currentProduct]);

  useEffect(() => {
    getCategories(0, 1000)
      .then((data) => {
        console.log(data);
        setCategories({ ...data });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in loading categories");
      });
  }, []);

  const getProducts = (
    pageNumber = 0,
    pageSize = 10,
    sortBy = "addedDate",
    sortDir = "asc"
  ) => {
    // all products function of service
    getAllProducts(pageNumber, pageSize, sortBy, sortDir)
      .then((data) => {
        console.log(data);
        setProducts({
          ...data,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in loading products");
      });
  };

  const getProductImageFromServer = async () => {
    // api call
    setProductImage(await getProductImage(currentProduct.productId));
  };

  // handle update product form
  const handleUpdateFormSubmit = (event) => {
    event.preventDefault();
    console.log(currentProduct);

    // client side validations
    if (
      currentProduct.title === undefined ||
      currentProduct.title.trim() === ""
    ) {
      toast.error("Title is required !!");
      return;
    }
    if (
      currentProduct.description === undefined ||
      currentProduct.description.trim() === ""
    ) {
      toast.error("Description required !!");
      return;
    }
    if (currentProduct.price <= 0) {
      toast.error("Invalid Price !!");
      return;
    }
    if (
      currentProduct.discountedPrice <= 0 ||
      currentProduct.discountedPrice >= currentProduct.price
    ) {
      toast.error("Invalid Discounted Price !!");
      return;
    }
    if (currentProduct.quantity <= 0) {
      toast.error("Invalid Quantity !!");
      return;
    }
    // remaining validations (validate data) if any

    // form submit: api call
    updateProduct(currentProduct, currentProduct.productId)
      .then((data) => {
        console.log(data);
        toast.success("Product is updated !!", {
          position: "top-right",
        });

        // update image also...
        if (imageUpdate.image && imageUpdate.imagePreview) {
          updateProductImage(imageUpdate.image, currentProduct.productId)
            .then((imageData) => {
              console.log(imageData);
              setCurrentProduct({
                ...currentProduct,
                productImageName: imageData.imageName,
              });
              toast.success("Image updated", {
                position: "top-right",
              });
              setImageUpdate({
                image: undefined,
                imagePreview: undefined,
              });
            })
            .catch((error) => {
              console.log(error);
              toast.error("Error in updating image", {
                position: "top-right",
              });
            });
        }

        // category update
        if (
          categoryChangeId !== "none" &&
          categoryChangeId !== currentProduct.category?.categoryId
        ) {
          updateCategoryOfProduct(categoryChangeId, currentProduct.productId)
            .then((catData) => {
              console.log(catData);
              toast.success("Category Updated", {
                position: "top-right",
              });
              setCurrentProduct({
                ...currentProduct,
                category: catData.category,
              });
              const newArray = products.content.map((product) => {
                if (product.productId === currentProduct.productId) {
                  return catData;
                }
                return product;
              });
              setProducts({
                ...products,
                content: newArray,
              });
            })
            .catch((error) => {
              console.log(error);
              toast.error("Error in updating category", {
                position: "top-right",
              });
            });
        }

        const newArray = products.content.map((product) => {
          if (product.productId === currentProduct.productId) {
            return data;
          }
          return product;
        });
        setProducts({
          ...products,
          content: newArray,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in updating product !! check product details");
      });
  };

  // handle update file change
  const handleFileChange = (event) => {
    if (
      event.target.files[0].type === "image/png" ||
      event.target.files[0].type === "image/jpeg"
    ) {
      // preview show
      const reader = new FileReader();
      reader.onload = (r) => {
        setImageUpdate({
          imagePreview: r.target.result,
          image: event.target.files[0],
        });
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      toast.error("Invalid File !!");
      setImageUpdate({
        image: undefined,
        imagePreview: undefined,
      });
    }
  };

  // update product list in parent which is deleted in child
  const updateProductList = (productId) => {
    const existingProducts = products.content.filter(
      (p) => p.productId !== productId
    );
    setProducts({
      ...products,
      content: existingProducts,
    });
  };

  // modal view
  const viewProductModalView = () => {
    return (
      currentProduct && (
        <>
          <Modal
            size="xl"
            animation={false}
            show={show}
            onHide={closeProductViewModal}
          >
            <Modal.Header closeButton>
              <Modal.Title>{currentProduct.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Card className="shadow-sm">
                <Card.Body>
                  {/* product picture */}
                  <Container className="text-center py-3">
                    <img
                      style={{
                        height: "300px",
                      }}
                      src={
                        currentProduct.productImageName
                          ? productImage
                          : defaultImage
                      }
                      alt=""
                    />
                  </Container>

                  {/* information table */}
                  <Table striped bordered responsive className="text-center">
                    <thead>
                      <tr>
                        <th>Info</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Product Id</td>
                        <td className="fw-bold">{currentProduct.productId}</td>
                      </tr>
                      <tr>
                        <td>Quantity</td>
                        <td className="fw-bold">{currentProduct.quantity}</td>
                      </tr>
                      <tr>
                        <td>Price</td>
                        <td className="fw-bold">{currentProduct.price} ₹</td>
                      </tr>
                      <tr>
                        <td>Discounted Price</td>
                        <td className="fw-bold">
                          {currentProduct.discountedPrice} ₹
                        </td>
                      </tr>
                      <tr className={currentProduct.live ? "" : "table-danger"}>
                        <td>Live</td>
                        <td className="fw-bold">
                          {currentProduct.live ? "True" : "False"}
                        </td>
                      </tr>
                      <tr
                        className={currentProduct.stock ? "" : "table-danger"}
                      >
                        <td>Stock</td>
                        <td className="fw-bold">
                          {currentProduct.stock ? "In Stock" : "Not in Stock"}
                        </td>
                      </tr>
                      <tr>
                        <td>Category</td>
                        <td className="fw-bold">
                          {currentProduct.category?.title}
                        </td>
                      </tr>
                    </tbody>
                  </Table>

                  {/* description */}

                  {/* converts html string to html/jsx element using dangerouslySetInnterHTML attribute */}
                  {/* <div
                    className="p-3 border border-1"
                    dangerouslySetInnerHTML={{
                      __html: currentProduct.description,
                    }}
                  ></div> */}

                  {/* converts/parse html string to jsx element using parse() method of html-react-parser */}
                  <div className="p-3 border border-1">
                    <ShowHtml htmlText={currentProduct.description} />
                  </div>
                </Card.Body>
              </Card>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeProductViewModal}>
                Close
              </Button>
              <Button variant="primary" onClick={openProductViewModal}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )
    );
  };

  // edit/update product modal
  const editProductModalView = () => {
    return (
      currentProduct && (
        <>
          <Modal
            size="xl"
            animation={false}
            show={showEditModal}
            onHide={closeEditProductModal}
          >
            <Modal.Header closeButton>
              <Modal.Title>Update Product Here</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* {JSON.stringify(currentProduct)} */}
              <Form onSubmit={handleUpdateFormSubmit}>
                {/* product title */}
                <FormGroup className="mt-3">
                  <Form.Label>Product Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter here"
                    value={currentProduct.title}
                    onChange={(event) =>
                      setCurrentProduct({
                        ...currentProduct,
                        title: event.target.value,
                      })
                    }
                  />
                </FormGroup>

                {/* product description */}
                <Form.Group className="mt-3">
                  <Form.Label>Product Description</Form.Label>
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
                    value={currentProduct.description}
                    onEditorChange={(event) => {
                      setCurrentProduct({
                        ...currentProduct,
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
                        value={currentProduct.price}
                        onChange={(event) =>
                          setCurrentProduct({
                            ...currentProduct,
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
                        value={currentProduct.discountedPrice}
                        onChange={(event) => {
                          if (event.target.value > currentProduct.price) {
                            toast.error("Invalid Discount value !!");
                            return;
                          }
                          setCurrentProduct({
                            ...currentProduct,
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
                    value={currentProduct.quantity}
                    onChange={(event) =>
                      setCurrentProduct({
                        ...currentProduct,
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
                      checked={currentProduct.live}
                      onChange={(event) => {
                        setCurrentProduct({
                          ...currentProduct,
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
                      checked={currentProduct.stock}
                      onChange={(event) => {
                        setCurrentProduct({
                          ...currentProduct,
                          stock: event.target.checked,
                        });
                      }}
                    />
                  </Col>
                </Row>

                {/* product image */}
                <Form.Group className="my-5">
                  <Container className="text-center py-4 border border-2">
                    <p className="text-muted">Image Preview</p>
                    <img
                      src={
                        imageUpdate.imagePreview
                          ? imageUpdate.imagePreview
                          : productImage
                      }
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
                        setImageUpdate({
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
                {/* {JSON.stringify(categoryChangeId)} */}
                <Form.Group className="mt-3">
                  <Form.Label>Select Category</Form.Label>
                  <Form.Select
                    value={currentProduct.categoryId}
                    onChange={(event) => {
                      setCategoryChangeId(event.target.value);
                    }}
                  >
                    <option value="none">NONE</option>
                    {categories &&
                      categories.content.map((cat) => {
                        return (
                          <option
                            selected={
                              cat.categoryId ===
                              currentProduct.category?.categoryId
                            }
                            key={cat.categoryId}
                            value={cat.categoryId}
                          >
                            {cat.title}
                          </option>
                        );
                      })}
                  </Form.Select>
                </Form.Group>

                <Container className="mt-3 text-center">
                  <Button type="submit" variant="success" size="sm">
                    Update Details
                  </Button>
                </Container>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeEditProductModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )
    );
  };

  // search product
  const handleSearchProducts = () => {
    if (searchQuery === undefined || searchQuery.trim() === "") {
      return;
    }

    // call server api to search
    searchProducts(searchQuery)
      .then((data) => {
        if (data.content.length <= 0) {
          toast.info("No result found");
          return;
        }
        setPreviousProducts(products);
        setProducts(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in serching the products", {
          position: "top-right",
        });
      });
  };

  // products view
  const productsView = () => {
    return (
      <Card className="shadow-sm">
        <Card.Body>
          <h5 className="mb-3">View Products</h5>
          <Form.Group className="mb-2">
            <Form.Label>Search Product</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search here"
                onChange={(event) => {
                  if (event.target.value.trim() === "") {
                    if (previousProducts) {
                      setProducts(previousProducts);
                    }
                  }
                  setSearchQuery(event.target.value);
                }}
                value={searchQuery}
              />
              <Button
                variant="outline-secondary"
                onClick={handleSearchProducts}
              >
                Search
              </Button>
            </InputGroup>
          </Form.Group>
          <Table bordered hover responsive size="sm">
            <thead>
              <tr className="text-center">
                <th className="small">SN</th>
                <th className="small">Title</th>
                <th className="small">Quantity</th>
                <th className="small">Price</th>
                <th className="small">Discounted</th>
                <th className="small">Live</th>
                <th className="small">Stock</th>
                <th className="small">Category</th>
                <th className="small">Date</th>
                <th className="small">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.content.map((product, index) => {
                return (
                  <SingleProductView
                    key={product.productId}
                    index={index}
                    product={product}
                    updateProductList={updateProductList}
                    openProductViewModal={openProductViewModal}
                    openEditProductModal={openEditProductModal}
                  />
                );
              })}
            </tbody>
          </Table>
          <Container className="d-flex justify-content-end">
            <Pagination size="md">
              {/* loop runs from 0 -- totalPages-1 */}
              <Pagination.First
                onClick={(event) => {
                  getProducts(0, PRODUCT_PAGE_SIZE, "addedDate", "desc");
                }}
              />

              <Pagination.Prev
                onClick={(event) => {
                  if (products.pageNumber - 1 < 0) {
                    return;
                  }
                  getProducts(
                    products.pageNumber - 1,
                    PRODUCT_PAGE_SIZE,
                    "addedDate",
                    "desc"
                  );
                }}
              />
              {
                /* [0,1,2,3,4] */
                [...Array(products.totalPages)]
                  .map((ob, i) => i)
                  .map((item) => {
                    return products.pageNumber === item ? (
                      <Pagination.Item active key={item}>
                        {item + 1}
                      </Pagination.Item>
                    ) : (
                      <Pagination.Item
                        key={item}
                        onClick={(event) => {
                          getProducts(
                            item,
                            PRODUCT_PAGE_SIZE,
                            "addedDate",
                            "desc"
                          );
                        }}
                      >
                        {item + 1}
                      </Pagination.Item>
                    );
                  })
              }
              <Pagination.Next
                onClick={(event) => {
                  if (products.lastPage) {
                    return;
                  }
                  getProducts(
                    products.pageNumber + 1,
                    PRODUCT_PAGE_SIZE,
                    "addedDate",
                    "desc"
                  );
                }}
              />

              <Pagination.Last
                onClick={(event) => {
                  getProducts(
                    products.totalPages - 1,
                    PRODUCT_PAGE_SIZE,
                    "addedDate",
                    "desc"
                  );
                }}
              />
            </Pagination>
          </Container>
        </Card.Body>
      </Card>
    );
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col>{products ? productsView() : ""}</Col>
        </Row>
      </Container>

      {viewProductModalView()}
      {editProductModalView()}
    </>
  );
};

export default ViewProducts;
