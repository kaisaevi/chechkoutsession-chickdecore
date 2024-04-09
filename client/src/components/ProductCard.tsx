import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  return (
    <div className="border">
      <h4 className="text-3xl">{product.name}</h4>
      <p>{product.description}</p>
      <p>
        {(product.default_price.unit_amount / 100).toLocaleString("sv-SE", {
          style: "currency",
          currency: "SEK",
        })}
      </p>
      <img className="w-40 h-40" src={product.images} alt={product.name} />
      <button
        onClick={() => addToCart(product)}
        className="border-2 drop-shadow-2xl p-2 rounded hpver:bg-green-300"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
