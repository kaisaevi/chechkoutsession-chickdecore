import { useState } from "react";
import Cart from "../components/Cart";
import LoginForm from "../components/LoginForm";
import Products from "../components/Products";
import RegisterForm from "../components/RegisterForm";
import { useCart } from "../context/CartContext";
import background from "./../images/furniture.jpg";
import { BsCart4 } from "react-icons/bs";

const HomePage = () => {
  const { cart } = useCart();
  const [showCart, setShowCart] = useState(false);

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  return (
    <div>
      <div
        className="min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${background})` }}
      >
        <LoginForm />
        <RegisterForm />
        <button
          className="absolute top-5 right-5 text-white"
          onClick={toggleCart}
        >
          <BsCart4 />
          <span>{cart.length}</span>
        </button>
        {showCart && <Cart />}

        <h1 className="text-9xl text-center flex justify-center items-center h-screen text-white">
          ChicDecor
        </h1>
      </div>
      <Products />
    </div>
  );
};

export default HomePage;
