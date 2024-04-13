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

  const closeCart = () => {
    setShowCart(false);
  };

  return (
    <div>
      <div
        className="min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="flex">
          <LoginForm />
          <RegisterForm />
        </div>
        <button
          className="absolute top-5 right-5 text-white flex items-center"
          onClick={toggleCart}
        >
          <BsCart4 className="hover:text-blue w-12 h-12 " />
          {cart.length > 0 && <span className="ml-4">{cart.length}</span>}
        </button>
        {showCart && <Cart closeCart={closeCart} />}

        <h1
          className="text-9xl text-center flex justify-center items-center h-screen text-white"
          style={{ color: "white" }}
        >
          ChicDecor
        </h1>
      </div>
      <Products />
    </div>
  );
};

export default HomePage;
