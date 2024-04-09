import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import CartProvider from "../context/CartContext";

const Layout = () => {
  return (
    <div className="">
      <>
        <CartProvider>
          <Header />
          <main className="bg-beige flex-grow">
            <Outlet />
          </main>
        </CartProvider>
      </>
    </div>
  );
};

export default Layout;
