import { NavLink, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getProductsByCategory } from '../../redux/products';
import { useDispatch, useSelector } from 'react-redux';
import './ProductsByCategory.css'

export default function ProductsByCategory() {
    const { category } = useParams()
    const dispatch = useDispatch();
    const { products } = useSelector(state => state.products)

    function categoryTitle() {
        switch(category) {
            case "HomeGoods":
                return "Home Goods"
            case "ToysGames":
                return "Toys & Games"
            case "ArtCollectibles":
                return "Art & Collectibles"
            case "CraftSuppliesTools":
                return "Craft Supplies & Tools"
            case "Gifts":
                return "Gifts"
            default:
                return null
        }
    }

    useEffect(() => {
        dispatch(getProductsByCategory(categoryTitle()))
    }, [dispatch, category])

    return (
        <div className="products-page">
            <h2>{categoryTitle()} Products</h2>
            <div className="products-list">
                {!products ? null : Object.values(products).map(product => (
                    <div key={product.id} className="each-product">
                        <NavLink to={`/products/${product.id}`} className="each-product-link">
                            <img className="each-product-image" src={`${Object.values(product.product_images).filter(productImage => productImage.preview)[0].url}`} alt={`${product.name}`} />
                            <div className="each-product-info">
                                <p>{product.name}</p>
                                <span>TODO: add reviews stars</span>
                                <span>·</span>
                                <span>TODO: add vendor name</span>
                                <h3>${product.price}</h3>
                            </div>
                        </NavLink>
                        <button>Add to cart</button>
                    </div>
                ))}
            </div>
        </div>
    )
}
