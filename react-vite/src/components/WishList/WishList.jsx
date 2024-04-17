import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from '../../redux/products';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { useWishlist } from '../../context/UserWishes';
import { Link } from 'react-router-dom';
import WishlistItem from "../WishListItem";
// import './Wishlist.css';

function Wishlist() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const products = useSelector(state => state.products.products);
    const wishlist = useSelector(state => state.session.wishlist);
    const { isOpen, setIsOpen } = useWishlist();

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    if (!sessionUser) return null; // Only display wishlist if a user is logged in

    return (
        <div id="wishlist-container">

            {isOpen ? <FaAngleRight size={20} onClick={() => setIsOpen(false)} />
                   : <FaAngleLeft size={20} onClick={() => setIsOpen(true)} />
            }
            <div id="wishlist" className={isOpen ? 'visible' : 'hidden'}>
                {isOpen ?
                    <>
                        <h3>Wishlist</h3>
                        <div className="wishlist-contents">
                            {Object.entries(wishlist).map(([id, item]) => (
                                <WishlistItem key={id} product={products?.[id]} />
                            ))}
                        </div>
                        { Object.keys(wishlist).length
                            ? <Link to="/wishlist-detail">Go to Wishlist</Link>
                            : <p>No items added yet...</p>
                        }
                    </>
                : null
                }
            </div>
        </div>
    );
}

export default Wishlist;
