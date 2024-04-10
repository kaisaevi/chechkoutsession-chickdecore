import Products from "../components/Products";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const HomePage = () => {
  return (
    <div>
      <LoginForm />
      <RegisterForm />
      <Products />
    </div>
  );
};

export default HomePage;
