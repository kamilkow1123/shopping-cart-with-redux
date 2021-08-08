import React from "react";
import { useSelector, useDispatch } from "react-redux";
//types
import { getProductsSelector, removeProduct } from "./products.slice";

const ProductsList: React.FC = ({}) => {
    const products = useSelector(getProductsSelector);
    const dispatch = useDispatch();

    const removeFromStore = (id: string) => {
        dispatch(removeProduct(id));
    };

    return (
        <div>
            <h2>Games List</h2>
            {products.map(product => (
                <div key={product.id}>
                    <span>{`${product.title}: ${product.price}`}</span>
                    <button onClick={() => removeFromStore(product.id)}>
                        Remove from the store
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ProductsList;
