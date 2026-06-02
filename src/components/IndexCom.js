import imageFile from "../styles/images/img.jpg";
import { StyleContentBlock, StyleContentWrap } from "./common/StyleContent";
import {
  ProductContext,
  ProductImg,
  ProductList,
  ProductListBox,
  ProductName,
  ProductPrice,
  ProductTitle,
} from "./common/StyleProduct";

const products = [
  {
    id: 1,
    name: "멋진 사진",
    context: "화려하고 멋있고 아름답고...등등",
    price: "5000원",
    url: imageFile,
  },
  {
    id: 2,
    name: "멋진 사진",
    context: "화려하고 멋있고 아름답고...등등",
    price: "5000원",
    url: imageFile,
  },
  {
    id: 3,
    name: "멋진 사진",
    context: "화려하고 멋있고 아름답고...등등",
    price: "5000원",
    url: imageFile,
  },
  {
    id: 4,
    name: "멋진 사진",
    context: "화려하고 멋있고 아름답고...등등",
    price: "5000원",
    url: imageFile,
  },
  {
    id: 5,
    name: "멋진 사진",
    context: "화려하고 멋있고 아름답고...등등",
    price: "5000원",
    url: imageFile,
  },
  {
    id: 6,
    name: "멋진 사진",
    context: "화려하고 멋있고 아름답고...등등",
    price: "5000원",
    url: imageFile,
  },
  {
    id: 7,
    name: "멋진 사진",
    context: "화려하고 멋있고 아름답고...등등",
    price: "5000원",
    url: imageFile,
  },
  {
    id: 8,
    name: "멋진 사진",
    context: "화려하고 멋있고 아름답고...등등",
    price: "5000원",
    url: imageFile,
  },
  {
    id: 9,
    name: "멋진 사진",
    context: "화려하고 멋있고 아름답고...등등",
    price: "5000원",
    url: imageFile,
  },
  {
    id: 10,
    name: "멋진 사진",
    context: "화려하고 멋있고 아름답고...등등",
    price: "5000원",
    url: imageFile,
  },
];

const IndexCom = () => {
  return (
    <>
          <ProductTitle>상품 제목~</ProductTitle>
          <ProductList>
            {products.map((pro) => (
              <ProductListBox key={pro.id}>
                <ProductImg src={pro.url} alt="" />
                <ProductName>{pro.name}</ProductName>
                <ProductContext>{pro.context}</ProductContext>
                <ProductPrice>{pro.price}</ProductPrice>
              </ProductListBox>
            ))}
          </ProductList>
    </>
  );
};
export default IndexCom;
