import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from '../../redux/products';
import { Navigate } from 'react-router-dom';
import WishlistItem from "../WishlistItem/WishlistItem";
import { fetchWishlist } from "../../redux/session";
// import './Wishlist.css';

function Wishlist() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const products = useSelector(state => state.products.products);
    const wishlist = useSelector(state => state.session.wishlist);


    useEffect(() => {
        dispatch(getAllProducts());
        if (sessionUser) {
            dispatch(fetchWishlist(sessionUser.id))
        }
    }, [dispatch, sessionUser]);

    if (!sessionUser || Object.values(sessionUser).length === 0) {
        return <Navigate to='/' replace={true}/>
    }

    if (!products) return null;

    return (
        <div id="wishlist-container">
            <div id="wishlist">
                <h3>Wishlist</h3>
                <div className="wishlist-contents">
                    {wishlist && products && Object.values(wishlist).map(item => (
                        <WishlistItem key={item.productId} product={products[item.productId]} quantity={item.quantity} />
                    ))}
                </div>
                {wishlist && Object.keys(wishlist).length
                    ? null
                    : <p>No items added yet...</p>
                    }
            </div>
        </div>
    );
}

export default Wishlist;
