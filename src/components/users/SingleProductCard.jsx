import React, { useEffect, useState } from "react";
import { Badge, Button, Card, Container } from "react-bootstrap";
import defaultProductImage from "../../assets/default_product_image.jpg";
import { getProductImage } from "../../services/ProductService";
import "./SingleProductCard.css";

const SingleProductCard = ({ product }) => {
  const [productImage, setProductImage] = useState(undefined);

  useEffect(() => {
    if (product) {
      getProductImageFromServer();
    }
  }, [product]);

  const getProductImageFromServer = async () => {
    // api call
    setProductImage(await getProductImage(product.productId));
  };

  return (
    <Card className="m-1 shadow-sm">
      <Card.Body>
        <Container className="text-center">
          <img
            src={productImage}
            alt={product.title}
            onError={(event) => {
              event.currentTarget.setAttribute("src", defaultProductImage);
            }}
            className="product-image"
          />
        </Container>
        <h6>{product.title}</h6>
        <p className="text-muted">
          Short description
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, natus?
          </span>
        </p>
        <Badge pill bg="info">
          {product.category?.title}
        </Badge>
        <Badge className="ms-2" pill bg={product.stock ? "success" : "danger"}>
          {product.stock ? "In Stock" : "Out of Stock"}
        </Badge>
        <Container className="text-end">
          <b>
            <span className="h3 text-muted">
              <s>₹{product.price}</s>
            </span>
          </b>
          <b>
            <span className="h4 ms-2">₹{product.discountedPrice}</span>
          </b>
        </Container>
        <Container className="d-grid mt-4">
          <Button variant="success" size="sm">
            View Product
          </Button>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default SingleProductCard;
