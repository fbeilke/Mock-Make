import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { deleteExistingProduct } from '../../redux/products';
import { useNavigate } from 'react-router-dom';
import './DeleteProduct.css'


export default function DeleteProduct({ productId }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { closeModal } = useModal();

    async function handleDeleteProduct() {
        const response = await dispatch(deleteExistingProduct(productId));

        if (response) {
            alert("There was an error.")
        } else {
            closeModal()
            navigate('/products');
        }

    }

    return (
        <div className='delete-product-modal'>
            <h1 className='confirm-delete-text'>Are you sure you want to delete this review?</h1>
            <button className='delete-button confirm' onClick={handleDeleteProduct}>
                Yes, Delete
            </button>
            <button className='delete-button cancel' onClick={closeModal}>
                Cancel
            </button>
        </div>
    )


}
