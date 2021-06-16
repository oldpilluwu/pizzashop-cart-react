export const getCart = () => {
    return new Promise((resolve, reject) => {
        const cart = window.localStorage.getItem("cart");
        const _cart = JSON.parse(cart);
        if (_cart) resolve(_cart);
        else resolve({});
    });
};

export const storeCart = (cart) => {
    window.localStorage.setItem("cart", JSON.stringify(cart));
};
