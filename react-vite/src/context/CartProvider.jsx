import { useRef, useState, createContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const cartRef = useRef();
  const [cartContent, setCartContent] = useState(null);
  // callback function that will be called when cart is closing
  const [onCartClose, setOnCartClose] = useState(null);

  const closeCart = () => {
    setCartContent(null); // clear the cart contents
    // If callback function is truthy, call the callback function and reset it
    // to null:
    if (typeof onCartClose === 'function') {
      setOnCartClose(null);
      onCartClose();
    }
  };

  const contextValue = {
    cartRef, // reference to cart div
    cartContent, // React component to render inside cart
    setCartContent, // function to set the React component to render inside cart
    setOnCartClose, // function to set the callback function called when cart is closing
    closeCart // function to close the cart
  };

  return (
    <>
      <CartContext.Provider value={contextValue}>
        {children}
      </CartContext.Provider>
      <div ref={cartRef} />
    </>
  );
}

export const useCart = () => useContext(CartContext);