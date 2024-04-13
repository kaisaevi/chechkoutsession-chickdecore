import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ConfirmationPage = () => {
  const [verified, setVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { clearCart } = useCart();

  useEffect(() => {
    const verifySession = async () => {
      try {
        console.log("Startar verifiering...");
        let sessionId;
        const dataFromLs = localStorage.getItem("sessionId");

        if (dataFromLs) {
          sessionId = JSON.parse(dataFromLs);
        }

        const response = await axios.post(
          "http://localhost:3000/api/payments/checkout-success",
          { sessionId },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data && response.data.verified) {
          console.log("Betalningen är verifierad!");
          setVerified(true);
          clearCart();
        } else {
          console.log("Betalningen är inte verifierad.");
        }
      } catch (error) {
        console.error("Fel uppstod vid verifiering:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!verified) {
      verifySession();
    }
  }, [verified]);

  useEffect(() => {
    if (verified) {
      localStorage.removeItem("sessionId");
    }
  }, [verified]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h3 className="mb-4">
          {isLoading
            ? "Loading..."
            : verified
            ? "Thank you for your purchase!"
            : "Payment is not verified."}
        </h3>
        <NavLink to={"/"}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Take me to homepage
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default ConfirmationPage;
