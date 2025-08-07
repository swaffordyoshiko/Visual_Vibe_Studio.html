// DIRECT WORKING FIX - Addresses all specific reported issues
console.log('🔧 Loading direct working fix for reported issues...');

(function() {
  'use strict';
  
  // Prevent multiple loads
  if (window.directWorkingFix) {
    return;
  }
  window.directWorkingFix = true;
  
  console.log('🛠️ Applying direct fixes...');
  
  // FIX 1: PREVENT AUTO-OPENING PROFILE MODALS
  console.log('🛡️ Fix 1: Preventing auto-opening profile modals...');
  
  // Block all automatic modal opening
  let userInitiatedAction = false;
  
  // Override profile modal functions to require user interaction
  const originalOpenProfileModal = window.openProfileModal;
  window.openProfileModal = function() {
    if (!userInitiatedAction) {
      console.log('🚫 Blocked auto-opening profile modal');
      return;
    }
    
    console.log('👤 User-initiated profile modal opening...');
    userInitiatedAction = false; // Reset flag
    
    const modal = document.getElementById('profileModal');
    if (!modal) {
      alert('Profile editor not available. Please refresh the page.');
      return;
    }
    
    if (!window.currentUser) {
      alert('Please sign in to edit your profile.');
      return;
    }
    
    // Clear existing content and create fresh modal
    modal.innerHTML = `
      <div class="bg-white rounded-xl max-w-md w-full max-h-[90vh] flex flex-col shadow-2xl">
        <div class="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 class="text-xl font-bold text-gray-800">Edit Profile</h3>
          <button onclick="actualCloseProfileModal()" class="text-gray-500 hover:text-gray-700 p-2 rounded-lg">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <div class="p-6 border-b border-gray-100">
          <div class="text-center">
            <div class="relative inline-block">
              <div id="currentProfilePic" class="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-2xl text-gray-500 overflow-hidden border-4 border-white shadow-lg">
                ${window.currentUser.profilePicture ? `<img src="${window.currentUser.profilePicture}" class="w-full h-full object-cover rounded-full">` : '👤'}
              </div>
              <button onclick="userInitiatedPictureUpload()" 
                      class="absolute -bottom-2 -right-2 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700">
                📸
              </button>
            </div>
            <p class="text-sm text-gray-500 mt-2">Click camera to change picture</p>
          </div>
        </div>
        
        <div class="flex-1 overflow-y-auto p-6">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input type="text" id="editFirstName" value="${window.currentUser.firstName || ''}" 
                     class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input type="text" id="editLastName" value="${window.currentUser.lastName || ''}" 
                     class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" id="editEmail" value="${window.currentUser.email || ''}" readonly
                     class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50">
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input type="tel" id="editPhone" value="${window.currentUser.phone || ''}" 
                     class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Company</label>
              <input type="text" id="editCompany" value="${window.currentUser.companyName || ''}" 
                     class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
            </div>
          </div>
        </div>
        
        <div class="p-6 border-t border-gray-100 bg-gray-50">
          <div class="flex gap-3">
            <button onclick="actualCloseProfileModal()" 
                    class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              Cancel
            </button>
            <button onclick="actualSaveProfile()" 
                    class="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium">
              Save All Changes
            </button>
          </div>
        </div>
      </div>
    `;
    
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  };
  
  // Make sure profile actions are user-initiated
  document.addEventListener('click', function(e) {
    const button = e.target.closest('button');
    if (button && (button.textContent.includes('Edit Profile') || button.onclick?.toString().includes('openProfileModal'))) {
      userInitiatedAction = true;
    }
  });
  
  // FIX 2: PROFILE PICTURE UPLOAD WITH SAVE BUTTON
  console.log('📸 Fix 2: Adding save button to profile picture upload...');
  
  window.userInitiatedPictureUpload = function() {
    console.log('📸 User clicked picture upload...');
    
    const uploadModal = document.createElement('div');
    uploadModal.id = 'pictureUploadModal';
    uploadModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    uploadModal.innerHTML = `
      <div class="bg-white rounded-xl max-w-sm w-full p-6">
        <div class="text-center mb-6">
          <h3 class="text-lg font-bold text-gray-800 mb-2">Change Profile Picture</h3>
          <p class="text-gray-600 text-sm">Select and save your new profile picture</p>
        </div>
        
        <div class="space-y-4">
          <div id="picturePreview" class="w-32 h-32 mx-auto rounded-full bg-gray-200 flex items-center justify-center text-3xl text-gray-500 overflow-hidden border-4 border-gray-300">
            ${window.currentUser.profilePicture ? `<img src="${window.currentUser.profilePicture}" class="w-full h-full object-cover rounded-full">` : '👤'}
          </div>
          
          <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            <input type="file" id="pictureFileInput" accept="image/*" class="hidden" onchange="previewSelectedPicture(event)">
            <label for="pictureFileInput" class="cursor-pointer">
              <div class="text-2xl text-gray-400 mb-2">📁</div>
              <p class="text-gray-600 font-medium">Choose Image</p>
              <p class="text-gray-400 text-sm">PNG, JPG up to 5MB</p>
            </label>
          </div>
          
          <div class="flex gap-3">
            <button onclick="closePictureUpload()" 
                    class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              Cancel
            </button>
            <button onclick="removePicture()" 
                    class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              Remove
            </button>
            <button onclick="actualSavePicture()" id="savePictureBtn"
                    class="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
              Save Picture
            </button>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(uploadModal);
  };
  
  let selectedPictureData = null;
  
  window.previewSelectedPicture = function(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
      selectedPictureData = e.target.result;
      const preview = document.getElementById('picturePreview');
      if (preview) {
        preview.innerHTML = `<img src="${selectedPictureData}" class="w-full h-full object-cover rounded-full">`;
      }
    };
    reader.readAsDataURL(file);
  };
  
  window.actualSavePicture = function() {
    if (!selectedPictureData) {
      alert('Please select a picture first');
      return;
    }
    
    console.log('💾 Actually saving profile picture...');
    
    // Save to current user
    window.currentUser.profilePicture = selectedPictureData;
    
    // Save to all storage locations
    const userKey = `user_${window.currentUser.email}`;
    const userData = JSON.parse(localStorage.getItem(userKey) || '{}');
    userData.profilePicture = selectedPictureData;
    localStorage.setItem(userKey, JSON.stringify(userData));
    
    // Legacy storage
    const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
    const userIndex = users.findIndex(u => u.email === window.currentUser.email);
    if (userIndex !== -1) {
      users[userIndex].profilePicture = selectedPictureData;
      localStorage.setItem('visualVibeUsers', JSON.stringify(users));
    }
    
    // Update displays
    const currentProfilePic = document.getElementById('currentProfilePic');
    if (currentProfilePic) {
      currentProfilePic.innerHTML = `<img src="${selectedPictureData}" class="w-full h-full object-cover rounded-full">`;
    }
    
    // Update all profile pictures on page
    document.querySelectorAll('[data-profile-picture], .profile-picture, #userProfilePicture').forEach(el => {
      el.innerHTML = `<img src="${selectedPictureData}" class="w-full h-full object-cover rounded-full">`;
    });
    
    alert('✅ Profile picture saved successfully!');
    closePictureUpload();
  };
  
  window.removePicture = function() {
    selectedPictureData = null;
    window.currentUser.profilePicture = null;
    
    // Remove from storage
    const userKey = `user_${window.currentUser.email}`;
    const userData = JSON.parse(localStorage.getItem(userKey) || '{}');
    delete userData.profilePicture;
    localStorage.setItem(userKey, JSON.stringify(userData));
    
    const preview = document.getElementById('picturePreview');
    if (preview) {
      preview.innerHTML = '👤';
    }
    
    alert('Profile picture removed');
  };
  
  window.closePictureUpload = function() {
    const modal = document.getElementById('pictureUploadModal');
    if (modal) {
      modal.remove();
    }
  };
  
  // FIX 3: MY ORDERS TO SHOW BOTH ORDERS AND REVIEWS
  console.log('📋 Fix 3: Making My Orders show both orders AND reviews...');
  
  window.showOrderHistory = function() {
    console.log('📋 [FIXED] Opening My Orders with both orders AND reviews...');
    
    const modal = document.getElementById('orderHistoryModal');
    const content = document.getElementById('orderHistoryContent');
    
    if (!modal || !content) {
      alert('Orders modal not available. Please refresh the page.');
      return;
    }
    
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    if (!window.currentUser) {
      content.innerHTML = `
        <div class="text-center py-12">
          <div class="text-6xl mb-4">🔐</div>
          <h3 class="text-xl font-bold mb-4">Sign In Required</h3>
          <p class="text-gray-600 mb-6">Please sign in to view your orders and reviews.</p>
          <button onclick="closeOrderHistory(); openSignInModal();" 
                  class="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700">
            Sign In
          </button>
        </div>
      `;
      return;
    }
    
    // Get BOTH orders and reviews from storage
    const userKey = `user_${window.currentUser.email}`;
    const userData = JSON.parse(localStorage.getItem(userKey) || '{}');
    
    // Also check legacy storage
    const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
    const legacyUser = users.find(u => u.email === window.currentUser.email);
    
    // Combine all data
    const orders = [...(userData.orders || []), ...(legacyUser?.orders || [])];
    const reviews = [...(userData.reviews || []), ...(legacyUser?.reviews || [])];
    
    console.log(`📊 Found ${orders.length} orders and ${reviews.length} reviews`);
    
    if (orders.length === 0 && reviews.length === 0) {
      content.innerHTML = `
        <div class="text-center py-12">
          <div class="text-6xl mb-6">🎨</div>
          <h3 class="text-xl font-bold mb-4">No Orders or Reviews Yet</h3>
          <p class="text-gray-600 mb-6">Start by placing an order or leaving a review!</p>
          <button onclick="closeOrderHistory();" 
                  class="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700">
            Browse Services
          </button>
        </div>
      `;
      return;
    }
    
    // Generate content showing BOTH orders AND reviews
    let html = `
      <div class="space-y-8">
        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl">
          <h3 class="text-xl font-bold mb-4">Your Activity Summary</h3>
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-white p-4 rounded-lg text-center">
              <div class="text-2xl font-bold text-indigo-600">${orders.length}</div>
              <div class="text-gray-600">Orders</div>
            </div>
            <div class="bg-white p-4 rounded-lg text-center">
              <div class="text-2xl font-bold text-yellow-600">${reviews.length}</div>
              <div class="text-gray-600">Reviews</div>
            </div>
          </div>
        </div>
    `;
    
    // Add orders section
    if (orders.length > 0) {
      html += `
        <div class="bg-white border rounded-xl overflow-hidden">
          <div class="bg-indigo-50 p-4 border-b">
            <h4 class="text-lg font-bold flex items-center">
              📦 Your Orders (${orders.length})
            </h4>
          </div>
          <div class="divide-y">
      `;
      
      orders.forEach((order, index) => {
        const orderId = order.id || `order_${index}`;
        html += `
          <div class="p-4" id="order-${orderId}">
            <div class="flex justify-between items-start">
              <div class="flex-1">
                <h5 class="font-semibold">${order.businessName || order.service || 'Design Project'}</h5>
                <p class="text-sm text-gray-500">Order #${order.orderNumber || orderId}</p>
                <p class="text-sm text-gray-500">${order.date || 'Date not available'}</p>
                <p class="font-bold text-indigo-600">$${order.total || order.amount || 'TBD'}</p>
              </div>
              <button onclick="actualDeleteOrder('${orderId}')" 
                      class="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 border border-red-200">
                🗑️ Delete
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
    
    // Add reviews section
    if (reviews.length > 0) {
      html += `
        <div class="bg-white border rounded-xl overflow-hidden">
          <div class="bg-yellow-50 p-4 border-b">
            <h4 class="text-lg font-bold flex items-center">
              ⭐ Your Reviews (${reviews.length})
            </h4>
          </div>
          <div class="divide-y">
      `;
      
      reviews.forEach((review, index) => {
        const reviewId = review.id || `review_${index}`;
        const stars = '★'.repeat(review.rating || 5) + '☆'.repeat(5 - (review.rating || 5));
        html += `
          <div class="p-4" id="review-${reviewId}">
            <div class="flex justify-between items-start">
              <div class="flex-1">
                <div class="text-yellow-500 text-lg mb-2">${stars}</div>
                <p class="text-gray-700 italic">"${review.text || review.comment || 'Great service!'}"</p>
                <p class="text-sm text-gray-500 mt-2">${review.date || 'Date not available'}</p>
              </div>
              <button onclick="actualDeleteReview('${reviewId}')" 
                      class="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 border border-red-200">
                🗑️ Delete
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
      </div>
    `;
    
    content.innerHTML = html;
  };
  
  // FIX 4: ACTUAL DELETE FUNCTIONS THAT REALLY DELETE
  console.log('🗑️ Fix 4: Making delete buttons actually delete data...');
  
  window.actualDeleteOrder = function(orderId) {
    if (!confirm('⚠️ Are you sure you want to permanently delete this order?\n\nThis cannot be undone.')) {
      return;
    }
    
    console.log(`🗑️ ACTUALLY deleting order ${orderId}...`);
    
    try {
      let deleted = false;
      
      // Remove from user storage
      const userKey = `user_${window.currentUser.email}`;
      const userData = JSON.parse(localStorage.getItem(userKey) || '{}');
      if (userData.orders) {
        const beforeLength = userData.orders.length;
        userData.orders = userData.orders.filter(order => order.id !== orderId);
        if (userData.orders.length < beforeLength) {
          localStorage.setItem(userKey, JSON.stringify(userData));
          deleted = true;
          console.log('✅ Deleted from user storage');
        }
      }
      
      // Remove from legacy storage
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      const userIndex = users.findIndex(u => u.email === window.currentUser.email);
      if (userIndex !== -1 && users[userIndex].orders) {
        const beforeLength = users[userIndex].orders.length;
        users[userIndex].orders = users[userIndex].orders.filter(order => order.id !== orderId);
        if (users[userIndex].orders.length < beforeLength) {
          localStorage.setItem('visualVibeUsers', JSON.stringify(users));
          deleted = true;
          console.log('✅ Deleted from legacy storage');
        }
      }
      
      if (deleted) {
        // Remove from UI
        const orderElement = document.getElementById(`order-${orderId}`);
        if (orderElement) {
          orderElement.style.transition = 'all 0.5s ease';
          orderElement.style.opacity = '0';
          orderElement.style.backgroundColor = '#fee2e2';
          setTimeout(() => {
            orderElement.remove();
          }, 500);
        }
        
        alert('✅ Order permanently deleted!');
        console.log('✅ Order ACTUALLY deleted successfully');
      } else {
        alert('⚠️ Order not found or already deleted');
        console.log('⚠️ Order not found in storage');
      }
      
    } catch (error) {
      console.error('❌ Error deleting order:', error);
      alert('❌ Error deleting order. Please try again.');
    }
  };
  
  window.actualDeleteReview = function(reviewId) {
    if (!confirm('⚠️ Are you sure you want to permanently delete this review?\n\nThis cannot be undone.')) {
      return;
    }
    
    console.log(`🗑️ ACTUALLY deleting review ${reviewId}...`);
    
    try {
      let deleted = false;
      
      // Remove from user storage
      const userKey = `user_${window.currentUser.email}`;
      const userData = JSON.parse(localStorage.getItem(userKey) || '{}');
      if (userData.reviews) {
        const beforeLength = userData.reviews.length;
        userData.reviews = userData.reviews.filter(review => review.id !== reviewId);
        if (userData.reviews.length < beforeLength) {
          localStorage.setItem(userKey, JSON.stringify(userData));
          deleted = true;
          console.log('✅ Deleted from user storage');
        }
      }
      
      // Remove from legacy storage
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      const userIndex = users.findIndex(u => u.email === window.currentUser.email);
      if (userIndex !== -1 && users[userIndex].reviews) {
        const beforeLength = users[userIndex].reviews.length;
        users[userIndex].reviews = users[userIndex].reviews.filter(review => review.id !== reviewId);
        if (users[userIndex].reviews.length < beforeLength) {
          localStorage.setItem('visualVibeUsers', JSON.stringify(users));
          deleted = true;
          console.log('✅ Deleted from legacy storage');
        }
      }
      
      if (deleted) {
        // Remove from UI
        const reviewElement = document.getElementById(`review-${reviewId}`);
        if (reviewElement) {
          reviewElement.style.transition = 'all 0.5s ease';
          reviewElement.style.opacity = '0';
          reviewElement.style.backgroundColor = '#fee2e2';
          setTimeout(() => {
            reviewElement.remove();
          }, 500);
        }
        
        alert('✅ Review permanently deleted!');
        console.log('✅ Review ACTUALLY deleted successfully');
      } else {
        alert('⚠️ Review not found or already deleted');
        console.log('⚠️ Review not found in storage');
      }
      
    } catch (error) {
      console.error('❌ Error deleting review:', error);
      alert('❌ Error deleting review. Please try again.');
    }
  };
  
  // ACTUAL SAVE PROFILE FUNCTION
  window.actualSaveProfile = function() {
    console.log('💾 Actually saving ALL profile data...');
    
    if (!window.currentUser) {
      alert('Please sign in to save profile');
      return;
    }
    
    const firstName = document.getElementById('editFirstName')?.value || '';
    const lastName = document.getElementById('editLastName')?.value || '';
    const phone = document.getElementById('editPhone')?.value || '';
    const company = document.getElementById('editCompany')?.value || '';
    
    if (!firstName.trim() || !lastName.trim()) {
      alert('First name and last name are required');
      return;
    }
    
    // Update current user
    window.currentUser.firstName = firstName;
    window.currentUser.lastName = lastName;
    window.currentUser.name = `${firstName} ${lastName}`;
    window.currentUser.phone = phone;
    window.currentUser.companyName = company;
    
    // Save to user storage
    const userKey = `user_${window.currentUser.email}`;
    const userData = JSON.parse(localStorage.getItem(userKey) || '{}');
    Object.assign(userData, window.currentUser);
    localStorage.setItem(userKey, JSON.stringify(userData));
    
    // Save to legacy storage
    const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
    const userIndex = users.findIndex(u => u.email === window.currentUser.email);
    if (userIndex !== -1) {
      Object.assign(users[userIndex], window.currentUser);
    } else {
      users.push(window.currentUser);
    }
    localStorage.setItem('visualVibeUsers', JSON.stringify(users));
    
    alert('✅ Profile saved successfully!');
    actualCloseProfileModal();
  };
  
  // CLOSE MODAL FUNCTIONS
  window.actualCloseProfileModal = function() {
    const modal = document.getElementById('profileModal');
    if (modal) {
      modal.classList.add('hidden');
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  };
  
  window.closeOrderHistory = function() {
    const modal = document.getElementById('orderHistoryModal');
    if (modal) {
      modal.classList.add('hidden');
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  };
  
  console.log('✅ All direct fixes applied successfully!');
  console.log('🛡️ Profile modals only open on user click');
  console.log('💾 Profile picture upload has working save button');
  console.log('📋 My Orders shows BOTH orders AND reviews');
  console.log('🗑️ Delete buttons actually delete data');
  
})();
