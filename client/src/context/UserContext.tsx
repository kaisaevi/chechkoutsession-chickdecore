import axios from "axios";
import { PropsWithChildren, createContext, useContext, useState } from "react";

export interface IUser {
  name: string;
  email: string;
}

interface IUserContext {
  user: IUser | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const initialValues: IUserContext = {
  user: null,
  isLoggedIn: false,
  login: async () => {},
  logout: () => {},
};

const UserContext = createContext<IUserContext>(initialValues);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (email: string, password: string) => {
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
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setUser(response.data);
        setIsLoggedIn(true);
        localStorage.setItem("user", JSON.stringify(response.data));
      } else {
        console.error("Failed to log in:", response);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

// import { PropsWithChildren, createContext, useContext, useState } from "react";

// export interface IUser {
//   name: string;
//   email: string;
// }

// interface IUserContext {
//   user: IUser[];
//   isLoggedIn: boolean;
//   login: (userData: IUser) => void;
//   logout: () => void;
// }

// const initialValues: IUserContext = {
//   user: IUser,
//   isLoggedIn: false,
//   login: (userData) => {},
//   logout: () => {},
// };

// const UserContext = createContext<IUserContext>(initialValues);

// export const UserProvider = ({ children }: PropsWithChildren) => {
//   const [user, setUser] = useState<IUser | null>(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const login = (userData) => {
//     setUser(userData);
//     setIsLoggedIn(userData !== null);
//     if (userData !== null) {
//       localStorage.setItem("user", JSON.stringify(userData));
//     } else {
//       localStorage.removeItem("user");
//     }
//   };

//   const logout = () => {
//     setUser([]);
//     setIsLoggedIn(false);
//     localStorage.removeItem("user");
//   };

//   return (
//     <UserContext.Provider value={{ user, isLoggedIn, login, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => useContext(UserContext);
