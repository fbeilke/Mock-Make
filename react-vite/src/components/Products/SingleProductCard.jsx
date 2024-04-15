import { NavLink } from "react-router-dom"
import "./SingleProductCard.css"

export default function SingleProductCard({ product, users}) {



    return (
        <NavLink className="single-product-link" to={`/products/${product.id}`} key={product.id}>
            <div className='single-product-image-container'>
                <img className="single-product-image" src={`${Object.values(product.product_images).filter(productImage => productImage.preview)[0].url}`} />
            </div>
            <div className='single-product-info'>
                <p className='single-product-name'>{product.name}</p>
                <p className='single-product-category'>{product.category}</p>
                {users[product.vendor_id].vendor_name ? <span>{users[product.vendor_id].vendor_name}</span> :
                <span>{users[product.vendor_id].username}</span>
                }
                <span> · </span>
                <span>TODO: add reviews stars</span>
                <p className='single-product-price'>${product.price}</p>
                <p>{product.description}</p>

            </div>
        </NavLink>

    )
}
