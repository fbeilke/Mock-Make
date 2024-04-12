import { useParams } from 'react-router-dom';

export default function EditProductForm() {
    const { productId } = useParams()

    return (
        <h2>Hello from Product {productId} Edit Form</h2>
    )
}
