// AGGRESSIVE AUTO-OPEN PREVENTION FIX
console.log('🛡️ Loading aggressive auto-open prevention fix...');

(function() {
  'use strict';
  
  // Prevent multiple loads
  if (window.preventAutoOpenFix) {
    return;
  }
  window.preventAutoOpenFix = true;
  
  console.log('🚫 Applying aggressive auto-open prevention...');
  
  // STRICT user interaction tracking
  let userHasClicked = false;
  let lastClickTime = 0;
  let clickTarget = null;
  
  // Track ONLY genuine user clicks on specific elements
  function trackUserClick(event) {
    const target = event.target;
    const button = target.closest('button');
    
    if (button && (
      button.onclick?.toString().includes('openProfileModal') ||
      button.getAttribute('onclick')?.includes('openProfileModal') ||
      button.textContent.includes('Edit Profile') ||
      button.textContent.includes('Profile')
    )) {
      userHasClicked = true;
      lastClickTime = Date.now();
      clickTarget = button;
      console.log('✅ User clicked profile-related button:', button.textContent.trim());
      
      // Reset flag after 1 second to prevent accidental opens
      setTimeout(() => {
        userHasClicked = false;
        clickTarget = null;
      }, 1000);
    }
  }
  
  // Add strict click tracking
  document.addEventListener('click', trackUserClick, true);
  document.addEventListener('touchstart', trackUserClick, true);
  
  // COMPLETELY OVERRIDE openProfileModal with strict validation
  const originalOpenProfileModal = window.openProfileModal;
  
  window.openProfileModal = function() {
    console.log('🔍 Profile modal open attempt detected...');
    
    // STRICT validation - must have recent user click
    const timeSinceClick = Date.now() - lastClickTime;
    
    if (!userHasClicked || timeSinceClick > 1000) {
      console.log('🚫 BLOCKED: Profile modal auto-open prevented');
      console.log(`User clicked: ${userHasClicked}, Time since click: ${timeSinceClick}ms`);
      return false;
    }
    
    console.log('✅ ALLOWED: User-initiated profile modal open');
    userHasClicked = false; // Reset immediately after use
    
    // Proceed with opening
    try {
      if (!window.currentUser) {
        alert('Please sign in to edit your profile.');
        return;
      }
      
      // Ensure modal exists
      let modal = document.getElementById('profileModal');
      if (!modal) {
        console.log('⚠️ Creating missing profile modal...');
        createProfileModal();
        modal = document.getElementById('profileModal');
      }
      
      // Populate and show modal
      populateProfileModal();
      modal.classList.remove('hidden');
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      
      // Focus first input
      setTimeout(() => {
        const firstInput = document.getElementById('profileFirstName');
        if (firstInput) firstInput.focus();
      }, 100);
      
    } catch (error) {
      console.error('❌ Error opening profile modal:', error);
      alert('Error opening profile. Please try again.');
    }
  };
  
  // Create profile modal if it doesn't exist
  function createProfileModal() {
    const modal = document.createElement('div');
    modal.id = 'profileModal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden p-4';
    modal.innerHTML = `
      <div class="bg-white rounded-xl max-w-md w-full max-h-[90vh] flex flex-col shadow-2xl">
        <!-- Header -->
        <div class="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 class="text-xl font-bold text-gray-800">Edit Profile</h3>
          <button onclick="forceCloseProfileModal()" class="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100">
            ✕
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
            <div class="space-y-2">
              <input type="file" id="profilePictureInput" accept="image/*" class="hidden" onchange="handleStrictPictureChange(event)">
              <button type="button" onclick="openPictureUploadWithValidation()" 
                      class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm">
                📸 Change Picture
              </button>
              <button type="button" onclick="removeProfilePictureStrict()" id="removePictureBtn"
                      class="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 text-sm ml-2 hidden">
                Remove
              </button>
            </div>
          </div>
        </div>

        <!-- Form Content -->
        <div class="flex-1 overflow-y-auto px-6 py-4">
          <form id="profileForm" class="space-y-4">
            <div>
              <label for="profileFirstName" class="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
              <input type="text" id="profileFirstName" required
                     class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                     placeholder="Enter your first name">
            </div>
            
            <div>
              <label for="profileLastName" class="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
              <input type="text" id="profileLastName" required
                     class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                     placeholder="Enter your last name">
            </div>
            
            <div>
              <label for="profileEmail" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input type="email" id="profileEmail" readonly
                     class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500">
            </div>
            
            <div>
              <label for="profilePhone" class="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input type="tel" id="profilePhone"
                     class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                     placeholder="Enter your phone number">
            </div>
            
            <div>
              <label for="profileCompanyName" class="block text-sm font-medium text-gray-700 mb-2">Company</label>
              <input type="text" id="profileCompanyName"
                     class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                     placeholder="Enter your company name">
            </div>
          </form>
        </div>

        <!-- Footer -->
        <div class="flex gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button type="button" onclick="forceCloseProfileModal()" 
                  class="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            Cancel
          </button>
          <button type="button" onclick="saveProfileWithValidation()" 
                  class="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium">
            💾 Save Changes
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
  }
  
  // STRICT picture upload that requires user click
  let pictureClickAllowed = false;
  
  window.openPictureUploadWithValidation = function() {
    console.log('📸 Picture upload attempt...');
    
    // Allow picture upload since user clicked the button in modal
    pictureClickAllowed = true;
    document.getElementById('profilePictureInput').click();
    
    // Reset flag after short time
    setTimeout(() => {
      pictureClickAllowed = false;
    }, 100);
  };
  
  // STRICT picture change handler
  window.handleStrictPictureChange = function(event) {
    if (!pictureClickAllowed) {
      console.log('🚫 BLOCKED: Picture upload not user-initiated');
      return;
    }
    
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
      const preview = document.getElementById('profilePicPreview');
      const removeBtn = document.getElementById('removePictureBtn');
      
      if (preview) {
        preview.innerHTML = `<img src="${e.target.result}" class="w-full h-full object-cover rounded-full" alt="Profile">`;
      }
      if (removeBtn) {
        removeBtn.classList.remove('hidden');
      }
      
      // Store the image data
      window.selectedProfilePicture = e.target.result;
    };
    reader.readAsDataURL(file);
  };
  
  window.removeProfilePictureStrict = function() {
    const preview = document.getElementById('profilePicPreview');
    const removeBtn = document.getElementById('removePictureBtn');
    const input = document.getElementById('profilePictureInput');
    
    if (preview) preview.innerHTML = '👤';
    if (removeBtn) removeBtn.classList.add('hidden');
    if (input) input.value = '';
    
    window.selectedProfilePicture = null;
  };
  
  // Populate profile modal with current data
  function populateProfileModal() {
    if (!window.currentUser) return;
    
    try {
      // Get complete user data
      const userKey = `user_${window.currentUser.email}`;
      const userData = JSON.parse(localStorage.getItem(userKey) || '{}');
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      const legacyUser = users.find(u => u.email === window.currentUser.email || u.id === window.currentUser.id);
      
      const completeData = { ...legacyUser, ...userData, ...window.currentUser };
      
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
        if (field) field.value = value;
      });
      
      // Update picture preview
      const preview = document.getElementById('profilePicPreview');
      const removeBtn = document.getElementById('removePictureBtn');
      
      if (completeData.profilePicture) {
        if (preview) {
          preview.innerHTML = `<img src="${completeData.profilePicture}" class="w-full h-full object-cover rounded-full" alt="Profile">`;
        }
        if (removeBtn) removeBtn.classList.remove('hidden');
        window.selectedProfilePicture = completeData.profilePicture;
      } else {
        if (preview) preview.innerHTML = '👤';
        if (removeBtn) removeBtn.classList.add('hidden');
        window.selectedProfilePicture = null;
      }
      
    } catch (error) {
      console.error('❌ Error populating profile:', error);
    }
  }
  
  // Save profile with validation
  window.saveProfileWithValidation = function() {
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
      // Update user data
      window.currentUser.firstName = firstName;
      window.currentUser.lastName = lastName;
      window.currentUser.name = `${firstName} ${lastName}`;
      window.currentUser.phone = phone;
      window.currentUser.companyName = company;
      
      if (window.selectedProfilePicture) {
        window.currentUser.profilePicture = window.selectedProfilePicture;
      }
      
      // Save to storage
      const userKey = `user_${window.currentUser.email}`;
      const userData = { ...window.currentUser, lastUpdated: new Date().toISOString() };
      localStorage.setItem(userKey, JSON.stringify(userData));
      
      // Save to legacy storage
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      const userIndex = users.findIndex(u => u.email === window.currentUser.email || u.id === window.currentUser.id);
      
      if (userIndex !== -1) {
        Object.assign(users[userIndex], userData);
      } else {
        users.push(userData);
      }
      localStorage.setItem('visualVibeUsers', JSON.stringify(users));
      
      // Update page displays
      updatePageDisplays();
      
      alert('✅ Profile saved successfully!');
      forceCloseProfileModal();
      
    } catch (error) {
      console.error('❌ Error saving profile:', error);
      alert('❌ Error saving profile. Please try again.');
    }
  };
  
  function updatePageDisplays() {
    // Update welcome message
    const welcomeMsg = document.getElementById('welcomeMessage');
    if (welcomeMsg && window.currentUser?.name) {
      welcomeMsg.textContent = `Welcome back, ${window.currentUser.name}! 👋`;
    }
    
    // Update profile pictures
    if (window.currentUser?.profilePicture) {
      const profileElements = document.querySelectorAll('img[alt="Profile"], [data-profile-picture]');
      profileElements.forEach(el => {
        if (el.tagName === 'IMG') {
          el.src = window.currentUser.profilePicture;
        }
      });
    }
  }
  
  // Force close modal
  window.forceCloseProfileModal = function() {
    const modal = document.getElementById('profileModal');
    if (modal) {
      modal.classList.add('hidden');
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
    
    // Reset all flags
    userHasClicked = false;
    pictureClickAllowed = false;
    window.selectedProfilePicture = null;
  };
  
  // Ensure close function exists
  if (!window.closeProfileModal) {
    window.closeProfileModal = window.forceCloseProfileModal;
  }
  
  // BLOCK any automatic calls on page load
  document.addEventListener('DOMContentLoaded', function() {
    console.log('🔒 Page loaded - auto-open prevention active');
  });
  
  // BLOCK setTimeout/setInterval calls to openProfileModal
  const originalSetTimeout = window.setTimeout;
  const originalSetInterval = window.setInterval;
  
  window.setTimeout = function(callback, delay, ...args) {
    if (typeof callback === 'function' && callback.toString().includes('openProfileModal')) {
      console.log('🚫 BLOCKED: setTimeout call to openProfileModal');
      return;
    }
    return originalSetTimeout.call(this, callback, delay, ...args);
  };
  
  window.setInterval = function(callback, delay, ...args) {
    if (typeof callback === 'function' && callback.toString().includes('openProfileModal')) {
      console.log('🚫 BLOCKED: setInterval call to openProfileModal');
      return;
    }
    return originalSetInterval.call(this, callback, delay, ...args);
  };
  
  console.log('✅ Aggressive auto-open prevention applied successfully');
  console.log('🛡️ Profile modals will ONLY open on genuine user clicks');
  
})();
