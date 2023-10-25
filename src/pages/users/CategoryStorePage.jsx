import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductsOfCategory } from "../../services/ProductService";
import { STORE_PAGE_PRODUCT_SIZE } from "../../services/HelperService";
import InfiniteScroll from "react-infinite-scroll-component";
import { Col, Container, Row } from "react-bootstrap";
import SingleProductCard from "../../components/users/SingleProductCard";
import CategoryView from "../../components/users/CategoryView";

const CategoryStorePage = () => {
  const { categoryId, categoryTitle } = useParams();
  const [products, setProducts] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    loadProductsOfCategory(
      currentPage,
      STORE_PAGE_PRODUCT_SIZE,
      "addedDate",
      "desc"
    );
  }, [categoryId]);

  useEffect(() => {
    if (currentPage > 0) {
      loadProductsOfCategory(
        currentPage,
        STORE_PAGE_PRODUCT_SIZE,
        "addedDate",
        "desc"
      );
    }
  }, [currentPage]);

  const loadProductsOfCategory = (pageNumber, pageSize, sortBy, sortDir) => {
    getProductsOfCategory(categoryId, pageNumber, pageSize, sortBy, sortDir)
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
      });
  };

  // loading next page
  const loadNextPage = () => {
    setCurrentPage(currentPage + 1);
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
    products && (
      <>
        <Container fluid className="px-5 pt-5">
          <Row>
            <Col md={3}>
              <CategoryView />
            </Col>
            <Col md={9}>
              {products.content.length > 0 ? (
                productsView()
              ) : (
                <h3 className="mt-5 text-center">No items in this category</h3>
              )}
            </Col>
          </Row>
        </Container>
      </>
    )
  );
};

export default CategoryStorePage;
