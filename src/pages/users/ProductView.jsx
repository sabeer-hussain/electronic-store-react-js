import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { getProduct } from "../../services/ProductService";
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import ShowHtml from "../../components/ShowHtml";
import defaultProductImage from "../../assets/default_product_image.jpg";
import CartContext from "../../context/CartContext";
import { toast } from "react-toastify";
import { getProductImageUrl } from "../../services/HelperService";

const ProductView = () => {
  const { cart, addItem } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const { productId } = useParams();

  useEffect(() => {
    loadProduct(productId);
  }, []);

  const loadProduct = (productId) => {
    getProduct(productId)
      .then((data) => setProduct(data))
      .catch((error) => console.log(error));
  };

  const handleAddItem = (productId, quantity) => {
    // if the product is in stock
    addItem(productId, quantity, () => {
      toast.success("Product is added to cart");
    });
  };

  const productView = () => {
    return (
      <Container className="py-4">
        <Row>
          <Col>
            <Card className="mt-4 border border-0 shadow-sm">
              <Card.Body>
                <Container className="my-4">
                  <Row>
                    <Col>
                      <img
                        style={{ width: "500px" }}
                        src={getProductImageUrl(product.productId)}
                        alt={product.title}
                        onError={(event) => {
                          event.currentTarget.setAttribute(
                            "src",
                            defaultProductImage
                          );
                        }}
                      />
                    </Col>
                    <Col>
                      <h3>{product.title}</h3>
                      <p className="text-muted">
                        Short description
                        <span>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Eos, natus?
                        </span>
                      </p>
                      <Badge pill bg="info">
                        {product.category?.title}
                      </Badge>
                      <Badge
                        className="ms-2"
                        pill
                        bg={product.stock ? "success" : "danger"}
                      >
                        {product.stock ? "In Stock" : "Out of Stock"}
                      </Badge>
                      <Container className="text-center">
                        <b>
                          <span className="h1 text-muted">
                            <s>₹{product.price}</s>
                          </span>
                        </b>
                        <b>
                          <span className="h2 ms-2">
                            ₹{product.discountedPrice}
                          </span>
                        </b>
                      </Container>
                      <Container className="d-grid mt-4">
                        <Button
                          variant="warning"
                          size="sm"
                          disabled={!product.stock}
                          onClick={(event) =>
                            handleAddItem(product.productId, 1)
                          }
                        >
                          Add to Cart
                        </Button>
                        <Button
                          as={Link}
                          to="/store"
                          className="mt-2"
                          variant="info"
                          size="sm"
                        >
                          Go to Store
                        </Button>
                      </Container>
                    </Col>
                  </Row>
                </Container>
                <div className="mt-5">
                  <ShowHtml htmlText={product.description} />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Container className="d-grid mt-4">
          <Button
            variant="warning"
            size="sm"
            disabled={!product.stock}
            onClick={(event) => handleAddItem(product.productId, 1)}
          >
            Add to Cart
          </Button>
          <Button
            as={Link}
            to="/store"
            className="mt-2"
            variant="info"
            size="sm"
          >
            Go to Store
          </Button>
        </Container>
      </Container>
    );
  };

  return product && productView();
};

export default ProductView;
