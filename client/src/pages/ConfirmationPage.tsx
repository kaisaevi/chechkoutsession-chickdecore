import axios from "axios";
import { useEffect, useState } from "react";

const ConfirmationPage = () => {
  const [verified, setVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      console.log("hejhej");
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

  return (
    <div>
      <h3>
        {isLoading
          ? "Loading..."
          : verified
          ? "Tack för ditt köp!"
          : "Betalningen är inte verifierad."}
      </h3>
    </div>
  );
};

export default ConfirmationPage;
