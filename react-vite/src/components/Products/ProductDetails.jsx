import { useParams } from 'react-router-dom'

export default function ProductDetails() {
    const { productId } = useParams();

    return (
        <h2>Hello from Product {productId}</h2>
    )
}
