import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../state/store";

export interface IProduct {
    title: string;
    price: number;
    id: string;
}

const initialState = {
    listOfProducts: [] as IProduct[],
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
        removeProduct: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                listOfProducts: state.listOfProducts.filter(
                    product => product.id !== action.payload
                ),
            };
        },
    },
});

export const getProductsSelector = (state: RootState) =>
    state.products.listOfProducts;

export const {
    addNewProduct,
    removeProduct,
    setProducts,
} = productsSlice.actions;

export const addProduct = (product: IProduct) => async (
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
    console.log("here");
    try {
        const res = await fetch("http://localhost:5000/products");

        const data = await res.json();

        console.log(res);
        console.log(data);
        dispatch(setProducts(data));
    } catch (err) {
        console.log(err);
    }
};

export default productsSlice.reducer;
