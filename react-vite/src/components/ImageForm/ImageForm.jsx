import { useState } from "react";
import { useDispatch } from 'react-redux';
import { formDataFromObject } from '../../utils/formDataUtils';
import ImageInput from "../ImageInput";
import './ImageForm.css';

function ImageForm({ imageThunk }) {
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        setSubmitting(true);

        const payload = {
            image
        }

        const formData = formDataFromObject(payload)

        await dispatch(imageThunk(formData));

        setSubmitting(false);
        setImage(null);
    }

    if (submitting) return <div>Loading...</div>

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <p className="image-input-label">Add an Image</p>
            <ImageInput setFile={setImage} loading={submitting} />
            { image ? <button className="add-image-btn" type="submit" disabled={image === null}>Add This Image</button> : null }
        </form>
    )
}

export default ImageForm;