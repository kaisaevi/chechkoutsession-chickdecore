import axios from "axios";
import { useState } from "react";

const RegisterForm = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showRegister, setShowRegister] = useState(false); // State för att visa/dölja popup

  const register = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          name: name,
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Registration successful:", response.data);
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  return (
    <div>
      {/* Register knapp */}
      <button className="bg-red" onClick={() => setShowRegister(true)}>
        Register
      </button>

      {/* Popup för registrering */}
      {showRegister && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-4 rounded-md">
            <input
              type="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mb-2 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
            <input
              type="email"
              placeholder="E-postadress"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-2 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-2 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
            <div className="flex justify-between">
              <button
                className="bg-red text-white px-4 py-2 rounded-md"
                onClick={register}
              >
                Register
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded-md"
                onClick={() => setShowRegister(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
