// COMPLETE WORKING SOLUTION - Profile & Orders
console.log('🎯 Loading complete working solution...');

(function() {
  'use strict';
  
  // Prevent multiple loads
  if (window.completeWorkingSolution) {
    return;
  }
  window.completeWorkingSolution = true;
  
  console.log('🔧 Initializing complete working solution...');
  
  // Clear all flags from previous implementations
  window.dualOrdersFixed = false;
  window.unifiedOrdersReviewsFinal = false;
  window.myOrdersUnified = false;
  window.directWorkingFix = false;
  window.completeProfileSolution = false;
  
  // PROFILE PICTURE DISPLAY MANAGEMENT
  function updateProfilePictureDisplay() {
    if (!window.currentUser || !window.currentUser.profilePicture) {
      return;
    }
    
    // Update all profile picture elements on the page
    const profileElements = document.querySelectorAll('[data-profile-picture], .profile-picture, #userProfilePicture, .user-avatar');
    profileElements.forEach(element => {
      if (element.tagName === 'IMG') {
        element.src = window.currentUser.profilePicture;
        element.alt = 'Profile Picture';
      } else {
        element.innerHTML = `<img src="${window.currentUser.profilePicture}" alt="Profile" class="w-full h-full object-cover rounded-full">`;
      }
    });
    
    // Also update any edit profile buttons with profile picture display
    const editButtons = document.querySelectorAll('button[onclick*="openProfileModal"], .edit-profile-btn');
    editButtons.forEach(button => {
      const existingImg = button.querySelector('img');
      if (existingImg) {
        existingImg.src = window.currentUser.profilePicture;
      } else {
        // Add profile picture to button if it doesn't have one
        const img = document.createElement('img');
        img.src = window.currentUser.profilePicture;
        img.alt = 'Profile';
        img.className = 'w-8 h-8 rounded-full object-cover mr-2';
        button.insertBefore(img, button.firstChild);
      }
    });
  }
  
  // PREVENT AUTO-OPENING MODALS
  let isUserInitiated = false;
  
  // Track actual user clicks
  document.addEventListener('click', function(e) {
    const target = e.target.closest('button');
    if (target) {
      if (target.textContent.includes('Edit Profile') || 
          target.onclick?.toString().includes('openProfileModal') ||
          target.getAttribute('onclick')?.includes('openProfileModal')) {
        isUserInitiated = true;
        console.log('✅ User clicked Edit Profile button');
      }
      
      if (target.textContent.includes('My Orders') || 
          target.onclick?.toString().includes('showOrderHistory') ||
          target.getAttribute('onclick')?.includes('showOrderHistory')) {
        console.log('✅ User clicked My Orders button');
      }
    }
  });
  
  // PROFILE MODAL - Only opens on user click
  window.openProfileModal = function() {
    if (!isUserInitiated) {
      console.log('🚫 Blocked auto-opening profile modal');
      return;
    }
    
    console.log('👤 Opening profile modal (user-initiated)...');
    isUserInitiated = false; // Reset flag
    
    if (!window.currentUser) {
      alert('Please sign in to edit your profile.');
      return;
    }
    
    const modal = document.getElementById('profileModal');
    if (!modal) {
      alert('Profile editor not available. Please refresh the page.');
      return;
    }
    
    // Get current user data from all storage sources
    const userKey = `user_${window.currentUser.email}`;
    const userData = JSON.parse(localStorage.getItem(userKey) || '{}');
    const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
    const legacyUser = users.find(u => u.email === window.currentUser.email || u.id === window.currentUser.id);
    
    // Combine data
    const completeData = { ...legacyUser, ...userData, ...window.currentUser };
    
    // Create complete profile modal with integrated picture upload
    modal.innerHTML = `
      <div class="bg-white rounded-xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl">
        <!-- Header -->
        <div class="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 class="text-xl font-bold text-gray-800">Edit Profile</h3>
          <button onclick="closeProfileModal()" class="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100">
            ✕
          </button>
        </div>
        
        <!-- Profile Picture Section - INTEGRATED -->
        <div class="p-6 border-b border-gray-100 bg-gray-50">
          <div class="text-center">
            <h4 class="text-sm font-semibold text-gray-700 mb-4">Profile Picture</h4>
            <div class="relative inline-block mb-4">
              <div id="profilePicPreview" class="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-2xl text-gray-500 overflow-hidden border-4 border-white shadow-lg">
                ${completeData.profilePicture ? 
                  `<img src="${completeData.profilePicture}" class="w-full h-full object-cover rounded-full" alt="Profile">` : 
                  '👤'
                }
              </div>
            </div>
            
            <!-- Picture Upload Controls -->
            <div class="space-y-3">
              <input type="file" id="pictureInput" accept="image/*" class="hidden" onchange="handlePictureSelect(event)">
              <button onclick="document.getElementById('pictureInput').click()" 
                      class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm">
                📸 Change Picture
              </button>
              ${completeData.profilePicture ? 
                '<button onclick="removePicture()" class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm ml-2">Remove</button>' : 
                ''
              }
            </div>
          </div>
        </div>
        
        <!-- Profile Form -->
        <div class="flex-1 overflow-y-auto p-6">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
              <input type="text" id="profileFirstName" value="${completeData.firstName || ''}" 
                     class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                     placeholder="Enter first name" required>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
              <input type="text" id="profileLastName" value="${completeData.lastName || ''}" 
                     class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                     placeholder="Enter last name" required>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input type="email" id="profileEmail" value="${completeData.email || ''}" readonly
                     class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500">
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input type="tel" id="profilePhone" value="${completeData.phone || ''}" 
                     class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                     placeholder="Enter phone number">
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
              <input type="text" id="profileCompany" value="${completeData.companyName || ''}" 
                     class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                     placeholder="Enter company name">
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea id="profileBio" rows="3" 
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                        placeholder="Tell us about yourself...">${completeData.bio || ''}</textarea>
            </div>
          </div>
        </div>
        
        <!-- Footer -->
        <div class="p-6 border-t border-gray-100 bg-gray-50">
          <div class="flex gap-3">
            <button onclick="closeProfileModal()" 
                    class="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              Cancel
            </button>
            <button onclick="saveAllProfileData()" 
                    class="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium">
              💾 Save All Changes
            </button>
          </div>
        </div>
      </div>
    `;
    
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Focus first input
    setTimeout(() => {
      const firstInput = document.getElementById('profileFirstName');
      if (firstInput) firstInput.focus();
    }, 100);
  };
  
  // PICTURE HANDLING - Integrated in profile modal
  let selectedPicture = null;
  
  window.handlePictureSelect = function(event) {
    const file = event.target.files[0];
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
    reader.onload = function(e) {
      selectedPicture = e.target.result;
      const preview = document.getElementById('profilePicPreview');
      if (preview) {
        preview.innerHTML = `<img src="${selectedPicture}" class="w-full h-full object-cover rounded-full" alt="Profile">`;
      }
    };
    reader.readAsDataURL(file);
  };
  
  window.removePicture = function() {
    selectedPicture = null;
    const preview = document.getElementById('profilePicPreview');
    if (preview) {
      preview.innerHTML = '👤';
    }
  };
  
  // SAVE ALL PROFILE DATA - Works on first save
  window.saveAllProfileData = function() {
    console.log('💾 Saving ALL profile data...');
    
    if (!window.currentUser) {
      alert('Please sign in to save profile');
      return;
    }
    
    // Get all form data
    const firstName = document.getElementById('profileFirstName')?.value.trim() || '';
    const lastName = document.getElementById('profileLastName')?.value.trim() || '';
    const phone = document.getElementById('profilePhone')?.value.trim() || '';
    const company = document.getElementById('profileCompany')?.value.trim() || '';
    const bio = document.getElementById('profileBio')?.value.trim() || '';
    
    // Validate required fields
    if (!firstName || !lastName) {
      alert('First name and last name are required');
      document.getElementById('profileFirstName')?.focus();
      return;
    }
    
    // Show saving state
    const saveBtn = document.querySelector('button[onclick="saveAllProfileData()"]');
    if (saveBtn) {
      saveBtn.innerHTML = '⏳ Saving...';
      saveBtn.disabled = true;
    }
    
    try {
      // Update current user object with ALL data
      window.currentUser.firstName = firstName;
      window.currentUser.lastName = lastName;
      window.currentUser.name = `${firstName} ${lastName}`;
      window.currentUser.phone = phone;
      window.currentUser.companyName = company;
      window.currentUser.bio = bio;
      
      // Handle profile picture
      if (selectedPicture !== null) {
        window.currentUser.profilePicture = selectedPicture;
      }
      
      // Save to primary storage
      const userKey = `user_${window.currentUser.email}`;
      const completeUserData = {
        ...window.currentUser,
        lastUpdated: new Date().toISOString(),
        profileComplete: true
      };
      localStorage.setItem(userKey, JSON.stringify(completeUserData));
      
      // Save to legacy storage
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      const userIndex = users.findIndex(u => u.email === window.currentUser.email || u.id === window.currentUser.id);
      
      if (userIndex !== -1) {
        // Update existing user
        Object.assign(users[userIndex], completeUserData);
      } else {
        // Add new user
        users.push(completeUserData);
      }
      localStorage.setItem('visualVibeUsers', JSON.stringify(users));
      
      // Update profile picture display on page
      updateProfilePictureDisplay();
      
      // Update welcome messages
      const welcomeElements = document.querySelectorAll('[data-user-name], .user-name, #welcomeMessage');
      welcomeElements.forEach(el => {
        if (el) {
          el.textContent = `Welcome, ${window.currentUser.name}!`;
        }
      });
      
      console.log('✅ ALL profile data saved successfully');
      
      // Success feedback
      setTimeout(() => {
        alert('✅ Profile saved successfully! All information has been updated.');
        closeProfileModal();
      }, 500);
      
    } catch (error) {
      console.error('❌ Error saving profile:', error);
      alert('❌ Error saving profile. Please try again.');
      
      // Restore save button
      if (saveBtn) {
        saveBtn.innerHTML = '💾 Save All Changes';
        saveBtn.disabled = false;
      }
    }
  };
  
  // CLOSE PROFILE MODAL
  window.closeProfileModal = function() {
    const modal = document.getElementById('profileModal');
    if (modal) {
      modal.classList.add('hidden');
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
    selectedPicture = null;
  };
  
  // MY ORDERS - Shows BOTH orders AND reviews consistently
  window.showOrderHistory = function() {
    console.log('📋 Opening My Orders with BOTH orders AND reviews...');
    
    const modal = document.getElementById('orderHistoryModal');
    const content = document.getElementById('orderHistoryContent');
    
    if (!modal || !content) {
      alert('Orders modal not available. Please refresh the page.');
      return;
    }
    
    // Show modal
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Clear content first
    content.innerHTML = '';
    
    if (!window.currentUser) {
      content.innerHTML = `
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
      return;
    }
    
    // Get data from ALL storage locations
    const userKey = `user_${window.currentUser.email}`;
    const userData = JSON.parse(localStorage.getItem(userKey) || '{}');
    const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
    const legacyUser = users.find(u => u.email === window.currentUser.email || u.id === window.currentUser.id);
    
    // Combine and deduplicate data
    let allOrders = [];
    let allReviews = [];
    
    if (userData.orders) allOrders.push(...userData.orders);
    if (userData.reviews) allReviews.push(...userData.reviews);
    if (legacyUser) {
      if (legacyUser.orders) allOrders.push(...legacyUser.orders);
      if (legacyUser.reviews) allReviews.push(...legacyUser.reviews);
    }
    
    // Remove duplicates and ensure IDs
    const orders = deduplicateAndAddIds(allOrders, 'order');
    const reviews = deduplicateAndAddIds(allReviews, 'review');
    
    console.log(`📊 Displaying ${orders.length} orders and ${reviews.length} reviews`);
    
    if (orders.length === 0 && reviews.length === 0) {
      content.innerHTML = `
        <div class="text-center py-16">
          <div class="text-6xl mb-8">🎨</div>
          <h3 class="text-2xl font-bold text-gray-800 mb-4">No Orders or Reviews Yet</h3>
          <p class="text-gray-600 mb-8 max-w-md mx-auto">
            Start your first project with us or leave a review about our services!
          </p>
          <button onclick="closeOrderHistory();" 
                  class="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700">
            Browse Services
          </button>
        </div>
      `;
      return;
    }
    
    // Generate unified display with BOTH orders AND reviews
    let html = `
      <div class="space-y-8">
        <!-- Summary Header -->
        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
          <h3 class="text-2xl font-bold text-gray-800 mb-6">Your Complete Activity</h3>
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
    
    // ORDERS SECTION - Always show if there are orders
    if (orders.length > 0) {
      html += `
        <div class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg">
          <div class="bg-indigo-50 p-6 border-b border-indigo-100">
            <h4 class="text-xl font-bold text-gray-800 flex items-center">
              📦 Your Orders (${orders.length})
            </h4>
            <p class="text-gray-600 mt-2">Track and manage your project orders</p>
          </div>
          <div class="divide-y divide-gray-100">
      `;
      
      orders.forEach(order => {
        const orderId = order.id || `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        html += `
          <div class="p-6 hover:bg-gray-50 transition-colors" id="order-${orderId}">
            <div class="flex justify-between items-start">
              <div class="flex-1">
                <h5 class="text-lg font-semibold text-gray-800 mb-2">
                  ${order.businessName || order.service || 'Design Project'}
                </h5>
                <div class="grid grid-cols-2 gap-4 mb-3 text-sm text-gray-600">
                  <div>
                    <span class="font-medium">Order #:</span> ${order.orderNumber || orderId.substr(-6)}
                  </div>
                  <div>
                    <span class="font-medium">Date:</span> ${formatDate(order.date || order.timestamp)}
                  </div>
                  <div>
                    <span class="font-medium">Status:</span> 
                    <span class="px-2 py-1 rounded text-xs ${getStatusClass(order.status)}">
                      ${(order.status || 'pending').toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <span class="font-medium">Total:</span> 
                    <span class="text-lg font-bold text-indigo-600">$${order.total || order.amount || 'TBD'}</span>
                  </div>
                </div>
                ${order.services ? `
                  <div class="text-sm text-gray-600">
                    <span class="font-medium">Services:</span> ${Array.isArray(order.services) ? order.services.join(', ') : order.services}
                  </div>
                ` : ''}
              </div>
              <button onclick="actuallyDeleteOrder('${orderId}')" 
                      class="ml-6 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 px-4 py-2 rounded-lg transition-colors border border-red-200 flex items-center gap-2 font-medium">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
                Delete
              </button>
            </div>
          </div>
        `;
      });
      
      html += `
          </div>
        </div>
      `;
    }
    
    // REVIEWS SECTION - Always show if there are reviews
    if (reviews.length > 0) {
      html += `
        <div class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg">
          <div class="bg-yellow-50 p-6 border-b border-yellow-100">
            <h4 class="text-xl font-bold text-gray-800 flex items-center">
              ⭐ Your Reviews (${reviews.length})
            </h4>
            <p class="text-gray-600 mt-2">Your feedback and testimonials</p>
          </div>
          <div class="divide-y divide-gray-100">
      `;
      
      reviews.forEach(review => {
        const reviewId = review.id || `review_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const rating = review.rating || 5;
        const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
        
        html += `
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
              <button onclick="actuallyDeleteReview('${reviewId}')" 
                      class="ml-6 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 px-4 py-2 rounded-lg transition-colors border border-red-200 flex items-center gap-2 font-medium">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
                Delete
              </button>
            </div>
          </div>
        `;
      });
      
      html += `
          </div>
        </div>
      `;
    }
    
    html += `
        <!-- Action Buttons -->
        <div class="bg-gray-50 rounded-xl p-6 border">
          <h4 class="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h4>
          <div class="flex flex-wrap gap-4">
            <button onclick="closeOrderHistory();" 
                    class="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors">
              📦 New Order
            </button>
            <button onclick="closeOrderHistory();" 
                    class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
              💬 Contact Support
            </button>
          </div>
        </div>
      </div>
    `;
    
    content.innerHTML = html;
  };
  
  // HELPER FUNCTIONS
  function deduplicateAndAddIds(items, type) {
    const seen = new Set();
    return items.map((item, index) => {
      // Ensure ID
      if (!item.id) {
        item.id = `${type}_${Date.now()}_${index}_${Math.random().toString(36).substr(2, 9)}`;
      }
      
      // Check for duplicates
      const key = item.id;
      if (seen.has(key)) {
        return null;
      }
      seen.add(key);
      return item;
    }).filter(Boolean);
  }
  
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
  
  function getStatusClass(status) {
    const statusMap = {
      completed: 'bg-green-100 text-green-700',
      'in-progress': 'bg-blue-100 text-blue-700',
      pending: 'bg-yellow-100 text-yellow-700',
      cancelled: 'bg-red-100 text-red-700'
    };
    return statusMap[status] || statusMap.pending;
  }
  
  // WORKING DELETE FUNCTIONS - Actually remove data
  window.actuallyDeleteOrder = function(orderId) {
    if (!confirm('⚠️ Are you sure you want to permanently delete this order?\n\nThis action cannot be undone.')) {
      return;
    }
    
    console.log(`🗑️ ACTUALLY deleting order: ${orderId}`);
    
    try {
      let deletedCount = 0;
      
      // Remove from user storage
      const userKey = `user_${window.currentUser.email}`;
      const userData = JSON.parse(localStorage.getItem(userKey) || '{}');
      if (userData.orders) {
        const beforeLength = userData.orders.length;
        userData.orders = userData.orders.filter(order => order.id !== orderId);
        if (userData.orders.length < beforeLength) {
          localStorage.setItem(userKey, JSON.stringify(userData));
          deletedCount++;
        }
      }
      
      // Remove from legacy storage
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      const userIndex = users.findIndex(u => u.email === window.currentUser.email || u.id === window.currentUser.id);
      if (userIndex !== -1 && users[userIndex].orders) {
        const beforeLength = users[userIndex].orders.length;
        users[userIndex].orders = users[userIndex].orders.filter(order => order.id !== orderId);
        if (users[userIndex].orders.length < beforeLength) {
          localStorage.setItem('visualVibeUsers', JSON.stringify(users));
          deletedCount++;
        }
      }
      
      // Remove from UI immediately
      const orderElement = document.getElementById(`order-${orderId}`);
      if (orderElement) {
        orderElement.style.transition = 'all 0.5s ease';
        orderElement.style.opacity = '0';
        orderElement.style.backgroundColor = '#fee2e2';
        orderElement.style.transform = 'translateX(-100%)';
        
        setTimeout(() => {
          orderElement.remove();
          
          // Check if no more orders, update display
          const remainingOrders = document.querySelectorAll('[id^="order-"]');
          if (remainingOrders.length === 0) {
            // Refresh the modal to show updated counts
            setTimeout(() => showOrderHistory(), 500);
          }
        }, 500);
      }
      
      if (deletedCount > 0) {
        showNotification('✅ Order permanently deleted!', 'success');
        console.log('✅ Order ACTUALLY deleted from storage');
      } else {
        showNotification('⚠️ Order not found in storage', 'warning');
      }
      
    } catch (error) {
      console.error('❌ Error deleting order:', error);
      showNotification('❌ Error deleting order. Please try again.', 'error');
    }
  };
  
  window.actuallyDeleteReview = function(reviewId) {
    if (!confirm('⚠️ Are you sure you want to permanently delete this review?\n\nThis action cannot be undone.')) {
      return;
    }
    
    console.log(`🗑️ ACTUALLY deleting review: ${reviewId}`);
    
    try {
      let deletedCount = 0;
      
      // Remove from user storage
      const userKey = `user_${window.currentUser.email}`;
      const userData = JSON.parse(localStorage.getItem(userKey) || '{}');
      if (userData.reviews) {
        const beforeLength = userData.reviews.length;
        userData.reviews = userData.reviews.filter(review => review.id !== reviewId);
        if (userData.reviews.length < beforeLength) {
          localStorage.setItem(userKey, JSON.stringify(userData));
          deletedCount++;
        }
      }
      
      // Remove from legacy storage
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      const userIndex = users.findIndex(u => u.email === window.currentUser.email || u.id === window.currentUser.id);
      if (userIndex !== -1 && users[userIndex].reviews) {
        const beforeLength = users[userIndex].reviews.length;
        users[userIndex].reviews = users[userIndex].reviews.filter(review => review.id !== reviewId);
        if (users[userIndex].reviews.length < beforeLength) {
          localStorage.setItem('visualVibeUsers', JSON.stringify(users));
          deletedCount++;
        }
      }
      
      // Remove from UI immediately
      const reviewElement = document.getElementById(`review-${reviewId}`);
      if (reviewElement) {
        reviewElement.style.transition = 'all 0.5s ease';
        reviewElement.style.opacity = '0';
        reviewElement.style.backgroundColor = '#fee2e2';
        reviewElement.style.transform = 'translateX(-100%)';
        
        setTimeout(() => {
          reviewElement.remove();
          
          // Check if no more reviews, update display
          const remainingReviews = document.querySelectorAll('[id^="review-"]');
          if (remainingReviews.length === 0) {
            // Refresh the modal to show updated counts
            setTimeout(() => showOrderHistory(), 500);
          }
        }, 500);
      }
      
      if (deletedCount > 0) {
        showNotification('✅ Review permanently deleted!', 'success');
        console.log('✅ Review ACTUALLY deleted from storage');
      } else {
        showNotification('⚠️ Review not found in storage', 'warning');
      }
      
    } catch (error) {
      console.error('❌ Error deleting review:', error);
      showNotification('❌ Error deleting review. Please try again.', 'error');
    }
  };
  
  // CLOSE ORDERS MODAL
  window.closeOrderHistory = function() {
    const modal = document.getElementById('orderHistoryModal');
    if (modal) {
      modal.classList.add('hidden');
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  };
  
  // NOTIFICATION SYSTEM
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg text-white transition-all transform translate-x-full ${
      type === 'success' ? 'bg-green-500' : 
      type === 'error' ? 'bg-red-500' : 
      type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
    }`;
    notification.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="text-lg">
          ${type === 'success' ? '✅' : type === 'error' ? '❌' : type === 'warning' ? '⚠️' : 'ℹ️'}
        </span>
        <span class="font-medium">${message}</span>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => notification.remove(), 300);
    }, 4000);
  }
  
  // Initialize profile picture display on load
  if (window.currentUser && window.currentUser.profilePicture) {
    updateProfilePictureDisplay();
  }
  
  // Listen for user sign-in to update profile pictures
  const originalSignIn = window.signIn;
  if (originalSignIn && typeof originalSignIn === 'function') {
    window.signIn = function(...args) {
      const result = originalSignIn.apply(this, args);
      setTimeout(() => {
        updateProfilePictureDisplay();
      }, 100);
      return result;
    };
  }
  
  console.log('✅ Complete working solution loaded successfully!');
  console.log('🛡️ Profile modals: User-controlled only');
  console.log('💾 Profile saving: All data saved on first attempt');
  console.log('📸 Picture upload: Integrated in profile modal');
  console.log('📋 My Orders: Shows BOTH orders AND reviews consistently');
  console.log('🗑️ Delete buttons: Actually remove data permanently');
  
})();
