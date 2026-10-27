let cart = [];
let products = [];


async function fetchProducts() {
    try {
        const response = await fetch('products.json');
        if (!response.ok) throw new Error('Failed to load products');
        products = await response.json();
        
        
        const foodItems = products.filter(p => p.category === 'food');
        const clothingItems = products.filter(p => p.category === 'clothes');

        displaySection('food-grid', foodItems);
        displaySection('clothes-grid', clothingItems);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}


function displaySection(containerId, items) {
    const grid = document.getElementById(containerId);
    if (!grid) return;

    grid.innerHTML = items.map(item => `
        <div class="product-card" style="width: 280px; padding: 20px; background-color: #F3F4F6; border: 2px solid #1D4ED8; border-radius: 10px; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <img src="${item.image}" alt="${item.title}" style="width: 100%; height: 180px; object-fit: cover; border-radius: 6px;" onerror="this.src='https://via.placeholder.com/280?text=Veyora+Item'" />
            <h3 style="font-size: 1.15rem; margin: 12px 0 6px 0; color: #1F2937;">${item.title}</h3>
            <p style="font-weight: bold; color: #F59E0B; margin: 5px 0 14px 0; font-size: 1.1rem;">KES ${item.price.toLocaleString()}</p>
            <button onclick="addToCart(${item.id})" style="width: 100%; padding: 10px; background-color: #1D4ED8; color: #FFFFFF; border: none; font-weight: bold; border-radius: 6px; cursor: pointer;">Add to Cart</button>
        </div>
    `).join('');
}


function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartUI();
}

function updateQuantity(productId, delta) {
    const item = cart.find(p => p.id === productId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(p => p.id !== productId);
    updateCartUI();
}

function updateCartUI() {
    const cartContainer = document.getElementById('cart-items');
    const totalContainer = document.getElementById('cart-total');
    
    if (!cartContainer || !totalContainer) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is currently empty.</p>';
        totalContainer.innerText = '0.00';
        return;
    }

    cartContainer.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        return `
            <div class="cart-item" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid rgba(29, 78, 216, 0.3); padding-bottom: 8px;">
                <div style="text-align: left;">
                    <strong style="color: #1F2937;">${item.title}</strong>
                    <div style="font-size: 0.9rem; color: #4B5563;">KES ${item.price.toLocaleString()} × ${item.quantity} = <strong>KES ${itemTotal.toLocaleString()}</strong></div>
                </div>
                <div style="display: flex; align-items: center; gap: 6px;">
                    <button onclick="updateQuantity(${item.id}, -1)" style="padding: 2px 8px; background-color: #1D4ED8; color: white; border:none; cursor:pointer;">-</button>
                    <span style="font-weight: bold; padding: 0 4px; color: #1F2937;">${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)" style="padding: 2px 8px; background-color: #1D4ED8; color: white; border:none; cursor:pointer;">+</button>
                    <button onclick="removeFromCart(${item.id})" style="background-color: #EF4444; color: white; padding: 2px 8px; border:none; cursor:pointer;">Delete</button>
                </div>
            </div>
        `;
    }).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalContainer.innerText = total.toLocaleString();
}


document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();

    
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            alert('Initiating M-Pesa STK Push / Payment Gateway...');
            cart = [];
            updateCartUI();
        });
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you! Your contact and delivery details have been submitted.');
            contactForm.reset();
        });
    }

    const feedbackBtn = document.getElementById('submit-feedback');
    if (feedbackBtn) {
        feedbackBtn.addEventListener('click', () => {
            const feedbackInput = document.getElementById('feedback-input');
            if (!feedbackInput || feedbackInput.value.trim() === '') {
                alert('Please type some feedback before submitting.');
                return;
            }
            alert('Thank you for your valuable feedback!');
            feedbackInput.value = '';
        });
    }
});