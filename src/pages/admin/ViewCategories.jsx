import { useState } from "react";
import CategoryView from "../../components/CategoryView";
import { getCategories } from "../../services/CategoryService";
import { useEffect } from "react";
import { toast } from "react-toastify";

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
        toast.error("Error in loadig categories from server !!");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      {categories.content.map((category) => {
        return <CategoryView key={category.categoryId} category={category} />;
      })}
    </>
  );
};

export default ViewCategories;
