import axios from "axios";

const Payment = () => {
  const handlePayment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/payments/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify([
            { product: "price_1P19lw2MTkrMoli5Dg2RpncV", quantity: 1 },
            { product: "price_1P19ZD2MTkrMoli5EPOgPK44", quantity: 3 },
          ]),
        }
      );
      console.log(response);
      window.location = response.data.url;
    } catch (error) {
      console.error("Error handling payment:", error);
    }
  };
  return (
    <div>
      <button onClick={handlePayment}>Pengar</button>
    </div>
  );
};

export default Payment;
