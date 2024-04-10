import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import background from "./../images/furniture.jpg";

const HomePage = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <h1 className="text-9xl text-center flex justify-center items-center h-screen text-white">
        ChicDecor
      </h1>

      <LoginForm />
      <RegisterForm />
    </div>
  );
};

export default HomePage;
