

export const cart = [];

export function addToCart(product) {
    if (!product) {
        throw new Error("That product is not in the catalog. Check the name and try again.");
    }

    if (!product.inStock) {
        throw new Error(product.productName + " is out of stock and cannot be added to your cart.");
    }

    const existing = cart.find(item => item.productName === product.productName);
    if (existing) {
        existing.quantity += 1;
        return existing;
    }

    product.quantity = 1;
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
        total += item.price * item.quantity;
    }

    return { items: items, total: total };
}

export function removeFromCart(productName) {
  const index = cart.findIndex(item => item.productName === productName);
  if (index !== -1) cart.splice(index, 1);
}