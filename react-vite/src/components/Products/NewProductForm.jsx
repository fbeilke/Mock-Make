import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createNewProduct } from '../../redux/products';
import { formDataFromObject } from '../../utils/formDataUtils';
import ImageInput from '../ImageInput';
import './NewProductForm.css';

export default function NewProductForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.session)
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState(0);
    const [validators, setValidators] = useState({});
    const [file, setFile] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);

    // NEED TO DO PICTURES

    if (!user) navigate('/');

    async function handleSubmit(e) {
        e.preventDefault();

        const errors = {}

        if (!name.length) errors.name = "Product name is required"
        if (name.length > 200) errors.name = "Name must be less than 200 characters"
        if (!description.length) errors.description = "Description of product is required"
        if (!category.length) errors.category = "Product category is required"
        if (!price) errors.price = "Price is required"
        if (price < 0 || price > 9999.99 ) "Price must be between $0 and $9,999.99"


        setValidators(errors)

        if (Object.values(errors).length === 0) {
            setImageLoading(true);

            const payload = {
                name,
                description,
                category,
                price,
                image: file
            }

            const formData = formDataFromObject(payload);

            const data = await dispatch(createNewProduct(formData))

            if (data && !data.id) {
                setValidators({error: data})
            } else {
                await navigate(`/products/${data.id}`);
            }
        }
    }

    return (
        <div>
            <h2>Create a new product listing</h2>
            <form className="create-product-form" onSubmit={handleSubmit} encType='multipart/form-data'>
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
                <p>Add an Image.</p>
                <p>*Image must have approved file extension: webp, png, jpg, pdf, jpeg, gif</p>
                <ImageInput setFile={setFile} />
                { imageLoading && <p>Loading...</p> }
                <div>
                    <button type='submit' className="create-product-button">Create Product</button>
                </div>
            </form>
        </div>

    )
}
