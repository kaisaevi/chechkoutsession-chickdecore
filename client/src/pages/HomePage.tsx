import LoginForm from "../components/LoginForm";
import Products from "../components/Products";
import RegisterForm from "../components/RegisterForm";
import background from "./../images/furniture.jpg";

const HomePage = () => {
  return (
    <div>
      <div
        className="min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${background})` }}
      >
        <LoginForm />
        <RegisterForm />

        <h1 className="text-9xl text-center flex justify-center items-center h-screen text-white">
          ChicDecor
        </h1>
      </div>
      <Products />
    </div>
  );
};

export default HomePage;
