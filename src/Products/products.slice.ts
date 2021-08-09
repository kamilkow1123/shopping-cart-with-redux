import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../state/store";

export interface IProduct {
    title: string;
    price: number;
    id: number;
}

const initialState = {
    listOfProducts: [] as IProduct[],
    isLoading: false as boolean,
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<IProduct[]>) => {
            state.listOfProducts = action.payload;
        },
        addNewProduct: (state, action: PayloadAction<IProduct>) => {
            state.listOfProducts.push(action.payload);
        },
        deleteProduct: (state, action: PayloadAction<number>) => {
            return {
                ...state,
                listOfProducts: state.listOfProducts.filter(
                    product => product.id !== action.payload
                ),
            };
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
});

export const getProductsSelector = (state: RootState) =>
    state.products.listOfProducts;

export const getLoading = (state: RootState) => state.products.isLoading;

export const {
    addNewProduct,
    deleteProduct,
    setProducts,
    setLoading,
} = productsSlice.actions;

//Async action creators

export const addProduct = (product: { title: string; price: number }) => async (
    dispatch: AppDispatch
) => {
    try {
        const res = await fetch("http://localhost:5000/products", {
            method: "POST",
            body: JSON.stringify(product),
            headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();

        dispatch(addNewProduct(data));
    } catch (err) {
        console.log(err);
    }
};

export const fetchProducts = () => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const res = await fetch("http://localhost:5000/products");
        const data = await res.json();

        dispatch(setProducts(data));
    } catch (err) {
        console.log(err);
    } finally {
        dispatch(setLoading(false));
    }
};

export const removeProduct = (id: number) => async (dispatch: AppDispatch) => {
    try {
        await fetch(`http://localhost:5000/products/${id}`, {
            method: "DELETE",
        });

        dispatch(deleteProduct(id));
    } catch (err) {
        console.log(err);
    }
};

export default productsSlice.reducer;
