import React from "react";
import defaultCategoryImage from "../../assets/default_profile.jpg";
import { Link } from "react-router-dom";
import { getCategories } from "../../services/CategoryService";
import { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";

const CategoryView = () => {
  const [categories, setCategories] = useState(null);

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

  const categoryView = () => {
    return (
      categories && (
        <>
          <ListGroup variant="flush" className="sticky-top">
            <ListGroup.Item action as={Link} to={"/store"}>
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
              <span className="ms-2">All Products</span>
            </ListGroup.Item>
            {categories.content.map((category) => (
              <ListGroup.Item
                as={Link}
                to={`/store/${category.categoryId}/${category.title}`}
                action
                key={category.categoryId}
              >
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

  return categories && categoryView();
};

export default CategoryView;
