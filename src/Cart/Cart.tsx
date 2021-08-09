import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../state/store.hooks";
import {
    fetchCartProducts,
    getCartProducts,
    getTotalPrice,
    removeFromCart,
    CartProduct,
} from "./cart.slice";

const Cart: React.FC = () => {
    const cartProducts = useAppSelector(getCartProducts);
    const totalPrice = useAppSelector(getTotalPrice);
    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log("fetching");
        dispatch(fetchCartProducts());
    }, []);

    const handleRemovingFromCart = (product: CartProduct) => {
        dispatch(removeFromCart(product));
    };

    return (
        <div>
            <h2>Cart</h2>
            <h3>{totalPrice}</h3>
            {cartProducts.map(product => (
                <div key={product.id}>
                    <span>{product.title}</span>
                    <span>{product.amount}</span>
                    <button onClick={() => handleRemovingFromCart(product)}>
                        Remove From Cart
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Cart;
