import { Button } from "react-bootstrap";
import Base from "../components/Base";
import { toast } from "react-toastify";
import axios from "axios";

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

  const getDataFromServer = () => {
    toast.info("Getting data from server");
    const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtc2FiZWVyaHVzc2FpbjAwN0BnbWFpbC5jb20iLCJpYXQiOjE2OTYxNTA0MjAsImV4cCI6MTY5NjE2ODQyMH0.njlyU26NNyzhnuMpo_KQVGiTRD22H18cftm4oGN4uMgtIyR-K9EwvHqEbMfWJco33KqMcLyRFqHl1ITcdabuyQ";
    const header = `Authorization: Bearer ${token}`;
    axios
    // .get("https://jsonplaceholder.typicode.com/posts")
    .get("http://localhost:9090/users", {headers: header})
    .then((response) => {
      console.log(response.data);
      toast.success("request done");
    })
    .catch((error)=>{
      console.log(error);
      toast.error("something went wrong")
    });
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
      <Button variant="primary" onClick={getDataFromServer}>
        Get data from Fake API
      </Button>
    </Base>
  );
}

export default Index;
