import { Outlet } from "react-router-dom";
// import Header from "../components/Header";
import CartProvider from "../context/CartContext";
import { UserProvider } from "../context/UserContext";
// import { UserProvider } from "../context/UserContext";

const Layout = () => {
  return (
    <div className="">
      <>
        <UserProvider>
          <CartProvider>
            {/* <Header /> */}
            <main className="bg-beige flex-grow">
              <Outlet />
            </main>
          </CartProvider>
        </UserProvider>
      </>
    </div>
  );
};

export default Layout;
