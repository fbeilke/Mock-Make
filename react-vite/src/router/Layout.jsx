import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import Cart from "../components/Cart";
import Navigation from "../components/Navigation/Navigation";
import Footer from "../components/Footer";
import { CartProvider } from "../context/CartProvider";
import { WishlistProvider } from "../context/UserWishes";

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <ModalProvider>
       <WishlistProvider>
        <CartProvider>
          <Navigation />
          <Cart />
          {isLoaded && <Outlet />}
          {isLoaded &&<Footer/>}
          <Modal />
        </CartProvider>
       </WishlistProvider>
      </ModalProvider>
    </>
  );
}
