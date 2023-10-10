import { useState } from "react";
import CategoryView from "../../components/CategoryView";
import { deleteCategory, getCategories } from "../../services/CategoryService";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ViewCategories = () => {
  const [categories, setCategories] = useState({
    content: [],
  });

  const [loading, setLoading] = useState(false);

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

  return categories.content.length > 0 ? (
    <>
      {categories.content.map((category) => {
        return (
          <CategoryView
            key={category.categoryId}
            category={category}
            deleteCat={deleteCategoryMain}
          />
        );
      })}
    </>
  ) : (
    <h5 className="text-center">No categories in database</h5>
  );
};

export default ViewCategories;
