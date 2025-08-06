// Comprehensive Profile Fix - Resolves saving and auto-popup picture issues
console.log('🔧 Loading comprehensive profile fix...');

(function() {
  'use strict';
  
  let isInitialized = false;
  
  function initializeProfileFix() {
    if (isInitialized) return;
    isInitialized = true;
    
    console.log('🚀 Initializing comprehensive profile fix...');
    
    // Fix 1: Correct profile form saving
    setupCorrectFormHandling();
    
    // Fix 2: Prevent auto-popup of profile picture options
    fixProfilePictureClickBehavior();
    
    console.log('✅ Comprehensive profile fix initialized');
  }
  
  function setupCorrectFormHandling() {
    console.log('📝 Setting up correct form handling...');
    
    // Override the profile update function with correct field mapping
    window.handleProfileUpdate = function(event) {
      console.log('💾 Handling profile update with correct field mapping...');
      
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      
      try {
        // Get form data with correct field IDs
        const profileData = {
          firstName: getFieldValue('profileFirstName'),
          lastName: getFieldValue('profileLastName'),
          fullName: getFieldValue('profileFirstName') + ' ' + getFieldValue('profileLastName'),
          email: getFieldValue('profileEmail'),
          phone: getFieldValue('profilePhone'),
          companyName: getFieldValue('profileCompanyName'),
          lastUpdated: new Date().toISOString()
        };
        
        console.log('📊 Gathered profile data:', profileData);
        
        // Validate required fields
        if (!profileData.firstName || !profileData.lastName || !profileData.email) {
          showErrorMessage('Please fill in all required fields (First Name, Last Name, Email)');
          return false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(profileData.email)) {
          showErrorMessage('Please enter a valid email address');
          return false;
        }
        
        // Save to localStorage
        saveProfileDataToStorage(profileData);
        
        // Update current user
        updateCurrentUser(profileData);
        
        // Update UI elements
        updateProfileUIElements(profileData);
        
        // Show success message
        if (window.toastManager) {
          window.toastManager.success('Profile updated successfully! 🎉', { duration: 3000 });
        } else {
          showSuccessMessage('Profile updated successfully! 🎉');
        }
        
        // Close modal after short delay
        setTimeout(() => {
          if (typeof window.closeProfileModal === 'function') {
            window.closeProfileModal();
          }
        }, 1500);
        
        console.log('✅ Profile updated successfully');
        return false;
        
      } catch (error) {
        console.error('❌ Error updating profile:', error);
        showErrorMessage('Failed to update profile. Please try again.');
        return false;
      }
    };
    
    // Ensure form is properly set up when modal opens
    const originalOpenProfileModal = window.openProfileModal;
    window.openProfileModal = function() {
      console.log('👤 Opening profile modal with enhanced form handling...');
      
      // Call original function
      if (typeof originalOpenProfileModal === 'function') {
        originalOpenProfileModal();
      } else {
        // Fallback modal opening
        const modal = document.getElementById('profileModal');
        if (modal) {
          modal.classList.remove('hidden');
        }
      }
      
      // Set up form after modal opens
      setTimeout(() => {
        setupFormSubmissionHandler();
        loadCurrentUserData();
      }, 100);
    };
  }
  
  function setupFormSubmissionHandler() {
    const form = document.getElementById('profileForm');
    if (!form) {
      console.log('❌ Profile form not found');
      return;
    }
    
    // Remove any existing listeners
    form.onsubmit = null;
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);
    
    // Add our submit handler
    newForm.addEventListener('submit', window.handleProfileUpdate);
    
    console.log('✅ Form submission handler set up');
  }
  
  function loadCurrentUserData() {
    console.log('📋 Loading current user data into form...');
    
    if (!window.currentUser) {
      console.log('⚠️ No current user found');
      return;
    }
    
    // Load saved profile data
    const savedProfile = JSON.parse(localStorage.getItem('visualVibeProfileData') || '{}');
    const userData = { ...window.currentUser, ...savedProfile };
    
    // Populate form fields
    setFieldValue('profileFirstName', userData.firstName || userData.name?.split(' ')[0] || '');
    setFieldValue('profileLastName', userData.lastName || userData.name?.split(' ').slice(1).join(' ') || '');
    setFieldValue('profileEmail', userData.email || '');
    setFieldValue('profilePhone', userData.phone || '');
    setFieldValue('profileCompanyName', userData.companyName || userData.company || '');
    
    console.log('✅ User data loaded into form');
  }
  
  function fixProfilePictureClickBehavior() {
    console.log('📸 Fixing profile picture click behavior...');
    
    // Override the profile picture click setup to be more controlled
    window.setupControlledProfilePictureClick = function() {
      const modal = document.getElementById('profileModal');
      if (!modal) return;
      
      // Find profile picture area but don't make it auto-clickable
      const profilePictureArea = modal.querySelector('.w-20.h-20') || 
                               modal.querySelector('[id*="profile"]') ||
                               modal.querySelector('.rounded-full');
      
      if (profilePictureArea) {
        // Remove any existing click handlers
        profilePictureArea.onclick = null;
        profilePictureArea.replaceWith(profilePictureArea.cloneNode(true));
        
        // Only add click handler when user explicitly wants to change picture
        const newProfilePictureArea = modal.querySelector('.w-20.h-20') || 
                                     modal.querySelector('[id*="profile"]') ||
                                     modal.querySelector('.rounded-full');
        
        if (newProfilePictureArea) {
          // Add "Change Picture" button instead of making the picture itself clickable
          addChangePictureButton(newProfilePictureArea);
        }
      }
    };
    
    // Call this when modal opens
    const originalOpenProfileModal = window.openProfileModal;
    window.openProfileModal = function() {
      if (typeof originalOpenProfileModal === 'function') {
        originalOpenProfileModal();
      }
      
      setTimeout(() => {
        window.setupControlledProfilePictureClick();
      }, 200);
    };
  }
  
  function addChangePictureButton(profilePictureArea) {
    // Check if button already exists
    if (profilePictureArea.parentElement.querySelector('.change-picture-btn')) {
      return;
    }
    
    const changePictureBtn = document.createElement('button');
    changePictureBtn.type = 'button';
    changePictureBtn.className = 'change-picture-btn w-full mt-2 text-sm text-indigo-600 hover:text-indigo-800 font-medium';
    changePictureBtn.textContent = '📸 Change Profile Picture';
    
    changePictureBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('📸 Change picture button clicked');
      showProfilePictureOptions();
    });
    
    profilePictureArea.parentElement.appendChild(changePictureBtn);
    console.log('✅ Change picture button added');
  }
  
  function showProfilePictureOptions() {
    console.log('📋 Showing profile picture options...');
    
    // Remove any existing options modal
    const existingModal = document.getElementById('profilePictureOptionsModal');
    if (existingModal) {
      existingModal.remove();
    }
    
    // Create new options modal
    const optionsModal = document.createElement('div');
    optionsModal.id = 'profilePictureOptionsModal';
    optionsModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4';
    
    optionsModal.innerHTML = `
      <div class="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl">
        <h3 class="text-xl font-bold text-gray-800 mb-4 text-center">Change Profile Picture</h3>
        
        <div class="space-y-3">
          <button id="uploadNewPicture" class="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2">
            <span>📁</span>
            <span>Upload New Picture</span>
          </button>
          
          <button id="useInitials" class="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white py-3 px-4 rounded-lg hover:from-green-600 hover:to-teal-700 transition-all duration-300 flex items-center justify-center space-x-2">
            <span>🔤</span>
            <span>Use Initials</span>
          </button>
          
          <button id="randomAvatar" class="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 px-4 rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-300 flex items-center justify-center space-x-2">
            <span>🎲</span>
            <span>Random Avatar</span>
          </button>
          
          <button id="cancelPictureChange" class="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(optionsModal);
    
    // Setup button handlers
    setupProfilePictureOptionHandlers(optionsModal);
    
    console.log('✅ Profile picture options modal shown');
  }
  
  function setupProfilePictureOptionHandlers(optionsModal) {
    // Upload new picture
    optionsModal.querySelector('#uploadNewPicture').addEventListener('click', function() {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
          handleProfilePictureUpload(file);
        }
        optionsModal.remove();
      };
      fileInput.click();
    });
    
    // Use initials
    optionsModal.querySelector('#useInitials').addEventListener('click', function() {
      resetToInitials();
      optionsModal.remove();
    });
    
    // Random avatar
    optionsModal.querySelector('#randomAvatar').addEventListener('click', function() {
      generateRandomAvatar();
      optionsModal.remove();
    });
    
    // Cancel
    optionsModal.querySelector('#cancelPictureChange').addEventListener('click', function() {
      optionsModal.remove();
    });
    
    // Click outside to close
    optionsModal.addEventListener('click', function(e) {
      if (e.target === optionsModal) {
        optionsModal.remove();
      }
    });
  }
  
  function handleProfilePictureUpload(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const imageUrl = e.target.result;
      updateProfilePicture(imageUrl);
      
      if (window.toastManager) {
        window.toastManager.success('Profile picture updated! 📸', { duration: 3000 });
      }
    };
    reader.readAsDataURL(file);
  }
  
  function resetToInitials() {
    localStorage.removeItem('visualVibeProfilePicture');
    const initials = getInitials();
    updateProfilePictureDisplay(null, initials);
    
    if (window.toastManager) {
      window.toastManager.success('Reset to initials! 🔤', { duration: 3000 });
    }
  }
  
  function generateRandomAvatar() {
    const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}&backgroundColor=transparent`;
    updateProfilePicture(avatarUrl);
    
    if (window.toastManager) {
      window.toastManager.success('Random avatar generated! 🎲', { duration: 3000 });
    }
  }
  
  function updateProfilePicture(imageUrl) {
    // Save to localStorage
    localStorage.setItem('visualVibeProfilePicture', imageUrl);
    
    // Update display
    updateProfilePictureDisplay(imageUrl);
    
    // Update current user
    if (window.currentUser) {
      window.currentUser.profilePicture = imageUrl;
      localStorage.setItem('visualVibeUser', JSON.stringify(window.currentUser));
    }
  }
  
  function updateProfilePictureDisplay(imageUrl, initials = null) {
    const profileAreas = document.querySelectorAll('.w-20.h-20, [data-profile-picture], .profile-picture');
    
    profileAreas.forEach(area => {
      if (imageUrl) {
        area.innerHTML = `<img src="${imageUrl}" alt="Profile" class="w-full h-full object-cover rounded-full">`;
      } else {
        const userInitials = initials || getInitials();
        area.innerHTML = `<div class="w-full h-full bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-lg">${userInitials}</div>`;
      }
    });
  }
  
  // Helper functions
  function getFieldValue(fieldId) {
    const field = document.getElementById(fieldId);
    return field ? field.value.trim() : '';
  }
  
  function setFieldValue(fieldId, value) {
    const field = document.getElementById(fieldId);
    if (field) {
      field.value = value || '';
    }
  }
  
  function saveProfileDataToStorage(profileData) {
    localStorage.setItem('visualVibeProfileData', JSON.stringify(profileData));
    console.log('💾 Profile data saved to localStorage');
  }
  
  function updateCurrentUser(profileData) {
    if (window.currentUser) {
      Object.assign(window.currentUser, {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        name: profileData.fullName,
        email: profileData.email,
        phone: profileData.phone,
        companyName: profileData.companyName,
        lastUpdated: profileData.lastUpdated
      });
      
      localStorage.setItem('visualVibeUser', JSON.stringify(window.currentUser));
      
      // Also update in users array
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      const userIndex = users.findIndex(u => u.id === window.currentUser.id);
      if (userIndex !== -1) {
        Object.assign(users[userIndex], window.currentUser);
        localStorage.setItem('visualVibeUsers', JSON.stringify(users));
      }
      
      console.log('👤 Current user updated');
    }
  }
  
  function updateProfileUIElements(profileData) {
    // Update profile name displays
    const nameElements = document.querySelectorAll('[data-user-name], .user-name');
    nameElements.forEach(el => {
      el.textContent = profileData.fullName;
    });
    
    // Update email displays
    const emailElements = document.querySelectorAll('[data-user-email], .user-email');
    emailElements.forEach(el => {
      el.textContent = profileData.email;
    });
  }
  
  function getInitials() {
    if (window.currentUser && window.currentUser.name) {
      return window.currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    }
    return 'U';
  }
  
  function showSuccessMessage(message) {
    if (window.toastManager) {
      window.toastManager.success(message, { duration: 3000 });
    } else {
      console.log('✅ ' + message);
    }
  }
  
  function showErrorMessage(message) {
    if (window.toastManager) {
      window.toastManager.error(message, { duration: 4000 });
    } else {
      alert(message);
    }
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeProfileFix);
  } else {
    initializeProfileFix();
  }
  
  // Also initialize after a delay to ensure other scripts have loaded
  setTimeout(initializeProfileFix, 2000);
  
})();

console.log('🔧 Comprehensive profile fix loaded');
