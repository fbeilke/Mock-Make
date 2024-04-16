import { useState } from "react";
import { useDispatch } from 'react-redux';
import { addProductImageThunk } from '../../redux/products';
import './ImageForm.css';

function ImageForm({ productId }) {
    const dispatch = useDispatch();
    const [file, setFile] = useState(null);
    const [tempUrl, setTempUrl] = useState("");
    const [imageLoading, setImageLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setImageLoading(true);
        const formData = new FormData();
        formData.append("image", file);

        await dispatch(addProductImageThunk(productId, formData));
        setImageLoading(false);
    }

    const handleFileChange = e => {
        // If they did not choose a file
        if(!e.target.files.length) {

            // Release old file URL
            if(tempUrl.length) {
                setTempUrl("");
                URL.revokeObjectURL(tempUrl);
            }
            return;
        }

        // File to be added
        const newFile = e.target.files[0];
        setFile(newFile);

        // If there was previously a fileURL, release it
        if(tempUrl.length) {
            setTempUrl("");
            URL.revokeObjectURL(tempUrl);
        }

        // Show the file in the temp image
        setTempUrl(URL.createObjectURL(newFile));
    }

    return (
        <div>
            { tempUrl.length ? <img className='input-image' src={tempUrl} alt={tempUrl} /> : null }
            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
                <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <button type="submit">Add Image</button>
                { imageLoading && <p>Loading...</p> }
            </form>
        </div>
    )
}

export default ImageForm;