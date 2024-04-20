import { useNavigate } from 'react-router-dom';
import './OrderItem.css';

function OrderItem({product, quantity}) {
    const navigate = useNavigate();

    if(!product) return null;

    const { product_images: productImages } = product;

    const image = Object.values(productImages).find(image => image.preview)

    return (
        <div className="order-item" onClick={() => navigate(`/products/${product.id}`)}>
            <p>{product.name} -- Qty: {quantity}</p>
            <img className="order-item-image" src={image.url} alt={product.name} />
        </div>
    )
}

export default OrderItem;