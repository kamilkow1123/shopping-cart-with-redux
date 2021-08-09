import React, { useState } from "react";
import { useAppDispatch } from "../state/store.hooks";
import { addProduct } from "./products.slice";

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
        <div className="form">
            <h2 className="form__header">Add Game To The Store</h2>
            <form onSubmit={handleSubmit}>
                <div className="form__wrapper">
                    <input
                        type="text"
                        placeholder="Title"
                        name="title"
                        value={title}
                        onChange={handleChange}
                        className="form__input"
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        name="price"
                        value={price}
                        onChange={handleChange}
                        className="form__input"
                    />
                </div>
                <button type="submit" className="form__button">
                    Add Game
                </button>
            </form>
        </div>
    );
};

export default ProductForm;
