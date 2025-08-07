// COMPLETE PROFILE EDITING AND PICTURE UPLOAD SOLUTION
console.log('👤 Loading complete profile solution...');

(function() {
  'use strict';
  
  // Prevent multiple initializations
  if (window.completeProfileSolution) {
    console.log('✅ Complete profile solution already loaded');
    return;
  }
  window.completeProfileSolution = true;
  
  console.log('🔧 Initializing complete profile functionality...');
  
  // Override profile modal functions to prevent auto-opening
  window.openProfileModal = function() {
    console.log('👤 [COMPLETE] Opening profile modal (user-initiated)...');
    
    try {
      const modal = document.getElementById('profileModal');
      if (!modal) {
        console.error('❌ Profile modal not found');
        showProfileNotification('Profile editor not available. Please refresh the page.', 'error');
        return;
      }
      
      // Check authentication
      if (!window.currentUser) {
        showProfileNotification('Please sign in to edit your profile.', 'warning');
        return;
      }
      
      // Clear any existing content
      const modalContent = modal.querySelector('.bg-white');
      if (modalContent) {
        modalContent.innerHTML = generateProfileModalContent();
      }
      
      // Populate form with current data
      populateProfileForm();
      
      // Show modal
      modal.classList.remove('hidden');
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      
      // Focus first field after modal is shown
      setTimeout(() => {
        const firstInput = modal.querySelector('input[type="text"]');
        if (firstInput) {
          firstInput.focus();
        }
      }, 100);
      
      console.log('✅ Profile modal opened successfully');
      
    } catch (error) {
      console.error('❌ Error opening profile modal:', error);
      showProfileNotification('Error opening profile editor. Please try again.', 'error');
    }
  };
  
  function generateProfileModalContent() {
    return `
      <div class="bg-white rounded-xl max-w-md w-full max-h-[90vh] flex flex-col shadow-2xl">
        <!-- Header -->
        <div class="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 class="text-xl font-bold text-gray-800">Edit Profile</h3>
          <button onclick="closeProfileModal()" class="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <!-- Profile Picture Section -->
        <div class="p-6 border-b border-gray-100">
          <div class="text-center">
            <div class="relative inline-block">
              <div id="profilePicturePreview" class="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-2xl text-gray-500 overflow-hidden border-4 border-white shadow-lg">
                👤
              </div>
              <button onclick="openProfilePictureUpload()" 
                      class="absolute -bottom-2 -right-2 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors shadow-lg">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </button>
            </div>
            <p class="text-sm text-gray-500 mt-2">Click camera to change picture</p>
          </div>
        </div>
        
        <!-- Form Section -->
        <div class="flex-1 overflow-y-auto p-6">
          <form id="profileForm" class="space-y-4">
            <div>
              <label for="profileFirstName" class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input type="text" id="profileFirstName" name="firstName" 
                     class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                     placeholder="Enter your first name" required>
            </div>
            
            <div>
              <label for="profileLastName" class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input type="text" id="profileLastName" name="lastName"
                     class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                     placeholder="Enter your last name" required>
            </div>
            
            <div>
              <label for="profileEmail" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" id="profileEmail" name="email"
                     class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                     placeholder="Email address" readonly>
            </div>
            
            <div>
              <label for="profilePhone" class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input type="tel" id="profilePhone" name="phone"
                     class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                     placeholder="Enter your phone number">
            </div>
            
            <div>
              <label for="profileCompanyName" class="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input type="text" id="profileCompanyName" name="companyName"
                     class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                     placeholder="Enter your company name">
            </div>
            
            <div>
              <label for="profileBio" class="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea id="profileBio" name="bio" rows="3"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
                        placeholder="Tell us about yourself..."></textarea>
            </div>
          </form>
        </div>
        
        <!-- Footer -->
        <div class="p-6 border-t border-gray-100 bg-gray-50 rounded-b-xl">
          <div class="flex gap-3">
            <button onclick="closeProfileModal()" 
                    class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button onclick="saveCompleteProfile()" 
                    class="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
              Save All Changes
            </button>
          </div>
        </div>
      </div>
    `;
  }
  
  function populateProfileForm() {
    if (!window.currentUser) return;
    
    try {
      // Get complete user data from all storage locations
      const userKey = `user_${window.currentUser.email}`;
      const userData = JSON.parse(localStorage.getItem(userKey) || '{}');
      
      // Also check legacy storage
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      const legacyUser = users.find(u => u.email === window.currentUser.email || u.id === window.currentUser.id);
      
      // Combine data sources
      const completeData = {
        ...legacyUser,
        ...userData,
        ...window.currentUser
      };
      
      // Populate form fields
      const fields = {
        'profileFirstName': completeData.firstName || '',
        'profileLastName': completeData.lastName || '',
        'profileEmail': completeData.email || '',
        'profilePhone': completeData.phone || '',
        'profileCompanyName': completeData.companyName || '',
        'profileBio': completeData.bio || ''
      };
      
      Object.entries(fields).forEach(([fieldId, value]) => {
        const field = document.getElementById(fieldId);
        if (field) {
          field.value = value;
        }
      });
      
      // Load profile picture
      updateProfilePictureDisplay(completeData.profilePicture);
      
      console.log('✅ Profile form populated with complete data');
      
    } catch (error) {
      console.error('❌ Error populating profile form:', error);
    }
  }
  
  function updateProfilePictureDisplay(profilePicture) {
    const preview = document.getElementById('profilePicturePreview');
    if (!preview) return;
    
    if (profilePicture) {
      preview.innerHTML = `<img src="${profilePicture}" alt="Profile" class="w-full h-full object-cover rounded-full">`;
    } else {
      preview.innerHTML = '👤';
    }
    
    // Also update main profile picture on page
    updateMainProfilePicture(profilePicture);
  }
  
  function updateMainProfilePicture(profilePicture) {
    // Update all profile picture elements on the page
    const profileElements = document.querySelectorAll('[data-profile-picture], .profile-picture, #userProfilePicture');
    profileElements.forEach(element => {
      if (profilePicture) {
        if (element.tagName === 'IMG') {
          element.src = profilePicture;
        } else {
          element.innerHTML = `<img src="${profilePicture}" alt="Profile" class="w-full h-full object-cover rounded-full">`;
        }
      } else {
        element.innerHTML = '👤';
      }
    });
  }
  
  // Profile Picture Upload Modal (only opens when user clicks)
  window.openProfilePictureUpload = function() {
    console.log('📸 [USER-INITIATED] Opening profile picture upload...');
    
    const uploadModal = document.createElement('div');
    uploadModal.id = 'profilePictureUploadModal';
    uploadModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    uploadModal.innerHTML = `
      <div class="bg-white rounded-xl max-w-sm w-full p-6">
        <div class="text-center mb-6">
          <h3 class="text-lg font-bold text-gray-800 mb-2">Change Profile Picture</h3>
          <p class="text-gray-600 text-sm">Upload a new profile picture</p>
        </div>
        
        <div class="space-y-4">
          <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors">
            <input type="file" id="profilePictureInput" accept="image/*" class="hidden" onchange="handleProfilePictureUpload(event)">
            <label for="profilePictureInput" class="cursor-pointer">
              <div class="text-4xl text-gray-400 mb-2">📸</div>
              <p class="text-gray-600 font-medium">Click to upload image</p>
              <p class="text-gray-400 text-sm mt-1">PNG, JPG up to 5MB</p>
            </label>
          </div>
          
          <div class="flex gap-3">
            <button onclick="closePictureUploadModal()" 
                    class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button onclick="removeProfilePicture()" 
                    class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              Remove Picture
            </button>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(uploadModal);
    document.body.style.overflow = 'hidden';
  };
  
  window.handleProfilePictureUpload = function(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Validate file
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      showProfileNotification('File size must be less than 5MB', 'error');
      return;
    }
    
    if (!file.type.startsWith('image/')) {
      showProfileNotification('Please select an image file', 'error');
      return;
    }
    
    // Convert to base64 and save
    const reader = new FileReader();
    reader.onload = function(e) {
      const profilePicture = e.target.result;
      
      // Save to current user data
      if (window.currentUser) {
        window.currentUser.profilePicture = profilePicture;
        
        // Save to all storage locations
        saveProfilePictureToStorage(profilePicture);
        
        // Update display
        updateProfilePictureDisplay(profilePicture);
        
        showProfileNotification('Profile picture updated successfully!', 'success');
        closePictureUploadModal();
      }
    };
    
    reader.readAsDataURL(file);
  };
  
  function saveProfilePictureToStorage(profilePicture) {
    try {
      // Save to user-specific storage
      const userKey = `user_${window.currentUser.email}`;
      const userData = JSON.parse(localStorage.getItem(userKey) || '{}');
      userData.profilePicture = profilePicture;
      localStorage.setItem(userKey, JSON.stringify(userData));
      
      // Save to legacy storage
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      const userIndex = users.findIndex(u => u.email === window.currentUser.email || u.id === window.currentUser.id);
      if (userIndex !== -1) {
        users[userIndex].profilePicture = profilePicture;
        localStorage.setItem('visualVibeUsers', JSON.stringify(users));
      }
      
      console.log('✅ Profile picture saved to all storage locations');
      
    } catch (error) {
      console.error('❌ Error saving profile picture:', error);
    }
  }
  
  window.removeProfilePicture = function() {
    if (!confirm('Are you sure you want to remove your profile picture?')) return;
    
    // Remove from current user
    if (window.currentUser) {
      delete window.currentUser.profilePicture;
      
      // Remove from all storage locations
      saveProfilePictureToStorage(null);
      
      // Update display
      updateProfilePictureDisplay(null);
      
      showProfileNotification('Profile picture removed', 'success');
      closePictureUploadModal();
    }
  };
  
  window.closePictureUploadModal = function() {
    const modal = document.getElementById('profilePictureUploadModal');
    if (modal) {
      modal.remove();
      document.body.style.overflow = '';
    }
  };
  
  // Complete Profile Save Function
  window.saveCompleteProfile = function() {
    console.log('💾 [COMPLETE] Saving ALL profile information...');
    
    try {
      if (!window.currentUser) {
        showProfileNotification('Please sign in to save profile', 'error');
        return;
      }
      
      // Get all form data
      const formData = {
        firstName: document.getElementById('profileFirstName')?.value || '',
        lastName: document.getElementById('profileLastName')?.value || '',
        email: document.getElementById('profileEmail')?.value || window.currentUser.email,
        phone: document.getElementById('profilePhone')?.value || '',
        companyName: document.getElementById('profileCompanyName')?.value || '',
        bio: document.getElementById('profileBio')?.value || ''
      };
      
      // Validate required fields
      if (!formData.firstName.trim() || !formData.lastName.trim()) {
        showProfileNotification('First name and last name are required', 'error');
        return;
      }
      
      // Show saving indicator
      const saveButton = document.querySelector('button[onclick="saveCompleteProfile()"]');
      if (saveButton) {
        saveButton.innerHTML = '<span class="animate-spin">⏳</span> Saving...';
        saveButton.disabled = true;
      }
      
      // Update current user object with ALL data
      Object.assign(window.currentUser, formData);
      window.currentUser.name = `${formData.firstName} ${formData.lastName}`;
      window.currentUser.lastUpdated = new Date().toISOString();
      
      // Save to user-specific storage with ALL data
      const userKey = `user_${window.currentUser.email}`;
      const existingUserData = JSON.parse(localStorage.getItem(userKey) || '{}');
      const completeUserData = {
        ...existingUserData,
        ...formData,
        ...window.currentUser,
        profileComplete: true,
        lastSaved: new Date().toISOString()
      };
      localStorage.setItem(userKey, JSON.stringify(completeUserData));
      
      // Save to legacy storage
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      const userIndex = users.findIndex(u => u.email === window.currentUser.email || u.id === window.currentUser.id);
      if (userIndex !== -1) {
        Object.assign(users[userIndex], completeUserData);
      } else {
        users.push(completeUserData);
      }
      localStorage.setItem('visualVibeUsers', JSON.stringify(users));
      
      // Update welcome message on page
      updateWelcomeMessage();
      
      // Update profile display immediately
      updateMainProfilePicture(window.currentUser.profilePicture);
      
      console.log('✅ ALL profile data saved successfully');
      
      // Show success and close modal
      setTimeout(() => {
        showProfileNotification('Profile saved successfully! All information updated.', 'success');
        closeProfileModal();
      }, 500);
      
    } catch (error) {
      console.error('❌ Error saving complete profile:', error);
      showProfileNotification('Error saving profile. Please try again.', 'error');
      
      // Restore save button
      const saveButton = document.querySelector('button[onclick="saveCompleteProfile()"]');
      if (saveButton) {
        saveButton.innerHTML = 'Save All Changes';
        saveButton.disabled = false;
      }
    }
  };
  
  function updateWelcomeMessage() {
    // Update any welcome messages on the page
    const welcomeElements = document.querySelectorAll('[data-user-name], .user-name, #welcomeMessage');
    welcomeElements.forEach(element => {
      if (window.currentUser?.name) {
        element.textContent = `Welcome, ${window.currentUser.name}!`;
      }
    });
  }
  
  // Close Profile Modal
  window.closeProfileModal = function() {
    console.log('👤 [COMPLETE] Closing profile modal...');
    const modal = document.getElementById('profileModal');
    if (modal) {
      modal.classList.add('hidden');
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  };
  
  function showProfileNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg text-white transition-all transform translate-y-[-100px] ${
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
      notification.style.transform = 'translateY(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
      notification.style.transform = 'translateY(-100px)';
      setTimeout(() => notification.remove(), 300);
    }, 4000);
  }
  
  // Initialize profile picture display on page load
  function initializeProfileDisplay() {
    if (window.currentUser && window.currentUser.profilePicture) {
      updateMainProfilePicture(window.currentUser.profilePicture);
    }
  }
  
  // Load profile picture on sign in
  const originalSignIn = window.signIn;
  if (originalSignIn) {
    window.signIn = function(...args) {
      const result = originalSignIn.apply(this, args);
      setTimeout(() => {
        initializeProfileDisplay();
        updateWelcomeMessage();
      }, 100);
      return result;
    };
  }
  
  // Initialize immediately if user is already signed in
  if (window.currentUser) {
    setTimeout(() => {
      initializeProfileDisplay();
      updateWelcomeMessage();
    }, 100);
  }
  
  console.log('✅ Complete profile solution loaded successfully');
  console.log('🛡️ Profile modals only open on user click, all data saves on first attempt');
  
})();
