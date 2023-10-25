import React from "react";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { getCategories } from "../../services/CategoryService";
import { useState } from "react";
import { useEffect } from "react";
import defaultCategoryImage from "../../assets/default_profile.jpg";
import { getAllLiveProducts } from "../../services/ProductService";
import { toast } from "react-toastify";
import SingleProductCard from "./SingleProductCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { STORE_PAGE_PRODUCT_SIZE } from "../../services/HelperService";

const Store = () => {
  const [categories, setCategories] = useState(null);
  const [products, setProducts] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    loadCategories(0, 100000);
    loadProducts(currentPage, STORE_PAGE_PRODUCT_SIZE, "addedDate", "desc");
  }, []);

  useEffect(() => {
    if (currentPage > 0) {
      loadProducts(currentPage, STORE_PAGE_PRODUCT_SIZE, "addedDate", "desc");
    }
  }, [currentPage]);

  // loading next page
  const loadNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

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

  const loadProducts = (pageNumber, pageSize, sortBy, sortDir) => {
    getAllLiveProducts(pageNumber, pageSize, sortBy, sortDir)
      .then((data) => {
        console.log(data);

        if (currentPage > 0) {
          setProducts({
            content: [...products.content, ...data.content],
            lastPage: data.lastPage,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
          });
        } else {
          setProducts({ ...data });
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in loading products");
      });
  };

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
    return (
      products && (
        <>
          <InfiniteScroll
            dataLength={products.content.length}
            next={loadNextPage}
            hasMore={!products.lastPage}
            loader={
              <h3 className="my-5 text-center">Loading more products...</h3>
            }
            endMessage={<p className="my-4 text-center">All Products loaded</p>}
          >
            <Container fluid>
              <Row>
                {products.content.map((product) => (
                  <Col key={product.productId} md={4}>
                    <SingleProductCard product={product} />
                  </Col>
                ))}
              </Row>
            </Container>
          </InfiniteScroll>
        </>
      )
    );
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
