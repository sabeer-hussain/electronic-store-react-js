import React from "react";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { getCategories } from "../../services/CategoryService";
import { useState } from "react";
import { useEffect } from "react";
import defaultCategoryImage from "../../assets/default_profile.jpg";

const Store = () => {
  const [categories, setCategories] = useState(null);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    loadCategories(0, 100000);
  }, []);

  const loadCategories = (pageNumber, pageSize) => {
    getCategories(pageNumber, pageSize)
      .then((data) => {
        console.log(data);
        setCategories({ ...data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadProducts = () => {};

  const categoryView = () => {
    return (
      categories && (
        <>
          <ListGroup variant="flush" className="sticky-top">
            <ListGroup.Item action>
              <img
                className="rounded-circle"
                src={defaultCategoryImage}
                alt={"default category image"}
                style={{
                  width: "40px",
                  height: "40px",
                  objectFit: "cover",
                }}
                onError={(event) => {
                  event.currentTarget.setAttribute("src", defaultCategoryImage);
                }}
              />
              <span className="ms-2">All Categories</span>
            </ListGroup.Item>
            {categories.content.map((category) => (
              <ListGroup.Item action key={category.categoryId}>
                <img
                  className="rounded-circle"
                  src={category.coverImage}
                  alt={category.title}
                  style={{
                    width: "40px",
                    height: "40px",
                    objectFit: "cover",
                  }}
                  onError={(event) => {
                    event.currentTarget.setAttribute(
                      "src",
                      defaultCategoryImage
                    );
                  }}
                />
                <span className="ms-2">{category.title}</span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      )
    );
  };
  const productsView = () => {
    return <h1>This is product view</h1>;
  };

  return (
    <Container fluid className="px-5 pt-5">
      <Row>
        <Col md={3}>{categoryView()}</Col>
        <Col md={9}>{productsView()}</Col>
      </Row>
    </Container>
  );
};

export default Store;
