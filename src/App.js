import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductsPage from "./pages/Products";
import Cart from "./pages/Cart";
import SingleProduct from "./pages/SingleProduct";
import Navigation from "./components/Navigation";
import { CartContext } from "./CartContext";

import { getCart, storeCart } from "./helpers";

const App = () => {
    const [cart, setCart] = useState({});

    useEffect(() => {
        getCart().then((cart) => setCart(cart));
    }, []);

    useEffect(() => {
        storeCart(cart);
    }, [cart]);

    return (
        <>
            <Router>
                <CartContext.Provider value={{ cart, setCart }}>
                    <Navigation />
                    <Switch>
                        <Route path="/" component={Home} exact></Route>
                        {/* <Route path="/about" component={About}></Route> */}
                        <Route
                            path="/products"
                            exact
                            component={ProductsPage}
                        ></Route>
                        <Route
                            path="/products/:_id"
                            component={SingleProduct}
                        ></Route>
                        <Route path="/cart" component={Cart}></Route>
                    </Switch>
                </CartContext.Provider>
            </Router>
        </>
    );
};

export default App;
