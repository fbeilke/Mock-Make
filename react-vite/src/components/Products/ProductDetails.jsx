import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleProduct } from '../../redux/products'
import { addCartItemThunk } from '../../redux/session';
import { addItemToWishlist } from '../../redux/session';
import { getAllUsersThunk } from '../../redux/users';
// import { NavLink } from 'react-router-dom';
import { reviewsByProduct} from '../../redux/reviews'
import { MdOutlineStarBorder } from "react-icons/md";
import { MdOutlineStar } from "react-icons/md";
import ReviewForm from '../ReviewForm/ReviewForm';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import DeleteReview from "../DeleteReview/DeleteReview";
import DeleteProduct from './DeleteProduct';
import { useModal } from "../../context/Modal";
import "./ProductDetails.css"
import ReviewStars from '../ReviewStars/ReviewStars';
import { useCart } from '../../context/CartProvider';


function formatDateV2(date) {
    // Parse the input date string to a Date object
    const parsedDate = new Date(date);
    // Define formatting options
    const options = {
      month: 'long', // Full name of the month
      year: 'numeric' // Numeric year
    };
    // Create a formatter using the Intl.DateTimeFormat API
    const dateFormatter = new Intl.DateTimeFormat('default', options);
    // Format and return the date
    return dateFormatter.format(parsedDate);
}

export default function ProductDetails() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { productId } = useParams();
    const { products } = useSelector(state => state.products)
    const { reviews } = useSelector(state => state.reviews)
    const { users } = useSelector(state => state.users)
    const { user } = useSelector(state => state.session)
    const [displayImageURL, setDisplayImageURL] = useState(null)
    const [showReviewForm, setShowReviewForm] = useState(false);
    const { setModalContent } = useModal();
    const { setIsOpen } = useCart();


    useEffect(() => {
        dispatch(getSingleProduct(productId))
        dispatch(reviewsByProduct(productId))
        dispatch(getAllUsersThunk())
    }, [dispatch, productId])


    if (!products) return null;
    if (!reviews) return null;
    if (!users) return null;
    // const renderDelete = () => {
    //     setDeleteReview(!deleteReview)
    // }

    const singleProduct = products[productId];

    // If the user is not yet loaded into all users state
    if (!users[singleProduct.vendor_id]) return null;

    const allProductImages = Object.values(singleProduct.product_images)
    const reviewsArr = Object.values(reviews)

    const displayableProductImages = allProductImages.length > 5
    ? allProductImages.slice(0, 5)
    : allProductImages;


    const openDeleteModal = (reviewId) => {
        setModalContent(
            <DeleteReview
                reviewId={reviewId}
                onReviewDeleted={() => console.log("Review Deleted!")}
            />
        );
    };

    const addToCart = (product) => {
        const cartProduct = {
            productId: product.id,
            quantity: 1
        }
        dispatch(addCartItemThunk(cartProduct));
        setIsOpen(true);
    }



    function starsIcon(avgRating){
        let filledStar = Math.floor(avgRating) // round avg rating down
        let arr =[1,2,3,4,5]
        let starArr = []
        arr.forEach(i => {
            if( i <= filledStar){
                starArr.push(<MdOutlineStar key={i}/>)
            }
            else{
                starArr.push(<MdOutlineStarBorder key={i}/>)
            }
        })
        return starArr
    }


    const hasReview = reviewsArr.some(review =>
        review?.userId === user?.id);
    return (
        <div className="product-detail-columns">
            <div className="product-detail-left-side">
                <div className="product-detail-images">
                    <div className='detail-all-images'>
                        {displayableProductImages.map(image => (
                            <img src={image.url} alt={`image ${image.id}`} key={image.id} onClick={() => setDisplayImageURL(image.url)} className="thumbnail-image"/>
                        ))}
                    </div>
                    <div>
                        {!displayImageURL ? <img src={displayableProductImages.filter(image => image.preview)[0].url} alt={`${singleProduct.name}`} className="detail-display-image" /> :
                        <img src={displayImageURL} alt={`${singleProduct.name}`} className="detail-display-image" />
                        }
                    </div>
                </div>
                <div className="product-reviews">
                    <h2>Reviews</h2>
                    {user && singleProduct.vendor_id !== user.id && !hasReview && (
                    <button
                        className='new-rev-btn'
                        onClick={() => setShowReviewForm(!showReviewForm)}
                    >
                        Write a customer review
                    </button>
                )}
                {user && singleProduct.vendor_id == user.id && (
                    <p className="cannot-rev-txt">*You cannot review your own product</p>
                )}
                {showReviewForm &&  (
                    <ReviewForm
                        productId={singleProduct.id}
                        buttonText="Submit Review"
                        hideForm={() => setShowReviewForm(false)}
                    />
                )}
                {reviews && (reviewsArr.map(review => (
                        <div key={review?.id} className="review">
                            <div className='review-info-container'>
                            <p className='rev-txt rev-name'>{users[review?.userId]?.firstName} <span className='review-date-txt'>wrote a review on {review && (formatDateV2(review?.createdAt))}</span></p>
                            <p className='star-rating-icons'>{starsIcon(review?.rating)}</p>
                            <div className="review-content">
                                {review?.imageUrl === null ? null :
                                    <img className='review-image' src={review?.imageUrl} alt={review?.imageUrl || "Review Image"} />
                                }
                               <p>{review?.content}</p>
                               {review?.userId === user?.id && (
                            <button onClick={() => openDeleteModal(review?.id)}>
                                Delete Review
                            </button>
                        )}
                            </div>
                        </div>
                        </div>
                    )))}
                </div>
                {/* {user && reviews?.userId === user.id && (
                            <button onClick={() => openDeleteModal(reviews.id)}>
                                Delete Review
                            </button>
                )}
                    {user && reviews?.user_id == user?.id &&(
                        <OpenModalMenuItem
                            className='delbtn'
                            buttonText='Delete'
                            modalComponent={<DeleteReview reviewId={reviews?.id} renderDelete={renderDelete}/>}
                        />
                    )} */}

             </div>
            <div className="product-details-right-side">
                {!user || singleProduct.vendor_id !== user.id ? null :
                    <div className="vendor-control-buttons">
                        <button className='update-product-button' onClick={() => navigate(`/products/${singleProduct.id}/edit`)}>Update Listing</button>
                        <button  className='delete-product-button'>
                            <OpenModalMenuItem itemText="Delete Listing" modalComponent={<DeleteProduct productId={singleProduct.id} />} />
                        </button>
                    </div>
                }
                <h2>${singleProduct.price}</h2>
                <p>{singleProduct.name}</p>
                <div className='product-details-vendor-review-stars'>
                    {users[singleProduct.vendor_id].vendor_name ? <span>{users[singleProduct.vendor_id].vendor_name}</span> :
                    <span>{users[singleProduct.vendor_id].username}</span>
                    }
                    <span>·</span>
                    <ReviewStars reviewsByProductId={Object.values(reviews)} />
                </div>
                {!user || singleProduct.vendor_id === user?.id ? null :
                <p>
                    <button className='product-details-cart-button' onClick={() => addToCart(singleProduct)}>Add to cart</button>
                    <button className='product-details-wishlist-button' onClick={() => {navigate('/wishlist');dispatch(addItemToWishlist(singleProduct.id));}}>Add to wishlist</button>
                </p>
                }
                <p>{singleProduct.description}</p>
            </div>
        </div>
    )
}
