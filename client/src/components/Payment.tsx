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

      const response = await axios.post(
        "http://localhost:3000/api/payments/create-checkout-session",
        {
          cart: products.flatMap((product) => [product]),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
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
    <div className="flex">
      <button
        className="bg-medium-dark-blue text-white p-2 rounded-md border mb-4 mx-auto"
        onClick={handlePayment}
      >
        Purchase Cart
      </button>
    </div>
  );
};

export default Payment;
