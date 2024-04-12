import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login, logout, isLoggedIn, user } = useUser();

  const handleLogin = async () => {
    await login(email, password);
    setEmail;
    setPassword;
  };

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <p>Du är inloggad som: {user?.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default LoginForm;

// import axios from "axios";
// import { useState } from "react";

// const LoginForm = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [user, setUser] = useState<string | null>(null);
//   const [showLoginForm, setShowLoginForm] = useState(false);

//   const logIn = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:3000/api/auth/login",
//         {
//           email: email,
//           password: password,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       );

//       console.log("Server response:", response.data);

//       if (response.status === 200) {
//         setUser(response.data);
//         setShowLoginForm(false);
//       } else {
//         setUser(null);
//       }
//     } catch (error) {
//       console.error("Error logging in:", error);
//       setUser(null);
//     }
//   };

//   const logOut = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:3000/api/auth/logout",
//         {},
//         {
//           withCredentials: true,
//         }
//       );

//       if (response.status === 200) {
//         setUser(null);
//       } else {
//         console.error("Failed to log out:", response);
//       }
//     } catch (error) {
//       console.error("Error logging out:", error);
//     }
//   };

//   return (
//     <div>
//       {!user && (
//         <button className="bg-red" onClick={() => setShowLoginForm(true)}>
//           Logga in
//         </button>
//       )}
//       {user && (
//         <button className="bg-blue" onClick={logOut}>
//           Logga ut
//         </button>
//       )}
//       {showLoginForm && (
//         <div>
//           <input
//             type="email"
//             placeholder="E-postadress"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button className="bg-green" onClick={logIn}>
//             Logga in
//           </button>
//         </div>
//       )}
//       <div>
//         <h1>{user ? "Inloggad som " + user : "Utloggad"}</h1>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;
