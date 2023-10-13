import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/ProductService";
import { toast } from "react-toastify";
import SingleProductView from "../../components/admin/SingleProductView";

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
    getProducts(0, 10, "addedDate", "desc");
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
          <Table
            className="text-center"
            striped
            bordered
            hover
            responsive
            size="sm "
          >
            <thead>
              <tr>
                <th>#SN</th>
                <th>Title</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Discounted Price</th>
                <th>Live</th>
                <th>Stock</th>
                <th>Category</th>
                <th>Added Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.content.map((product, index) => {
                return (
                  <SingleProductView
                    key={product.productId}
                    index={index}
                    product={product}
                  />
                );
              })}
            </tbody>
          </Table>
          <Container className="d-flex justify-content-end">
            <Pagination>
              <Pagination.Prev />
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item>
              <Pagination.Next />
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
