// UNIFIED PROFILE FIX - Resolves all profile issues
// 1. Fixes profile information not saving
// 2. Adds proper profile photo upload with save option  
// 3. Prevents auto-popup of profile modal/picture uploader
// 4. Fixes profile picture display in form and website icon
console.log('🔧 Loading unified profile fix...');

(function() {
  'use strict';
  
  let profileSystemInitialized = false;
  
  function initializeUnifiedProfileSystem() {
    if (profileSystemInitialized) return;
    profileSystemInitialized = true;
    
    console.log('🚀 Initializing unified profile system...');
    
    // 1. Disable all auto-popup behaviors first
    disableAllAutoPopups();
    
    // 2. Fix profile data saving
    setupCorrectProfileSaving();
    
    // 3. Add profile picture upload functionality
    addProfilePictureUpload();
    
    // 4. Fix profile picture displays
    setupProfilePictureDisplay();
    
    // 5. Ensure modal only opens on user click
    setupUserControlledProfileModal();
    
    console.log('✅ Unified profile system initialized');
  }
  
  // 1. DISABLE ALL AUTO-POPUP BEHAVIORS
  function disableAllAutoPopups() {
    console.log('🚫 Disabling all auto-popup behaviors...');
    
    // Override all auto-popup functions to prevent them
    window.confirmProfilePhotoChange = function() {
      console.log('🚫 Auto profile photo prompts disabled');
      return false;
    };
    
    window.showProfilePictureOptions = function() {
      console.log('🚫 Auto profile picture options disabled');
      return false;
    };
    
    // Remove any existing auto-click handlers
    const profileElements = document.querySelectorAll('.w-20.h-20.rounded-full, .profile-picture');
    profileElements.forEach(el => {
      el.onclick = null;
      el.removeAttribute('onclick');
      el.style.cursor = 'default';
    });
    
    // Remove any existing confirmation modals
    const autoModals = document.querySelectorAll('#profilePhotoConfirmationModal, #profilePictureOptionsModal');
    autoModals.forEach(modal => modal.remove());
    
    console.log('✅ Auto-popup behaviors disabled');
  }
  
  // 2. FIX PROFILE DATA SAVING
  function setupCorrectProfileSaving() {
    console.log('💾 Setting up correct profile saving...');
    
    // Override existing profile save function with correct field mapping
    window.handleProfileUpdate = function(event) {
      console.log('💾 Saving profile with correct field mapping...');
      
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      
      try {
        // Get form data using CORRECT field IDs from HTML
        const profileData = {
          firstName: getFieldValue('profileFirstName'),
          lastName: getFieldValue('profileLastName'),
          companyName: getFieldValue('profileCompanyName'),
          phone: getFieldValue('profilePhone'),
          email: getFieldValue('profileEmail'),
          lastUpdated: new Date().toISOString()
        };
        
        // Create full name
        profileData.fullName = `${profileData.firstName} ${profileData.lastName}`.trim();
        
        console.log('📊 Profile data to save:', profileData);
        
        // Validate required fields
        if (!profileData.firstName || !profileData.lastName || !profileData.email) {
          showUserMessage('Please fill in all required fields (First Name, Last Name, Email)', 'error');
          return false;
        }
        
        // Validate email
        if (!isValidEmail(profileData.email)) {
          showUserMessage('Please enter a valid email address', 'error');
          return false;
        }
        
        // Save to multiple storage locations for reliability
        saveProfileDataToStorage(profileData);
        
        // Update current user object
        updateCurrentUserObject(profileData);
        
        // Update UI displays
        updateAllProfileDisplays(profileData);
        
        showUserMessage('Profile updated successfully! All your information has been saved. 🎉', 'success');
        
        // Close modal after short delay
        setTimeout(() => {
          closeProfileModal();
        }, 1500);
        
        console.log('✅ Profile saved successfully');
        return false;
        
      } catch (error) {
        console.error('❌ Error saving profile:', error);
        showUserMessage('Failed to save profile. Please try again.', 'error');
        return false;
      }
    };
    
    // Setup form submission handler
    setupFormSubmissionHandler();
  }
  
  function getFieldValue(fieldId) {
    const field = document.getElementById(fieldId);
    return field ? field.value.trim() : '';
  }
  
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  function saveProfileDataToStorage(profileData) {
    // Save to main profile storage
    localStorage.setItem('visualVibeProfileData', JSON.stringify(profileData));
    
    // Save to backup storage locations
    localStorage.setItem('visualVibeProfile', JSON.stringify(profileData));
    localStorage.setItem('userProfileData', JSON.stringify(profileData));
    
    console.log('✅ Profile data saved to storage');
  }
  
  function updateCurrentUserObject(profileData) {
    if (window.currentUser) {
      // Update current user with new profile data
      Object.assign(window.currentUser, {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        name: profileData.fullName,
        email: profileData.email,
        phone: profileData.phone,
        companyName: profileData.companyName,
        lastUpdated: profileData.lastUpdated
      });
      
      // Save updated current user
      localStorage.setItem('visualVibeUser', JSON.stringify(window.currentUser));
      
      // Update in users array
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      const userIndex = users.findIndex(u => u.id === window.currentUser.id);
      if (userIndex !== -1) {
        Object.assign(users[userIndex], window.currentUser);
        localStorage.setItem('visualVibeUsers', JSON.stringify(users));
      }
      
      console.log('✅ Current user object updated');
    }
  }
  
  function setupFormSubmissionHandler() {
    const form = document.getElementById('profileForm');
    if (!form) return;
    
    // Remove all existing handlers
    form.onsubmit = null;
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);
    
    // Add our handler to the fresh form
    newForm.addEventListener('submit', window.handleProfileUpdate);
    
    console.log('✅ Form submission handler attached');
  }
  
  // 3. ADD PROFILE PICTURE UPLOAD FUNCTIONALITY
  function addProfilePictureUpload() {
    console.log('📸 Adding profile picture upload functionality...');
    
    // Add profile picture section to modal when it opens
    window.originalOpenProfileModal = window.openProfileModal;
    window.openProfileModal = function() {
      console.log('👤 Opening profile modal with picture upload...');
      
      // Call original function
      if (window.originalOpenProfileModal) {
        window.originalOpenProfileModal();
      } else {
        const modal = document.getElementById('profileModal');
        if (modal) {
          modal.classList.remove('hidden');
          document.body.style.overflow = 'hidden';
        }
      }
      
      // Add profile picture section after modal opens
      setTimeout(() => {
        addProfilePictureSectionToModal();
        loadExistingProfileData();
        loadExistingProfilePicture();
      }, 100);
    };
    
    // Profile picture upload handler
    window.handleProfilePictureUpload = function(event) {
      const file = event.target.files[0];
      if (!file) return;
      
      console.log('📤 Uploading profile picture:', file.name);
      
      if (!file.type.startsWith('image/')) {
        showUserMessage('Please select a valid image file', 'error');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        showUserMessage('Image file is too large. Please select a file under 5MB', 'error');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = function(e) {
        const imageData = e.target.result;
        
        // Show save confirmation
        showProfilePictureSaveConfirmation(imageData);
      };
      
      reader.onerror = function() {
        showUserMessage('Failed to read image file', 'error');
      };
      
      reader.readAsDataURL(file);
    };
    
    // Profile picture save function
    window.saveProfilePicture = function(imageData) {
      try {
        // Save to storage
        localStorage.setItem('visualVibeProfilePicture', imageData);
        
        // Update user data
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
        return true;
        
      } catch (error) {
        console.error('❌ Error saving profile picture:', error);
        showUserMessage('Failed to save profile picture', 'error');
        return false;
      }
    };
    
    // Remove profile picture function
    window.removeProfilePicture = function() {
      try {
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
        
        showUserMessage('Profile picture removed successfully! 🔤', 'success');
        
        console.log('✅ Profile picture removed');
        return true;
        
      } catch (error) {
        console.error('❌ Error removing profile picture:', error);
        showUserMessage('Failed to remove profile picture', 'error');
        return false;
      }
    };
  }
  
  function addProfilePictureSectionToModal() {
    const modal = document.getElementById('profileModal');
    if (!modal) return;
    
    // Check if profile picture section already exists
    if (modal.querySelector('#profilePictureSection')) return;
    
    const form = modal.querySelector('#profileForm');
    if (!form) return;
    
    // Create profile picture section
    const profilePictureSection = document.createElement('div');
    profilePictureSection.id = 'profilePictureSection';
    profilePictureSection.className = 'text-center mb-6 pb-6 border-b border-gray-200';
    
    profilePictureSection.innerHTML = `
      <div class="relative inline-block mb-4">
        <div id="profilePictureDisplay" class="w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto">
          <span id="profileInitials">👤</span>
        </div>
      </div>
      
      <div class="space-y-2">
        <input type="file" id="profilePictureUpload" accept="image/*" class="hidden" onchange="handleProfilePictureUpload(event)">
        
        <button type="button" onclick="document.getElementById('profilePictureUpload').click()" 
                class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
          📁 Upload New Picture
        </button>
        
        <button type="button" onclick="removeProfilePicture()" 
                class="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium">
          🔤 Use Initials
        </button>
      </div>
    `;
    
    // Insert at the beginning of the form
    form.insertBefore(profilePictureSection, form.firstChild);
    
    console.log('✅ Profile picture section added to modal');
  }
  
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
                  class="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-colors">
            💾 Save Picture
          </button>
        </div>
      </div>
    `;
    
    // Prevent closing by clicking outside
    confirmModal.addEventListener('click', function(e) {
      if (e.target === confirmModal) {
        cancelProfilePictureSave();
      }
    });
    
    document.body.appendChild(confirmModal);
    
    // Global functions for the confirmation modal
    window.confirmProfilePictureSave = function(imageData) {
      window.saveProfilePicture(imageData);
      confirmModal.remove();
    };
    
    window.cancelProfilePictureSave = function() {
      confirmModal.remove();
      showUserMessage('Profile picture upload cancelled', 'info');
    };
    
    console.log('✅ Profile picture save confirmation shown');
  }
  
  // 4. SETUP PROFILE PICTURE DISPLAY
  function setupProfilePictureDisplay() {
    console.log('🖼️ Setting up profile picture display...');
    
    // Function to update all profile picture displays
    window.updateAllProfilePictureDisplays = function(imageData) {
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
    };
    
    // Function to get profile initials
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
    
    window.getProfileInitials = getProfileInitials;
  }
  
  function loadExistingProfilePicture() {
    const savedPicture = localStorage.getItem('visualVibeProfilePicture');
    if (savedPicture) {
      window.updateAllProfilePictureDisplays(savedPicture);
    } else {
      window.updateAllProfilePictureDisplays(null);
    }
  }
  
  // 5. SETUP USER-CONTROLLED PROFILE MODAL
  function setupUserControlledProfileModal() {
    console.log('🎛️ Setting up user-controlled profile modal...');
    
    // Ensure modal only opens when user clicks edit profile button
    window.openProfileModal = function() {
      console.log('👤 User opened profile modal');
      
      const modal = document.getElementById('profileModal');
      if (!modal) {
        console.error('❌ Profile modal not found');
        return;
      }
      
      // Show modal
      modal.classList.remove('hidden');
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      
      // Load existing data
      setTimeout(() => {
        addProfilePictureSectionToModal();
        loadExistingProfileData();
        loadExistingProfilePicture();
        setupFormSubmissionHandler();
      }, 100);
      
      console.log('✅ Profile modal opened by user');
    };
    
    window.closeProfileModal = function() {
      console.log('👤 Closing profile modal');
      
      const modal = document.getElementById('profileModal');
      if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
      
      // Clean up any confirmation modals
      const confirmModal = document.getElementById('profilePictureSaveModal');
      if (confirmModal) confirmModal.remove();
      
      console.log('✅ Profile modal closed');
    };
  }
  
  function loadExistingProfileData() {
    try {
      // Load from multiple sources
      const profileData = JSON.parse(localStorage.getItem('visualVibeProfileData') || '{}');
      const userData = window.currentUser || {};
      
      // Merge data
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
  
  function setFieldValue(fieldId, value) {
    const field = document.getElementById(fieldId);
    if (field) {
      field.value = value || '';
    }
  }
  
  function updateAllProfileDisplays(profileData) {
    // Update profile initials
    updateProfileInitials(profileData.fullName);
    
    // Update name displays
    const nameElements = document.querySelectorAll('[data-user-name], .user-name, #userName');
    nameElements.forEach(el => {
      el.textContent = profileData.fullName;
    });
    
    // Update email displays  
    const emailElements = document.querySelectorAll('[data-user-email], .user-email');
    emailElements.forEach(el => {
      el.textContent = profileData.email;
    });
  }
  
  function updateProfileInitials(fullName) {
    if (!fullName) return;
    
    const initials = fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    
    // Update all initial displays
    const initialElements = document.querySelectorAll('#profileInitials, .profile-initials, [data-profile-initials]');
    initialElements.forEach(el => {
      el.textContent = initials;
    });
    
    console.log(`✅ Updated profile initials to: ${initials}`);
  }
  
  // UTILITY FUNCTIONS
  function showUserMessage(message, type = 'info') {
    if (window.toastManager) {
      const duration = type === 'error' ? 4000 : 3000;
      window.toastManager[type](message, { duration });
    } else {
      alert(message);
    }
  }
  
  // INITIALIZATION
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeUnifiedProfileSystem);
  } else {
    setTimeout(initializeUnifiedProfileSystem, 500);
  }
  
  // Also initialize after other scripts load
  setTimeout(initializeUnifiedProfileSystem, 2000);
  
})();

console.log('✅ Unified profile fix loaded - All profile issues should now be resolved');
