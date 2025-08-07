// CONSOLIDATED FINAL FIX - ONE FORM PER BUTTON, NO AUTO-OPENING
console.log('🎯 Loading consolidated final fix...');

(function() {
  'use strict';
  
  // Prevent multiple loads
  if (window.consolidatedFinalFix) {
    return;
  }
  window.consolidatedFinalFix = true;
  
  console.log('🛠️ Applying consolidated final fix...');
  
  // DISABLE ALL PREVIOUS SCRIPTS
  const scriptsToDisable = [
    'profileModalExistenceFix',
    'ordersModalReopenFix', 
    'profilePictureUploaderFix',
    'profileComprehensiveFix',
    'simpleOrderFix'
  ];
  
  scriptsToDisable.forEach(scriptName => {
    if (window[scriptName]) {
      window[scriptName] = false;
      console.log(`🚫 Disabled: ${scriptName}`);
    }
  });
  
  // TRACK USER INTERACTIONS ONLY
  let userClickedProfile = false;
  let userClickedOrders = false;
  let profileModalState = { isOpen: false, isLoading: false };
  let ordersModalState = { isOpen: false, isLoading: false };
  
  // Listen for legitimate user clicks ONLY
  document.addEventListener('click', function(e) {
    const target = e.target.closest('button');
    if (!target) return;
    
    const text = target.textContent.toLowerCase();
    const onclick = target.getAttribute('onclick') || '';
    
    // Track profile button clicks
    if (text.includes('edit profile') || onclick.includes('openProfileModal')) {
      userClickedProfile = true;
      console.log('✅ User clicked Edit Profile button');
      setTimeout(() => { userClickedProfile = false; }, 2000);
    }
    
    // Track orders button clicks  
    if (text.includes('my orders') || text.includes('order history') || onclick.includes('showOrderHistory')) {
      userClickedOrders = true;
      console.log('✅ User clicked My Orders button');
      setTimeout(() => { userClickedOrders = false; }, 2000);
    }
  });
  
  // SINGLE PROFILE MODAL FUNCTION
  window.openProfileModal = function() {
    console.log('👤 Profile modal requested...');
    
    // STRICT: Only allow if user clicked button
    if (!userClickedProfile) {
      console.log('🚫 BLOCKED: Profile modal not user-initiated');
      return false;
    }
    
    if (profileModalState.isOpen) {
      console.log('⚠️ Profile modal already open');
      return false;
    }
    
    if (!window.currentUser) {
      alert('Please sign in to edit your profile.');
      return false;
    }
    
    profileModalState.isLoading = true;
    
    // Ensure modal exists
    const modal = ensureProfileModalExists();
    if (!modal) {
      profileModalState.isLoading = false;
      alert('Profile modal unavailable. Please refresh the page.');
      return false;
    }
    
    // Populate form
    populateProfileForm();
    
    // Show modal
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    profileModalState.isOpen = true;
    profileModalState.isLoading = false;
    
    console.log('✅ Profile modal opened successfully');
    
    // Focus first input
    setTimeout(() => {
      const firstInput = document.getElementById('profileFirstName');
      if (firstInput) firstInput.focus();
    }, 100);
    
    return true;
  };
  
  // SINGLE ORDERS MODAL FUNCTION
  window.showOrderHistory = function() {
    console.log('📋 Orders modal requested...');
    
    // STRICT: Only allow if user clicked button
    if (!userClickedOrders) {
      console.log('🚫 BLOCKED: Orders modal not user-initiated');
      return false;
    }
    
    if (ordersModalState.isOpen) {
      console.log('⚠️ Orders modal already open');
      return false;
    }
    
    if (ordersModalState.isLoading) {
      console.log('⚠️ Orders modal loading, please wait...');
      return false;
    }
    
    ordersModalState.isLoading = true;
    
    // Ensure modal exists
    const modal = ensureOrdersModalExists();
    const content = document.getElementById('orderHistoryContent');
    
    if (!modal || !content) {
      ordersModalState.isLoading = false;
      alert('Orders modal unavailable. Please refresh the page.');
      return false;
    }
    
    // Clear content
    content.innerHTML = '';
    
    // Show modal
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    ordersModalState.isOpen = true;
    
    console.log('✅ Orders modal opened successfully');
    
    // Check authentication
    if (!window.currentUser) {
      content.innerHTML = generateSignInRequired();
      ordersModalState.isLoading = false;
      return;
    }
    
    // Show loading
    content.innerHTML = generateLoadingState();
    
    // Load data
    setTimeout(() => {
      loadOrdersAndReviews();
      ordersModalState.isLoading = false;
    }, 300);
    
    return true;
  };
  
  // ENSURE PROFILE MODAL EXISTS (SINGLE VERSION)
  function ensureProfileModalExists() {
    let modal = document.getElementById('profileModal');
    
    if (!modal) {
      console.log('⚠️ Creating profile modal...');
      modal = document.createElement('div');
      modal.id = 'profileModal';
      modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden p-4';
      modal.innerHTML = generateProfileModalHTML();
      document.body.appendChild(modal);
      console.log('✅ Profile modal created');
    }
    
    return modal;
  }
  
  // ENSURE ORDERS MODAL EXISTS (SINGLE VERSION)
  function ensureOrdersModalExists() {
    let modal = document.getElementById('orderHistoryModal');
    
    if (!modal) {
      console.log('⚠️ Creating orders modal...');
      modal = document.createElement('div');
      modal.id = 'orderHistoryModal';
      modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden p-2 sm:p-4';
      modal.innerHTML = generateOrdersModalHTML();
      document.body.appendChild(modal);
      console.log('✅ Orders modal created');
    }
    
    return modal;
  }
  
  function generateProfileModalHTML() {
    return `
      <div class="bg-white rounded-xl max-w-md w-full max-h-[90vh] flex flex-col shadow-2xl">
        <!-- Header -->
        <div class="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
          <h3 class="text-xl sm:text-2xl font-bold text-gray-800">Edit Profile</h3>
          <button onclick="closeProfileModal()" class="text-gray-500 hover:text-gray-700 p-2 -m-2">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Profile Picture Section -->
        <div class="p-6 border-b border-gray-100 bg-gray-50">
          <div class="text-center">
            <h4 class="text-sm font-semibold text-gray-700 mb-4">Profile Picture</h4>
            <div class="relative inline-block mb-4">
              <div id="profilePicPreview" class="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-xl text-gray-500 overflow-hidden border-4 border-white shadow-lg">
                👤
              </div>
            </div>
            <button type="button" onclick="openPictureUploader()" 
                    class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm">
              📸 Change Picture
            </button>
          </div>
        </div>

        <!-- Form Content -->
        <div class="flex-1 overflow-y-auto px-6 py-4">
          <form id="profileForm" class="space-y-4">
            <div>
              <label for="profileFirstName" class="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
              <input type="text" id="profileFirstName" required 
                     class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                     placeholder="Enter your first name" />
            </div>
            <div>
              <label for="profileLastName" class="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
              <input type="text" id="profileLastName" required 
                     class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                     placeholder="Enter your last name" />
            </div>
            <div>
              <label for="profileEmail" class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input type="email" id="profileEmail" readonly 
                     class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500" 
                     placeholder="Email address" />
            </div>
            <div>
              <label for="profilePhone" class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input type="tel" id="profilePhone" 
                     class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                     placeholder="Enter your phone number" />
            </div>
            <div>
              <label for="profileCompanyName" class="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
              <input type="text" id="profileCompanyName" 
                     class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                     placeholder="Enter your company name" />
            </div>
          </form>
        </div>

        <!-- Footer -->
        <div class="flex gap-3 p-4 sm:p-6 border-t border-gray-200 flex-shrink-0 bg-gray-50">
          <button type="button" onclick="closeProfileModal()" 
                  class="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button type="button" onclick="saveProfile()" 
                  class="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
            💾 Save Changes
          </button>
        </div>
      </div>
    `;
  }
  
  function generateOrdersModalHTML() {
    return `
      <div class="bg-white rounded-xl p-3 sm:p-6 lg:p-8 max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl">
        <div class="flex justify-between items-center mb-3 sm:mb-4 lg:mb-6">
          <h3 class="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-800">My Orders & Receipts</h3>
          <button onclick="closeOrderHistory()" class="text-gray-500 hover:text-gray-700 p-2 -m-2 touch-manipulation">
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div id="orderHistoryContent" class="space-y-4">
          <div class="text-center py-8 text-gray-500">
            <p>Loading your orders...</p>
          </div>
        </div>
      </div>
    `;
  }
  
  // SIMPLE PICTURE UPLOADER (NO AUTO-OPEN)
  window.openPictureUploader = function() {
    console.log('📸 Picture uploader requested...');
    
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.style.display = 'none';
    
    input.onchange = function(e) {
      const file = e.target.files[0];
      if (!file) return;
      
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = function(event) {
        const preview = document.getElementById('profilePicPreview');
        if (preview) {
          preview.innerHTML = `<img src="${event.target.result}" class="w-full h-full object-cover rounded-full" alt="Profile">`;
        }
        
        window.selectedProfilePicture = event.target.result;
        console.log('✅ Profile picture selected');
      };
      reader.readAsDataURL(file);
    };
    
    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
  };
  
  // POPULATE PROFILE FORM
  function populateProfileForm() {
    if (!window.currentUser) return;
    
    try {
      const userKey = `user_${window.currentUser.email}`;
      const userData = JSON.parse(localStorage.getItem(userKey) || '{}');
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      const legacyUser = users.find(u => u.email === window.currentUser.email || u.id === window.currentUser.id);
      
      const completeData = { ...legacyUser, ...userData, ...window.currentUser };
      
      const fields = {
        'profileFirstName': completeData.firstName || '',
        'profileLastName': completeData.lastName || '',
        'profileEmail': completeData.email || '',
        'profilePhone': completeData.phone || '',
        'profileCompanyName': completeData.companyName || ''
      };
      
      Object.entries(fields).forEach(([fieldId, value]) => {
        const field = document.getElementById(fieldId);
        if (field) field.value = value;
      });
      
      const preview = document.getElementById('profilePicPreview');
      if (preview && completeData.profilePicture) {
        preview.innerHTML = `<img src="${completeData.profilePicture}" class="w-full h-full object-cover rounded-full" alt="Profile">`;
      }
      
      console.log('✅ Profile form populated');
      
    } catch (error) {
      console.error('❌ Error populating profile form:', error);
    }
  }
  
  // SAVE PROFILE
  window.saveProfile = function() {
    console.log('💾 Saving profile...');
    
    if (!window.currentUser) {
      alert('Please sign in to save profile');
      return;
    }
    
    const firstName = document.getElementById('profileFirstName')?.value.trim() || '';
    const lastName = document.getElementById('profileLastName')?.value.trim() || '';
    const phone = document.getElementById('profilePhone')?.value.trim() || '';
    const company = document.getElementById('profileCompanyName')?.value.trim() || '';
    
    if (!firstName || !lastName) {
      alert('First name and last name are required');
      return;
    }
    
    try {
      window.currentUser.firstName = firstName;
      window.currentUser.lastName = lastName;
      window.currentUser.name = `${firstName} ${lastName}`;
      window.currentUser.phone = phone;
      window.currentUser.companyName = company;
      
      if (window.selectedProfilePicture) {
        window.currentUser.profilePicture = window.selectedProfilePicture;
      }
      
      const userKey = `user_${window.currentUser.email}`;
      const userData = { ...window.currentUser, lastUpdated: new Date().toISOString() };
      localStorage.setItem(userKey, JSON.stringify(userData));
      
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      const userIndex = users.findIndex(u => u.email === window.currentUser.email || u.id === window.currentUser.id);
      
      if (userIndex !== -1) {
        Object.assign(users[userIndex], userData);
      } else {
        users.push(userData);
      }
      localStorage.setItem('visualVibeUsers', JSON.stringify(users));
      
      console.log('✅ Profile saved successfully');
      alert('✅ Profile saved successfully!');
      closeProfileModal();
      
    } catch (error) {
      console.error('❌ Error saving profile:', error);
      alert('❌ Error saving profile. Please try again.');
    }
  };
  
  // CLOSE PROFILE MODAL
  window.closeProfileModal = function() {
    console.log('👤 Closing profile modal...');
    
    const modal = document.getElementById('profileModal');
    if (modal) {
      modal.classList.add('hidden');
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
    
    profileModalState.isOpen = false;
    profileModalState.isLoading = false;
    window.selectedProfilePicture = null;
  };
  
  // CLOSE ORDERS MODAL
  window.closeOrderHistory = function() {
    console.log('📋 Closing orders modal...');
    
    const modal = document.getElementById('orderHistoryModal');
    if (modal) {
      modal.classList.add('hidden');
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
    
    ordersModalState.isOpen = false;
    ordersModalState.isLoading = false;
  };
  
  function generateSignInRequired() {
    return `
      <div class="text-center py-16">
        <div class="text-6xl mb-6">🔐</div>
        <h3 class="text-2xl font-bold text-gray-800 mb-4">Sign In Required</h3>
        <p class="text-gray-600 mb-8">Please sign in to view your orders and reviews.</p>
        <button onclick="closeOrderHistory(); openSignInModal();" 
                class="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700">
          Sign In
        </button>
      </div>
    `;
  }
  
  function generateLoadingState() {
    return `
      <div class="text-center py-12">
        <div class="animate-spin w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full mx-auto mb-4"></div>
        <p class="text-gray-600">Loading your orders and reviews...</p>
      </div>
    `;
  }
  
  // LOAD ORDERS AND REVIEWS
  function loadOrdersAndReviews() {
    const content = document.getElementById('orderHistoryContent');
    if (!content || !window.currentUser) return;
    
    try {
      console.log('📊 Loading orders and reviews data...');
      
      const userKey = `user_${window.currentUser.email}`;
      const userData = JSON.parse(localStorage.getItem(userKey) || '{}');
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      const legacyUser = users.find(u => u.email === window.currentUser.email || u.id === window.currentUser.id);
      
      let allOrders = [];
      let allReviews = [];
      
      if (userData.orders) allOrders.push(...userData.orders);
      if (userData.reviews) allReviews.push(...userData.reviews);
      if (legacyUser) {
        if (legacyUser.orders) allOrders.push(...legacyUser.orders);
        if (legacyUser.reviews) allReviews.push(...legacyUser.reviews);
      }
      
      const orders = deduplicateItems(allOrders, 'order');
      const reviews = deduplicateItems(allReviews, 'review');
      
      console.log(`📊 Found ${orders.length} orders and ${reviews.length} reviews`);
      
      if (orders.length === 0 && reviews.length === 0) {
        content.innerHTML = generateEmptyState();
        return;
      }
      
      content.innerHTML = generateOrdersAndReviewsContent(orders, reviews);
      
    } catch (error) {
      console.error('❌ Error loading orders data:', error);
      content.innerHTML = `
        <div class="text-center py-12">
          <div class="text-red-400 text-4xl mb-4">⚠️</div>
          <p class="text-gray-600 mb-4">Error loading your data</p>
          <button onclick="showOrderHistory()" 
                  class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
            Try Again
          </button>
        </div>
      `;
    }
  }
  
  function deduplicateItems(items, type) {
    const seen = new Set();
    return items.map((item, index) => {
      if (!item.id) {
        item.id = `${type}_${Date.now()}_${index}_${Math.random().toString(36).substr(2, 9)}`;
      }
      
      const key = item.id;
      if (seen.has(key)) return null;
      seen.add(key);
      return item;
    }).filter(Boolean);
  }
  
  function generateEmptyState() {
    return `
      <div class="text-center py-16">
        <div class="text-6xl mb-8">🎨</div>
        <h3 class="text-2xl font-bold text-gray-800 mb-4">No Orders or Reviews Yet</h3>
        <p class="text-gray-600 mb-8 max-w-md mx-auto">
          Start your first project with us or leave a review about our services!
        </p>
        <div class="space-y-4">
          <button onclick="closeOrderHistory(); document.getElementById('services')?.scrollIntoView({behavior: 'smooth'});" 
                  class="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 block mx-auto">
            Browse Services
          </button>
          <button onclick="closeOrderHistory(); document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'});" 
                  class="text-indigo-600 hover:text-indigo-800 font-medium">
            Contact Us
          </button>
        </div>
      </div>
    `;
  }
  
  function generateOrdersAndReviewsContent(orders, reviews) {
    let html = `
      <div class="space-y-8">
        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
          <h3 class="text-2xl font-bold text-gray-800 mb-6">Your Activity Summary</h3>
          <div class="grid grid-cols-2 gap-6">
            <div class="bg-white rounded-lg p-6 text-center shadow-sm">
              <div class="text-4xl font-bold text-indigo-600 mb-2">${orders.length}</div>
              <div class="text-gray-700 font-semibold">Orders</div>
              <div class="text-gray-500 text-sm">Project orders</div>
            </div>
            <div class="bg-white rounded-lg p-6 text-center shadow-sm">
              <div class="text-4xl font-bold text-yellow-600 mb-2">${reviews.length}</div>
              <div class="text-gray-700 font-semibold">Reviews</div>
              <div class="text-gray-500 text-sm">Your feedback</div>
            </div>
          </div>
        </div>
    `;
    
    if (orders.length > 0) {
      html += generateOrdersSection(orders);
    }
    
    if (reviews.length > 0) {
      html += generateReviewsSection(reviews);
    }
    
    html += `
        <div class="bg-gray-50 rounded-xl p-6 border">
          <h4 class="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h4>
          <div class="flex flex-wrap gap-4">
            <button onclick="closeOrderHistory(); document.getElementById('services')?.scrollIntoView({behavior: 'smooth'});" 
                    class="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors">
              New Project
            </button>
            <button onclick="closeOrderHistory(); document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'});" 
                    class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    `;
    
    return html;
  }
  
  function generateOrdersSection(orders) {
    return `
      <div class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg">
        <div class="bg-indigo-50 p-6 border-b border-indigo-100">
          <h4 class="text-xl font-bold text-gray-800 flex items-center">
            📦 Your Orders (${orders.length})
          </h4>
          <p class="text-gray-600 mt-2">Track and manage your project orders</p>
        </div>
        <div class="divide-y divide-gray-100">
          ${orders.map(order => generateOrderItem(order)).join('')}
        </div>
      </div>
    `;
  }
  
  function generateOrderItem(order) {
    const orderId = order.id || `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return `
      <div class="p-6 hover:bg-gray-50 transition-colors" id="order-${orderId}">
        <div class="flex justify-between items-start">
          <div class="flex-1">
            <h5 class="text-lg font-semibold text-gray-800 mb-2">
              ${order.businessName || order.service || 'Design Project'}
            </h5>
            <div class="grid grid-cols-2 gap-4 mb-3 text-sm text-gray-600">
              <div><span class="font-medium">Order #:</span> ${order.orderNumber || orderId.substr(-6)}</div>
              <div><span class="font-medium">Date:</span> ${formatDate(order.date || order.timestamp)}</div>
              <div>
                <span class="font-medium">Status:</span> 
                <span class="px-2 py-1 rounded text-xs bg-blue-100 text-blue-700">
                  ${(order.status || 'pending').toUpperCase()}
                </span>
              </div>
              <div>
                <span class="font-medium">Total:</span> 
                <span class="text-lg font-bold text-indigo-600">$${order.total || order.amount || 'TBD'}</span>
              </div>
            </div>
          </div>
          <button onclick="deleteOrderWithConfirm('${orderId}')" 
                  class="ml-6 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 px-4 py-2 rounded-lg transition-colors border border-red-200 flex items-center gap-2 font-medium">
            🗑️ Delete
          </button>
        </div>
      </div>
    `;
  }
  
  function generateReviewsSection(reviews) {
    return `
      <div class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg">
        <div class="bg-yellow-50 p-6 border-b border-yellow-100">
          <h4 class="text-xl font-bold text-gray-800 flex items-center">
            ⭐ Your Reviews (${reviews.length})
          </h4>
          <p class="text-gray-600 mt-2">Your feedback and testimonials</p>
        </div>
        <div class="divide-y divide-gray-100">
          ${reviews.map(review => generateReviewItem(review)).join('')}
        </div>
      </div>
    `;
  }
  
  function generateReviewItem(review) {
    const reviewId = review.id || `review_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const rating = review.rating || 5;
    const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
    
    return `
      <div class="p-6 hover:bg-gray-50 transition-colors" id="review-${reviewId}">
        <div class="flex justify-between items-start">
          <div class="flex-1">
            <div class="flex items-center gap-4 mb-3">
              <span class="text-2xl text-yellow-500">${stars}</span>
              <span class="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                ${formatDate(review.date || review.timestamp)}
              </span>
            </div>
            <blockquote class="text-gray-700 text-lg leading-relaxed mb-3 italic">
              "${review.text || review.comment || 'Great service!'}"
            </blockquote>
            ${review.service ? `
              <div class="text-sm text-gray-600 bg-blue-50 px-3 py-1 rounded inline-block">
                <span class="font-medium">Service:</span> ${review.service}
              </div>
            ` : ''}
          </div>
          <button onclick="deleteReviewWithConfirm('${reviewId}')" 
                  class="ml-6 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 px-4 py-2 rounded-lg transition-colors border border-red-200 flex items-center gap-2 font-medium">
            🗑️ Delete
          </button>
        </div>
      </div>
    `;
  }
  
  // DELETE FUNCTIONS WITH ACTUAL REMOVAL
  window.deleteOrderWithConfirm = function(orderId) {
    if (!confirm('⚠️ Are you sure you want to delete this order?\n\nThis action cannot be undone.')) {
      return;
    }
    
    console.log(`🗑️ Deleting order: ${orderId}`);
    
    try {
      const userKey = `user_${window.currentUser.email}`;
      const userData = JSON.parse(localStorage.getItem(userKey) || '{}');
      if (userData.orders) {
        userData.orders = userData.orders.filter(order => order.id !== orderId);
        localStorage.setItem(userKey, JSON.stringify(userData));
      }
      
      const orderElement = document.getElementById(`order-${orderId}`);
      if (orderElement) {
        orderElement.style.transition = 'all 0.5s ease';
        orderElement.style.opacity = '0';
        orderElement.style.transform = 'translateX(-100%)';
        setTimeout(() => {
          orderElement.remove();
          showNotification('Order deleted successfully', 'success');
        }, 500);
      }
      
    } catch (error) {
      console.error('❌ Error deleting order:', error);
      showNotification('Error deleting order', 'error');
    }
  };
  
  window.deleteReviewWithConfirm = function(reviewId) {
    if (!confirm('⚠️ Are you sure you want to delete this review?\n\nThis action cannot be undone.')) {
      return;
    }
    
    console.log(`🗑️ Deleting review: ${reviewId}`);
    
    try {
      const userKey = `user_${window.currentUser.email}`;
      const userData = JSON.parse(localStorage.getItem(userKey) || '{}');
      if (userData.reviews) {
        userData.reviews = userData.reviews.filter(review => review.id !== reviewId);
        localStorage.setItem(userKey, JSON.stringify(userData));
      }
      
      const reviewElement = document.getElementById(`review-${reviewId}`);
      if (reviewElement) {
        reviewElement.style.transition = 'all 0.5s ease';
        reviewElement.style.opacity = '0';
        reviewElement.style.transform = 'translateX(-100%)';
        setTimeout(() => {
          reviewElement.remove();
          showNotification('Review deleted successfully', 'success');
        }, 500);
      }
      
    } catch (error) {
      console.error('❌ Error deleting review:', error);
      showNotification('Error deleting review', 'error');
    }
  };
  
  function formatDate(dateInput) {
    if (!dateInput) return 'Date not available';
    try {
      const date = new Date(dateInput);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'Invalid date';
    }
  }
  
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg text-white transition-all transform translate-x-full`;
    notification.style.backgroundColor = type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
  
  // INITIALIZE
  setTimeout(() => {
    ensureProfileModalExists();
    ensureOrdersModalExists();
    console.log('✅ Consolidated final fix initialized');
  }, 100);
  
  console.log('✅ Consolidated final fix applied successfully');
  console.log('🎯 One form per button, no auto-opening, no conflicts');
  
})();
