import axios from "axios";
import { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<string | null>(null);

  const logIn = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
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

      console.log("Server response:", response.data);

      if (response.status === 200) {
        // Om inloggningen lyckades, spara användaruppgifterna
        console.log("hejhej");
        setUser(response.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setUser(null);
    }
  };

  const logOut = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setUser(null);
      } else {
        console.error("Failed to log out:", response);
      }
    } catch (error) {
      console.error("Error logging out:", error);
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
      <button className="bg-red" onClick={logIn}>
        Logga in
      </button>
      <button className="bg-blue" onClick={logOut}>
        Logga ut
      </button>
      <div>
        <h1>{user ? "Inloggad som " + user : "Utloggad"}</h1>
      </div>
    </div>
  );
};

export default LoginForm;
