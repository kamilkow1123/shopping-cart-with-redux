import React from "react";

const ProductForm = () => {
    return (
        <div>
            <h2>Add Game To The Store</h2>
            <form>
                <input type="text" placeholder="Title" name="title" />
                <input type="number" placeholder="Price" name="price" />
                <input type="text" placeholder="Id" name="id" />
                <button>Add Game</button>
            </form>
        </div>
    );
};

export default ProductForm;
