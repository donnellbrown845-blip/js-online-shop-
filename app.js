import { fetchProducts } from "./products.js";
import { addToCart, removeFromCart, cart, viewCart } from "./cart.js";

let products = [];

function showError(message) {
    const errorEl = document.getElementById("error-message");
    if (errorEl) {
        errorEl.textContent = message;
    }
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
    try {
        addToCart(product);
        showError("");
        renderCart();
    } catch (error) {
        showError(error.message);
    } finally {
        updateCartCount();
    }
    });

    card.appendChild(nameEl);
    card.appendChild(categoryEl);
    card.appendChild(priceEl);
    card.appendChild(button);
    grid.appendChild(card);
  }
}

function renderCart() {
    const cartContainer = document.getElementById("cart-items");
    const totalEl = document.getElementById("cart-total");
    cartContainer.innerHTML = "";

    const cartView = viewCart();

    if (cartView.items.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        totalEl.textContent = "Total: $0.00";
        return;
    }

    for (let i = 0; i < cartView.items.length; i++) {
        const item = cartView.items[i];

        const card = document.createElement("article");

        const nameEl = document.createElement("h4");
        nameEl.textContent = item.productName + " (x" + (item.quantity || 1) + ")";

        const priceEl = document.createElement("p");
        priceEl.textContent = "$" + item.price.toFixed(2);

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", function () {
            removeFromCart(item.productName);
            renderCart();
            updateCartCount();
        });

        card.appendChild(nameEl);
        card.appendChild(priceEl);
        card.appendChild(removeBtn);
        cartContainer.appendChild(card);
    }

    totalEl.textContent = "Total: $" + cartView.total.toFixed(2);
}

async function init() {
    try {
        products = await fetchProducts();
        if (!products || products.length === 0) {
            showError("No products available.");
            products = [];
        }
    } catch (error) {
        showError(error.message);
        products = [];
    }

    renderCategoryButtons();
    renderProducts(products);
    updateCartCount();
    renderCart();
}

document.addEventListener("DOMContentLoaded", init); 