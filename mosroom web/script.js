const products = [
  { id: 1, name: "Button Mushrooms", price: 5.99, image: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Button_mushrooms.jpg" },
  { id: 2, name: "Shiitake Mushrooms", price: 8.99, image: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Shiitake_mushroom.jpg" },
  { id: 3, name: "Oyster Mushrooms", price: 7.49, image: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Oyster_mushrooms.jpg" },
  { id: 4, name: "Mushroom Grow Kit", price: 19.99, image: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Mushroom_grow_kit.jpg" }
];

const productList = document.getElementById("products");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const cartSidebar = document.getElementById("cart");

let cart = [];

function renderProducts() {
  products.forEach(p => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>$${p.price.toFixed(2)}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    productList.appendChild(card);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
    cartItems.appendChild(li);
    total += item.price;
  });
  cartTotal.textContent = total.toFixed(2);
  cartCount.textContent = cart.length;
}

document.getElementById("cart-btn").addEventListener("click", () => {
  cartSidebar.classList.toggle("active");
});

document.getElementById("checkout-btn").addEventListener("click", () => {
  alert("Redirecting to payment gateway...");
  // Stripe integration would go here
});

renderProducts();
