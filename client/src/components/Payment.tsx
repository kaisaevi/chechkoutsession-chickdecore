import axios from "axios";
import { useCart } from "../context/CartContext";

const Payment = () => {
  const { cart } = useCart();

  const handlePayment = async () => {
    try {
      const products = cart.map((item) => ({
        product: item.product.default_price.id,
        quantity: item.quantity,
      }));

      console.log("!!!!!!!!products:", products);

      const response = await axios.post(
        "http://localhost:3000/api/payments/create-checkout-session",
        {
          cart: products.flatMap((product) => [product]),

          // { product: "price_1P19lw2MTkrMoli5Dg2RpncV", quantity: 1 },
          // { product: "price_1P19ZD2MTkrMoli5EPOgPK44", quantity: 3 },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      localStorage.setItem(
        "sessionId",
        JSON.stringify(response.data.sessionId)
      );
      window.location = response.data.url;
    } catch (error) {
      console.error("Error handling payment:", error);
    }
  };
  return (
    <div>
      <button className="bg-slate-600 border" onClick={handlePayment}>
        Purchase Cart
      </button>
    </div>
  );
};

export default Payment;
