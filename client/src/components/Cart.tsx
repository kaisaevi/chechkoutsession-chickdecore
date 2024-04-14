import { useCart } from "../context/CartContext";
import { IoIosAddCircle } from "react-icons/io";
import { IoMdRemoveCircle } from "react-icons/io";
import Payment from "./Payment";
import { useUser } from "../context/UserContext";
import { TiDelete } from "react-icons/ti";
import { useState } from "react";
import axios from "axios";

const Cart = ({ closeCart }) => {
  const { cart } = useCart();
  const { removeItemFromCart } = useCart();
  const { addToCart } = useCart();
  const { removeProductFromCart } = useCart();
  const { isLoggedIn } = useUser();
  const [isVerified, setIsVerified] = useState<Boolean>(false);
  const [promotionCode, setPromotionCode] = useState("");

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

  const handlePromotionCodeChange = (e) => {
    setPromotionCode(e.target.value);
  };

  const handlePromotionCodeVerification = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/payments/get-active-coupons",
        {
          promotionCode: promotionCode,
        }
      );
      const promotionCodes = response.data.promotionCodes.data;

      const isValid = promotionCodes.find(
        (code) => code.name === promotionCode.toUpperCase()
      );

      if (isValid) {
        setIsVerified(true);
      } else {
        setIsVerified(false);
      }
    } catch (error) {
      console.error("Error verifying promotion code:", error);
    }
  };

  return (
    <div className="fixed right-0 top-0 bg-blue-100 h-screen w-40 bg-dark-blue overflow-y-auto">
      <button onClick={closeCart} className="text-white m-3">
        <TiDelete />
      </button>
      <h1 className="text-white font-bold text-2xl text-center p-3">Cart</h1>
      <ul>
        {cart.map((item, index) => {
          const price =
            (item.product.default_price.unit_amount * item.quantity) / 100;
          const formattedPrice = price.toLocaleString("sv-SE", {
            style: "currency",
            currency: "SEK",
          });
          return (
            <li
              key={index}
              className="text-3xl font-bold border border-medium-dark-blue p-4 mx-auto"
            >
              <div className="flex text-sm flex-col text-blue">
                {item.product.name} x {item.quantity}{" "}
                <div className="">Price {formattedPrice} </div>
                <div className="p-5">
                  <img src={item.product.images} alt={item.product.name} />
                </div>
                <div className="flex mx-auto">
                  <IoIosAddCircle
                    className="w-7 h-5 m-2 text-light-blue"
                    onClick={() => addToCart(item.product)}
                  />
                  <IoMdRemoveCircle
                    className="w-7 m-2 h-5 text-light-blue"
                    onClick={() => removeProductFromCart(item.product.id)}
                  />
                </div>
              </div>
              <button
                className="text-sm border text-blue p-2 rounded-md"
                onClick={() => removeItemFromCart(item.product.id)}
              >
                Delete Item
              </button>
            </li>
          );
        })}
      </ul>
      <label htmlFor="promotionCode">Promotion Code?</label>
      <input
        type="text"
        id="promotionCode"
        value={promotionCode}
        onChange={handlePromotionCodeChange}
      />
      <button onClick={handleApplyDiscount}>Apply</button>
      <p className="text-xl font-bold ml-4 text-white mb-5">
        Total: {calculateTotalPrice()}
      </p>
      {isLoggedIn ? <Payment /> : ""}
    </div>
  );
};

export default Cart;
