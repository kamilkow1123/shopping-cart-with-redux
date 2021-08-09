import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../Products/products.slice";
import { AppDispatch, RootState } from "../state/store";

export interface CartProduct extends IProduct {
    amount: number;
}

const initialState = {
    cartProducts: [] as CartProduct[],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCartProducts: (state, action: PayloadAction<CartProduct[]>) => {
            state.cartProducts = action.payload;
        },
        addProductToCart: (state, action: PayloadAction<IProduct>) => {
            const productIndex = state.cartProducts.findIndex(
                product => product.id === action.payload.id
            );

            if (productIndex !== -1) {
                state.cartProducts[productIndex].amount += 1;
            } else {
                state.cartProducts.push({ ...action.payload, amount: 1 });
            }
        },
        deleteFromCart: (state, action: PayloadAction<number>) => {
            const productIndex = state.cartProducts.findIndex(
                product => product.id === action.payload
            );

            if (state.cartProducts[productIndex].amount > 1) {
                state.cartProducts[productIndex].amount -= 1;
            } else {
                return {
                    ...state,
                    cartProducts: state.cartProducts.filter(
                        product => product.id !== action.payload
                    ),
                };
            }
        },
    },
});

export const getCartProducts = (state: RootState) => state.cart.cartProducts;

export const getTotalPrice = (state: RootState) =>
    state.cart.cartProducts.reduce(
        (acc, next) => (acc += next.amount * next.price),
        0
    );

export const {
    setCartProducts,
    addProductToCart,
    deleteFromCart,
} = cartSlice.actions;

//Async action creators

export const addToCart = (product: IProduct, products: CartProduct[]) => async (
    dispatch: AppDispatch
) => {
    try {
        const productIndex = products.findIndex(prod => prod.id === product.id);
        let res;
        if (productIndex !== -1) {
            const currAmount = products[productIndex].amount;
            const id = products[productIndex].id;

            res = await fetch(`http://localhost:5000/cart/${id}`, {
                method: "PUT",
                body: JSON.stringify({ ...product, amount: currAmount + 1 }),
                headers: { "Content-Type": "application/json" },
            });
        } else {
            res = await fetch("http://localhost:5000/cart", {
                method: "POST",
                body: JSON.stringify({ ...product, amount: 1 }),
                headers: { "Content-Type": "application/json" },
            });
        }

        const data = await res.json();

        dispatch(addProductToCart(data));
    } catch (err) {
        console.log(err);
    }
};

export const fetchCartProducts = () => async (dispatch: AppDispatch) => {
    try {
        const res = await fetch("http://localhost:5000/cart");
        const data = await res.json();

        dispatch(setCartProducts(data));
    } catch (err) {
        console.log(err);
    }
};

export const removeFromCart = (product: CartProduct) => async (
    dispatch: AppDispatch
) => {
    try {
        if (product.amount > 1) {
            await fetch(`http://localhost:5000/cart/${product.id}`, {
                method: "PUT",
                body: JSON.stringify({
                    ...product,
                    amount: product.amount - 1,
                }),
                headers: { "Content-Type": "application/json" },
            });
        } else {
            await fetch(`http://localhost:5000/cart/${product.id}`, {
                method: "DELETE",
            });
        }

        dispatch(deleteFromCart(product.id));
    } catch (err) {
        console.log(err);
    }
};

export default cartSlice.reducer;
