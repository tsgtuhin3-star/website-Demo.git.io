"use strict";

/**
FLIPKART CLONE - TUHIN ENTERPRISE STOREFRONT ENGINE
Features:
- Complete exhaustive iPhone & Multi-brand catalog
- Flipkart-style Color, RAM & ROM variant selectors
- Real-time filtering & live debounce search
- Auto-sliding hero carousel with controls
- Animated "Fly to Cart" 3D physics animation
- Persistent cart management & subtotal calculations
- Free shipping progress bar & secure checkout
*/
// ==========================================
// 1. EXPANDED COMPLETE PRODUCT CATALOG DATA
// ==========================================
var COMPLETE_IPHONE_MODELS = [{
  name: "Apple iPhone 16 Pro Max",
  storage: ["256 GB", "512 GB", "1 TB"],
  colors: ["Desert Titanium", "Natural Titanium", "White Titanium", "Black Titanium"],
  basePrice: 144900
}, {
  name: "Apple iPhone 16 Pro",
  storage: ["128 GB", "256 GB", "512 GB", "1 TB"],
  colors: ["Desert Titanium", "Natural Titanium", "White Titanium", "Black Titanium"],
  basePrice: 119900
}, {
  name: "Apple iPhone 16 Plus",
  storage: ["128 GB", "256 GB", "512 GB"],
  colors: ["Ultramarine", "Teal", "Pink", "White", "Black"],
  basePrice: 89900
}, {
  name: "Apple iPhone 16",
  storage: ["128 GB", "256 GB", "512 GB"],
  colors: ["Ultramarine", "Teal", "Pink", "White", "Black"],
  basePrice: 79900
}, {
  name: "Apple iPhone 15 Pro Max",
  storage: ["256 GB", "512 GB", "1 TB"],
  colors: ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"],
  basePrice: 139900
}, {
  name: "Apple iPhone 15 Pro",
  storage: ["128 GB", "256 GB", "512 GB", "1 TB"],
  colors: ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"],
  basePrice: 119900
}, {
  name: "Apple iPhone 15 Plus",
  storage: ["128 GB", "256 GB", "512 GB"],
  colors: ["Black", "Blue", "Green", "Yellow", "Pink"],
  basePrice: 69900
}, {
  name: "Apple iPhone 15",
  storage: ["128 GB", "256 GB", "512 GB"],
  colors: ["Black", "Blue", "Green", "Yellow", "Pink"],
  basePrice: 59900
}, {
  name: "Apple iPhone 14 Pro Max",
  storage: ["128 GB", "256 GB", "512 GB", "1 TB"],
  colors: ["Deep Purple", "Gold", "Silver", "Space Black"],
  basePrice: 109900
}, {
  name: "Apple iPhone 14 Pro",
  storage: ["128 GB", "256 GB", "512 GB", "1 TB"],
  colors: ["Deep Purple", "Gold", "Silver", "Space Black"],
  basePrice: 99900
}, {
  name: "Apple iPhone 14 Plus",
  storage: ["128 GB", "256 GB", "512 GB"],
  colors: ["Starlight", "Midnight", "Blue", "Purple", "Red"],
  basePrice: 66900
}, {
  name: "Apple iPhone 14",
  storage: ["128 GB", "256 GB", "512 GB"],
  colors: ["Starlight", "Midnight", "Blue", "Purple", "Red"],
  basePrice: 57900
}, {
  name: "Apple iPhone 13 Pro Max",
  storage: ["128 GB", "256 GB", "512 GB", "1 TB"],
  colors: ["Sierra Blue", "Graphite", "Gold", "Silver", "Alpine Green"],
  basePrice: 89900
}, {
  name: "Apple iPhone 13 Pro",
  storage: ["128 GB", "256 GB", "512 GB", "1 TB"],
  colors: ["Sierra Blue", "Graphite", "Gold", "Silver", "Alpine Green"],
  basePrice: 79900
}, {
  name: "Apple iPhone 13",
  storage: ["128 GB", "256 GB", "512 GB"],
  colors: ["Starlight", "Midnight", "Blue", "Pink", "Red", "Green"],
  basePrice: 52900
}, {
  name: "Apple iPhone 12 Pro Max",
  storage: ["128 GB", "256 GB", "512 GB"],
  colors: ["Pacific Blue", "Gold", "Silver", "Graphite"],
  basePrice: 74900
}, {
  name: "Apple iPhone 12",
  storage: ["64 GB", "128 GB", "256 GB"],
  colors: ["Black", "White", "Red", "Green", "Blue", "Purple"],
  basePrice: 45900
}, {
  name: "Apple iPhone 11",
  storage: ["64 GB", "128 GB", "256 GB"],
  colors: ["Black", "Green", "Yellow", "Purple", "Red", "White"],
  basePrice: 36900
}, {
  name: "Apple iPhone X",
  storage: ["64 GB", "256 GB"],
  colors: ["Silver", "Space Gray"],
  basePrice: 29900
}, {
  name: "Apple iPhone 8",
  storage: ["64 GB", "128 GB", "256 GB"],
  colors: ["Silver", "Space Gray", "Gold", "Red"],
  basePrice: 18900
}, {
  name: "Apple iPhone 7",
  storage: ["32 GB", "128 GB", "256 GB"],
  colors: ["Jet Black", "Black", "Silver", "Gold", "Rose Gold", "Red"],
  basePrice: 13990
}, {
  name: "Apple iPhone 6s",
  storage: ["16 GB", "32 GB", "64 GB", "128 GB"],
  colors: ["Silver", "Space Gray", "Gold", "Rose Gold"],
  basePrice: 10900
}, {
  name: "Apple iPhone SE (3rd Gen)",
  storage: ["64 GB", "128 GB", "256 GB"],
  colors: ["Midnight", "Starlight", "Product Red"],
  basePrice: 43900
}];
var PRODUCTS = [{
  id: 1,
  name: "Apple iPhone 15 Pro (Natural Titanium, 128 GB)",
  category: "mobiles",
  price: 119900,
  originalPrice: 134900,
  discount: 11,
  rating: 4.7,
  reviewsCount: "12,450",
  image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&auto=format&fit=crop&q=80",
  assured: true,
  isDealOfDay: true,
  dealTag: "Hot Deal of the Week",
  specs: ["128 GB ROM, Super Retina XDR Display", "48MP + 12MP + 12MP Pro Camera System", "A17 Pro Chip", "Titanium Design"],
  storageOptions: ["128 GB", "256 GB", "512 GB", "1 TB"],
  colorOptions: ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"]
}, {
  id: 2,
  name: "Samsung Galaxy S24 Ultra 5G (Titanium Gray, 256 GB)",
  category: "mobiles",
  price: 129999,
  originalPrice: 144999,
  discount: 10,
  rating: 4.8,
  reviewsCount: "8,920",
  image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&auto=format&fit=crop&q=80",
  assured: true,
  isDealOfDay: true,
  dealTag: "Extra ₹10,000 Off",
  specs: ["12 GB RAM | 256 GB ROM", "200MP Quad Camera with Galaxy AI", "Snapdragon 8 Gen 3"],
  storageOptions: ["256 GB", "512 GB", "1 TB"],
  colorOptions: ["Titanium Gray", "Titanium Black", "Titanium Violet", "Titanium Yellow"]
}, {
  id: 3,
  name: "Apple 2024 MacBook Air M3 (13.6 inch, 8GB, 256GB SSD)",
  category: "laptops",
  price: 104990,
  originalPrice: 114900,
  discount: 9,
  rating: 4.8,
  reviewsCount: "3,110",
  image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=80",
  assured: true,
  isDealOfDay: true,
  dealTag: "Bank Offer: ₹5,000 Instant",
  specs: ["Apple M3 chip with 8-core CPU", "13.6-inch Liquid Retina Display", "Up to 18 hours battery life"],
  storageOptions: ["256 GB SSD", "512 GB SSD", "1 TB SSD"],
  colorOptions: ["Midnight", "Starlight", "Space Gray", "Silver"]
}]; // Automatically inject all historical iPhones into the PRODUCTS catalog with variant controls

COMPLETE_IPHONE_MODELS.forEach(function (model, index) {
  PRODUCTS.push({
    id: 500 + index,
    name: "".concat(model.name, " (").concat(model.storage[0], ", ").concat(model.colors[0], ")"),
    category: "mobiles",
    price: model.basePrice,
    originalPrice: Math.ceil(model.basePrice * 1.15 / 100) * 100,
    discount: 10 + index % 15,
    rating: Number((4.3 + index % 5 / 10).toFixed(1)),
    reviewsCount: "".concat((1200 + index * 145).toLocaleString('en-IN')),
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&auto=format&fit=crop&q=80",
    assured: true,
    isDealOfDay: index % 4 === 0,
    dealTag: "Classic iPhone Vault",
    specs: ["Storage Options: ".concat(model.storage.join(', ')), "Available Finishes: ".concat(model.colors.join(', ')), "Tuhin Assured Quality & Verified Refurbished/New Options"],
    storageOptions: model.storage,
    colorOptions: model.colors,
    basePrice: model.basePrice
  });
}); // ==========================================
// 2. APPLICATION STATE & VARIANT MANAGEMENT
// ==========================================

var state = {
  activeCategory: 'all',
  searchQuery: '',
  sortBy: 'popularity',
  cart: JSON.parse(localStorage.getItem('fk_cart')) || [],
  wishlist: JSON.parse(localStorage.getItem('fk_wishlist')) || [],
  currentSlide: 0
};
var productSelections = {};

function handleVariantChange(productId, type, value) {
  if (!productSelections[productId]) {
    var prod = PRODUCTS.find(function (p) {
      return p.id === productId;
    });
    productSelections[productId] = {
      storage: prod && prod.storageOptions ? prod.storageOptions[0] : 'Standard',
      color: prod && prod.colorOptions ? prod.colorOptions[0] : 'Default'
    };
  }

  productSelections[productId][type] = value;
  var baseProd = PRODUCTS.find(function (p) {
    return p.id === productId;
  });

  if (baseProd) {
    var multiplier = 1;

    if (type === 'storage') {
      if (value.includes('512 GB')) multiplier = 1.15;
      if (value.includes('1 TB')) multiplier = 1.30;
      if (value.includes('32 GB') || value.includes('16 GB')) multiplier = 0.85;
    }

    var currentBase = baseProd.basePrice || baseProd.price;
    var adjustedPrice = Math.round(currentBase * multiplier);
    var cardEl = document.getElementById("product-".concat(productId)) || document.querySelector("[data-phone-id=\"".concat(productId, "\"]"));

    if (cardEl) {
      var priceEl = cardEl.querySelector('.price-current') || cardEl.querySelector('.mobile-phone-price strong');
      if (priceEl) priceEl.innerText = "\u20B9".concat(adjustedPrice.toLocaleString('en-IN'));
    }
  }
} // ==========================================
// 3. INITIALIZATION ON DOM LOAD
// ==========================================


document.addEventListener('DOMContentLoaded', function () {
  initEnterpriseLogin();
  renderDealsStrip();
  renderProducts();
  updateCartBadge();
  updateWishlistBadge();
  initCarousel();
  startCountdownTimer();
  initSearchInput();
  initMobileInterface();
  initPaymentMethods();
}); // ==========================================
// 3A. AUTHENTICATION & LOGIN GATE
// ==========================================

function initEnterpriseLogin() {
  var loginScreen = document.getElementById('loginScreen');
  var loginForm = document.getElementById('enterpriseLoginForm');
  var loginButton = document.getElementById('loginBtn');
  var accountPanel = document.getElementById('accountPanel');
  var accountName = document.getElementById('accountName');
  var accountIdentity = document.getElementById('accountIdentity');
  var accountDetailsIdentity = document.getElementById('accountDetailsIdentity');
  var accountAvatar = document.getElementById('accountAvatar');
  var accountLogoutButton = document.getElementById('accountLogoutBtn');
  var accountOrdersButton = document.getElementById('accountOrdersBtn');
  var ordersHistory = document.getElementById('ordersHistory');
  var accountProfileButton = document.getElementById('accountProfileBtn');
  var profileDetails = document.getElementById('profileDetails');
  var profileName = document.getElementById('profileName');
  var profileEmail = document.getElementById('profileEmail');
  var profilePhone = document.getElementById('profilePhone');
  var profileLocation = document.getElementById('profileLocation');
  var createAccountLink = document.getElementById('createAccountLink');
  var loginProfileFields = document.getElementById('loginProfileFields');
  var loginTitle = document.getElementById('loginTitle');
  var loginSubtitle = document.querySelector('.login-card-subtitle');
  var loginSubmitLabel = loginForm ? loginForm.querySelector('.enterprise-login-btn span') : null;
  var passwordInput = document.getElementById('loginPassword');
  var confirmPasswordField = document.querySelector('.confirm-password-field');
  var confirmPasswordInput = document.getElementById('confirmPassword');
  var passwordToggle = document.getElementById('passwordToggle');
  var forgotPasswordLink = document.getElementById('forgotPasswordLink');
  if (!loginScreen || !loginForm) return;

  var setAuthenticated = function setAuthenticated() {
    var identity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : localStorage.getItem('te_identity') || 'Customer';
    var cleanIdentity = identity.trim() || 'Customer';
    var savedName = localStorage.getItem('te_name') || '';
    var savedPhone = localStorage.getItem('te_phone') || '';
    var savedLocation = localStorage.getItem('te_location') || '';
    var displayName = savedName || (cleanIdentity.includes('@') ? cleanIdentity.split('@')[0] : cleanIdentity);
    var initials = displayName.split(/\s+/).map(function (part) {
      return part[0];
    }).join('').slice(0, 2).toUpperCase();
    localStorage.setItem('te_identity', cleanIdentity);
    localStorage.setItem('te_authenticated', 'true');
    loginButton.classList.add('signed-in');
    loginButton.innerHTML = '<span class="account-dot"></span><span>Signed in</span>';
    accountName.textContent = displayName;
    accountIdentity.textContent = cleanIdentity;
    accountDetailsIdentity.textContent = cleanIdentity;
    accountAvatar.textContent = initials || 'TE';
    profileName.textContent = displayName;
    profileEmail.textContent = cleanIdentity;
    profilePhone.textContent = savedPhone || 'Not added';
    profileLocation.textContent = savedLocation || 'Not added';
  };

  document.body.classList.add('login-active');
  loginScreen.classList.remove('is-hidden', 'login-complete');

  if (localStorage.getItem('te_authenticated') === 'true') {
    setAuthenticated();
  }

  loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    if (loginForm.classList.contains('create-mode') && passwordInput.value !== confirmPasswordInput.value) {
      confirmPasswordInput.focus();
      showToast('Passwords do not match.');
      return;
    }

    localStorage.setItem('te_name', document.getElementById('loginName').value.trim());
    localStorage.setItem('te_phone', document.getElementById('loginPhone').value.trim());
    localStorage.setItem('te_location', document.getElementById('loginLocation').value.trim());
    setAuthenticated(document.getElementById('loginIdentity').value);
    loginScreen.classList.add('login-complete');
    setTimeout(function () {
      loginScreen.classList.add('is-hidden');
      document.body.classList.remove('login-active');
    }, 650);
    showToast('Welcome to Tuhin Enterprise! ✨');
  });

  if (createAccountLink) {
    createAccountLink.addEventListener('click', function () {
      var creatingAccount = loginForm.classList.toggle('create-mode');
      loginProfileFields.hidden = !creatingAccount;
      confirmPasswordField.hidden = !creatingAccount;
      confirmPasswordInput.required = creatingAccount;
      loginTitle.textContent = creatingAccount ? 'Create your account' : 'Welcome back';
      loginSubtitle.textContent = creatingAccount ? 'Create a secure account to manage your Tuhin shopping.' : 'Sign in to continue to Tuhin Enterprise.';
      if (loginSubmitLabel) loginSubmitLabel.textContent = creatingAccount ? 'Create account' : 'Enter Enterprise';
      createAccountLink.textContent = creatingAccount ? 'Already have an account? Sign in' : 'New here? Create an account';
    });
  }

  if (passwordToggle) {
    passwordToggle.addEventListener('click', function () {
      var isPassword = passwordInput.type === 'password';
      passwordInput.type = isPassword ? 'text' : 'password';
      passwordToggle.textContent = isPassword ? 'Hide' : 'Show';
    });
  }

  loginButton.addEventListener('click', function (event) {
    event.stopPropagation();

    if (localStorage.getItem('te_authenticated') === 'true') {
      accountPanel.hidden = !accountPanel.hidden;
      return;
    }

    loginScreen.classList.remove('is-hidden', 'login-complete');
    document.body.classList.add('login-active');
  });

  if (accountLogoutButton) {
    accountLogoutButton.addEventListener('click', function () {
      localStorage.removeItem('te_authenticated');
      localStorage.removeItem('te_identity');
      accountPanel.hidden = true;
      loginButton.classList.remove('signed-in');
      loginButton.innerHTML = '<span>Login</span>';
      loginScreen.classList.remove('is-hidden', 'login-complete');
      document.body.classList.add('login-active');
      showToast('You have been signed out.');
    });
  }
} // ==========================================
// 4. HERO CAROUSEL CONTROLLER
// ==========================================


function initCarousel() {
  var track = document.getElementById('carouselTrack');
  var slides = document.querySelectorAll('.carousel-slide');
  var dots = document.querySelectorAll('.dot');
  if (!track || slides.length === 0) return;
  var autoSlideTimer;

  function goToSlide(index) {
    state.currentSlide = (index + slides.length) % slides.length;
    track.style.transform = "translateX(-".concat(state.currentSlide * 100, "%)");
    dots.forEach(function (dot, i) {
      return dot.classList.toggle('active', i === state.currentSlide);
    });
  }

  function startAutoPlay() {
    autoSlideTimer = setInterval(function () {
      return goToSlide(state.currentSlide + 1);
    }, 4500);
  }

  function stopAutoPlay() {
    clearInterval(autoSlideTimer);
  }

  var nextBtn = document.getElementById('nextSlideBtn');
  var prevBtn = document.getElementById('prevSlideBtn');
  if (nextBtn) nextBtn.addEventListener('click', function () {
    stopAutoPlay();
    goToSlide(state.currentSlide + 1);
    startAutoPlay();
  });
  if (prevBtn) prevBtn.addEventListener('click', function () {
    stopAutoPlay();
    goToSlide(state.currentSlide - 1);
    startAutoPlay();
  });
  dots.forEach(function (dot, idx) {
    return dot.addEventListener('click', function () {
      stopAutoPlay();
      goToSlide(idx);
      startAutoPlay();
    });
  });
  startAutoPlay();
} // ==========================================
// 5. DEALS & PRODUCT CATALOG RENDERING
// ==========================================


function renderDealsStrip() {
  var container = document.getElementById('dealsScrollContainer');
  if (!container) return;
  var deals = PRODUCTS.filter(function (p) {
    return p.isDealOfDay;
  });
  container.innerHTML = deals.map(function (item) {
    return "\n    <div class=\"deal-card\" onclick=\"openQuickView(".concat(item.id, ")\">\n      <div class=\"deal-img-wrap\"><img src=\"").concat(item.image, "\" alt=\"").concat(item.name, "\" class=\"deal-img\" loading=\"lazy\"></div>\n      <div class=\"deal-title\">").concat(item.name, "</div>\n      <div class=\"deal-discount\">Up to ").concat(item.discount, "% Off</div>\n      <div class=\"deal-tag\">").concat(item.dealTag || 'Special Offer', "</div>\n    </div>\n  ");
  }).join('');
}

function renderProducts() {
  var grid = document.getElementById('productGrid');
  var emptyState = document.getElementById('emptyState');
  if (!grid) return;
  var list = PRODUCTS;

  if (state.searchQuery.trim() !== '') {
    var q = state.searchQuery.toLowerCase();
    list = list.filter(function (p) {
      return p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    });
  } else if (state.activeCategory !== 'all') {
    list = list.filter(function (p) {
      return p.category === state.activeCategory;
    });
  }

  if (list.length === 0) {
    grid.innerHTML = '';
    if (emptyState) emptyState.style.display = 'flex';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';
  grid.innerHTML = list.map(function (item) {
    var isWishlisted = state.wishlist.includes(item.id);
    return "\n      <article class=\"product-card\" id=\"product-".concat(item.id, "\">\n        <span class=\"discount-ribbon\">").concat(item.discount, "% OFF</span>\n        <button class=\"wishlist-btn ").concat(isWishlisted ? 'active' : '', "\" onclick=\"toggleWishlist(").concat(item.id, ", this, event)\">\u2764\uFE0F</button>\n        <div class=\"card-img-container\" onclick=\"openQuickView(").concat(item.id, ")\">\n          <img src=\"").concat(item.image, "\" alt=\"").concat(item.name, "\" class=\"product-thumb\" loading=\"lazy\">\n        </div>\n        <div class=\"card-details\">\n          <h3 class=\"product-name\">").concat(item.name, "</h3>\n          <div class=\"rating-assured-row\">\n            <span class=\"rating-badge\">").concat(item.rating, " \u2605</span>\n            <span class=\"rating-count\">(").concat(item.reviewsCount, ")</span>\n          </div>\n          <div class=\"price-container\">\n            <span class=\"price-current\">\u20B9").concat(item.price.toLocaleString('en-IN'), "</span>\n            <span class=\"price-original\">\u20B9").concat(item.originalPrice.toLocaleString('en-IN'), "</span>\n          </div>\n          <div class=\"card-actions\">\n            <button class=\"quick-view-btn\" onclick=\"openQuickView(").concat(item.id, ")\">Quick View</button>\n            <button class=\"add-cart-btn\" onclick=\"addToCart(").concat(item.id, ", event)\">Add to Cart</button>\n          </div>\n        </div>\n      </article>\n    ");
  }).join('');
} // ==========================================
// 6. CATEGORY HUBS & MOBILE MARKETPLACE
// ==========================================


function filterCategory(category, el) {
  if (['mobiles', 'laptops', 'audio', 'fashion', 'beauty'].includes(category)) {
    openCategoryInterface(category);
    return;
  }

  state.activeCategory = category;
  document.querySelectorAll('.category-item').forEach(function (item) {
    return item.classList.remove('active');
  });
  if (el) el.classList.add('active');
  renderProducts();
}

function openCategoryInterface(category) {
  var mobileInterface = document.getElementById('mobileInterface');
  if (!mobileInterface) return;
  mobileInterface.dataset.category = category;
  mobileInterface.classList.add('open');
  document.body.classList.add('mobile-interface-active');
  renderMobileInterface('all');
}

function closeMobileInterface() {
  var mobileInterface = document.getElementById('mobileInterface');
  if (mobileInterface) mobileInterface.classList.remove('open');
  document.body.classList.remove('mobile-interface-active');
}

function renderMobileInterface() {
  var brand = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'all';
  var searchQuery = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var grid = document.getElementById('mobilePhoneGrid');
  var count = document.getElementById('mobileResultCount');
  if (!grid) return;
  var category = document.getElementById('mobileInterface').dataset.category || 'mobiles';
  var phones = PRODUCTS.filter(function (p) {
    return p.category === category;
  });
  if (count) count.textContent = "".concat(phones.length, " products available");
  grid.innerHTML = phones.map(function (phone) {
    return "\n    <article class=\"mobile-phone-card\" data-phone-id=\"".concat(phone.id, "\">\n      <div class=\"mobile-phone-image\" onclick=\"openQuickView(").concat(phone.id, ")\">\n        <span class=\"mobile-phone-discount\">").concat(phone.discount, "% OFF</span>\n        <img src=\"").concat(phone.image, "\" alt=\"").concat(phone.name, "\" loading=\"lazy\">\n      </div>\n      <div class=\"mobile-phone-info\">\n        <h3><span class=\"mobile-name-highlight\">").concat(phone.name, "</span></h3>\n        <div class=\"mobile-phone-price\"><strong>\u20B9").concat(phone.price.toLocaleString('en-IN'), "</strong></div>\n        <div class=\"mobile-phone-actions\">\n          <button class=\"quick-view-btn\" onclick=\"openQuickView(").concat(phone.id, ")\">Quick View</button>\n          <button class=\"add-cart-btn\" onclick=\"addToCart(").concat(phone.id, ", event)\">Add to Cart</button>\n        </div>\n      </div>\n    </article>\n  ");
  }).join('');
} // ==========================================
// 7. SEARCH SYSTEM & AUTO-SUGGESTIONS
// ==========================================


function initSearchInput() {
  var input = document.getElementById('searchInput');
  if (!input) return;
  input.addEventListener('input', function (e) {
    state.searchQuery = e.target.value.trim();
    renderProducts();
  });
} // ==========================================
// 8. CART & CHECKOUT ENGINE
// ==========================================


function addToCart(productId, event) {
  var product = PRODUCTS.find(function (p) {
    return p.id === productId;
  });
  if (!product) return;
  var selection = productSelections[productId] || {
    storage: product.storageOptions ? product.storageOptions[0] : 'Standard',
    color: product.colorOptions ? product.colorOptions[0] : 'Standard'
  };
  var cartKeyId = "".concat(productId, "-").concat(selection.storage, "-").concat(selection.color);
  var existing = state.cart.find(function (item) {
    return item.cartKey === cartKeyId;
  });

  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({
      id: productId,
      cartKey: cartKeyId,
      name: "".concat(product.name, " (").concat(selection.storage, ", ").concat(selection.color, ")"),
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      qty: 1
    });
  }

  saveCart();
  updateCartBadge();
  showToast("Added to cart! \uD83D\uDED2");
}

function toggleCartDrawer(open) {
  var drawer = document.getElementById('cartDrawer');
  var overlay = document.getElementById('cartOverlay');
  if (!drawer) return;

  if (open) {
    renderCartItems();
    drawer.classList.add('open');
    if (overlay) overlay.classList.add('active');
  } else {
    drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
  }
}

var cartBtnEl = document.getElementById('cartBtn');
if (cartBtnEl) cartBtnEl.addEventListener('click', function () {
  return toggleCartDrawer(true);
});

function renderCartItems() {
  var list = document.getElementById('cartItemsList');
  var countLabel = document.getElementById('drawerCartCount');
  if (!list) return;

  if (state.cart.length === 0) {
    if (countLabel) countLabel.innerText = '(0 items)';
    list.innerHTML = "<div class=\"empty-cart-view\"><h4>Your cart is empty!</h4></div>";
    updatePriceSummary(0, 0);
    return;
  }

  var subtotal = 0,
      originalTotal = 0;
  list.innerHTML = state.cart.map(function (item, idx) {
    subtotal += item.price * item.qty;
    originalTotal += item.originalPrice * item.qty;
    return "\n      <div class=\"cart-item-row\">\n        <button class=\"remove-cart-item\" onclick=\"removeCartItem(".concat(idx, ")\">\u2715</button>\n        <img src=\"").concat(item.image, "\" alt=\"").concat(item.name, "\" class=\"cart-item-img\">\n        <div class=\"cart-item-info\">\n          <div class=\"cart-item-title\">").concat(item.name, "</div>\n          <div class=\"cart-item-price-row\"><span class=\"cart-item-price\">\u20B9").concat((item.price * item.qty).toLocaleString('en-IN'), "</span></div>\n          <div class=\"cart-qty-controls\">\n            <button class=\"qty-btn\" onclick=\"changeQty(").concat(idx, ", -1)\">-</button>\n            <span class=\"qty-val\">").concat(item.qty, "</span>\n            <button class=\"qty-btn\" onclick=\"changeQty(").concat(idx, ", 1)\">+</button>\n          </div>\n        </div>\n      </div>\n    ");
  }).join('');
  updatePriceSummary(subtotal, originalTotal);
}

function changeQty(index, delta) {
  state.cart[index].qty += delta;
  if (state.cart[index].qty <= 0) state.cart.splice(index, 1);
  saveCart();
  renderCartItems();
  updateCartBadge();
}

function removeCartItem(index) {
  state.cart.splice(index, 1);
  saveCart();
  renderCartItems();
  updateCartBadge();
}

function updatePriceSummary(subtotal, originalTotal) {
  var discount = originalTotal - subtotal;
  var subEl = document.getElementById('cartSubtotal');
  var discEl = document.getElementById('cartDiscount');
  var grandEl = document.getElementById('cartGrandTotal');
  if (subEl) subEl.innerText = "\u20B9".concat(originalTotal.toLocaleString('en-IN'));
  if (discEl) discEl.innerText = "- \u20B9".concat(discount.toLocaleString('en-IN'));
  if (grandEl) grandEl.innerText = "\u20B9".concat(subtotal.toLocaleString('en-IN'));
}

function saveCart() {
  localStorage.setItem('fk_cart', JSON.stringify(state.cart));
}

function updateCartBadge() {
  var badge = document.getElementById('cartCount');
  if (badge) badge.innerText = state.cart.reduce(function (acc, item) {
    return acc + item.qty;
  }, 0);
} // ==========================================
// 9. QUICK VIEW MODAL WITH VARIANT SELECTORS
// ==========================================


function openQuickView(productId) {
  var product = PRODUCTS.find(function (p) {
    return p.id === productId;
  });
  if (!product) return;
  productSelections[productId] = productSelections[productId] || {
    storage: product.storageOptions ? product.storageOptions[0] : 'Standard',
    color: product.colorOptions ? product.colorOptions[0] : 'Standard Finish'
  };
  var modal = document.getElementById('quickViewModal');
  var details = document.getElementById('modalProductDetails');
  if (!modal || !details) return;
  var storageOpts = product.storageOptions || ["128 GB", "256 GB", "512 GB"];
  var colorOpts = product.colorOptions || ["Standard Edition", "Matte Finish"];
  details.innerHTML = "\n    <div class=\"modal-body-grid\">\n      <div class=\"modal-gallery\"><img src=\"".concat(product.image, "\" alt=\"").concat(product.name, "\" class=\"modal-main-img\"></div>\n      <div class=\"modal-details\">\n        <h2 class=\"modal-title\">").concat(product.name, "</h2>\n        <div class=\"price-container\" style=\"margin: 12px 0;\">\n          <span class=\"price-current\" style=\"font-size: 24px;\">\u20B9").concat(product.price.toLocaleString('en-IN'), "</span>\n        </div>\n        <div style=\"margin: 10px 0;\">\n          <label style=\"font-size: 12px; font-weight: 700; color: #8ff7ff; display: block; margin-bottom: 5px;\">Select Storage / ROM:</label>\n          <div style=\"display: flex; gap: 8px; flex-wrap: wrap;\">\n            ").concat(storageOpts.map(function (opt) {
    return "\n              <button type=\"button\" onclick=\"handleVariantChange(".concat(product.id, ", 'storage', '").concat(opt, "')\" style=\"padding: 6px 12px; border-radius: 8px; border: 1px solid rgba(143,247,255,0.3); background: rgba(255,255,255,0.06); color: #fff; cursor: pointer; font-size: 12px;\">").concat(opt, "</button>\n            ");
  }).join(''), "\n          </div>\n        </div>\n        <div style=\"margin: 10px 0 16px 0;\">\n          <label style=\"font-size: 12px; font-weight: 700; color: #8ff7ff; display: block; margin-bottom: 5px;\">Select Color / Finish:</label>\n          <div style=\"display: flex; gap: 8px; flex-wrap: wrap;\">\n            ").concat(colorOpts.map(function (col) {
    return "\n              <button type=\"button\" onclick=\"handleVariantChange(".concat(product.id, ", 'color', '").concat(col, "')\" style=\"padding: 6px 12px; border-radius: 8px; border: 1px solid rgba(143,247,255,0.3); background: rgba(255,255,255,0.06); color: #fff; cursor: pointer; font-size: 12px;\">").concat(col, "</button>\n            ");
  }).join(''), "\n          </div>\n        </div>\n        <button class=\"add-cart-btn\" style=\"padding: 12px; font-size: 14px; width: 100%; margin-top: auto;\" onclick=\"addToCart(").concat(product.id, ", event); closeQuickView();\">\n          <span>\uD83D\uDED2 Add Configured Model to Cart</span>\n        </button>\n      </div>\n    </div>\n  ");
  modal.classList.add('open');
}

function closeQuickView() {
  var modal = document.getElementById('quickViewModal');
  if (modal) modal.classList.remove('open');
} // ==========================================
// 10. WISHLIST & UTILITIES
// ==========================================


function toggleWishlist(productId, btnEl, event) {
  if (event) event.stopPropagation();
  var index = state.wishlist.indexOf(productId);

  if (index > -1) {
    state.wishlist.splice(index, 1);
    if (btnEl) btnEl.classList.remove('active');
  } else {
    state.wishlist.push(productId);
    if (btnEl) btnEl.classList.add('active');
  }

  localStorage.setItem('fk_wishlist', JSON.stringify(state.wishlist));
  updateWishlistBadge();
}

function updateWishlistBadge() {
  var badge = document.getElementById('wishlistCount');
  if (badge) badge.innerText = state.wishlist.length;
}

function startCountdownTimer() {
  var timerEl = document.getElementById('countdownTimer');
  if (!timerEl) return;
  var seconds = 52980;
  setInterval(function () {
    if (seconds <= 0) seconds = 86400;
    seconds--;
    var h = String(Math.floor(seconds / 3600)).padStart(2, '0');
    var m = String(Math.floor(seconds % 3600 / 60)).padStart(2, '0');
    var s = String(seconds % 60).padStart(2, '0');
    timerEl.innerText = "".concat(h, "h : ").concat(m, "m : ").concat(s, "s Left");
  }, 1000);
}

function showToast(message) {
  var container = document.getElementById('toastContainer');
  if (!container) return;
  var toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = "<span>".concat(message, "</span>");
  container.appendChild(toast);
  setTimeout(function () {
    return toast.remove();
  }, 2600);
}

function handleCheckout() {
  if (state.cart.length === 0) {
    showToast('Your cart is empty!');
    return;
  }

  var payment = document.getElementById('paymentInterface');

  if (payment) {
    payment.classList.add('open');
    toggleCartDrawer(false);
    document.body.classList.add('payment-active');
  }
}

function closePaymentInterface() {
  var payment = document.getElementById('paymentInterface');
  if (payment) payment.classList.remove('open');
  document.body.classList.remove('payment-active');
}

function initPaymentMethods() {// Payment bindings placeholder
}