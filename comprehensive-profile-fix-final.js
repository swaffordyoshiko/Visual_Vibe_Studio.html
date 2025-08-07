// COMPREHENSIVE PROFILE FIX - FINAL SOLUTION
console.log('🔧 Loading comprehensive profile fix...');

(function() {
  'use strict';
  
  let profileModalOpen = false;
  let userInitiatedProfileAction = false;
  
  // Track user clicks to distinguish from auto-opens
  document.addEventListener('click', function(e) {
    const target = e.target;
    if (target && (
      target.textContent?.toLowerCase().includes('edit profile') ||
      target.onclick?.toString().includes('openProfileModal') ||
      target.getAttribute('onclick')?.includes('openProfileModal')
    )) {
      userInitiatedProfileAction = true;
      console.log('✅ User-initiated profile action detected');
      setTimeout(() => { userInitiatedProfileAction = false; }, 3000);
    }
  });
  
  // BLOCK AUTO-OPENING - Override setTimeout/setInterval
  const originalSetTimeout = window.setTimeout;
  const originalSetInterval = window.setInterval;
  
  window.setTimeout = function(callback, delay, ...args) {
    if (typeof callback === 'function' && 
        callback.toString().includes('openProfileModal') && 
        !userInitiatedProfileAction) {
      console.log('🚫 BLOCKED: Auto setTimeout call to openProfileModal');
      return;
    }
    return originalSetTimeout.call(this, callback, delay, ...args);
  };
  
  window.setInterval = function(callback, delay, ...args) {
    if (typeof callback === 'function' && 
        callback.toString().includes('openProfileModal')) {
      console.log('🚫 BLOCKED: Auto setInterval call to openProfileModal');
      return;
    }
    return originalSetInterval.call(this, callback, delay, ...args);
  };
  
  // FIXED PROFILE MODAL FUNCTION
  window.openProfileModal = function() {
    console.log('👤 Opening profile modal...');
    
    // Only allow user-initiated opens
    if (!userInitiatedProfileAction) {
      console.log('🚫 Blocked auto-opening profile modal');
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
      
      // Create or get modal
      let modal = document.getElementById('profileModal');
      if (!modal) {
        modal = createProfileModal();
      }
      
      // Load user data into form
      loadProfileData();
      
      // Show modal
      modal.classList.remove('hidden');
      modal.style.display = 'flex';
      
      console.log('✅ Profile modal opened successfully');
      return true;
      
    } catch (error) {
      console.error('❌ Error opening profile modal:', error);
      profileModalOpen = false;
      return false;
    }
  };
  
  // CREATE PROFILE MODAL WITH PHOTO FUNCTIONALITY
  function createProfileModal() {
    const existingModal = document.getElementById('profileModal');
    if (existingModal) {
      existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.id = 'profileModal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden p-4';
    
    modal.innerHTML = `
      <div class="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 class="text-xl font-bold text-gray-800">Edit Profile</h3>
          <button onclick="closeProfileModal()" class="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <form id="profileForm" class="p-6 space-y-4">
          <!-- Profile Photo Section -->
          <div class="text-center space-y-3">
            <div class="mx-auto w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden" id="profilePhotoDisplay">
              <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <button type="button" id="changePhotoBtn" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              📷 Change Profile Photo
            </button>
            <input type="file" id="profilePhotoInput" accept="image/*" class="hidden">
          </div>
          
          <!-- Form Fields -->
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input type="text" id="profileName" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" id="profileEmail" class="w-full p-3 border border-gray-300 rounded-lg bg-gray-50" readonly>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input type="tel" id="profilePhone" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea id="profileAddress" rows="3" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"></textarea>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea id="profileBio" rows="3" placeholder="Tell us about yourself..." class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"></textarea>
            </div>
          </div>
        </form>
        
        <div class="flex gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button type="button" onclick="closeProfileModal()" class="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
            Cancel
          </button>
          <button type="button" onclick="saveProfile()" class="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Setup photo change functionality
    setupPhotoChangeFunction();
    
    return modal;
  }
  
  // LOAD PROFILE DATA
  function loadProfileData() {
    console.log('📊 Loading profile data...');
    
    const user = window.currentUser;
    if (!user) return;
    
    // Load basic info
    const nameInput = document.getElementById('profileName');
    const emailInput = document.getElementById('profileEmail');
    const phoneInput = document.getElementById('profilePhone');
    const addressInput = document.getElementById('profileAddress');
    const bioInput = document.getElementById('profileBio');
    
    if (nameInput) nameInput.value = user.name || user.firstName + ' ' + (user.lastName || '') || '';
    if (emailInput) emailInput.value = user.email || '';
    if (phoneInput) phoneInput.value = user.phone || '';
    if (addressInput) addressInput.value = user.address || '';
    if (bioInput) bioInput.value = user.bio || '';
    
    // Load profile photo
    loadProfilePhoto();
  }
  
  // LOAD PROFILE PHOTO
  function loadProfilePhoto() {
    const photoDisplay = document.getElementById('profilePhotoDisplay');
    if (!photoDisplay) return;
    
    const user = window.currentUser;
    let photoSrc = null;
    
    // Check multiple possible sources for profile photo
    if (user) {
      photoSrc = user.profilePhoto || user.picture || user.avatar || user.profilePicture;
    }
    
    // Try localStorage
    if (!photoSrc) {
      photoSrc = localStorage.getItem(`profilePhoto_${user?.email}`) || 
                 localStorage.getItem('userProfilePhoto') ||
                 window.selectedProfilePicture;
    }
    
    if (photoSrc) {
      photoDisplay.innerHTML = `<img src="${photoSrc}" alt="Profile Photo" class="w-full h-full object-cover rounded-full">`;
      console.log('✅ Profile photo loaded');
    } else {
      // Default avatar
      photoDisplay.innerHTML = `
        <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
        </svg>
      `;
      console.log('📷 Using default profile photo');
    }
  }
  
  // SETUP PHOTO CHANGE FUNCTIONALITY
  function setupPhotoChangeFunction() {
    const changePhotoBtn = document.getElementById('changePhotoBtn');
    const photoInput = document.getElementById('profilePhotoInput');
    
    if (changePhotoBtn && photoInput) {
      changePhotoBtn.onclick = function() {
        photoInput.click();
      };
      
      photoInput.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function(e) {
            const photoData = e.target.result;
            
            // Update display immediately
            const photoDisplay = document.getElementById('profilePhotoDisplay');
            if (photoDisplay) {
              photoDisplay.innerHTML = `<img src="${photoData}" alt="Profile Photo" class="w-full h-full object-cover rounded-full">`;
            }
            
            // Store for saving
            window.selectedProfilePicture = photoData;
            console.log('✅ Profile photo selected');
          };
          reader.readAsDataURL(file);
        }
      };
    }
  }
  
  // SAVE PROFILE FUNCTION - SAVES ALL DATA ON FIRST ATTEMPT
  window.saveProfile = function() {
    console.log('💾 Saving profile...');
    
    try {
      const user = window.currentUser;
      if (!user) {
        alert('No user found. Please sign in first.');
        return;
      }
      
      // Get all form data
      const name = document.getElementById('profileName')?.value?.trim() || '';
      const phone = document.getElementById('profilePhone')?.value?.trim() || '';
      const address = document.getElementById('profileAddress')?.value?.trim() || '';
      const bio = document.getElementById('profileBio')?.value?.trim() || '';
      const profilePhoto = window.selectedProfilePicture;
      
      // Validation
      if (!name) {
        alert('Please enter your name.');
        document.getElementById('profileName')?.focus();
        return;
      }
      
      // Update user object with ALL data
      user.name = name;
      user.firstName = name.split(' ')[0];
      user.lastName = name.split(' ').slice(1).join(' ') || '';
      user.phone = phone;
      user.address = address;
      user.bio = bio;
      user.lastUpdated = new Date().toISOString();
      
      // Handle profile photo
      if (profilePhoto) {
        user.profilePhoto = profilePhoto;
        user.picture = profilePhoto;
        user.avatar = profilePhoto;
        localStorage.setItem(`profilePhoto_${user.email}`, profilePhoto);
        localStorage.setItem('userProfilePhoto', profilePhoto);
      }
      
      // Save to all storage locations
      window.currentUser = user;
      localStorage.setItem('visualVibeUser', JSON.stringify(user));
      localStorage.setItem(`user_${user.email}`, JSON.stringify(user));
      
      // Update users array
      try {
        const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
        const userIndex = users.findIndex(u => u.email === user.email);
        if (userIndex >= 0) {
          users[userIndex] = { ...users[userIndex], ...user };
          localStorage.setItem('visualVibeUsers', JSON.stringify(users));
        }
      } catch (error) {
        console.log('Could not update users array:', error);
      }
      
      console.log('✅ Profile saved successfully:', {
        name, phone, address, bio,
        hasPhoto: !!profilePhoto
      });
      
      // Success feedback
      alert('✅ Profile saved successfully!');
      
      // Update UI
      if (typeof window.updateSignInUI === 'function') {
        window.updateSignInUI();
      }
      
      // Close modal
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
    }
    
    profileModalOpen = false;
    window.selectedProfilePicture = null;
  };
  
  console.log('✅ Comprehensive profile fix loaded');
  console.log('✅ Features: No auto-opening, saves all data, profile photo support');
  
})();
