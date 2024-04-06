import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <div className="">
      <>
        <Navbar />
        <main className="bg-beige flex-grow">
          <Outlet />
        </main>
      </>
    </div>
  );
};

export default Layout;
