// import Products from "../components/Products";
import Payment from "../components/Payment";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const HomePage = () => {
  return (
    <div>
      <h3>Shop your furnitures here</h3>
      <Payment />
      <LoginForm />
      <RegisterForm />
      {/* <Products /> */}
    </div>
  );
};

export default HomePage;
