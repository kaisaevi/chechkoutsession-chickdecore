import axios from "axios";
import { useState } from "react";

const RegisterForm = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showRegisterForm, setShowRegisterForm] = useState(false);

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

  const handleRegisterButtonClick = () => {
    setShowRegisterForm(true);
  };

  const handleCancelClick = () => {
    setShowRegisterForm(false);
    // Reset form fields
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      {!showRegisterForm && (
        <button
          className="m-4 text-white text-lg hover:text-blue"
          onClick={handleRegisterButtonClick}
        >
          REGISTER
        </button>
      )}

      {showRegisterForm && (
        <div className="">
          <input
            type="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-2 block border rounded-md px-3 py-2"
          />
          <input
            type="email"
            placeholder="E-mail address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-2 block border rounded-md px-3 py-2"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-2 block border rounded-md px-3 py-2"
          />
          <div className="">
            <button
              className="text-blue px-4 py-2 rounded-md"
              onClick={register}
            >
              REGISTER
            </button>
            <button
              className="text-red px-4 py-2 rounded-md"
              onClick={handleCancelClick}
            >
              CANCEL
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
