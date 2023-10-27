import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { getProductImage } from "../../services/ProductService";
import defaultProductImage from "../../assets/default_product_image.jpg";
import CartContext from "../../context/CartContext";
import { toast } from "react-toastify";

const SingleCartItemView = ({ item }) => {
  const { cart, setCart, addItem, removeItem } = useContext(CartContext);
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
          <Col md={9}>
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
          <Col
            md={2}
            className="d-flex align-items-center justify-content-center"
          >
            <div className="w-100">
              <div className="d-grid">
                <Button
                  variant="danger"
                  size="sm"
                  onClick={(event) => {
                    removeItem(item.cartItemId);
                  }}
                >
                  Remove
                </Button>
              </div>
              <div className="mt-2">
                <Row>
                  <Col className="d-grid">
                    <Button
                      variant="info"
                      size="sm"
                      onClick={(event) => {
                        const decreasedQuantity = item.quantity - 1;
                        if (decreasedQuantity > 0) {
                          addItem(
                            item.product.productId,
                            decreasedQuantity,
                            () => {
                              toast.info("Quantity Updated");
                            }
                          );
                        } else {
                          toast.info("Quantity can not be less than 1");
                        }
                      }}
                    >
                      -
                    </Button>
                  </Col>
                  <Col className="d-grid">
                    <Button
                      variant="success"
                      size="sm"
                      onClick={(event) => {
                        const increasedQuantity = item.quantity + 1;
                        addItem(
                          item.product.productId,
                          increasedQuantity,
                          () => {
                            toast.success("Quantity Updated");
                          }
                        );
                      }}
                    >
                      +
                    </Button>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default SingleCartItemView;
