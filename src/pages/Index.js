import { useState } from "react";
import Base from "../components/Base";
import {
  contactForm,
  infoWithImageInLeftSection,
  infoWithImageInRightSection,
  trendingProducts,
} from "./HomePageComponents";

function Index() {
  const [products, setProducts] = useState([
    {
      addedDate: "2023-10-28T13:52:58.441Z",
      category: {
        categoryId: "string",
        coverImage: "string",
        description: "string",
        title: "Monitor",
      },
      description: "string",
      discountedPrice: 7000,
      live: true,
      price: 12000,
      productId: "string",
      productImageName:
        "https://rukminim2.flixcart.com/image/312/312/ko8xtow0/monitor/t/a/y/d24-20-66aekac1in-lenovo-original-imag2qwzazcdmqtb.jpeg?q=70",
      quantity: 0,
      stock: true,
      title: "Lenovo 23.8 inch Full HD VA",
    },
    {
      addedDate: "2023-10-28T13:52:58.441Z",
      category: {
        categoryId: "string",
        coverImage: "string",
        description: "string",
        title: "Watch",
      },
      description: "string",
      discountedPrice: 450,
      live: true,
      price: 700,
      productId: "string",
      productImageName:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/watch/7/0/w/3-gl-225-combo-of-3-black-blue-red-hala-girls-original-imagp4gmu4h8ggkq.jpeg?q=70",
      quantity: 0,
      stock: true,
      title: "Black Dial Silicon Strap Digital Watch",
    },
    {
      addedDate: "2023-10-28T13:52:58.441Z",
      category: {
        categoryId: "string",
        coverImage: "string",
        description: "string",
        title: "Shirt",
      },
      description: "string",
      discountedPrice: 300,
      live: true,
      price: 800,
      productId: "string",
      productImageName:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/sweatshirt/a/z/b/m-men-hd-sweatshirt-black-being-wanted-original-imaghckfbhzfzquu.jpeg?q=70",
      quantity: 0,
      stock: true,
      title: "Men Full Sleeve Solid Hooded Sweatshirt",
    },
  ]);

  return (
    <Base
      title="Shop what you need"
      description={
        "Welcome to Trending Store, We provide best items as you need."
      }
      buttonEnabled={true}
      buttonText="Start Shopping"
      buttonType="primary"
      buttonLink="/store"
    >
      <div className="my-4">{trendingProducts(products)}</div>

      <div style={{ margin: "100px 0px" }}>
        {infoWithImageInRightSection(
          "https://random.imagecdn.app/500/150",
          "Lorem ipsum dolor sit amet.",
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius quia voluptatum ea nisi quibusdam expedita placeat facere voluptate est quidem."
        )}
      </div>

      <div style={{ margin: "100px 0px" }}>
        {infoWithImageInLeftSection(
          "https://random.imagecdn.app/500/150",
          "Lorem ipsum dolor sit amet.",
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius quia voluptatum ea nisi quibusdam expedita placeat facere voluptate est quidem."
        )}
      </div>

      <div className="my-4">{contactForm()}</div>

      <div style={{ margin: "100px 0px" }}>
        {infoWithImageInRightSection(
          "https://random.imagecdn.app/500/150",
          "Lorem ipsum dolor sit amet.",
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius quia voluptatum ea nisi quibusdam expedita placeat facere voluptate est quidem."
        )}
      </div>
    </Base>
  );
}

export default Index;
