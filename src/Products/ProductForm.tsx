import React, { useState } from "react";
import { useAppDispatch } from "../state/store.hooks";
import { addProduct, IProduct } from "./products.slice";

const ProductForm: React.FC = () => {
    const dispatch = useAppDispatch();

    const [ product, setProduct ] = useState<{ title: string; price: number }>({
        title: "",
        price: 0,
    });

    const handleChange = ({
        target: { name, value },
    }: React.ChangeEvent<HTMLInputElement>) => {
        setProduct(prev => {
            (prev as any)[name] = value;
            return { ...prev };
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (title === "" || price === 0) return;

        dispatch(addProduct(product));
        setProduct({
            title: "",
            price: 0,
        });
    };

    const { title, price } = product;
    return (
        <div>
            <h2>Add Game To The Store</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    name="title"
                    value={title}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    placeholder="Price"
                    name="price"
                    value={price}
                    onChange={handleChange}
                />
                <button type="submit">Add Game</button>
            </form>
        </div>
    );
};

export default ProductForm;
