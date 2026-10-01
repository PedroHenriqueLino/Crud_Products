import { createContext, useState, useEffect, useReducer } from "react";
import axios from 'axios'

export const ProductContext = createContext();

const initialState = {
    products: [],
    categories: []
}


const productReducer = (state, action) => {

    switch (action.type) {
        //Product
        case "GET_PRODUCTS":
            return {
                ...state,
                products: action.payload
            };

        case "DELETE_PRODUCT":
            return {
                ...state,
                products: state.products.filter(
                    product => product.id !== action.payload
                )
            };

        case "UPDATE_PRODUCT":
            return {
                ...state,
                products: state.products.map((product) =>
                    product.id === action.payload.id ? action.payload : product
                )
            };

        case "NEW_PRODUCT":
            return {
                ...state,
                products: [...state.products, action.payload]
            }

        //Category
        case "GET_CATEGORY":
            return {
                ...state,
                categories: action.payload
            }

        case "DELET_CATEGORY":
            return {
                ...state,
                categories: state.categories.filter(
                    category => category.id !== action.payload
                )
            }


        case "NEW_CATEGORY":
            return {
                ...state,
                categories: [...state.categories, action.payload]
            }

        default:
            return state;
    }
};

export const ProductContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(productReducer, initialState)


    //Product
    const getData = async () => {
        const response = await axios.get("https://crud-products-x1ay.onrender.com/products")

        dispatch({
            type: 'GET_PRODUCTS',
            payload: response.data
        });
    }

    useEffect(() => {
        getData()
    }, [])

    const deleteProduct = async (id) => {
        await axios.delete(
            `https://crud-products-x1ay.onrender.com/products/${id}`
        );

        dispatch({
            type: "DELETE_PRODUCT",
            payload: id
        });
    };

    const updateProduct = async (id, updatedProduct) => {
        try {
            const response = await axios.patch(
                `https://crud-products-x1ay.onrender.com/products/${id}`,
                updatedProduct
            );

            dispatch({
                type: "UPDATE_PRODUCT",
                payload: response.data
            });
        } catch (error) {
            console.log(error);
        }
    };

    const newProductAPI = async (newProduct) => {
        try {
            const response = await axios.post('https://crud-products-x1ay.onrender.com/products', newProduct)

            dispatch({
                type: "NEW_PRODUCT",
                payload: response.data
            });
        }

        catch (error) {
            console.log(error)
        }
    }

    //Category
    const getCategory = async () => {
        const response = await axios.get("https://crud-products-x1ay.onrender.com/categories")

        dispatch({
            type: "GET_CATEGORY",
            payload: response.data
        });
    }

    useEffect(() => {
        getCategory()
    }, [])

    const deleteCategory = async (id) => {
        await axios.delete(
            `https://crud-products-x1ay.onrender.com/categories/${id}`
        );

        dispatch({
            type: "DELET_CATEGORY",
            payload: id
        });
    };

    const newCategoryAPI = async (newCategory) => {
        try {
            const response = await axios.post('https://crud-products-x1ay.onrender.com/categories', newCategory)
            dispatch({
                type: "NEW_CATEGORY",
                payload: response.data
            });

        }

        catch (error) {
            console.log(error)
        }
    }

    //mostrar estoque?
    const [showStock, setShowStock] = useState(() => {
        const config = JSON.parse(localStorage.getItem('config'));

        return config?.showStock ?? true;
    });
    //mostrar estoque?

    //estoque baixo apartir de?
    const [lowStockLimit, setLowStockLimit] = useState(() => {
        const config = JSON.parse(localStorage.getItem('config'));

        return config?.lowStockLimit || 3;
    });
    //estoque baixo apartir de?

    return (
        < ProductContext.Provider value={{
            state,
            dispatch,
            deleteProduct,
            updateProduct,
            newProductAPI,
            newCategoryAPI,
            deleteCategory,
            showStock,
            setShowStock,
            lowStockLimit,
            setLowStockLimit
        }} >
            {children}
        </ProductContext.Provider >
    )

}
