import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, getCartProducts } from "../Cart/cart.slice";
import { useAppSelector } from "../state/store.hooks";
import { FaShoppingBasket, FaSpinner } from "react-icons/fa";
//types
import {
    fetchProducts,
    getLoading,
    getProductsSelector,
    IProduct,
    removeProduct,
} from "./products.slice";

const ProductsList: React.FC = () => {
    const products = useSelector(getProductsSelector);
    const loading = useSelector(getLoading);
    const cartProducts = useAppSelector(getCartProducts);
    const dispatch = useDispatch();

    useEffect(
        () => {
            dispatch(fetchProducts());
        },
        [ dispatch ]
    );

    const removeFromStore = (id: number) => {
        dispatch(removeProduct(id));
    };

    const addToCartHandler = (product: IProduct) => {
        dispatch(addToCart(product, cartProducts));
    };

    return (
        <div className="products">
            <h2 className="products__header">Games Store</h2>
            <div className="products__items">
                {loading && <FaSpinner className="products__spinner" />}
                {!products ? null : (
                    products.map(product => (
                        <div key={product.id} className="products__item">
                            <div className="products__info">
                                <span>{product.title}</span>
                                <span>{`$${product.price}`}</span>
                            </div>
                            <div className="products__buttons">
                                <button
                                    className="products__button-add"
                                    onClick={() => addToCartHandler(product)}
                                >
                                    <FaShoppingBasket />
                                </button>
                                <button
                                    className="products__button-remove"
                                    onClick={() => removeFromStore(product.id)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ProductsList;
