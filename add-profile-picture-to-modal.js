// Add Profile Picture Upload Section to Edit Profile Modal
console.log('📸 Adding profile picture upload to edit profile modal...');

(function() {
  'use strict';

  // Prevent multiple initialization
  if (window.profilePictureModalInitialized) {
    console.log('ℹ️ Profile picture modal already initialized');
    return;
  }

  function addProfilePictureToModal() {
    window.profilePictureModalInitialized = true;
    console.log('📸 Setting up profile picture section in modal...');
    
    // Override the openProfileModal function to add picture section
    const originalOpenProfileModal = window.openProfileModal;
    
    window.openProfileModal = function() {
      console.log('👤 Opening profile modal with picture upload...');
      
      // Call original function first
      if (originalOpenProfileModal) {
        originalOpenProfileModal();
      } else {
        // Fallback: show modal manually
        const modal = document.getElementById('profileModal');
        if (modal) {
          modal.classList.remove('hidden');
          modal.style.display = 'flex';
          document.body.style.overflow = 'hidden';
        }
      }
      
      // Add profile picture section after modal is shown
      setTimeout(() => {
        cleanupExistingProfilePictureSections();
        insertProfilePictureSection();
        loadExistingProfileData();
        loadExistingProfilePicture();
        setupProfilePictureHandlers();
      }, 100);
    };
    
    // Ensure close function exists
    if (!window.closeProfileModal) {
      window.closeProfileModal = function() {
        const modal = document.getElementById('profileModal');
        if (modal) {
          modal.classList.add('hidden');
          modal.style.display = 'none';
          document.body.style.overflow = '';
        }
      };
    }
  }

  function cleanupExistingProfilePictureSections() {
    console.log('🧹 Cleaning up existing profile picture sections...');

    const modal = document.getElementById('profileModal');
    if (!modal) return;

    // Remove all profile picture related elements from the modal
    const elementsToRemove = modal.querySelectorAll(`
      #profilePictureSection,
      [data-profile-picture-section],
      [id*="profilePicture"],
      [id*="ProfilePicture"],
      input[type="file"][accept*="image"],
      button[onclick*="profilePicture"],
      button[onclick*="ProfilePicture"],
      .profile-picture-upload,
      .profile-upload-section
    `);

    elementsToRemove.forEach(el => {
      console.log('🗑️ Removing:', el.id || el.className);
      el.remove();
    });

    console.log('✅ Cleanup completed');
  }

  function insertProfilePictureSection() {
    const form = document.getElementById('profileForm');
    if (!form) {
      console.error('❌ Profile form not found');
      return;
    }

    // Remove any existing profile picture sections to prevent duplicates
    const existingSections = document.querySelectorAll('#profilePictureSection, [data-profile-picture-section]');
    existingSections.forEach(section => {
      console.log('🗑️ Removing existing profile picture section');
      section.remove();
    });

    // Also remove any other profile upload elements that might exist
    const existingUploaders = document.querySelectorAll('input[type="file"][accept*="image"], [id*="profilePicture"], [id*="ProfilePicture"]');
    existingUploaders.forEach(uploader => {
      // Only remove if it's inside the profile form
      if (form.contains(uploader)) {
        console.log('🗑️ Removing existing profile uploader');
        uploader.closest('div')?.remove();
      }
    });
    
    // Create profile picture section
    const profilePictureSection = document.createElement('div');
    profilePictureSection.id = 'profilePictureSection';
    profilePictureSection.setAttribute('data-profile-picture-section', 'true');
    profilePictureSection.className = 'text-center pb-6 border-b border-gray-200 mb-6';
    
    profilePictureSection.innerHTML = `
      <h4 class="text-lg font-semibold text-gray-800 mb-4">Profile Picture</h4>
      
      <div class="relative inline-block mb-4">
        <div id="profilePictureDisplay" class="w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto">
          <span id="profileInitials">👤</span>
        </div>
      </div>
      
      <div class="space-y-3">
        <input type="file" id="profilePictureUpload" accept="image/*" class="hidden">
        
        <button type="button" id="uploadPictureBtn" 
                class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2">
          <span>📁</span>
          <span>Upload New Picture</span>
        </button>
        
        <button type="button" id="useInitialsBtn" 
                class="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors font-medium flex items-center justify-center space-x-2">
          <span>🔤</span>
          <span>Use Initials</span>
        </button>
        
        <p class="text-xs text-gray-500 mt-2">Upload an image or use your initials as your profile picture</p>
      </div>
    `;
    
    // Insert at the beginning of the form
    form.insertBefore(profilePictureSection, form.firstChild);
    
    console.log('✅ Profile picture section added to modal');
  }
  
  function setupProfilePictureHandlers() {
    // Upload button handler
    const uploadBtn = document.getElementById('uploadPictureBtn');
    const fileInput = document.getElementById('profilePictureUpload');
    
    if (uploadBtn && fileInput) {
      uploadBtn.onclick = function() {
        fileInput.click();
      };
      
      fileInput.onchange = function(event) {
        handleProfilePictureUpload(event);
      };
    }
    
    // Use initials button handler
    const initialsBtn = document.getElementById('useInitialsBtn');
    if (initialsBtn) {
      initialsBtn.onclick = function() {
        removeProfilePicture();
      };
    }
    
    console.log('✅ Profile picture handlers set up');
  }
  
  // Profile picture upload handler with save confirmation
  window.handleProfilePictureUpload = function(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    console.log('📤 Uploading profile picture:', file.name);
    
    // Validate file
    if (!file.type.startsWith('image/')) {
      showUserMessage('Please select a valid image file', 'error');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      showUserMessage('Image file is too large. Please select a file under 5MB', 'error');
      return;
    }
    
    // Read file
    const reader = new FileReader();
    reader.onload = function(e) {
      const imageData = e.target.result;
      
      // Show save confirmation with preview
      showProfilePictureSaveConfirmation(imageData);
    };
    
    reader.onerror = function() {
      showUserMessage('Failed to read image file', 'error');
    };
    
    reader.readAsDataURL(file);
  };
  
  function showProfilePictureSaveConfirmation(imageData) {
    // Remove any existing confirmation modal
    const existingModal = document.getElementById('profilePictureSaveModal');
    if (existingModal) existingModal.remove();
    
    const confirmModal = document.createElement('div');
    confirmModal.id = 'profilePictureSaveModal';
    confirmModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4';
    
    confirmModal.innerHTML = `
      <div class="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl">
        <h3 class="text-xl font-bold text-gray-800 mb-4 text-center">Save Profile Picture?</h3>
        
        <div class="text-center mb-6">
          <div class="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-gray-200">
            <img src="${imageData}" alt="Profile Picture Preview" class="w-full h-full object-cover">
          </div>
          <p class="text-gray-600 text-sm">Do you want to save this as your profile picture?</p>
        </div>
        
        <div class="flex gap-3">
          <button onclick="cancelProfilePictureSave()" 
                  class="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
            Cancel
          </button>
          <button onclick="confirmProfilePictureSave('${imageData}')" 
                  class="flex-1 bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-colors flex items-center justify-center space-x-2">
            <span>💾</span>
            <span>Save Picture</span>
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(confirmModal);
    
    // Global functions for the confirmation modal
    window.confirmProfilePictureSave = function(imageData) {
      saveProfilePicture(imageData);
      confirmModal.remove();
    };
    
    window.cancelProfilePictureSave = function() {
      confirmModal.remove();
      showUserMessage('Profile picture upload cancelled', 'info');
    };
    
    console.log('✅ Profile picture save confirmation shown');
  }
  
  // Save profile picture function
  function saveProfilePicture(imageData) {
    try {
      console.log('💾 Saving profile picture...');
      
      // Save to storage
      localStorage.setItem('visualVibeProfilePicture', imageData);
      
      // Update user data if available
      if (window.currentUser) {
        const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
        const userIndex = users.findIndex(u => u.id === window.currentUser.id);
        if (userIndex !== -1) {
          users[userIndex].profilePicture = imageData;
          users[userIndex].profilePictureUpdated = new Date().toISOString();
          localStorage.setItem('visualVibeUsers', JSON.stringify(users));
          
          window.currentUser.profilePicture = imageData;
          localStorage.setItem('visualVibeUser', JSON.stringify(window.currentUser));
        }
      }
      
      // Update all displays
      updateAllProfilePictureDisplays(imageData);
      
      showUserMessage('Profile picture saved successfully! 📸', 'success');
      
      console.log('✅ Profile picture saved');
      
    } catch (error) {
      console.error('❌ Error saving profile picture:', error);
      showUserMessage('Failed to save profile picture', 'error');
    }
  }
  
  // Remove profile picture function
  window.removeProfilePicture = function() {
    try {
      console.log('🗑️ Removing profile picture...');
      
      localStorage.removeItem('visualVibeProfilePicture');
      
      if (window.currentUser) {
        const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
        const userIndex = users.findIndex(u => u.id === window.currentUser.id);
        if (userIndex !== -1) {
          delete users[userIndex].profilePicture;
          delete users[userIndex].profilePictureUpdated;
          localStorage.setItem('visualVibeUsers', JSON.stringify(users));
          
          delete window.currentUser.profilePicture;
          localStorage.setItem('visualVibeUser', JSON.stringify(window.currentUser));
        }
      }
      
      updateAllProfilePictureDisplays(null);
      
      showUserMessage('Profile picture removed. Using initials now! 🔤', 'success');
      
      console.log('✅ Profile picture removed');
      
    } catch (error) {
      console.error('❌ Error removing profile picture:', error);
      showUserMessage('Failed to remove profile picture', 'error');
    }
  };
  
  function updateAllProfilePictureDisplays(imageData) {
    // Update profile picture in modal
    const modalDisplay = document.getElementById('profilePictureDisplay');
    if (modalDisplay) {
      if (imageData) {
        modalDisplay.innerHTML = `<img src="${imageData}" alt="Profile" class="w-full h-full object-cover rounded-full">`;
      } else {
        const initials = getProfileInitials();
        modalDisplay.innerHTML = `<span id="profileInitials" class="text-white text-2xl font-bold">${initials}</span>`;
      }
    }
    
    // Update profile pictures throughout the website
    const profilePictures = document.querySelectorAll('.profile-picture, [data-profile-picture], .user-avatar');
    profilePictures.forEach(el => {
      if (imageData) {
        el.innerHTML = `<img src="${imageData}" alt="Profile" class="w-full h-full object-cover rounded-full">`;
      } else {
        const initials = getProfileInitials();
        el.innerHTML = `<div class="w-full h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">${initials}</div>`;
      }
    });
    
    console.log('✅ All profile picture displays updated');
  }
  
  function loadExistingProfileData() {
    try {
      const profileData = JSON.parse(localStorage.getItem('visualVibeProfileData') || '{}');
      const userData = window.currentUser || {};
      const data = { ...profileData, ...userData };
      
      // Populate form fields
      setFieldValue('profileFirstName', data.firstName || data.name?.split(' ')[0] || '');
      setFieldValue('profileLastName', data.lastName || data.name?.split(' ').slice(1).join(' ') || '');
      setFieldValue('profileEmail', data.email || '');
      setFieldValue('profilePhone', data.phone || '');
      setFieldValue('profileCompanyName', data.companyName || data.company || '');
      
      console.log('✅ Existing profile data loaded');
    } catch (error) {
      console.error('❌ Error loading profile data:', error);
    }
  }
  
  function loadExistingProfilePicture() {
    const savedPicture = localStorage.getItem('visualVibeProfilePicture');
    if (savedPicture) {
      updateAllProfilePictureDisplays(savedPicture);
    } else {
      updateAllProfilePictureDisplays(null);
    }
  }
  
  function getProfileInitials() {
    if (window.currentUser && window.currentUser.name) {
      return window.currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    }
    
    const profileData = JSON.parse(localStorage.getItem('visualVibeProfileData') || '{}');
    if (profileData.firstName && profileData.lastName) {
      return (profileData.firstName[0] + profileData.lastName[0]).toUpperCase();
    }
    
    return '👤';
  }
  
  function setFieldValue(fieldId, value) {
    const field = document.getElementById(fieldId);
    if (field) {
      field.value = value || '';
    }
  }
  
  function showUserMessage(message, type = 'info') {
    if (window.toastManager) {
      const duration = type === 'error' ? 4000 : 3000;
      window.toastManager[type](message, { duration });
    } else {
      alert(message);
    }
  }
  
  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addProfilePictureToModal);
  } else {
    setTimeout(addProfilePictureToModal, 100);
  }
  
  // Also initialize after delay to ensure other scripts load
  setTimeout(addProfilePictureToModal, 1000);
  
})();

console.log('✅ Profile picture upload section script loaded');
