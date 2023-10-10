import { useState } from "react";
import CategoryView from "../../components/CategoryView";
import {
  deleteCategory,
  getCategories,
  updateCategory,
} from "../../services/CategoryService";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Button, Container, Form, Modal, Spinner } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";

const ViewCategories = () => {
  const [categories, setCategories] = useState({
    content: [],
  });

  const [currentPage, setCurrentPage] = useState(0);

  const [selectedCategory, setSelectedCategory] = useState(undefined);

  const [loading, setLoading] = useState(false);

  // view modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // update modal
  const [showUpdate, setShowUpdate] = useState(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);

  useEffect(() => {
    if (currentPage === 0) {
      // to load initial page
      setLoading(true);
      getCategories(0, 6)
        .then((data) => {
          console.log(data);
          setCategories(data);
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error in loading categories from server !!");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      // to load current page
      getCategories(currentPage, 6)
        .then((data) => {
          console.log(data);
          setCategories({
            content: [...categories.content, ...data.content],
            lastPage: data.lastPage,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
          });
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error in loading categories from server !!");
        });
    }
  }, [currentPage]);

  // handle view button of category
  const handleView = (category) => {
    // alert("view button clicked");
    setSelectedCategory(category);
    handleShow();
  };

  // handle update of category
  const handleUpdate = (category) => {
    // alert("update button clicked");
    setSelectedCategory(category);
    handleShowUpdate();
  };

  // update the category to server
  const updateCategoryClicked = (event) => {
    event.preventDefault();
    if (
      selectedCategory.title === undefined ||
      selectedCategory.title.trim() === ""
    ) {
      toast.error("Title required !!");
      return;
    }
    if (
      selectedCategory.description === undefined ||
      selectedCategory.description.trim() === ""
    ) {
      toast.error("Description required !!");
      return;
    }

    updateCategory(selectedCategory)
      .then((data) => {
        console.log(data);
        toast.success("Category Updated");

        const newCategories = categories.content.map((cat) => {
          if (cat.categoryId === selectedCategory.categoryId) {
            cat.title = data.title;
            cat.description = data.description;
            cat.coverImage = data.coverImage;
          }
          return cat;
        });

        setCategories({
          ...categories,
          content: newCategories,
        });

        handleCloseUpdate();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in updating category !!");
      });
  };

  // load next page function
  const loadNextPage = () => {
    console.log("loading next page");
    setCurrentPage(currentPage + 1);
  };

  // view modal
  const modalView = (category) => {
    return (
      <>
        <Modal animation={false} show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedCategory.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <img
                src={selectedCategory.coverImage}
                alt=""
                style={{ width: "100%", height: "250px", objectFit: "contain" }}
              />
            </Container>
            <div className="mt-3">{selectedCategory.description}</div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  // update modal
  const modalUpdate = (category) => {
    return (
      <>
        <Modal animation={false} show={showUpdate} onHide={handleCloseUpdate}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedCategory.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Category Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter here"
                  value={selectedCategory.title}
                  onChange={(event) =>
                    setSelectedCategory({
                      ...selectedCategory,
                      title: event.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Category Description</Form.Label>
                <Form.Control
                  as={"textarea"}
                  rows={6}
                  placeholder="Enter here"
                  value={selectedCategory.description}
                  onChange={(event) =>
                    setSelectedCategory({
                      ...selectedCategory,
                      description: event.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Container className="py-3">
                  <img
                    src={selectedCategory.coverImage}
                    alt=""
                    className="img-fluid"
                  />
                </Container>
                <Form.Label>Category Image Url</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter here"
                  value={selectedCategory.coverImage}
                  onChange={(event) =>
                    setSelectedCategory({
                      ...selectedCategory,
                      coverImage: event.target.value,
                    })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseUpdate}>
              Close
            </Button>
            <Button variant="success" onClick={updateCategoryClicked}>
              Update Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  // delete category main function
  const deleteCategoryMain = (categoryId) => {
    // sweet alert:
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // api call
        deleteCategory(categoryId)
          .then((data) => {
            Swal.fire("Deleted!", "Category has been deleted.", "success");
            const existingCategories = categories.content.filter(
              (c) => c.categoryId != categoryId
            );
            setCategories({
              ...categories,
              content: existingCategories,
            });
          })
          .catch((error) => {
            console.log(error);
            toast.error("Error in deleting category");
          });
      }
    });
  };

  return (
    <div>
      {/* loader */}
      <Container className="text-center p-3" hidden={!loading}>
        <Spinner />
        <div>
          <h3>Loading...</h3>
        </div>
      </Container>

      {categories.content.length > 0 ? (
        <>
          <InfiniteScroll
            dataLength={categories.content.length}
            next={loadNextPage}
            hasMore={!categories.lastPage}
            loader={<h2 className="p-2 text-center">Loading...</h2>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {categories.content.map((category) => {
              return (
                <CategoryView
                  key={category.categoryId}
                  category={category}
                  viewCat={handleView}
                  updateCat={handleUpdate}
                  deleteCat={deleteCategoryMain}
                />
              );
            })}
          </InfiniteScroll>
        </>
      ) : (
        <h5 className="text-center">No categories in database</h5>
      )}

      {selectedCategory ? modalView() : ""}
      {selectedCategory ? modalUpdate() : ""}
    </div>
  );
};

export default ViewCategories;
