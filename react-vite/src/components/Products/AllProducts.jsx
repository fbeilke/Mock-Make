import { useEffect } from "react"
import { getAllProducts } from "../../redux/products"
import { useDispatch } from "react-redux"

export default function AllProducts() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProducts())
    })

    return (
        <h2>Hello from All Products!</h2>
    )
}
