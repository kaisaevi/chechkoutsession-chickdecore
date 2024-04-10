import axios from "axios";
import { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);

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
        setUser(response.data);
        setShowLogin(false);
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
      {/* Logga in knapp */}
      {!user && (
        <button className="bg-red" onClick={() => setShowLogin(true)}>
          Logga in
        </button>
      )}

      {/* Logga ut knapp */}
      {user && (
        <button className="bg-blue" onClick={logOut}>
          Logga ut
        </button>
      )}

      {/* Användarstatus */}
      <div>
        <h1>{user ? "Inloggad som " + user : "Utloggad"}</h1>
      </div>

      {/* Popup för inloggning */}
      {showLogin && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-4 rounded-md">
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
                className="bg-blue text-white px-4 py-2 rounded-md"
                onClick={logIn}
              >
                Log in
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded-md"
                onClick={() => setShowLogin(false)}
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

export default LoginForm;
