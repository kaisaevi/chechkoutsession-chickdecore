import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { Product } from "../context/CartContext";
import Cart from "./Cart";

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
    <section className="flex flex-wrap justify-center items-center gap-20 p-10 pr-96">
      <div className="">
        <h2 className="text-3xl font-semibold text-gray">Products</h2>
      </div>
      <div className="">
        {products &&
          products.map((product: Product) => (
            <ProductCard product={product} key={product.id} />
          ))}
      </div>
      <Cart />
    </section>
  );
};

export default Products;
