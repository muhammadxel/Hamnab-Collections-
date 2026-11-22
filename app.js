/**
 * HAMNAB COLLECTIONS - Live Google Sheets & Cart Engine
 */

const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSoaI95GuKKZCmtSslcBc98j0mqVBbbLlGBzIp5nN3kiKx_N7hwwAQvpTK0QYSvaw/pub?gid=2048597444&single=true&output=csv";

// Global State
let PRODUCTS = [];
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
document.addEventListener('DOMContentLoaded', async () => {
  updateCartUI();
  setupEventListeners();
  await loadProductsFromSheet();
});

// Fetch & Parse Google Sheet CSV
async function loadProductsFromSheet() {
  if (!productGrid) return;

  productGrid.innerHTML = `
    <div class="empty-state" style="grid-column: 1 / -1;">
      <p>Loading HAMNAB COLLECTIONS catalog...</p>
    </div>
  `;

  try {
    const separator = GOOGLE_SHEET_CSV_URL.includes('?') ? '&' : '?';
    const cacheBuster = `${GOOGLE_SHEET_CSV_URL}${separator}t=${Date.now()}`;
    const response = await fetch(cacheBuster);
    if (!response.ok) throw new Error("Failed to fetch Google Sheet");
    
    const csvText = await response.text();
    PRODUCTS = parseCSVToProducts(csvText);
    renderProducts();
  } catch (error) {
    console.error("Catalog load error:", error);
    productGrid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <p style="color: #b00020;">Unable to load live catalog. Please check your Google Sheet publish settings or refresh the page.</p>
      </div>
    `;
  }
}

// Robust CSV Parser
function parseCSVToProducts(csvText) {
  const rows = [];
  let currentRow = [];
  let currentField = '';
  let insideQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        currentField += '"';
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      currentRow.push(currentField.trim());
      currentField = '';
    } else if ((char === '\r' || char === '\n') && !insideQuotes) {
      if (char === '\r' && nextChar === '\n') i++;
      currentRow.push(currentField.trim());
      if (currentRow.some(cell => cell !== '')) rows.push(currentRow);
      currentRow = [];
      currentField = '';
    } else {
      currentField += char;
    }
  }
  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    if (currentRow.some(cell => cell !== '')) rows.push(currentRow);
  }

  return rows.slice(1)
    .filter(cols => cols[1] && cols[1].trim() !== '')
    .map((cols, index) => {
      const rawPrice = (cols[3] || "0").replace(/[^0-9.]/g, '');
      return {
        id: cols[0] || `item-${index + 1}`,
        name: cols[1] || "Unnamed Item",
        category: (cols[2] || "all").toLowerCase().trim(),
        price: Number(rawPrice) || 0,
        image: cols[4] || "placeholder.jpg",
        description: cols[5] || "",
        sizes: cols[6] ? cols[6].split(',').map(s => s.trim()).filter(Boolean) : ["Standard"],
        colors: cols[7] ? cols[7].split(',').map(c => c.trim()).filter(Boolean) : ["Default"],
        isCustomOrder: (cols[8] || "").toUpperCase() === "TRUE"
      };
    });
}

// Setup Event Listeners
function setupEventListeners() {
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('active'));
  });

  if (openCartBtn) openCartBtn.addEventListener('click', openCart);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
  if (cartOverlay) {
    cartOverlay.addEventListener('click', (e) => {
      if (e.target === cartOverlay) closeCart();
    });
  }

  if (searchInput) searchInput.addEventListener('input', renderProducts);
  if (sortSelect) sortSelect.addEventListener('change', renderProducts);

  categoryChips.forEach(chip => {
    chip.addEventListener('click', () => {
      categoryChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentCategory = chip.getAttribute('data-cat');
      renderProducts();
    });
  });

  if (whatsappCheckoutForm) {
    whatsappCheckoutForm.addEventListener('submit', handleWhatsAppCheckout);
  }

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

window.filterByCategory = function(category) {
  currentCategory = category;
  categoryChips.forEach(chip => {
    chip.classList.toggle('active', chip.getAttribute('data-cat') === category);
  });
  renderProducts();
};

function renderProducts() {
  if (!productGrid) return;
  let filtered = [...PRODUCTS];

  if (currentCategory !== 'all') {
    filtered = filtered.filter(p => p.category === currentCategory);
  }

  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
  if (query) {
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.description.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    );
  }

  const sortMode = sortSelect ? sortSelect.value : 'default';
  if (sortMode === 'low-to-high') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortMode === 'high-to-low') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortMode === 'name') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (filtered.length === 0) {
    productGrid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <p style="font-size: 1.1rem; color: #555;">No items found matching your current filter.</p>
        <button class="btn btn-primary" onclick="resetFilters()" style="margin-top: 14px;">View All Items</button>
      </div>
    `;
    return;
  }

  productGrid.innerHTML = filtered.map(item => {
    const sizeOptions = item.sizes.map(s => `<option value="${s}">Size: ${s}</option>`).join('');
    const colorOptions = item.colors.map(c => `<option value="${c}">Color: ${c}</option>`).join('');

    return `
      <article class="product-card" id="card-${item.id}">
        <div class="product-thumb">
          <img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.src='placeholder.jpg'">
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

window.resetFilters = function() {
  if (searchInput) searchInput.value = '';
  if (sortSelect) sortSelect.value = 'default';
  filterByCategory('all');
};

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

function saveCart() {
  localStorage.setItem('hamnab_cart', JSON.stringify(cart));
}

function updateCartUI() {
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
  if (cartCount) cartCount.textContent = totalItems;
  if (cartDrawerCount) cartDrawerCount.textContent = totalItems;

  if (!cartItemsList) return;

  if (cart.length === 0) {
    cartItemsList.innerHTML = `
      <div class="empty-state">
        <p>Your shopping bag is empty.</p>
        <button class="btn btn-primary" onclick="closeCart()" style="margin-top: 10px;">Start Shopping</button>
      </div>
    `;
    if (cartTotalDisplay) cartTotalDisplay.textContent = formatNaira(0);
    return;
  }

  let subtotal = 0;
  cartItemsList.innerHTML = cart.map(item => {
    const itemSubtotal = item.price * item.qty;
    subtotal += itemSubtotal;

    return `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-thumb" onerror="this.src='placeholder.jpg'">
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

  if (cartTotalDisplay) cartTotalDisplay.textContent = formatNaira(subtotal);
}

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

window.removeFromCart = function(cartItemId) {
  cart = cart.filter(i => i.cartItemId !== cartItemId);
  saveCart();
  updateCartUI();
};

function openCart() {
  if (cartOverlay) cartOverlay.classList.add('open');
}

function closeCart() {
  if (cartOverlay) cartOverlay.classList.remove('open');
}

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

  const siteBaseUrl = window.location.origin;

  let totalSum = 0;
  let itemsBreakdown = "";

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.qty;
    totalSum += itemTotal;
    
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
  
  cart = [];
  saveCart();
  updateCartUI();
  closeCart();

  window.open(encodedUrl, '_blank');
}
