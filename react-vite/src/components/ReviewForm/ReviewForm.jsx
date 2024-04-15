import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { createReviewThunk, updateReviewThunk } from "../../redux/reviews";
import './ReviewForm.css';
import { MdOutlineStar, MdOutlineStarBorder } from "react-icons/md";
import { getSingleProduct } from "../../redux/products";

function ReviewForm({ review, buttonText }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { productId, reviewId } = useParams();
    const currentUser = useSelector(state => state.session.user);
    const product = useSelector(state => state.products);
    const [rating, setRating] = useState(review?.rating || 0);
    const [hover, setHover] = useState(0);
    const [reviewText, setReviewText] = useState(review?.review);
    const [imageUrl, setImageUrl] = useState(review?.image_url);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        dispatch(getSingleProduct(productId));
        if (review) {
            setRating(review.rating);
            setReviewText(review.review);
            setImageUrl(review.image_url);
        }
    }, [dispatch, productId, review]);

    console.log('aaaaa')
    useEffect(() => {
        const newErrors = {};
        if (!currentUser) {
            navigate('/');
        }
        if (isSubmitting) {
            if (!rating || rating < 1 || rating > 5) {
                newErrors.rating = 'Please provide a rating between 1 and 5 stars.';
            }
            if (!reviewText || reviewText.length < 10) {
                newErrors.minReview = 'Please provide a more detailed review (at least 10 characters).';
            }
            if (reviewText.length > 500) {
                newErrors.maxReview = 'Please keep your review under 500 characters.';
            }
        }
        setErrors(newErrors);
    }, [currentUser, isSubmitting, rating, reviewText, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        if (Object.keys(errors).length === 0) {
            const formData = new FormData();
            formData.append('image_url', imageUrl);
            formData.append('rating', parseInt(rating));
            formData.append('review', reviewText);

            if (!reviewId) {
                await dispatch(createReviewThunk(productId, formData));
            } else {
                await dispatch(updateReviewThunk(reviewId, formData));
            }
            navigate(`/products/${productId}`);
        }
    };

    return (
        <div className='review-form-container'>
            <div className='product-review-container'>
                <img src={product?.image_url} alt={product?.name} className='product-review-img' />
                <p className='product-review-name'>Product: {product?.name}</p>
            </div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className='review-section'>
                    <h2 className='review-heading'>Rating</h2>
                    <div className='rating-field'>
                        {[1, 2, 3, 4, 5].map((star, index) => (
                            <label key={index} className='star-label'>
                                <span
                                    className='star'
                                    onMouseEnter={() => setHover(star)}
                                    onMouseLeave={() => setHover(0)}
                                    onClick={() => setRating(star)}
                                >
                                    {star <= (hover || rating) ? <MdOutlineStar /> : <MdOutlineStarBorder />}
                                </span>
                            </label>
                        ))}
                    </div>
                    {errors.rating && <p className='error-message'>{errors.rating}</p>}
                </div>

                <div className='review-section'>
                    <h2 className='review-heading'>Add a photo</h2>
                    <input
                        type='file'
                        accept="image/*"
                        onChange={(e) => setImageUrl(e.target.files[0])}
                    />
                    {errors.imageUrl && <p className='error-message'>{errors.imageUrl}</p>}
                </div>

                <div className='review-section'>
                    <h2 className='review-heading'>Add a review</h2>
                    <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder='Describe what you liked or disliked about the product...'
                        rows={5}
                        cols={50}
                    />
                    {errors.maxReview && <p className='error-message'>{errors.maxReview}</p>}
                    {errors.minReview && <p className='error-message'>{errors.minReview}</p>}
                </div>

                <button type='submit' className='submit-button'>{buttonText}</button>
            </form>
        </div>
    );
}

export default ReviewForm;
