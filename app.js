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
        updateCartCount();
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
    if (category === "ALL") {
    renderProducts(products);
    return;
  }

    const matches = products.filter(function (item) {
        return item.category === category;
    });

    if (matches.length === 0) {
        console.log("No products found in category: " + category);
    }

    console.log("----- " + category + " -----");
    for (let i = 0; i < matches.length; i++) {
        const item = matches[i];
        console.log(item.productName + " — $" + item.price.toFixed(2));
    }    
    renderProducts(matches);
}

function updateCartCount() {
    const badge = document.getElementById("cart-count");
    if (badge) {
        badge.textContent = cart.length;
    }
}
function renderCategoryButtons() {
  const container = document.getElementById("filters");
  container.innerHTML = "";

  const categories = ["ALL", "FOOD", "FOOTWEAR"];

  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    const button = document.createElement("button");
    button.textContent = category;

    button.addEventListener("click", function () {
      filterByCategory(category);
    });

    container.appendChild(button);
  }
}
function renderProducts(productList) {
  const grid = document.getElementById("product-grid");
  grid.innerHTML = "";

  for (let i = 0; i < productList.length; i++) {
    const product = productList[i];

    const card = document.createElement("article");

    const nameEl = document.createElement("h3");
    nameEl.textContent = product.productName;

    const categoryEl = document.createElement("p");
    categoryEl.textContent = "Category: " + product.category;

    const priceEl = document.createElement("p");
    priceEl.textContent = "$" + product.price.toFixed(2);

    const button = document.createElement("button");
    button.textContent = "Add to Cart";

    button.addEventListener("click", function () {
      addToCart(product.productName);
    });

    card.appendChild(nameEl);
    card.appendChild(categoryEl);
    card.appendChild(priceEl);
    card.appendChild(button);
    grid.appendChild(card);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  renderCategoryButtons();
  renderProducts(products);
  updateCartCount();
});