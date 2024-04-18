import './OrderItem.css';

function OrderItem({product, quantity}) {

    if(!product) return null;

    const { product_images: productImages } = product;

    const image = Object.values(productImages).find(image => image.preview)

    return (
        <div className="order-item">
            <p>{product.name} -- Qty: {quantity}</p>
            <img className="order-item-image" src={image.url} alt={product.name} />
        </div>
    )
}

export default OrderItem;