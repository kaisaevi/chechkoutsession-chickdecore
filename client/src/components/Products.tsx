import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { Product } from "../context/CartContext";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(
        "http://localhost:3000/api/products/fetchproducts"
      );
      setProducts(data.data);
      console.log(data.data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {products &&
          products.map((product: Product) => (
            <ProductCard product={product} key={product.id} />
          ))}
      </div>
    </div>
  );
};

export default Products;
