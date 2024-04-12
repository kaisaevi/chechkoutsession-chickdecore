import { useState } from "react";
import { useUser } from "../context/UserContext";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login, logout, isLoggedIn } = useUser();
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleLogin = async () => {
    await login(email, password);
    setEmail("");
    setPassword("");
  };

  const handleLogout = () => {
    logout();
  };

  const handleShowLoginFormClick = () => {
    if (!isLoggedIn) {
      setShowLoginForm(!showLoginForm);
    } else {
      logout();
    }
  };

  const handleHideLoginFormClick = () => {
    setShowLoginForm(false);
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      {!isLoggedIn && (
        <>
          {showLoginForm && (
            <div>
              <input
                className="py-2 px-4 mb-4 leading-tight mx-3"
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="py-2 px-4 mb-4 leading-tight"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="ml-3 text-blue" onClick={handleLogin}>
                LOGIN
              </button>
              <button
                className="m-3 text-red"
                onClick={handleHideLoginFormClick}
              >
                CANCEL
              </button>{" "}
            </div>
          )}
          {!showLoginForm && (
            <button
              className="text-white m-4 text-lg hover:text-blue"
              onClick={handleShowLoginFormClick}
            >
              {showLoginForm ? "" : "LOGIN"}
            </button>
          )}
        </>
      )}
      {!showLoginForm && isLoggedIn && (
        <div>
          <button onClick={handleLogout}>LOGOUT</button>
        </div>
      )}
    </div>
  );
};
export default LoginForm;
