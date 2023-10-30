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
        title: "Techie Sabeer",
      },
      description: "string",
      discountedPrice: 5000,
      live: true,
      price: 6000,
      productId: "string",
      productImageName: "string",
      quantity: 0,
      stock: true,
      title: "Product title",
    },
    {
      addedDate: "2023-10-28T13:52:58.441Z",
      category: {
        categoryId: "string",
        coverImage: "string",
        description: "string",
        title: "Techie Sabeer",
      },
      description: "string",
      discountedPrice: 5000,
      live: true,
      price: 6000,
      productId: "string",
      productImageName: "string",
      quantity: 0,
      stock: true,
      title: "Product title",
    },
    {
      addedDate: "2023-10-28T13:52:58.441Z",
      category: {
        categoryId: "string",
        coverImage: "string",
        description: "string",
        title: "Techie Sabeer",
      },
      description: "string",
      discountedPrice: 5000,
      live: true,
      price: 6000,
      productId: "string",
      productImageName: "string",
      quantity: 0,
      stock: true,
      title: "Product title",
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
