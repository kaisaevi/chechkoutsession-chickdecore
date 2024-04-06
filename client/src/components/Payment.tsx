import axios from "axios";

const Payment = () => {
  const handlePayment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/payments/create-checkout-session",
        {
          cart: [
            { product: "price_1P19lw2MTkrMoli5Dg2RpncV", quantity: 1 },
            { product: "price_1P19ZD2MTkrMoli5EPOgPK44", quantity: 3 },
          ],
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
      <button className="bg-slate-600" onClick={handlePayment}>
        Pengar
      </button>
    </div>
  );
};

export default Payment;
