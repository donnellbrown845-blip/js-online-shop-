const products = [
    {
        productName: "BANANA",
        category: "FOOD",
        price: 129.99,
        inStock: true 
    },
    {
        productName: "EGGS",
        category: "FOOD",
        price: 200.99,
        inStock: false
    },
    {
        productName: "JORDANS",
        category: "FOOTWEAR",
        price: 2000.99,
        inStock: true 
    },
    {
        productName: "ADIDAS",
        category: "FOOTWEAR",
        price: 200.99,
        inStock: true 
    },
    {
        productName: "REEBOK",
        category: "FOOTWEAR",
        price: 150.99,
        inStock: true 
    },
                   
];

const cart = [];

console.log ("Products array:", products)

function addToCart(productName) {
    const product = products.find(function (item) {
        return item.productName === productName;
    });

    if (!product) {
        console.log("Not found: \"" + productName + "\" is not in the catalog.");
        return;
    }

    if (!product.inStock) {
        console.log("Out of stock: " + product.productName + " cannot be added.");
        return;
    }

    cart.push(product);
    console.log("Added to cart: " + product.productName + " ($" + product.price.toFixed(2) + ")");
}

function viewCart() {
    if (cart.length === 0) {
        console.log("Your cart is empty.");
        return;
    }

    console.log("----- Cart -----");
    let total = 0;

    for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        console.log(item.productName + " — $" + item.price.toFixed(2));
        total += item.price;
    }

    console.log("Total: $" + total.toFixed(2));
}

function filterByCategory(category) {
    const matches = products.filter(function (item) {
        return item.category === category;
    });

    if (matches.length === 0) {
        console.log("No products found in category: " + category);
        return;
    }

    console.log("----- " + category + " -----");
    for (let i = 0; i < matches.length; i++) {
        const item = matches[i];
        console.log(item.productName + " — $" + item.price.toFixed(2));
    }
}

addToCart("BANANA");
addToCart("JORDANS");
addToCart("EGGS");
addToCart("MILK");
viewCart();
filterByCategory("FOOD");
filterByCategory("FOOTWEAR");