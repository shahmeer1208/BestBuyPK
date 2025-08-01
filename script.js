// Load products from localStorage or default
let products = JSON.parse(localStorage.getItem("products")) || [
  { id: 1, name: "Premium Sneakers", price: 3200, image: "images/sneakers.jpg" },
  { id: 2, name: "Smart Watch", price: 5999, image: "images/watch.jpg" },
  { id: 3, name: "Bluetooth Speaker", price: 2199, image: "images/speaker.jpg" },
  { id: 4, name: "Wireless Headphones", price: 3999, image: "images/headphones.jpg" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ✅ Display products on products.html
function showProducts() {
  const productList = document.getElementById("product-list");
  if (!productList) return;
  productList.innerHTML = "";
  products.forEach(p => {
    productList.innerHTML += `
      <div class="card">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>PKR ${p.price}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `;
  });
}

// ✅ Add to Cart
function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(product.name + " added to cart!");
}

// ✅ Show Cart
function showCart() {
  const cartItems = document.getElementById("cart-items");
  if (!cartItems) return;
  let total = 0;
  cartItems.innerHTML = "";
  cart.forEach((item, index) => {
    total += item.price;
    cartItems.innerHTML += `
      <div class="card">
        <h4>${item.name}</h4>
        <p>PKR ${item.price}</p>
        <button onclick="removeItem(${index})">Remove</button>
      </div>`;
  });
  document.getElementById("total").innerText = "Total: PKR " + total;
}

// ✅ Remove item from Cart
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

// ✅ Checkout Form
function handleCheckout() {
  const checkoutForm = document.getElementById("checkout-form");
  if (!checkoutForm) return;
  checkoutForm.addEventListener("submit", e => {
    e.preventDefault();
    alert("Order placed successfully! (Fictional)");
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "index.html";
  });
}

// ✅ Admin Panel (Add New Products)
function showAdminProducts() {
  const adminList = document.getElementById("admin-product-list");
  if (!adminList) return;
  adminList.innerHTML = "";
  products.forEach((p, index) => {
    adminList.innerHTML += `
      <div class="card">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>PKR ${p.price}</p>
        <button onclick="deleteProduct(${index})">Delete</button>
      </div>
    `;
  });
}

function deleteProduct(index) {
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  location.reload();
}

function handleAdminForm() {
  const adminForm = document.getElementById("admin-form");
  if (!adminForm) return;
  adminForm.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("product-name").value;
    const price = parseInt(document.getElementById("product-price").value);
    const image = document.getElementById("product-image").value;
    const newProduct = { id: Date.now(), name, price, image };
    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));
    alert("Product Added!");
    location.reload();
  });
}

// ✅ Run on Page Load
window.addEventListener("DOMContentLoaded", () => {
  showProducts();
  showCart();
  handleCheckout();
  showAdminProducts();
  handleAdminForm();
});
