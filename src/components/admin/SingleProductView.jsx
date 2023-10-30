import { Button } from "react-bootstrap";
import { BsFillPencilFill } from "react-icons/bs";
import { GrFormView } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { deleteProduct } from "../../services/ProductService";
import { toast } from "react-toastify";

const SingleProductView = ({
  index,
  product,
  updateProductList,
  openProductViewModal,
  openEditProductModal,
}) => {
  const formatDate = (time) => {
    return new Date(time).toLocaleDateString();
  };

  const getBackgroundForProduct = () => {
    // live + stock ===> green ---> table-success
    // live + not stock ===> yellow ---> table-warning
    // not live ===> red ---> table-danger
    if (product.live && product.stock) {
      return "table-success";
    } else if (!product.live) {
      return "table-danger";
    } else if (!product.stock) {
      return "table-warning";
    } else {
    }
  };

  // deleteProduct
  const handleDeleteProduct = (productId) => {
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
        deleteProduct(product.productId)
          .then((data) => {
            console.log(data);
            // Swal.fire("Deleted!", "Product has been deleted.", "success");
            toast.success("Product Deleted");

            updateProductList(productId);
          })
          .catch((error) => {
            console.log(error);
            toast.error("Error in deleting product");
          });
      }
    });
  };

  return (
    <tr className={getBackgroundForProduct()}>
      <td className="px-3 small">{index + 1}</td>
      <td className="px-3 small">{product.title}</td>
      <td className="px-3 small">{product.quantity}</td>
      <td className="px-3 small">{product.price}₹</td>
      <td className="px-3 small">{product.discountedPrice}₹</td>
      <td className="px-3 small">{product.live ? "True" : "False"}</td>
      <td className="px-3 small">{product.stock ? "True" : "False"}</td>
      <td className="px-3 small">
        {product.category ? product.category.title : ""}
      </td>
      <td className="px-3 small">{formatDate(product.addedDate)}</td>
      <td className="px-3 small d-flex table-light">
        {/* view button */}
        <Button
          variant="warning"
          size="sm"
          onClick={(event) => {
            openProductViewModal(event, product);
          }}
        >
          <GrFormView />
        </Button>
        {/* update button */}
        <Button
          className="ms-2"
          variant="dark"
          size="sm"
          onClick={(event) => {
            openEditProductModal(event, product);
          }}
        >
          <BsFillPencilFill />
        </Button>
        {/* delete button */}
        <Button
          className="ms-2"
          variant="danger"
          size="sm"
          onClick={(event) => handleDeleteProduct(product.productId)}
        >
          <MdDelete />
        </Button>
      </td>
    </tr>
  );
};

export default SingleProductView;
