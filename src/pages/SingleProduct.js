import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router";
import { CartContext } from "../CartContext";

const SingleProduct = () => {
    const [product, setProduct] = useState({});
    const params = useParams();
    const history = useHistory();

    const [isAdding, setIsAdding] = useState(false);
    const { cart, setCart } = useContext(CartContext);

    useEffect(() => {
        fetch(`/api/products/${params._id}`)
            .then((res) => res.json())
            .then((product) => {
                setProduct(product);
                console.log(product);
            });
    }, [params._id]);

    const addToCart = (event, product) => {
        event.preventDefault();
        let _cart = { ...cart };

        console.log(_cart);

        if (!_cart.items) _cart.items = {};

        if (_cart.items[product._id]) _cart.items[product._id]++;
        else _cart.items[product._id] = 1;

        if (!_cart.totalItems) _cart.totalItems = 0;
        _cart.totalItems += 1;
        setCart(_cart);

        setIsAdding(true);
        setTimeout(() => {
            setIsAdding(false);
        }, 1000);
    };

    return (
        <div className="container mx-auto mt-12 w-11/12">
            <button
                className="font-bold mb-12"
                onClick={() => {
                    history.goBack();
                }}
            >
                Back
            </button>
            <div className="flex">
                <img
                    className="w-1/4"
                    src="/images/pepperoni.jpg"
                    alt="pepperoni"
                />
                <div className="ml-16">
                    <h1 className="text-xl font-bold">{product.name}</h1>
                    <div className="text-md">{product.size}</div>
                    <div className="font-bold mt-2">$ {product.price}</div>
                    <button
                        disabled={isAdding}
                        onClick={(e) => addToCart(e, product)}
                        className={`${
                            isAdding ? "bg-green-500" : "bg-yellow-500"
                        }  py-1 px-8 rounded-full font-bold mt-4`}
                    >
                        Add{isAdding ? "ed" : ""} to cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;
