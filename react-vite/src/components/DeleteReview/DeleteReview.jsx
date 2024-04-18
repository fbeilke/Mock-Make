import { useModal } from "../../context/Modal";
import { useDispatch } from 'react-redux';
import { deleteReviewThunk } from "../../redux/reviews"
import './DeleteReview.css';

function DeleteReview({ reviewId, onReviewDeleted }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    console.log()

    const handleDeleteReview = async () => {
        await dispatch(deleteReviewThunk(reviewId)); // Dispatch the delete action
        onReviewDeleted(); // Callback function to be called after deletion
        closeModal(); // Close the modal
    };


    return (
        <div className='delete-review-modal'>
            <h1 className='confirm-delete-text'>Are you sure you want to delete this review?</h1>
            <button className='delete-button confirm' onClick={handleDeleteReview}>
                Yes, Delete
            </button>
            <button className='delete-button cancel' onClick={closeModal}>
                Cancel
            </button>
        </div>
    )

}

export default DeleteReview;
