import { Button } from "react-bootstrap";
import { BsFillPencilFill } from "react-icons/bs";
import { GrFormView } from "react-icons/gr";
import { MdDelete } from "react-icons/md";

const SingleProductView = ({ index, product }) => {
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

  return (
    <tr className={getBackgroundForProduct()}>
      <td className="px-3 small">{index + 1}</td>
      <td className="px-3 small">{product.title}</td>
      <td className="px-3 small">{product.quantity}</td>
      <td className="px-3 small">{product.price}</td>
      <td className="px-3 small">{product.discountedPrice}</td>
      <td className="px-3 small">{product.live ? "True" : "False"}</td>
      <td className="px-3 small">{product.stock ? "True" : "False"}</td>
      <td className="px-3 small">
        {product.category ? product.category.title : ""}
      </td>
      <td className="px-3 small">{formatDate(product.addedDate)}</td>
      <td className="px-3 small d-flex table-light">
        <Button variant="warning" size="sm">
          <GrFormView />
        </Button>
        <Button className="ms-2" variant="dark" size="sm">
          <BsFillPencilFill />
        </Button>
        <Button className="ms-2" variant="danger" size="sm">
          <MdDelete />
        </Button>
      </td>
    </tr>
  );
};

export default SingleProductView;
