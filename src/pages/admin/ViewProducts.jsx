import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/ProductService";
import { toast } from "react-toastify";
import SingleProductView from "../../components/admin/SingleProductView";
import { PRODUCT_PAGE_SIZE } from "../../services/HelperService";

const {
  Card,
  Container,
  Row,
  Col,
  Table,
  Button,
  Form,
  Pagination,
} = require("react-bootstrap");

const ViewProducts = () => {
  const [products, setProducts] = useState(undefined);

  useEffect(() => {
    getProducts(0, PRODUCT_PAGE_SIZE, "addedDate", "desc");
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

  // update product list in parent which is deleted in child
  const updateProductList = (productId) => {
    const existingProducts = products.content.filter(
      (p) => p.productId != productId
    );
    setProducts({
      ...products,
      content: existingProducts,
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
            <Form.Control type="text" placeholder="Search here" />
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
    </>
  );
};

export default ViewProducts;
