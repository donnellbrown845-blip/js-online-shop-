import { products } from "./products.js";

export const cart = [];

export function addToCart(productName) {
    const product = products.find(function (item) {
        return item.productName === productName;
    });

    if (!product) {
        throw new Error("That product is not in the catalog. Check the name and try again.");
    }

    if (!product.inStock) {
        throw new Error(product.productName + " is out of stock and cannot be added to your cart.");
    }

    cart.push(product);
    return product;
}

export function viewCart() {
    if (cart.length === 0) {
        return { items: [], total: 0 };
    }

    let total = 0;
    const items = [];

    for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        items.push({ productName: item.productName, price: item.price });
        total += item.price;
    }

    return { items: items, total: total };
}