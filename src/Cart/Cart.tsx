import React from "react";
import { useAppDispatch, useAppSelector } from "../state/store.hooks";
import { getCartProducts, getTotalPrice, removeFromCart } from "./cart.slice";

const Cart: React.FC = () => {
    const cartProducts = useAppSelector(getCartProducts);
    const totalPrice = useAppSelector(getTotalPrice);
    const dispatch = useAppDispatch();

    const handleRemovingFromCart = (productId: number) => {
        dispatch(removeFromCart(productId));
    };

    return (
        <div>
            <h2>Cart</h2>
            <h3>{totalPrice}</h3>
            {cartProducts.map(product => (
                <div key={product.id}>
                    <span>{product.title}</span>
                    <span>{product.amount}</span>
                    <button onClick={() => handleRemovingFromCart(product.id)}>
                        Remove From Cart
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Cart;
