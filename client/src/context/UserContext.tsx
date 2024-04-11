import { PropsWithChildren, createContext, useContext, useState } from "react";

export interface IUser {
  name: string;
  email: string;
}

interface IUserContext {
  user: IUser;
  isLoggedIn: boolean;
  login: (userData: IUser) => void;
  logout: () => void;
}

const initialValues: IUserContext = {
  user: IUser[],
  isLoggedIn: false,
  login: (userData) => {},
  logout: () => {},
};

const UserContext = createContext<IUserContext>(initialValues);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (userData) => { 
    setUser(userData);
    setIsLoggedIn(userData !== null); 
    if (userData !== null) {
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      localStorage.removeItem("user");
    }
  };
  

  const logout = () => {
    setUser([]);
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
