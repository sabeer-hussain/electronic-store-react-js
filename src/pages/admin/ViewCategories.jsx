import { useState } from "react";
import CategoryView from "../../components/CategoryView";
import { deleteCategory, getCategories } from "../../services/CategoryService";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Button, Container, Modal, Spinner } from "react-bootstrap";

const ViewCategories = () => {
  const [categories, setCategories] = useState({
    content: [],
  });

  const [selectedCategory, setSelectedCategory] = useState(undefined);

  const [loading, setLoading] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setLoading(true);
    getCategories()
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
  }, []);

  // handle view button of category
  const handleView = (category) => {
    // alert("view button clicked");
    setSelectedCategory(category);
    handleShow();
  };

  // handle update of category
  const handleUpdate = (category) => {
    alert("update button clicked");
  };

  // modal view: view and update
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
        </>
      ) : (
        <h5 className="text-center">No categories in database</h5>
      )}

      {selectedCategory ? modalView() : ""}
    </div>
  );
};

export default ViewCategories;
