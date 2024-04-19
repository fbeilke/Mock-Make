import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductImageThunk, updateExistingProduct } from '../../redux/products';
import ProductImage from '../ProductImage';
import ImageForm from '../ImageForm';
import './EditProductForm.css'

export default function EditProductForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { productId } = useParams()
    const { user } = useSelector(state => state.session);
    const { products } = useSelector(state => state.products);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState(0);
    const [validators, setValidators] = useState({})

    let singleProduct= null

    if (products && products[productId]) {
        singleProduct = products[productId];

    }

    useEffect(() => {
        if (singleProduct) {
            setName(singleProduct.name);
            setDescription(singleProduct.description);
            setCategory(singleProduct.category);
            setPrice(singleProduct.price);
        }
    }, [singleProduct])

    if (!user || !products || Object.values(user).length === 0) {
        return <Navigate to='/' replace={true}/>
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const errors = {}

        if (!name.length) errors.name = "Product name is required"
        if (name.length > 200) errors.name = "Name must be less than 200 characters"
        if (!description.length) errors.description = "Description of product is required"
        if (!category.length) errors.category = "Product category is required"
        if (!price) errors.price = "Price is required"
        if (price < 0 || price > 9999.99 ) errors.price = "Price must be between $0 and $9,999.99"



        setValidators(errors)

        if (Object.values(errors).length === 0) {
            const payload = {
                vendor_id: user.id,
                name,
                description,
                category,
                price
            }

            const data = await dispatch(updateExistingProduct(payload, productId))

            if (data) {
                setValidators({error: data})
            } else {
                await navigate(`/products/${productId}`);
            }
        }
    }

    return (
        <div>
            <h2>Edit product listing</h2>
            <form className="edit-product-form" onSubmit={handleSubmit}>
                <div>
                    <p>Provide your product with a descriptive name.</p>
                    <input
                        placeholder="Product name"
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    {validators.name && <p className="product-form-errors">{validators.name}</p>}
                </div>
                <div>
                    <p>Give your product a detailed description.</p>
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    {validators.description && <p className="product-form-errors">{validators.description}</p>}
                </div>
                <div>
                    <p>Choose the best category that your product fits into.</p>
                    <select name='category' onChange={e => setCategory(e.target.value)} value={category}>
                        <option value='' disabled={true}>(select one)</option>
                        <option value="Home Goods">Home Goods</option>
                        <option value="Toys & Games">Toys & Games</option>
                        <option value="Art & Collectibles">Art & Collectibles</option>
                        <option value="Craft Supplies & Tools">Craft Supplies & Tools</option>
                        <option value="Gifts">Gifts</option>
                    </select>
                    {validators.category && <p className="product-form-errors">{validators.category}</p>}
                </div>
                <div>
                    <p>Set a price for your item.</p>
                    <span>$</span>
                    <input
                        placeholder ="0.00"
                        type='text'
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                    {validators.price && <p className="product-form-errors">{validators.price}</p>}
                </div>
                <div>
                    <button type='submit' className="edit-product-button">Update Product</button>
                </div>
            </form>
            <div className='image-edit-list'>

            </div>
            { Object.entries(singleProduct.product_images).map(([id, image]) => (
                <ProductImage key={id} image={image} edit={true} />
            ))}
            <p>*Image must have approved file extension: webp, png, jpg, pdf, jpeg, gif</p>
            <ImageForm imageThunk={(image) => addProductImageThunk(productId, image)} />
        </div>
    )
}
