import { Button } from "react-bootstrap";
import Base from "../components/Base";
import { toast } from "react-toastify";

function Index() {
  const showSuccessToast = () => {
    // toast("Success");
    toast.success("This is success message !!");
    // toast.success("This is success message !!", {
    //   position: "bottom-center",
    //   theme: "dark",
    // });

    toast.error("This is error message !!");
    toast.warning("This is warning message !!");
  };

  return (
    <Base
      title="Shop what you need"
      description={
        "Welcome to Trending Store, We provide best items as you need."
      }
      buttonEnabled={true}
      buttonText="Start Shopping"
      buttonType="primary"
    >
      <h1>Working on home page</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut non dolorum
        error? Veritatis cum magni, minima doloribus ipsa inventore numquam
        dignissimos tenetur velit temporibus incidunt, adipisci fuga illum
        dolorem iusto dolor architecto obcaecati laudantium error! Earum
        voluptas quis repudiandae recusandae! Cum quisquam vero, quasi deleniti
        provident ea totam pariatur odit.
      </p>
      <Button variant="success" onClick={showSuccessToast}>
        Toastify Success
      </Button>
    </Base>
  );
}

export default Index;
