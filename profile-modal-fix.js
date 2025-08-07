// PROFILE MODAL FIX - Resolves modal and form not found errors
console.log('🔧 Loading profile modal fix...');

(function() {
  'use strict';
  
  // Prevent multiple loads
  if (window.profileModalFix) {
    return;
  }
  window.profileModalFix = true;
  
  console.log('🛠️ Applying profile modal fix...');
  
  // Ensure profile modal exists
  function ensureProfileModal() {
    let modal = document.getElementById('profileModal');
    if (!modal) {
      console.log('⚠️ Profile modal not found, creating it...');
      
      // Create the modal if it doesn't exist
      modal = document.createElement('div');
      modal.id = 'profileModal';
      modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden p-4';
      modal.innerHTML = `
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
              <div class="space-y-2">
                <input type="file" id="profilePictureInput" accept="image/*" class="hidden" onchange="handleProfilePictureChange(event)">
                <button type="button" onclick="document.getElementById('profilePictureInput').click()" 
                        class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm">
                  📸 Change Picture
                </button>
                <button type="button" onclick="removeProfilePicture()" id="removePictureBtn"
                        class="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 text-sm ml-2 hidden">
                  Remove
                </button>
              </div>
            </div>
          </div>

          <!-- Scrollable Content -->
          <div class="flex-1 overflow-y-auto px-6 py-4">
            <form id="profileForm" class="space-y-4">
              <!-- First Name -->
              <div>
                <label for="profileFirstName" class="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  id="profileFirstName"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your first name"
                />
              </div>

              <!-- Last Name -->
              <div>
                <label for="profileLastName" class="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="profileLastName"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your last name"
                />
              </div>

              <!-- Email (readonly) -->
              <div>
                <label for="profileEmail" class="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="profileEmail"
                  readonly
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                  placeholder="Email address"
                />
              </div>

              <!-- Phone -->
              <div>
                <label for="profilePhone" class="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="profilePhone"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>

              <!-- Company -->
              <div>
                <label for="profileCompanyName" class="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  id="profileCompanyName"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your company name"
                />
              </div>

              <!-- Bio -->
              <div>
                <label for="profileBio" class="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  id="profileBio"
                  rows="3"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  placeholder="Tell us about yourself..."
                ></textarea>
              </div>
            </form>
          </div>

          <!-- Fixed Footer -->
          <div class="flex gap-3 p-4 sm:p-6 border-t border-gray-200 flex-shrink-0 bg-gray-50">
            <button type="button" onclick="closeProfileModal()" 
                    class="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="button" onclick="saveCompleteProfile()" 
                    class="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
              💾 Save All Changes
            </button>
          </div>
        </div>
      `;
      
      document.body.appendChild(modal);
      console.log('✅ Profile modal created successfully');
    }
    return modal;
  }
  
  // Track user interactions to prevent auto-opening
  let isUserInitiated = false;
  
  document.addEventListener('click', function(e) {
    const target = e.target.closest('button');
    if (target && (
      target.textContent.includes('Edit Profile') || 
      target.onclick?.toString().includes('openProfileModal') ||
      target.getAttribute('onclick')?.includes('openProfileModal')
    )) {
      isUserInitiated = true;
      console.log('✅ User clicked Edit Profile button');
    }
  });
  
  // Fixed openProfileModal function
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
    
    // Ensure modal exists
    const modal = ensureProfileModal();
    
    // Populate form with current user data
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
  };
  
  function populateProfileForm() {
    if (!window.currentUser) return;
    
    try {
      // Get complete user data from all storage sources
      const userKey = `user_${window.currentUser.email}`;
      const userData = JSON.parse(localStorage.getItem(userKey) || '{}');
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      const legacyUser = users.find(u => u.email === window.currentUser.email || u.id === window.currentUser.id);
      
      // Combine data
      const completeData = { ...legacyUser, ...userData, ...window.currentUser };
      
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
      
      // Update profile picture preview
      const preview = document.getElementById('profilePicPreview');
      const removeBtn = document.getElementById('removePictureBtn');
      
      if (completeData.profilePicture) {
        if (preview) {
          preview.innerHTML = `<img src="${completeData.profilePicture}" class="w-full h-full object-cover rounded-full" alt="Profile">`;
        }
        if (removeBtn) {
          removeBtn.classList.remove('hidden');
        }
      } else {
        if (preview) {
          preview.innerHTML = '👤';
        }
        if (removeBtn) {
          removeBtn.classList.add('hidden');
        }
      }
      
      console.log('✅ Profile form populated successfully');
      
    } catch (error) {
      console.error('❌ Error populating profile form:', error);
    }
  }
  
  // Profile picture handling
  let selectedPicture = null;
  
  window.handleProfilePictureChange = function(event) {
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
      const removeBtn = document.getElementById('removePictureBtn');
      
      if (preview) {
        preview.innerHTML = `<img src="${selectedPicture}" class="w-full h-full object-cover rounded-full" alt="Profile">`;
      }
      if (removeBtn) {
        removeBtn.classList.remove('hidden');
      }
    };
    reader.readAsDataURL(file);
  };
  
  window.removeProfilePicture = function() {
    selectedPicture = null;
    const preview = document.getElementById('profilePicPreview');
    const removeBtn = document.getElementById('removePictureBtn');
    
    if (preview) {
      preview.innerHTML = '👤';
    }
    if (removeBtn) {
      removeBtn.classList.add('hidden');
    }
    
    // Clear file input
    const input = document.getElementById('profilePictureInput');
    if (input) {
      input.value = '';
    }
  };
  
  // Save all profile data
  window.saveCompleteProfile = function() {
    console.log('💾 Saving complete profile data...');
    
    if (!window.currentUser) {
      alert('Please sign in to save profile');
      return;
    }
    
    const form = document.getElementById('profileForm');
    if (!form) {
      alert('Profile form not found. Please refresh the page.');
      return;
    }
    
    // Get all form data
    const firstName = document.getElementById('profileFirstName')?.value.trim() || '';
    const lastName = document.getElementById('profileLastName')?.value.trim() || '';
    const phone = document.getElementById('profilePhone')?.value.trim() || '';
    const company = document.getElementById('profileCompanyName')?.value.trim() || '';
    const bio = document.getElementById('profileBio')?.value.trim() || '';
    
    // Validate required fields
    if (!firstName || !lastName) {
      alert('First name and last name are required');
      const firstEmpty = !firstName ? document.getElementById('profileFirstName') : document.getElementById('profileLastName');
      if (firstEmpty) firstEmpty.focus();
      return;
    }
    
    // Show saving state
    const saveBtn = document.querySelector('button[onclick="saveCompleteProfile()"]');
    if (saveBtn) {
      saveBtn.innerHTML = '⏳ Saving...';
      saveBtn.disabled = true;
    }
    
    try {
      // Update current user object
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
        Object.assign(users[userIndex], completeUserData);
      } else {
        users.push(completeUserData);
      }
      localStorage.setItem('visualVibeUsers', JSON.stringify(users));
      
      // Update profile picture display on page
      updateProfilePictureDisplay();
      
      console.log('✅ Profile data saved successfully');
      
      // Success feedback
      setTimeout(() => {
        alert('✅ Profile saved successfully!');
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
  
  function updateProfilePictureDisplay() {
    if (!window.currentUser || !window.currentUser.profilePicture) return;
    
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
  }
  
  // Close profile modal
  window.closeProfileModal = function() {
    const modal = document.getElementById('profileModal');
    if (modal) {
      modal.classList.add('hidden');
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
    selectedPicture = null;
  };
  
  // Initialize on load
  setTimeout(() => {
    ensureProfileModal();
    if (window.currentUser && window.currentUser.profilePicture) {
      updateProfilePictureDisplay();
    }
  }, 100);
  
  console.log('�� Profile modal fix applied successfully');
  console.log('🛡️ Modal and form elements ensured');
  console.log('👤 Profile functionality restored');
  
})();
