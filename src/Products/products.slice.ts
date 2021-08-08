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
        addProduct: (state, action: PayloadAction<IProduct>) => [
            ...state,
            action.payload,
        ],
    },
});

export const getProductsSelector = (state: RootState) => state.products;

export const { addProduct } = productsSlice.actions;

export default productsSlice.reducer;
