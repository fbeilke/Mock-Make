
const ALL_PRODUCTS = "productsReducer/ALL_PRODUCTS"
const PRODUCTS_BY_CATEGORY = "productsReducer/PRODUCTS_BY_CATEGORY"
const SINGLE_PRODUCT = "productsReducer/SINGLE_PRODUCT"
const NEW_PRODUCT = "productsReducer/NEW_PRODUCT"
const UPDATE_PRODUCT = "productsReducer/UPDATE_PRODUCT"
const DELETE_PRODUCT = "productsReducer/DELETE_PRODUCT"


function allProducts(products) {
    return {
        type: ALL_PRODUCTS,
        products
    }
}

function productsByCategory(products) {
    return {
        type: PRODUCTS_BY_CATEGORY,
        products
    }
}

function singleProduct(product) {
    return {
        type: SINGLE_PRODUCT,
        product
    }
}

function newProduct(product) {
    return {
        type: NEW_PRODUCT,
        product
    }
}

function updateProduct(product) {
    return {
        type: UPDATE_PRODUCT,
        product
    }
}

function deleteProduct(productId) {
    return {
        type: DELETE_PRODUCT,
        productId
    }
}

export const getAllProducts = () => async(dispatch) => {
    const response = await fetch('/api/products/')
    if (response.ok) {
        const data = await response.json()
        dispatch(allProducts(data))
    } else {
        const errors = await response.json()
        return errors;
    }
}

export const getProductsByCategory = (category) => async(dispatch) => {
    const response = await fetch(`/api/products/${category}`)
    if (response.ok) {
        const data = await response.json();
        dispatch(productsByCategory(data))
    } else {
        const errors = await response.json();
        return errors;
    }
}

export const getSingleProduct = (productId) => async(dispatch) => {
    const response = await fetch(`/api/products/${productId}`)
    if (response.ok) {
        const data = await response.json();
        dispatch(singleProduct(data))
    } else {
        const errors = await response.json();
        return errors;
    }
}

export const createNewProduct = (payload) => async(dispatch) => {
    const response = await fetch('/api/products', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(newProduct(data))
    } else {
        const errors = await response.json();
        return errors;
    }
}

export const updateExistingProduct = (payload, productId) => async(dispatch) => {
    const response = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(updateProduct(data))
    } else {
        const errors = await response.json();
        return errors
    }
}

export const deleteExistingProduct = (productId) => async(dispatch) => {
    const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"}
    })
    if (response.ok) {
        dispatch(deleteProduct(productId))
    } else {
        const errors = await response.json();
        return errors;
    }

}


const initialState = { products: null };

export default function productsReducer(state = initialState, action) {
    switch(action.type) {
        case ALL_PRODUCTS:
            return {...state, products: action.products, allProductsIds: Object.keys(action.products) }
        case PRODUCTS_BY_CATEGORY:
            return {...state, products: action.products, allProductsIds: Object.keys(action.products)}
        case SINGLE_PRODUCT:{
            const newState = {...state}
            newState.products[action.product.id] = action.product
            return newState
            }
        case NEW_PRODUCT: {
            const newState = {...state}
            newState.products[action.product.id] = action.product
            return newState
            }
        case UPDATE_PRODUCT: {
            const newState = {...state}
            newState.products[action.product.id] = action.product
            return newState
            }
        case DELETE_PRODUCT: {
            const newState = {...state}
            delete newState[action.productId]
            return newState;
        }
        default:
            return state;
    }
}
