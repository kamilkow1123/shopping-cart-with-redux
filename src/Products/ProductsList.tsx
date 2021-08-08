import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../Cart/cart.slice";
//types
import { getProductsSelector, IProduct, removeProduct } from "./products.slice";

const ProductsList: React.FC = ({}) => {
    const products = useSelector(getProductsSelector);
    const dispatch = useDispatch();

    const removeFromStore = (id: string) => {
        dispatch(removeProduct(id));
    };

    const addToCartHandler = (product: IProduct) => {
        dispatch(addToCart(product));
    };

    return (
        <div>
            <h2>Games List</h2>
            {products.map(product => (
                <div key={product.id}>
                    <span>{`${product.title}: ${product.price}`}</span>
                    <button onClick={() => addToCartHandler(product)}>
                        Add To Cart
                    </button>
                    <button onClick={() => removeFromStore(product.id)}>
                        Remove from the store
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ProductsList;
