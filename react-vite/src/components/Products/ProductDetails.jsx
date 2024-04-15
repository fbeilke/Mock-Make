import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleProduct } from '../../redux/products'
import { addCartItemThunk } from '../../redux/session';
import { getAllUsersThunk } from '../../redux/users';
import { NavLink } from 'react-router-dom';
import { reviewsByProduct, createReviewThunk, deleteReviewThunk} from '../../redux/reviews'
import { MdOutlineStarBorder } from "react-icons/md";
import { MdOutlineStar } from "react-icons/md";
import "./ProductDetails.css"

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
    const dispatch = useDispatch();
    const { productId } = useParams();
    const { products } = useSelector(state => state.products)
    const { reviews } = useSelector(state => state.reviews)
    const { user } = useSelector(state => state.session)
    const [displayImageURL, setDisplayImageURL] = useState()
    const { users } = useSelector(state => state.users)

    useEffect(() => {
        dispatch(getSingleProduct(productId))
        dispatch(reviewsByProduct(productId))
        dispatch(getAllUsersThunk())
    }, [dispatch, productId])

    if (!products) return null;
    if (!reviews) return null;
    if (!users) return null;
    console.log('users' , users)

    const singleProduct = products[productId];
    const allProductImages = Object.values(singleProduct.product_images)
    const reviewsArr = Object.values(reviews)
    const usersArr = Object.values(users)

    const addToCart = (product) => {
        const cartProduct = {
            productId: product.id,
            quantity: 1
        }
        dispatch(addCartItemThunk(cartProduct));
    }
    const handleAddReview = (review) => {
        dispatch(createReviewThunk(review));
    }

    // Example delete review function
    const handleDeleteReview = (reviewId) => {
        dispatch(deleteReviewThunk(reviewId));
    }
    let seller
    for(let user of usersArr){
        if(user?.id == singleProduct?.user_id){
            seller = user
        }
    }

    let canReview = true
    if(reviewsArr?.length){
        for(let rev of reviewsArr){
            if(rev?.user_id == user?.id || seller?.id == user?.id){
                canReview = false
            }
        }
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




    return (
        <div className="product-detail-columns">
            <div className="product-detail-left-side">
                <div className="product-detail-images">
                    <div className='detail-all-images'>
                        {allProductImages.map(image => (
                            <img src={image.url} alt={`image ${image.id}`} key={image.id} onClick={() => setDisplayImageURL(image.url)}/>
                        ))}
                    </div>
                    <div>
                        <img src={displayImageURL} alt={`${singleProduct.name}`} className="detail-display-image" />
                    </div>
                </div>
                <div className="product-reviews">
                    <h2>Reviews</h2>
                    {user && canReview && (
                    <button className='new-rev-btn'><NavLink to={`/products/${productId}/review/new`} className='new-rev-txt'>Write a customer review</NavLink></button>
                )}
                { seller?.id == user?.id && <p className="cannot-rev-txt">*You cannot review your own product</p>}

                    {reviews.map(review => (
                        <div key={review.id} className="review">
                            <div className='review-info-container'>
                            <p className='rev-txt rev-name'>{user[(review?.user_id)-1]?.first_name} <span className='review-date-txt'>wrote a review on {formatDateV2(review?.createdAt)}</span></p>
                            <p className='star-rating-icons'>{starsIcon(review?.rating)}</p>
                            <p className='txt review-txt'>{review?.review}</p>
                        </div>

                            <div className="review-content">
                                <span>{review.rating} stars</span>
                                <p>{review.content}</p>
                            </div>
                            {/* Check if the current user is the author of the review */}
                            {user.id === review.user_id && (
                                <div className="review-actions">
                                    <button onClick={() => handleDeleteReview(review.id)}>Delete</button>
                                </div>
                            )}
                        </div>
                    ))}
                    {/* Add review form - only show if the user can review */}
                    {user && !reviews.some(r => r.user_id === user.id) && (
                        <form onSubmit={handleAddReview}>
                            {/* Your review form inputs */}
                            <button type="submit">Submit Review</button>
                        </form>
                    )}
                </div>
            </div>
            <div className="product-details-right-side">
                {singleProduct.vendor_id !== user.id ? null :
                    <div className="vendor-control-buttons">
                            <button>Update Listing</button>
                            <button>Delete Listing</button>
                    </div>
                }
                <h2>${singleProduct.price}</h2>
                <p>{singleProduct.name}</p>
                <span>TODO: add product vendor name</span>
                <span>·</span>
                <span>TODO: add reviews stars</span>
                {singleProduct.vendor_id === user.id ? null :
                <p>
                    <button onClick={() => addToCart(singleProduct)}>Add to cart</button>
                    <button>Add to wishlist</button>
                </p>
                }
                <p>{singleProduct.description}</p>
                <p>
                    <button>Contact Seller</button>
                </p>
            </div>
        </div>
    )
}
