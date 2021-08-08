import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../state/store";

export interface IProduct {
    title: string;
    price: number;
    id: string;
}

const initialState: IProduct[] = [
    {
        title: "Escape From Tarkov",
        price: 60,
        id: "eft",
    },
    {
        title: "Hunt: Showdown",
        price: 70,
        id: "hunt",
    },
    {
        title: "Hell Let Loose",
        price: 55,
        id: "hll",
    },
];

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<IProduct>) => {
            state.push(action.payload);
        },
        removeProduct: (state, action: PayloadAction<string>) => {
            return state.filter(product => product.id !== action.payload);
        },
    },
});

export const getProductsSelector = (state: RootState) => state.products;

export const { addProduct, removeProduct } = productsSlice.actions;

export default productsSlice.reducer;
