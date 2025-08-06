// Comprehensive Profile System Fix
// Fixes: 1) Profile data not saving properly, 2) Removes auto prompts, 3) User-initiated profile picture changes only
console.log('🔧 Loading comprehensive profile system fix...');

(function() {
  'use strict';
  
  // Storage keys
  const PROFILE_STORAGE_KEY = 'visualVibeProfileData';
  const USER_STORAGE_KEY = 'visualVibeUsers';
  
  // Disable all automatic profile picture change prompts
  function disableAutoPrompts() {
    // Override any existing auto-prompt functions
    window.confirmProfilePhotoChange = function() {
      console.log('🚫 Auto profile photo prompts disabled');
    };
    
    // Remove any existing confirmation modals
    const existingModals = document.querySelectorAll('#profilePhotoConfirmationModal');
    existingModals.forEach(modal => modal.remove());
    
    console.log('✅ Auto profile prompts disabled');
  }
  
  // Enhanced profile data gathering that captures ALL fields
  function gatherAllProfileData() {
    const data = {};
    
    // Basic fields
    data.fullName = getElementValue('profileFullName');
    data.email = getElementValue('profileEmail');
    data.phone = getElementValue('profilePhone');
    data.company = getElementValue('profileCompany');
    data.location = getElementValue('profileLocation');
    
    // Preferences (checkboxes)
    data.emailNotifications = getCheckboxValue('emailNotifications');
    data.smsNotifications = getCheckboxValue('smsNotifications');
    data.marketingEmails = getCheckboxValue('marketingEmails');
    
    // Additional fields that might exist
    data.firstName = getElementValue('profileFirstName');
    data.lastName = getElementValue('profileLastName');
    data.companyName = getElementValue('profileCompanyName');
    
    // Meta data
    data.lastUpdated = new Date().toISOString();
    
    console.log('📋 Gathered profile data:', data);
    return data;
  }
  
  function getElementValue(id) {
    const element = document.getElementById(id);
    return element ? element.value.trim() : '';
  }
  
  function getCheckboxValue(id) {
    const element = document.getElementById(id);
    return element ? element.checked : false;
  }
  
  // Enhanced profile data saving to multiple storage locations
  function saveAllProfileData(profileData) {
    try {
      console.log('💾 Saving profile data to all storage locations...');
      
      // 1. Save to dedicated profile storage
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profileData));
      console.log('✅ Saved to profile storage');
      
      // 2. Save to user storage if currentUser exists
      if (window.currentUser && window.currentUser.id) {
        const users = JSON.parse(localStorage.getItem(USER_STORAGE_KEY) || '[]');
        const userIndex = users.findIndex(u => u.id === window.currentUser.id);
        
        if (userIndex !== -1) {
          // Update existing user with all profile data
          users[userIndex] = {
            ...users[userIndex],
            ...profileData,
            name: profileData.fullName || users[userIndex].name,
            updatedAt: new Date().toISOString()
          };
          
          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
          console.log('✅ Saved to user storage');
          
          // Update current user session
          window.currentUser = {
            ...window.currentUser,
            name: profileData.fullName || window.currentUser.name,
            email: profileData.email || window.currentUser.email
          };
          
          // Save updated session
          localStorage.setItem('visualVibeUser', JSON.stringify(window.currentUser));
          console.log('✅ Updated current user session');
        }
      }
      
      // 3. Also save to any other profile keys that might exist
      const alternativeKeys = ['visualVibeProfile', 'userProfile', 'profileData'];
      alternativeKeys.forEach(key => {
        try {
          const existing = JSON.parse(localStorage.getItem(key) || '{}');
          const merged = { ...existing, ...profileData };
          localStorage.setItem(key, JSON.stringify(merged));
        } catch (e) {
          // Ignore errors for alternative keys
        }
      });
      
      console.log('✅ Profile data saved to all locations');
      return true;
      
    } catch (error) {
      console.error('❌ Error saving profile data:', error);
      return false;
    }
  }
  
  // Enhanced profile data loading from multiple sources
  function loadAllProfileData() {
    try {
      let profileData = {};
      
      // Load from various sources and merge
      const sources = [
        PROFILE_STORAGE_KEY,
        'visualVibeProfile',
        'userProfile',
        'profileData'
      ];
      
      sources.forEach(key => {
        try {
          const data = JSON.parse(localStorage.getItem(key) || '{}');
          profileData = { ...profileData, ...data };
        } catch (e) {
          // Ignore parsing errors
        }
      });
      
      // Also load from current user if available
      if (window.currentUser) {
        profileData = { ...profileData, ...window.currentUser };
        
        // Get full user data
        if (window.currentUser.id) {
          const users = JSON.parse(localStorage.getItem(USER_STORAGE_KEY) || '[]');
          const userData = users.find(u => u.id === window.currentUser.id);
          if (userData) {
            profileData = { ...profileData, ...userData };
          }
        }
      }
      
      console.log('📤 Loaded profile data:', profileData);
      return profileData;
      
    } catch (error) {
      console.error('❌ Error loading profile data:', error);
      return {};
    }
  }
  
  // Enhanced form population that handles all field types
  function populateAllFields(data) {
    console.log('📝 Populating all form fields...');
    
    // Text fields
    const textFields = [
      'profileFullName', 'profileEmail', 'profilePhone', 
      'profileCompany', 'profileLocation', 'profileFirstName', 
      'profileLastName', 'profileCompanyName'
    ];
    
    textFields.forEach(fieldId => {
      const element = document.getElementById(fieldId);
      if (element && data) {
        // Try multiple possible data keys
        const possibleKeys = [
          fieldId.replace('profile', '').toLowerCase(),
          fieldId.replace('profile', ''),
          fieldId
        ];
        
        for (const key of possibleKeys) {
          if (data[key]) {
            element.value = data[key];
            console.log(`✅ Set ${fieldId} = ${data[key]}`);
            break;
          }
        }
        
        // Special handling for common fields
        if (fieldId === 'profileFullName' && data.name) {
          element.value = data.name;
        }
        if (fieldId === 'profileEmail' && data.email) {
          element.value = data.email;
        }
      }
    });
    
    // Checkbox fields
    const checkboxFields = ['emailNotifications', 'smsNotifications', 'marketingEmails'];
    checkboxFields.forEach(fieldId => {
      const element = document.getElementById(fieldId);
      if (element && data.hasOwnProperty(fieldId)) {
        element.checked = !!data[fieldId];
        console.log(`✅ Set ${fieldId} = ${data[fieldId]}`);
      }
    });
    
    console.log('✅ All fields populated');
  }
  
  // User-initiated profile picture change function
  function userInitiatedProfilePictureChange() {
    console.log('📸 User initiated profile picture change');
    
    // Create file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    
    fileInput.addEventListener('change', function(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const imageData = e.target.result;
          
          // Save the image
          localStorage.setItem('visualVibeProfilePicture', imageData);
          
          // Update all profile picture displays
          updateProfilePictureDisplays(imageData);
          
          // Show success message
          if (window.toastManager) {
            window.toastManager.success('Profile picture updated successfully!');
          } else {
            alert('Profile picture updated successfully!');
          }
          
          console.log('✅ Profile picture updated');
        };
        reader.readAsDataURL(file);
      }
      
      // Clean up
      document.body.removeChild(fileInput);
    });
    
    // Trigger file selection
    document.body.appendChild(fileInput);
    fileInput.click();
  }
  
  function updateProfilePictureDisplays(imageData) {
    const profilePictures = document.querySelectorAll('.profile-picture, [data-profile-picture]');
    profilePictures.forEach(img => {
      if (img.tagName === 'IMG') {
        img.src = imageData;
      } else {
        img.style.backgroundImage = `url(${imageData})`;
        img.style.backgroundSize = 'cover';
        img.style.backgroundPosition = 'center';
      }
    });
  }
  
  // Enhanced profile form handler
  function enhancedProfileFormHandler(event) {
    console.log('💾 Enhanced profile form submission...');
    
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    try {
      // Gather all data
      const profileData = gatherAllProfileData();
      
      // Validate required fields
      if (!profileData.fullName && !profileData.firstName) {
        alert('Please enter your name.');
        return false;
      }
      
      if (!profileData.email) {
        alert('Please enter your email address.');
        return false;
      }
      
      // Save all data
      const saved = saveAllProfileData(profileData);
      
      if (saved) {
        // Update UI elements
        updateProfileInitials(profileData.fullName || `${profileData.firstName} ${profileData.lastName}`);
        
        // Show success message
        if (window.toastManager) {
          window.toastManager.success('Profile updated successfully! All your information has been saved.');
        } else {
          alert('Profile updated successfully! All your information has been saved.');
        }
        
        // Close modal after delay
        setTimeout(() => {
          if (window.closeProfileModal) {
            window.closeProfileModal();
          }
        }, 1500);
        
        console.log('✅ Profile update completed successfully');
      } else {
        throw new Error('Failed to save profile data');
      }
      
    } catch (error) {
      console.error('❌ Error in profile form handler:', error);
      alert('Error saving profile. Please try again.');
    }
    
    return false;
  }
  
  function updateProfileInitials(fullName) {
    if (!fullName) return;
    
    const initials = fullName.split(' ')
      .filter(n => n.length > 0)
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
    
    // Update all initial displays
    const initialElements = document.querySelectorAll('#profileInitials, .profile-initials, [data-profile-initials]');
    initialElements.forEach(el => {
      el.textContent = initials;
    });
    
    console.log(`✅ Updated profile initials to: ${initials}`);
  }
  
  // Enhanced profile modal opener
  function enhancedOpenProfileModal() {
    console.log('👤 Opening enhanced profile modal...');
    
    try {
      const modal = document.getElementById('profileModal');
      if (!modal) {
        console.error('❌ Profile modal not found');
        return;
      }
      
      // Show modal
      modal.classList.remove('hidden');
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      
      // Load and populate data
      const profileData = loadAllProfileData();
      populateAllFields(profileData);
      
      // Set up form handler
      const form = document.getElementById('profileForm');
      if (form) {
        form.removeEventListener('submit', enhancedProfileFormHandler);
        form.addEventListener('submit', enhancedProfileFormHandler);
        form.onsubmit = enhancedProfileFormHandler;
      }
      
      // Set up profile picture button (user-initiated only)
      setupUserInitiatedProfilePictureButton();
      
      console.log('✅ Enhanced profile modal opened');
      
    } catch (error) {
      console.error('❌ Error opening enhanced profile modal:', error);
    }
  }
  
  function setupUserInitiatedProfilePictureButton() {
    // Remove any existing profile picture click handlers that auto-prompt
    const profilePicArea = document.querySelector('#profileInitials');
    if (profilePicArea && profilePicArea.parentElement) {
      // Clone to remove all event listeners
      const newPicArea = profilePicArea.parentElement.cloneNode(true);
      profilePicArea.parentElement.parentNode.replaceChild(newPicArea, profilePicArea.parentElement);
      
      // Add user-initiated button
      const buttonContainer = newPicArea.parentElement;
      let changeButton = buttonContainer.querySelector('.change-picture-btn');
      
      if (!changeButton) {
        changeButton = document.createElement('button');
        changeButton.type = 'button';
        changeButton.className = 'change-picture-btn mt-3 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium';
        changeButton.textContent = '📸 Change Profile Picture';
        changeButton.onclick = userInitiatedProfilePictureChange;
        
        buttonContainer.appendChild(changeButton);
        console.log('✅ User-initiated profile picture button added');
      }
    }
  }
  
  // Initialize the enhanced system
  function initializeEnhancedProfileSystem() {
    console.log('🚀 Initializing enhanced profile system...');
    
    // Disable auto prompts first
    disableAutoPrompts();
    
    // Override existing functions with enhanced versions
    window.openProfileModal = enhancedOpenProfileModal;
    window.handleProfileUpdate = enhancedProfileFormHandler;
    window.changeProfilePictureManually = userInitiatedProfilePictureChange;
    
    // Make utility functions available
    window.loadAllProfileData = loadAllProfileData;
    window.saveAllProfileData = saveAllProfileData;
    
    console.log('✅ Enhanced profile system initialized');
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeEnhancedProfileSystem);
  } else {
    initializeEnhancedProfileSystem();
  }
  
  // Also initialize after a delay to ensure all other scripts have loaded
  setTimeout(initializeEnhancedProfileSystem, 2000);
  
})();
