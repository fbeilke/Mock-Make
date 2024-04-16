import { useState } from "react";
import { useDispatch } from 'react-redux';
import { addProductImageThunk } from '../../redux/products';

function ImageForm({ productId }) {
    const dispatch = useDispatch();
    const [file, setFile] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setImageLoading(true);
        const formData = new FormData();
        formData.append("image", file);

        await dispatch(addProductImageThunk(productId, formData));
        setImageLoading(false);
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
                <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <button type="submit">Submit</button>
                { imageLoading && <p>Loading...</p> }
            </form>
        </div>
    )
}

export default ImageForm;