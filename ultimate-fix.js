// ULTIMATE FIX - NUCLEAR OPTION TO STOP ALL AUTO-OPENING
console.log('💥 Loading ULTIMATE FIX - Nuclear option...');

(function() {
  'use strict';
  
  // IMMEDIATE EMERGENCY STOP - Block everything
  window.EMERGENCY_STOP_ALL_AUTO_OPENING = true;
  
  // NUCLEAR OPTION - Disable ALL previous scripts immediately
  const allPossibleFlags = [
    'profileModalExistenceFix', 'ordersModalReopenFix', 'profilePictureUploaderFix',
    'profileComprehensiveFix', 'simpleOrderFix', 'consolidatedFinalFix',
    'comprehensiveProfileComplete', 'unifiedProfileFix', 'profileSystemFix',
    'bulletproofProfileSave', 'comprehensiveMyOrdersFix', 'directFixOrdersLoading'
  ];
  
  allPossibleFlags.forEach(flag => {
    window[flag] = false;
    delete window[flag];
  });
  
  // BLOCK ALL AUTO-OPENING FUNCTIONS IMMEDIATELY
  const autoOpenFunctions = [
    'openProfileModal', 'showOrderHistory', 'openPictureUpload',
    'openProfilePictureUpload', 'handleProfilePictureChange',
    'userInitiatedPictureUpload', 'openPictureUploadWithValidation'
  ];
  
  // Save original functions before overriding
  const originalFunctions = {};
  autoOpenFunctions.forEach(funcName => {
    if (window[funcName]) {
      originalFunctions[funcName] = window[funcName];
    }
  });
  
  // TRACK LEGITIMATE USER CLICKS ONLY
  let legitimateProfileClick = false;
  let legitimateOrdersClick = false;
  let profileModalOpen = false;
  let ordersModalOpen = false;
  
  // SUPER STRICT USER INTERACTION TRACKING
  document.addEventListener('click', function(e) {
    const target = e.target.closest('button, a, [onclick]');
    if (!target) return;
    
    const text = target.textContent.toLowerCase().trim();
    const onclick = target.getAttribute('onclick') || '';
    
    console.log('🖱️ User clicked:', text, onclick);
    
    // Track profile clicks
    if ((text.includes('edit profile') || onclick.includes('openProfileModal')) && 
        !text.includes('auto') && !text.includes('test')) {
      legitimateProfileClick = true;
      console.log('✅ LEGITIMATE Profile click detected');
      setTimeout(() => { legitimateProfileClick = false; }, 3000);
    }
    
    // Track orders clicks
    if ((text.includes('my orders') || text.includes('order history') || onclick.includes('showOrderHistory')) && 
        !text.includes('auto') && !text.includes('test')) {
      legitimateOrdersClick = true;
      console.log('✅ LEGITIMATE Orders click detected');
      setTimeout(() => { legitimateOrdersClick = false; }, 3000);
    }
  });
  
  // OVERRIDE ALL MODAL FUNCTIONS WITH STRICT CHECKING
  window.openProfileModal = function() {
    console.log('👤 Profile modal request - checking legitimacy...');
    
    if (!legitimateProfileClick) {
      console.log('🚫 BLOCKED: Profile modal not from legitimate user click');
      return false;
    }
    
    if (profileModalOpen) {
      console.log('⚠️ Profile modal already open');
      return false;
    }
    
    if (!window.currentUser) {
      alert('Please sign in to edit your profile.');
      return false;
    }
    
    try {
      profileModalOpen = true;
      console.log('✅ Opening profile modal legitimately...');
      
      // Create or get modal
      let modal = document.getElementById('profileModal');
      if (!modal) {
        modal = createProfileModal();
      }
      
      // Populate form
      populateProfileForm();
      
      // Show modal
      modal.classList.remove('hidden');
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      
      // Focus first input
      setTimeout(() => {
        const firstInput = document.getElementById('profileFirstName');
        if (firstInput) firstInput.focus();
      }, 100);
      
      console.log('✅ Profile modal opened successfully');
      return true;
      
    } catch (error) {
      console.error('❌ Error opening profile modal:', error);
      profileModalOpen = false;
      return false;
    }
  };
  
  window.showOrderHistory = function() {
    console.log('📋 Orders modal request - checking legitimacy...');
    
    if (!legitimateOrdersClick) {
      console.log('🚫 BLOCKED: Orders modal not from legitimate user click');
      return false;
    }
    
    if (ordersModalOpen) {
      console.log('⚠️ Orders modal already open');
      return false;
    }
    
    try {
      ordersModalOpen = true;
      console.log('✅ Opening orders modal legitimately...');
      
      // Create or get modal
      let modal = document.getElementById('orderHistoryModal');
      if (!modal) {
        modal = createOrdersModal();
      }
      
      // Show modal
      modal.classList.remove('hidden');
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      
      // Load content
      const content = document.getElementById('orderHistoryContent');
      if (content) {
        if (!window.currentUser) {
          content.innerHTML = generateSignInRequired();
        } else {
          content.innerHTML = generateLoadingState();
          setTimeout(() => {
            loadOrdersAndReviews();
          }, 300);
        }
      }
      
      console.log('✅ Orders modal opened successfully');
      return true;
      
    } catch (error) {
      console.error('❌ Error opening orders modal:', error);
      ordersModalOpen = false;
      return false;
    }
  };
  
  // SIMPLE PICTURE UPLOADER (NO AUTO-OPENING)
  window.openPictureUploader = function() {
    console.log('📸 Picture uploader requested...');
    
    // Only allow if profile modal is open
    if (!profileModalOpen) {
      console.log('🚫 BLOCKED: Picture uploader only available from profile modal');
      return false;
    }
    
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
  
  // CLOSE FUNCTIONS
  window.closeProfileModal = function() {
    console.log('👤 Closing profile modal...');
    
    const modal = document.getElementById('profileModal');
    if (modal) {
      modal.classList.add('hidden');
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
    
    profileModalOpen = false;
    window.selectedProfilePicture = null;
  };
  
  window.closeOrderHistory = function() {
    console.log('📋 Closing orders modal...');
    
    const modal = document.getElementById('orderHistoryModal');
    if (modal) {
      modal.classList.add('hidden');
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
    
    ordersModalOpen = false;
  };
  
  // SAVE PROFILE FUNCTION
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
      // Update current user object
      window.currentUser.firstName = firstName;
      window.currentUser.lastName = lastName;
      window.currentUser.name = `${firstName} ${lastName}`;
      window.currentUser.phone = phone;
      window.currentUser.companyName = company;
      
      if (window.selectedProfilePicture) {
        window.currentUser.profilePicture = window.selectedProfilePicture;
      }
      
      // Save to storage (multiple locations for compatibility)
      const userKey = `user_${window.currentUser.email}`;
      const userData = { 
        ...window.currentUser, 
        lastUpdated: new Date().toISOString(),
        savedSuccessfully: true
      };
      
      // Primary storage
      localStorage.setItem(userKey, JSON.stringify(userData));
      
      // Legacy storage
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      const userIndex = users.findIndex(u => u.email === window.currentUser.email || u.id === window.currentUser.id);
      
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...userData };
      } else {
        users.push(userData);
      }
      localStorage.setItem('visualVibeUsers', JSON.stringify(users));
      
      // Additional backup storage
      localStorage.setItem(`profile_backup_${window.currentUser.email}`, JSON.stringify(userData));
      
      console.log('✅ Profile saved to all storage locations');
      alert('✅ Profile saved successfully!');
      closeProfileModal();
      
    } catch (error) {
      console.error('❌ Error saving profile:', error);
      alert('❌ Error saving profile. Please try again.');
    }
  };
  
  // CREATE MODALS FUNCTIONS
  function createProfileModal() {
    const modal = document.createElement('div');
    modal.id = 'profileModal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden p-4';
    modal.innerHTML = `
      <div class="bg-white rounded-xl max-w-md w-full max-h-[90vh] flex flex-col shadow-2xl">
        <div class="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
          <h3 class="text-xl sm:text-2xl font-bold text-gray-800">Edit Profile</h3>
          <button onclick="closeProfileModal()" class="text-gray-500 hover:text-gray-700 p-2 -m-2">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div class="p-6 border-b border-gray-100 bg-gray-50">
          <div class="text-center">
            <h4 class="text-sm font-semibold text-gray-700 mb-4">Profile Picture</h4>
            <div class="relative inline-block mb-4">
              <div id="profilePicPreview" class="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-xl text-gray-500 overflow-hidden border-4 border-white shadow-lg">👤</div>
            </div>
            <button type="button" onclick="openPictureUploader()" class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm">📸 Change Picture</button>
          </div>
        </div>
        <div class="flex-1 overflow-y-auto px-6 py-4">
          <form id="profileForm" class="space-y-4">
            <div>
              <label for="profileFirstName" class="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
              <input type="text" id="profileFirstName" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="Enter your first name" />
            </div>
            <div>
              <label for="profileLastName" class="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
              <input type="text" id="profileLastName" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="Enter your last name" />
            </div>
            <div>
              <label for="profileEmail" class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input type="email" id="profileEmail" readonly class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500" placeholder="Email address" />
            </div>
            <div>
              <label for="profilePhone" class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input type="tel" id="profilePhone" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="Enter your phone number" />
            </div>
            <div>
              <label for="profileCompanyName" class="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
              <input type="text" id="profileCompanyName" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="Enter your company name" />
            </div>
          </form>
        </div>
        <div class="flex gap-3 p-4 sm:p-6 border-t border-gray-200 flex-shrink-0 bg-gray-50">
          <button type="button" onclick="closeProfileModal()" class="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
          <button type="button" onclick="saveProfile()" class="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">💾 Save Changes</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    return modal;
  }
  
  function createOrdersModal() {
    const modal = document.createElement('div');
    modal.id = 'orderHistoryModal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden p-2 sm:p-4';
    modal.innerHTML = `
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
          <div class="text-center py-8 text-gray-500"><p>Loading your orders...</p></div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    return modal;
  }
  
  // POPULATE PROFILE FORM
  function populateProfileForm() {
    if (!window.currentUser) return;
    
    try {
      // Get data from all possible storage locations
      const userKey = `user_${window.currentUser.email}`;
      const userData = JSON.parse(localStorage.getItem(userKey) || '{}');
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      const legacyUser = users.find(u => u.email === window.currentUser.email || u.id === window.currentUser.id);
      const backupData = JSON.parse(localStorage.getItem(`profile_backup_${window.currentUser.email}`) || '{}');
      
      // Merge all data sources (most recent wins)
      const completeData = { 
        ...legacyUser, 
        ...userData, 
        ...backupData, 
        ...window.currentUser 
      };
      
      // Populate form fields
      const fields = {
        'profileFirstName': completeData.firstName || '',
        'profileLastName': completeData.lastName || '',
        'profileEmail': completeData.email || '',
        'profilePhone': completeData.phone || '',
        'profileCompanyName': completeData.companyName || ''
      };
      
      Object.entries(fields).forEach(([fieldId, value]) => {
        const field = document.getElementById(fieldId);
        if (field) {
          field.value = value;
        }
      });
      
      // Update profile picture preview
      const preview = document.getElementById('profilePicPreview');
      if (preview && completeData.profilePicture) {
        preview.innerHTML = `<img src="${completeData.profilePicture}" class="w-full h-full object-cover rounded-full" alt="Profile">`;
      }
      
      console.log('✅ Profile form populated with all available data');
      
    } catch (error) {
      console.error('❌ Error populating profile form:', error);
    }
  }
  
  // ORDERS/REVIEWS LOADING FUNCTIONS
  function generateSignInRequired() {
    return `
      <div class="text-center py-16">
        <div class="text-6xl mb-6">🔐</div>
        <h3 class="text-2xl font-bold text-gray-800 mb-4">Sign In Required</h3>
        <p class="text-gray-600 mb-8">Please sign in to view your orders and reviews.</p>
        <button onclick="closeOrderHistory(); openSignInModal();" class="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700">Sign In</button>
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
  
  function loadOrdersAndReviews() {
    const content = document.getElementById('orderHistoryContent');
    if (!content || !window.currentUser) return;
    
    try {
      console.log('📊 Loading orders and reviews...');
      
      // Get data from all storage locations
      const userKey = `user_${window.currentUser.email}`;
      const userData = JSON.parse(localStorage.getItem(userKey) || '{}');
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      const legacyUser = users.find(u => u.email === window.currentUser.email || u.id === window.currentUser.id);
      
      let allOrders = [];
      let allReviews = [];
      
      // Collect orders and reviews from all sources
      if (userData.orders) allOrders.push(...userData.orders);
      if (userData.reviews) allReviews.push(...userData.reviews);
      if (legacyUser) {
        if (legacyUser.orders) allOrders.push(...legacyUser.orders);
        if (legacyUser.reviews) allReviews.push(...legacyUser.reviews);
      }
      
      // Deduplicate and ensure IDs
      const orders = deduplicateItems(allOrders, 'order');
      const reviews = deduplicateItems(allReviews, 'review');
      
      console.log(`📊 Found ${orders.length} orders and ${reviews.length} reviews`);
      
      if (orders.length === 0 && reviews.length === 0) {
        content.innerHTML = generateEmptyState();
        return;
      }
      
      // Generate unified content with working delete buttons
      content.innerHTML = generateOrdersAndReviewsContent(orders, reviews);
      
    } catch (error) {
      console.error('❌ Error loading orders data:', error);
      content.innerHTML = `
        <div class="text-center py-12">
          <div class="text-red-400 text-4xl mb-4">⚠️</div>
          <p class="text-gray-600 mb-4">Error loading your data</p>
          <button onclick="showOrderHistory()" class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">Try Again</button>
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
        <p class="text-gray-600 mb-8 max-w-md mx-auto">Start your first project with us or leave a review about our services!</p>
        <div class="space-y-4">
          <button onclick="closeOrderHistory(); document.getElementById('services')?.scrollIntoView({behavior: 'smooth'});" class="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 block mx-auto">Browse Services</button>
          <button onclick="closeOrderHistory(); document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'});" class="text-indigo-600 hover:text-indigo-800 font-medium">Contact Us</button>
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
            <button onclick="closeOrderHistory(); document.getElementById('services')?.scrollIntoView({behavior: 'smooth'});" class="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors">New Project</button>
            <button onclick="closeOrderHistory(); document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'});" class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">Contact Support</button>
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
          <h4 class="text-xl font-bold text-gray-800 flex items-center">📦 Your Orders (${orders.length})</h4>
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
            <h5 class="text-lg font-semibold text-gray-800 mb-2">${order.businessName || order.service || 'Design Project'}</h5>
            <div class="grid grid-cols-2 gap-4 mb-3 text-sm text-gray-600">
              <div><span class="font-medium">Order #:</span> ${order.orderNumber || orderId.substr(-6)}</div>
              <div><span class="font-medium">Date:</span> ${formatDate(order.date || order.timestamp)}</div>
              <div><span class="font-medium">Status:</span> <span class="px-2 py-1 rounded text-xs bg-blue-100 text-blue-700">${(order.status || 'pending').toUpperCase()}</span></div>
              <div><span class="font-medium">Total:</span> <span class="text-lg font-bold text-indigo-600">$${order.total || order.amount || 'TBD'}</span></div>
            </div>
          </div>
          <button onclick="deleteOrderWithConfirm('${orderId}')" class="ml-6 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 px-4 py-2 rounded-lg transition-colors border border-red-200 flex items-center gap-2 font-medium">🗑️ Delete</button>
        </div>
      </div>
    `;
  }
  
  function generateReviewsSection(reviews) {
    return `
      <div class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg">
        <div class="bg-yellow-50 p-6 border-b border-yellow-100">
          <h4 class="text-xl font-bold text-gray-800 flex items-center">⭐ Your Reviews (${reviews.length})</h4>
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
              <span class="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">${formatDate(review.date || review.timestamp)}</span>
            </div>
            <blockquote class="text-gray-700 text-lg leading-relaxed mb-3 italic">"${review.text || review.comment || 'Great service!'}"</blockquote>
            ${review.service ? `<div class="text-sm text-gray-600 bg-blue-50 px-3 py-1 rounded inline-block"><span class="font-medium">Service:</span> ${review.service}</div>` : ''}
          </div>
          <button onclick="deleteReviewWithConfirm('${reviewId}')" class="ml-6 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 px-4 py-2 rounded-lg transition-colors border border-red-200 flex items-center gap-2 font-medium">🗑️ Delete</button>
        </div>
      </div>
    `;
  }
  
  // WORKING DELETE FUNCTIONS
  window.deleteOrderWithConfirm = function(orderId) {
    if (!confirm('⚠️ Are you sure you want to delete this order?\n\nThis action cannot be undone.')) {
      return;
    }
    
    console.log(`🗑️ Deleting order: ${orderId}`);
    
    try {
      // Remove from ALL storage locations
      const userKey = `user_${window.currentUser.email}`;
      const userData = JSON.parse(localStorage.getItem(userKey) || '{}');
      if (userData.orders) {
        userData.orders = userData.orders.filter(order => order.id !== orderId);
        localStorage.setItem(userKey, JSON.stringify(userData));
      }
      
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      users.forEach(user => {
        if (user.orders) {
          user.orders = user.orders.filter(order => order.id !== orderId);
        }
      });
      localStorage.setItem('visualVibeUsers', JSON.stringify(users));
      
      // Remove from UI with animation
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
      
      console.log('✅ Order deleted from all storage locations');
      
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
      // Remove from ALL storage locations
      const userKey = `user_${window.currentUser.email}`;
      const userData = JSON.parse(localStorage.getItem(userKey) || '{}');
      if (userData.reviews) {
        userData.reviews = userData.reviews.filter(review => review.id !== reviewId);
        localStorage.setItem(userKey, JSON.stringify(userData));
      }
      
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      users.forEach(user => {
        if (user.reviews) {
          user.reviews = user.reviews.filter(review => review.id !== reviewId);
        }
      });
      localStorage.setItem('visualVibeUsers', JSON.stringify(users));
      
      // Remove from UI with animation
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
      
      console.log('✅ Review deleted from all storage locations');
      
    } catch (error) {
      console.error('❌ Error deleting review:', error);
      showNotification('Error deleting review', 'error');
    }
  };
  
  // UTILITY FUNCTIONS
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
  
  // NUCLEAR OPTION - Block ALL auto-opening attempts
  const originalSetTimeout = window.setTimeout;
  const originalSetInterval = window.setInterval;
  
  window.setTimeout = function(callback, delay, ...args) {
    if (typeof callback === 'function') {
      const callbackStr = callback.toString();
      if ((callbackStr.includes('openProfileModal') || 
           callbackStr.includes('showOrderHistory') ||
           callbackStr.includes('openPictureUpload')) &&
          !legitimateProfileClick && !legitimateOrdersClick) {
        console.log('🚫 NUCLEAR BLOCK: Auto-opening setTimeout prevented');
        return;
      }
    }
    return originalSetTimeout.call(this, callback, delay, ...args);
  };
  
  window.setInterval = function(callback, delay, ...args) {
    if (typeof callback === 'function') {
      const callbackStr = callback.toString();
      if (callbackStr.includes('openProfileModal') || 
          callbackStr.includes('showOrderHistory') ||
          callbackStr.includes('openPictureUpload')) {
        console.log('🚫 NUCLEAR BLOCK: Auto-opening setInterval prevented');
        return;
      }
    }
    return originalSetInterval.call(this, callback, delay, ...args);
  };
  
  console.log('💥 ULTIMATE FIX LOADED - Nuclear option active');
  console.log('🛡️ All auto-opening blocked');
  console.log('✅ Only legitimate user clicks will work');
  console.log('💾 Enhanced profile saving with multiple backups');
  console.log('🗑️ Working delete buttons for orders and reviews');
  
})();
