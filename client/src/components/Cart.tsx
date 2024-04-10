import { useCart } from "../context/CartContext";
import { TiDelete } from "react-icons/ti";
import { IoIosAddCircle } from "react-icons/io";
import Payment from "./Payment";

const Cart = () => {
  const { cart } = useCart();
  const { removeItemFromCart } = useCart();
  const { addToCart } = useCart();
  const { removeProductFromCart } = useCart();

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cart.forEach((item) => {
      totalPrice +=
        (item.product.default_price.unit_amount * item.quantity) / 100;
    });
    return totalPrice.toLocaleString("sv-SE", {
      style: "currency",
      currency: "SEK",
    });
  };

  return (
    <div className="fixed right-0 top-0 bg-blue-100 h-screen w-40">
      <h1 className="text-white font-bold text-2xl">Cart</h1>
      <ul>
        {cart.map((item, index) => {
          const price =
            (item.product.default_price.unit_amount * item.quantity) / 100;
          const formattedPrice = price.toLocaleString("sv-SE", {
            style: "currency",
            currency: "SEK",
          });
          return (
            <li key={index} className="text-3xl font-bold border">
              <div className="flex text-sm flex-col">
                {item.product.name} x {item.quantity} Price {formattedPrice}{" "}
                <div>
                  <img src={item.product.images} alt={item.product.name} />
                </div>
                <div className="flex">
                  <IoIosAddCircle
                    className="w-7"
                    onClick={() => addToCart(item.product)}
                  />
                  <TiDelete
                    className="w-10"
                    onClick={() => removeProductFromCart(item.product.id)}
                  />
                </div>
              </div>
              <button
                className="text-sm border"
                onClick={() => removeItemFromCart(item.product.id)}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
      <p className="text-xl font-bold">Total: {calculateTotalPrice()}</p>
      <Payment />
    </div>
  );
};

export default Cart;
