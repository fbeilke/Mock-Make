import { useState, useContext, createContext } from 'react';

// Create a context for the user wishes
const WishlistContext = createContext();

// Create a provider component for the WishlistContext
export function WishlistProvider({ children }) {
  // State to keep track of wishlist products
  const [wishlistItems, setWishlistItems] = useState([]);

  // Function to add an product to the wishlist
  const addWish = (product) => {
    setWishlistItems(prevItems => [...prevItems, product]);
  };

  // Function to remove an product from the wishlist
  const removeWish = (productId) => {
    setWishlistItems(prevItems => prevItems.filter(product => product.id !== productId));
  };


  return (
    <WishlistContext.Provider value={{ wishlistItems, addWish, removeWish }}>
      {children}
    </WishlistContext.Provider>
  );
}

// Hook to use wishlist context in components
export const useWishlist = () => useContext(WishlistContext);
