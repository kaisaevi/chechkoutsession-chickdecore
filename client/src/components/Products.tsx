import { useEffect, useState } from "react";
import AddToCartButton from "./AddToCartButton";
import axios from "axios";

const Products = () => {
  interface Product {
    id: string;
    name: string;
    description: string;
    price: string;
    image: string;
  }

  const [products, setProducts] = useState<Product[]>([]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:3000/api/products/fetchproducts",
  //         { timeout: 10000 }
  //       );
  //       setProducts(response.data);
  //       console.log(products);
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     }
  //   };
  //   fetchProducts();
  // }, []);

  return (
    <>
      <div>
        <ul>
          {/* {products.map((product) => (
            <li key={product.id}>
              <img src={product.image} alt={product.name} />
              <h4>{product.name}</h4>
              <p>{product.description}</p>
              <p>Price: {product.price}</p>
            </li>
          ))} */}
        </ul>
        <AddToCartButton />
      </div>
    </>
  );
};

export default Products;
