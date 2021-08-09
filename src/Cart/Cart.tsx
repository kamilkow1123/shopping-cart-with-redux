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

    useEffect(
        () => {
            dispatch(fetchCartProducts());
        },
        [ dispatch ]
    );

    const handleRemovingFromCart = (product: CartProduct) => {
        dispatch(removeFromCart(product));
    };

    return (
        <div className="cart">
            <h2 className="cart__header">Cart</h2>
            <h3 className="cart__price">{`Total: $${totalPrice}`}</h3>
            <div className="cart__wrapper">
                {cartProducts.map(product => (
                    <div key={product.id} className="cart__item">
                        <div className="cart__infos">
                            <span className="cart__title">{product.title}</span>
                            <span className="cart__info">
                                Amount: {product.amount}
                            </span>
                        </div>
                        <button
                            className="cart__button"
                            onClick={() => handleRemovingFromCart(product)}
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Cart;
