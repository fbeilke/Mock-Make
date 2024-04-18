import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReviewThunk } from "../../redux/reviews";
import { MdOutlineStar, MdOutlineStarBorder } from "react-icons/md";
import { formDataFromObject } from '../../utils/formDataUtils';
import './ReviewForm.css';
import ImageInput from "../ImageInput/ImageInput";

function ReviewForm({ productId, buttonText, hideForm }) {
    const dispatch = useDispatch();
    const product = useSelector(state => state.products[productId]);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [reviewText, setReviewText] = useState(''); // Changed from review.review to review.content
    const [image, setImage] = useState(null); // This will be the File object for the image
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Validation and error handling can be improved by checking immediately before submitting
    const validate = () => {
        const newErrors = {};
        if (!rating || rating < 1 || rating > 5) {
            newErrors.rating = 'Please provide a rating between 1 and 5 stars.';
        }
        if (!reviewText || reviewText.length < 10) {
            newErrors.minReview = 'Please provide a more detailed review (at least 10 characters).';
        }
        if (reviewText.length > 200) {
            newErrors.maxReview = 'Please keep your review under 200 characters.';
        }
        return newErrors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formErrors = validate();
        setErrors(formErrors);
        hideForm();

        if (Object.keys(formErrors).length === 0) {
            setIsSubmitting(true);

            const payload = {
                content: reviewText,
                rating,
                image
            }

            const formData = formDataFromObject(payload);

            await dispatch(createReviewThunk(productId, formData));
            setIsSubmitting(false);
        }
    };


    if (isSubmitting) return <div>Loading...</div>;

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
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <label key={star} className='star-label'>
                                        <span
                                            className='star'
                                            onMouseEnter={() => setHover(star)}
                                            onMouseLeave={() => setHover(rating)}
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
                            <ImageInput setFile={setImage} />
                            {errors.imageUrl && <p className='error-message'>{errors.image}</p>}
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
