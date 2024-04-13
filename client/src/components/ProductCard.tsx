import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  return (
    <div className="border border-medium-dark-blue p-5 rounded-md shadow-xl items-center flex flex-col m-4">
      <h4 className="text-3xl text-white mb-4">{product.name}</h4>
      <p className="text-dark-blue">{product.description}</p>
      <p className="text-white">
        {(product.default_price.unit_amount / 100).toLocaleString("sv-SE", {
          style: "currency",
          currency: "SEK",
        })}
      </p>
      <img
        className="w-100 h-100 m-4"
        src={product.images}
        alt={product.name}
      />
      <button
        onClick={() => addToCart(product)}
        className="border-2 drop-shadow-2xl p-2 rounded-md text-dark-blue mt-3"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
