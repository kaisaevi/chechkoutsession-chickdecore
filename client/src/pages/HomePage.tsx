import Products from "../components/Products";
import Payment from "../components/Payment";

const HomePage = () => {
  return (
    <div>
      <h3>Shop your furnitures here</h3>
      <Payment />
      <Products />
    </div>
  );
};

export default HomePage;
