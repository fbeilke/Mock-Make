import { useState, useContext, createContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <CartContext.Provider value={{isOpen, setIsOpen}}>
        {children}
      </CartContext.Provider>
    </>
  );
}

export const useCart = () => useContext(CartContext);