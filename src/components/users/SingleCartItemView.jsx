import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { getProductImage } from "../../services/ProductService";
import defaultProductImage from "../../assets/default_product_image.jpg";

const SingleCartItemView = ({ item }) => {
  const [productImage, setProductImage] = useState(undefined);

  const getProductImageFromServer = async () => {
    // api call
    setProductImage(await getProductImage(item.product.productId));
  };

  useEffect(() => {
    getProductImageFromServer();
  }, []);

  return (
    <Card className="shadow-sm mb-3">
      <Card.Body>
        <Row>
          <Col
            md={1}
            className="d-flex align-items-center justify-content-center"
          >
            <img
              style={{ width: "50px", height: "50px", objectFit: "contain" }}
              src={productImage}
              alt=""
              onError={(event) => {
                event.currentTarget.setAttribute("src", defaultProductImage);
              }}
            />
          </Col>
          <Col md={10}>
            <h5>{item.product.title}</h5>
            <p className="text-muted">
              <span>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Dolorem, laborum!
              </span>
            </p>
            <Row>
              <Col>
                <p>
                  <b>{item.quantity}</b>
                  <span className="text-muted"> Quantity</span>
                </p>
              </Col>
              <Col>
                <p>
                  <span className="text-muted">Price</span>
                  <b> ₹{item.product.discountedPrice}</b>
                </p>
              </Col>
              <Col>
                <p>
                  <span className="text-muted">Total Price</span>
                  <b> ₹{item.totalPrice}</b>
                </p>
              </Col>
            </Row>
          </Col>
          <Col md={3}></Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default SingleCartItemView;
