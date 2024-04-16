import { FaXmark } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { deleteProductImageThunk } from '../../redux/products';
import './ProductImage.css';

function ProductImage({ image, edit }) {
    const dispatch = useDispatch();

    const deleteImage = () => {
        dispatch(deleteProductImageThunk(image.id));
    }

    return (
        <div className="product-image">
            { edit ? <FaXmark onClick={deleteImage} /> : null }
            <img src={image.url} alt={image.url} />
        </div>
    );
}

export default ProductImage;