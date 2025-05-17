//swiper
var swiper = new Swiper(".home", {
    spaceBetween: 30,
    centeredSlides: true,

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});


let cart = [];
const cartCount = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartItems = document.getElementById('cart-items');
const totalPrice = document.getElementById('total-price');

document.querySelectorAll('.products-container .box').forEach(item => {
    item.addEventListener('click', () => {
        const productName = item.querySelector('h2').innerText;
        const productPrice = parseFloat(item.querySelector('.price').innerText.replace('₱', '').replace(' each', ''));
        const productImage = item.querySelector('img').src;

        addToCart(productName, productPrice, productImage);
    });
});

function addToCart(name, price, image) {
    const existingProduct = cart.find(item => item.name === name && item.price === price && item.image === image);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }
    updateCart();
}

function updateCart() {
    cartCount.innerText = cart.reduce((total, item) => total + item.quantity, 0);
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        cartItems.innerHTML += `
            <div>
                <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;"/>
                ${item.name} - ₱${item.price.toFixed(2)} 
                <button class="quantity-btn" onclick="changeQuantity(${index}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="changeQuantity(${index}, 1)">+</button>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>`;
    });

    totalPrice.innerText = `₱${total.toFixed(2)}`;
}

function changeQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

document.getElementById('cart-icon').addEventListener('click', () => {
    cartModal.style.display = 'flex';
});

document.getElementById('close-cart').addEventListener('click', () => {
    cartModal.style.display = 'none';
});

document.getElementById('checkout-btn').addEventListener('click', () => {
    alert('Proceeding to checkout...');
});


let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navbar.classList.remove('active');
}