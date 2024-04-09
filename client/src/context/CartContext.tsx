import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  default_price: {
    unit_amount: number;
  };
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface ICartContext {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeItemFromCart: (productId: string) => void;
  removeProductFromCart: (productId: strin) => void;
}

const initialValues = {
  cart: [],
  addToCart: () => {},
  removeItemFromCart: () => {},
  removeProductFromCart: () => {},
};

const CartContext = createContext<ICartContext>(initialValues);
export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }: PropsWithChildren) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const lsData = localStorage.getItem("cart");
    return lsData ? JSON.parse(lsData) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    const clonedCart = [...cart];

    const productAlreadyExists = clonedCart.find(
      (item) => item.product.id === product.id
    );

    if (productAlreadyExists) {
      productAlreadyExists.quantity++;
      setCart(clonedCart);
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const removeItemFromCart = (productId: string) => {
    const updatedCart = cart.filter((item) => item.product.id !== productId);
    setCart(updatedCart);
  };

  const removeProductFromCart = (productId: string) => {
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(
      (item) => item.product.id === productId
    );

    if (productIndex !== -1) {
      updatedCart[productIndex].quantity--;
    }

    if (updatedCart[productIndex].quantity <= 0) {
      updatedCart.splice(productIndex, 1);
    }
    setCart(updatedCart);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeItemFromCart, removeProductFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
