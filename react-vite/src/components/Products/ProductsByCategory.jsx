import { useParams } from 'react-router-dom';

export default function ProductsByCategory() {
    const { category } = useParams()

    return (
        <h2>Hello from {category}</h2>
    );
}
