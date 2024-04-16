// import React from 'react';
import { useDispatch } from 'react-redux';
import { createReviewThunk } from '../../redux/reviews';
import ReviewForm from "../ReviewForm/ReviewForm";
import './CreateReview.css';

function CreateReview({ productId }) {
    const dispatch = useDispatch();


    const handleCreate = async (reviewData) => {

        const formData = new FormData();
        formData.append('content', reviewData.content);
        formData.append('rating', reviewData.rating);
        if (reviewData.image) {
            formData.append('image', reviewData.image);
        }

        try {

            await dispatch(createReviewThunk(productId, formData));

        } catch (error) {

            console.error('Failed to create review:', error);
        }
    };

    return (
        <>
            <h1 className='rev-form-header'>Create Review</h1>
            <ReviewForm onSubmit={handleCreate} buttonText="Create Review"/>
        </>
    );
}

export default CreateReview;
