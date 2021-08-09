import Cart from "./Cart/Cart";
import ProductForm from "./Products/ProductForm";
import ProductsList from "./Products/ProductsList";

function App() {
    return (
        <div className="container">
            <div className="app">
                <ProductsList />
                <ProductForm />
                <Cart />
            </div>
        </div>
    );
}

export default App;
