import axios from "axios";
import { useState } from "react";

const RegisterForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const register = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        {
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
      <input
        type="email"
        placeholder="E-postadress"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-red" onClick={register}>
        Register
      </button>
    </div>
  );
};

export default RegisterForm;
