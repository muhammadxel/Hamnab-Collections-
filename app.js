/**
 * HAMNAB COLLECTIONS - Core Application Logic
 * Manages Rendering, Cart State, LocalStorage Persistence & WhatsApp Link Assembly
 */

// Global State
let currentCategory = 'all';
let cart = JSON.parse(localStorage.getItem('hamnab_cart')) || [];
const OFFICIAL_WHATSAPP = "2348064474487";

// Format Currency to Nigerian Naira
function formatNaira(amount) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0
  }).format(amount).replace("NGN", "₦");
}

// DOM Elements
const productGrid = document.getElementById('productGrid');
const cartOverlay = document.getElementById('cartOverlay');
const openCartBtn = document.getElementById('openCartBtn');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartCount = document.getElementById('cartCount');
const cartDrawerCount = document.getElementById('cartDrawerCount');
const cartItemsList = document.getElementById('cartItemsList');
const cartTotalDisplay = document.getElementById('cartTotalDisplay');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');
const categoryChips = document.querySelectorAll('.category-chip');
const whatsappCheckoutForm = document.getElementById('whatsappCheckoutForm');
const quickContactForm = document.getElementById('quickContactForm');

// Initialize Website
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartUI();
  setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
  // Mobile Nav Toggle
  mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close nav on click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('active'));
  });

  // Cart Drawer open/close
  openCartBtn.addEventListener('click', openCart);
  closeCartBtn.addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', (e) => {
    if (e.target === cartOverlay) closeCart();
  });

  // Search input
  searchInput.addEventListener('input', () => {
    renderProducts();
  });

  // Sort select
  sortSelect.addEventListener('change', () => {
    renderProducts();
  });

  // Category chips
  categoryChips.forEach(chip => {
    chip.addEventListener('click', () => {
      categoryChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentCategory = chip.getAttribute('data-cat');
      renderProducts();
    });
  });

  // WhatsApp Checkout Form Submission
  whatsappCheckoutForm.addEventListener('submit', handleWhatsAppCheckout);

  // Quick Contact Form Submission
  if (quickContactForm) {
    quickContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName').value.trim();
      const subject = document.getElementById('contactSubject').value.trim();
      const msg = document.getElementById('contactMessage').value.trim();
      
      const text = `*New Customer Inquiry - HAMNAB COLLECTIONS*\n\n` +
                   `*Name:* ${name}\n` +
                   `*Subject:* ${subject}\n\n` +
                   `*Message:* ${msg}`;

      const waURL = `https://wa.me/${OFFICIAL_WHATSAPP}?text=${encodeURIComponent(text)}`;
      window.open(waURL, '_blank');
    });
  }
}

// Category filter function triggered from navigation
window.filterByCategory = function(category) {
  currentCategory = category;
  categoryChips.forEach(chip => {
    if (chip.getAttribute('data-cat') === category) {
      chip.classList.add('active');
    } else {
      chip.classList.remove('active');
    }
  });
  renderProducts();
};

// Render Products Grid
function renderProducts() {
  let filtered = [...PRODUCTS];

  // 1. Filter by Category
  if (currentCategory !== 'all') {
    filtered = filtered.filter(p => p.category === currentCategory);
  }

  // 2. Filter by Search Query
  const query = searchInput.value.toLowerCase().trim();
  if (query) {
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.description.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    );
  }

  // 3. Sort Results
  const sortMode = sortSelect.value;
  if (sortMode === 'low-to-high') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortMode === 'high-to-low') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortMode === 'name') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  // Handle Empty State
  if (filtered.length === 0) {
    productGrid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <p style="font-size: 1.1rem; color: #555;">No items found matching your current filter.</p>
        <button class="btn btn-primary" onclick="resetFilters()" style="margin-top: 14px;">View All Items</button>
      </div>
    `;
    return;
  }

  // Generate Card HTML
  productGrid.innerHTML = filtered.map(item => {
    const sizeOptions = item.sizes.map(s => `<option value="${s}">Size: ${s}</option>`).join('');
    const colorOptions = item.colors.map(c => `<option value="${c}">Color: ${c}</option>`).join('');

    return `
      <article class="product-card" id="card-${item.id}">
        <div class="product-thumb">
          <img src="${item.image}" alt="${item.name}" loading="lazy">
          ${item.isCustomOrder ? '<span class="product-tag">Bespoke Option</span>' : ''}
        </div>
        <div class="product-info">
          <span class="product-cat">${item.category}</span>
          <h3 class="product-title">${item.name}</h3>
          <p class="product-desc">${item.description}</p>
          <div class="product-price">${formatNaira(item.price)}</div>

          <div class="variant-selectors">
            <select id="size-${item.id}">${sizeOptions}</select>
            <select id="color-${item.id}">${colorOptions}</select>
          </div>

          <div class="card-actions">
            <button class="btn btn-primary" onclick="addToCart('${item.id}')">Add To Bag</button>
            <button class="btn btn-whatsapp" onclick="directWhatsAppOrder('${item.id}')" title="Direct WhatsApp order">
              Instant WA
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// Reset Search and Filters
window.resetFilters = function() {
  searchInput.value = '';
  sortSelect.value = 'default';
  filterByCategory('all');
};

// Add to Shopping Bag
window.addToCart = function(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const sizeSelect = document.getElementById(`size-${productId}`);
  const colorSelect = document.getElementById(`color-${productId}`);
  const selectedSize = sizeSelect ? sizeSelect.value : product.sizes[0];
  const selectedColor = colorSelect ? colorSelect.value : product.colors[0];

  const cartItemId = `${product.id}_${selectedSize}_${selectedColor}`;
  const existingItem = cart.find(item => item.cartItemId === cartItemId);

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({
      cartItemId: cartItemId,
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
      qty: 1
    });
  }

  saveCart();
  updateCartUI();
  openCart();
};

// Instant Direct WhatsApp Order for a Single Product
window.directWhatsAppOrder = function(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const sizeSelect = document.getElementById(`size-${productId}`);
  const colorSelect = document.getElementById(`color-${productId}`);
  const selectedSize = sizeSelect ? sizeSelect.value : product.sizes[0];
  const selectedColor = colorSelect ? colorSelect.value : product.colors[0];

  const siteBaseUrl = window.location.origin;
  const photoUrl = product.image.startsWith('http') 
    ? product.image 
    : `${siteBaseUrl}/${product.image.replace(/^\//, '')}`;

  const text = `*Direct Product Order - HAMNAB COLLECTIONS*\n\n` +
               `*Item:* ${product.name}\n` +
               `*Price:* ${formatNaira(product.price)}\n` +
               `*Selected Size:* ${selectedSize}\n` +
               `*Selected Color:* ${selectedColor}\n` +
               `*Product Photo:* ${photoUrl}\n\n` +
               `Please confirm if this piece is available for delivery.`;

  const waURL = `https://wa.me/${OFFICIAL_WHATSAPP}?text=${encodeURIComponent(text)}`;
  window.open(waURL, '_blank');
};

// Save Cart to LocalStorage
function saveCart() {
  localStorage.setItem('hamnab_cart', JSON.stringify(cart));
}

// Update Cart Visuals
function updateCartUI() {
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
  cartCount.textContent = totalItems;
  cartDrawerCount.textContent = totalItems;

  if (cart.length === 0) {
    cartItemsList.innerHTML = `
      <div class="empty-state">
        <p>Your shopping bag is empty.</p>
        <button class="btn btn-primary" onclick="closeCart()" style="margin-top: 10px;">Start Shopping</button>
      </div>
    `;
    cartTotalDisplay.textContent = formatNaira(0);
    return;
  }

  let subtotal = 0;
  cartItemsList.innerHTML = cart.map(item => {
    const itemSubtotal = item.price * item.qty;
    subtotal += itemSubtotal;

    return `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-thumb">
        <div class="cart-item-details">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-meta">Size: ${item.size} | Color: ${item.color}</div>
          <div class="cart-item-price">${formatNaira(item.price)} each</div>
          <div class="cart-qty-ctrl">
            <button class="qty-btn" onclick="changeQty('${item.cartItemId}', -1)">-</button>
            <span style="font-weight: 600;">${item.qty}</span>
            <button class="qty-btn" onclick="changeQty('${item.cartItemId}', 1)">+</button>
            <button onclick="removeFromCart('${item.cartItemId}')" style="background:none; border:none; color:red; margin-left:12px; cursor:pointer; font-size:0.8rem;">Remove</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  cartTotalDisplay.textContent = formatNaira(subtotal);
}

// Adjust Quantity
window.changeQty = function(cartItemId, delta) {
  const item = cart.find(i => i.cartItemId === cartItemId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.cartItemId !== cartItemId);
  }

  saveCart();
  updateCartUI();
};

// Remove single product from cart
window.removeFromCart = function(cartItemId) {
  cart = cart.filter(i => i.cartItemId !== cartItemId);
  saveCart();
  updateCartUI();
};

// Cart Drawer open/close functions
function openCart() {
  cartOverlay.classList.add('open');
}

function closeCart() {
  cartOverlay.classList.remove('open');
}

// Generate WhatsApp Checkout Message with Photo Links
function handleWhatsAppCheckout(e) {
  e.preventDefault();

  if (cart.length === 0) {
    alert("Your shopping bag is empty. Please select an item first.");
    return;
  }

  const name = document.getElementById('custName').value.trim();
  const phone = document.getElementById('custPhone').value.trim();
  const address = document.getElementById('custAddress').value.trim();
  const notes = document.getElementById('custNotes').value.trim();

  // Get current website base URL (e.g., https://hamnab-collections.vercel.app/)
  const siteBaseUrl = window.location.origin;

  let totalSum = 0;
  let itemsBreakdown = "";

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.qty;
    totalSum += itemTotal;
    
    // Construct direct photo link
    const itemPhotoUrl = item.image.startsWith('http') 
      ? item.image 
      : `${siteBaseUrl}/${item.image.replace(/^\//, '')}`;

    itemsBreakdown += `${index + 1}. *${item.name}*\n` +
                      `   • Size: ${item.size} | Color: ${item.color}\n` +
                      `   • Qty: ${item.qty} x ${formatNaira(item.price)} = ${formatNaira(itemTotal)}\n` +
                      `   • Item Photo: ${itemPhotoUrl}\n\n`;
  });

  const messageText = 
`*NEW ORDER - HAMNAB COLLECTIONS*
----------------------------------------
*Customer Information:*
- *Name:* ${name}
- *Phone:* ${phone}
- *Delivery Location:* ${address}
${notes ? `- *Special Instructions:* ${notes}\n` : ''}
----------------------------------------
*Ordered Items & Photos:*
${itemsBreakdown}----------------------------------------
*TOTAL AMOUNT:* *${formatNaira(totalSum)}*
----------------------------------------
_Please review the order and photos, confirm availability, and provide payment details._`;

  const encodedUrl = `https://wa.me/${OFFICIAL_WHATSAPP}?text=${encodeURIComponent(messageText)}`;
  
  // Clear cart and close drawer
  cart = [];
  saveCart();
  updateCartUI();
  closeCart();

  // Open WhatsApp
  window.open(encodedUrl, '_blank');
}
