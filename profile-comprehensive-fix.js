// Comprehensive Profile Fix - Resolves all profile saving and photo upload issues
console.log('🔧 Loading comprehensive profile fix...');

(function() {
  'use strict';
  
  // Profile data storage key
  const PROFILE_STORAGE_KEY = 'visualVibeProfileData';
  const PROFILE_PICTURE_KEY = 'visualVibeProfilePicture';
  
  // Initialize profile system
  function initializeProfileSystem() {
    console.log('🚀 Initializing comprehensive profile system...');
    
    // Clear any conflicting event listeners
    clearConflictingListeners();
    
    // Set up unified profile functions
    setupUnifiedProfileFunctions();
    
    // Initialize profile picture handling
    initializeProfilePictureSystem();
    
    console.log('✅ Profile system initialized');
  }
  
  function clearConflictingListeners() {
    // Remove existing profile form listeners to prevent conflicts
    const form = document.getElementById('profileForm');
    if (form) {
      form.removeEventListener('submit', window.handleProfileUpdate);
      form.onsubmit = null;
    }
  }
  
  function setupUnifiedProfileFunctions() {
    
    // Unified open profile modal function
    window.openProfileModal = function() {
      console.log('👤 Opening profile modal...');
      
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
        
        // Load saved profile data
        loadSavedProfileData();
        
        // Load saved profile picture
        loadSavedProfilePicture();
        
        // Set up form handlers
        setupFormHandlers();
        
        console.log('✅ Profile modal opened');
        
      } catch (error) {
        console.error('❌ Error opening profile modal:', error);
      }
    };
    
    // Unified close profile modal function
    window.closeProfileModal = function() {
      console.log('👤 Closing profile modal...');
      
      try {
        const modal = document.getElementById('profileModal');
        if (modal) {
          modal.classList.add('hidden');
          modal.style.display = 'none';
          document.body.style.overflow = '';
        }
        
        // Reset form
        const form = document.getElementById('profileForm');
        if (form) {
          form.reset();
        }
        
        console.log('✅ Profile modal closed');
        
      } catch (error) {
        console.error('❌ Error closing profile modal:', error);
      }
    };
    
    // Unified profile save function
    window.handleProfileUpdate = function(event) {
      console.log('💾 Handling profile update...');
      
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      
      try {
        // Get form data
        const profileData = gatherProfileFormData();
        
        if (!validateProfileData(profileData)) {
          return false;
        }
        
        // Save profile data
        saveProfileData(profileData);
        
        // Update UI
        updateProfileUI(profileData);
        
        // Show success message
        showSuccessMessage('Profile updated successfully! 🎉');
        
        // Close modal after short delay
        setTimeout(() => {
          window.closeProfileModal();
        }, 1000);
        
        console.log('✅ Profile updated successfully');
        return false;
        
      } catch (error) {
        console.error('❌ Error updating profile:', error);
        showErrorMessage('Failed to update profile. Please try again.');
        return false;
      }
    };
  }
  
  function setupFormHandlers() {
    const form = document.getElementById('profileForm');
    if (!form) return;
    
    // Remove existing listeners
    form.removeEventListener('submit', window.handleProfileUpdate);
    
    // Add new listener
    form.addEventListener('submit', window.handleProfileUpdate);
    
    // Handle profile picture upload
    const photoUpload = document.getElementById('profilePhotoUpload');
    if (photoUpload) {
      photoUpload.addEventListener('change', handleProfilePictureUpload);
    }
    
    // Handle profile picture options
    setupProfilePictureButtons();
  }
  
  function gatherProfileFormData() {
    return {
      fullName: getFieldValue('profileFullName'),
      email: getFieldValue('profileEmail'),
      phone: getFieldValue('profilePhone'),
      company: getFieldValue('profileCompany'),
      location: getFieldValue('profileLocation'),
      emailNotifications: getCheckboxValue('emailNotifications'),
      smsNotifications: getCheckboxValue('smsNotifications'),
      marketingEmails: getCheckboxValue('marketingEmails'),
      lastUpdated: new Date().toISOString()
    };
  }
  
  function getFieldValue(fieldId) {
    const field = document.getElementById(fieldId);
    return field ? field.value.trim() : '';
  }
  
  function getCheckboxValue(fieldId) {
    const field = document.getElementById(fieldId);
    return field ? field.checked : false;
  }
  
  function validateProfileData(data) {
    if (!data.fullName) {
      showErrorMessage('Please enter your full name');
      document.getElementById('profileFullName')?.focus();
      return false;
    }
    
    if (!data.email) {
      showErrorMessage('Please enter your email address');
      document.getElementById('profileEmail')?.focus();
      return false;
    }
    
    if (data.email && !isValidEmail(data.email)) {
      showErrorMessage('Please enter a valid email address');
      document.getElementById('profileEmail')?.focus();
      return false;
    }
    
    return true;
  }
  
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  function saveProfileData(profileData) {
    try {
      // Save to localStorage
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profileData));
      
      // Save to user data if available
      if (window.currentUser) {
        const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
        const userIndex = users.findIndex(u => u.id === window.currentUser.id);
        
        if (userIndex !== -1) {
          users[userIndex] = {
            ...users[userIndex],
            ...profileData,
            updatedAt: new Date().toISOString()
          };
          
          localStorage.setItem('visualVibeUsers', JSON.stringify(users));
          
          // Update current user
          window.currentUser = { ...window.currentUser, ...profileData };
        }
      }
      
      console.log('✅ Profile data saved successfully');
      
    } catch (error) {
      console.error('❌ Error saving profile data:', error);
      throw error;
    }
  }
  
  function loadSavedProfileData() {
    try {
      const savedData = JSON.parse(localStorage.getItem(PROFILE_STORAGE_KEY) || '{}');
      
      // Also check user data
      if (window.currentUser) {
        const userData = { ...savedData, ...window.currentUser };
        populateForm(userData);
      } else {
        populateForm(savedData);
      }
      
      console.log('✅ Profile data loaded');
      
    } catch (error) {
      console.error('❌ Error loading profile data:', error);
    }
  }
  
  function populateForm(data) {
    setFieldValue('profileFullName', data.fullName);
    setFieldValue('profileEmail', data.email);
    setFieldValue('profilePhone', data.phone);
    setFieldValue('profileCompany', data.company);
    setFieldValue('profileLocation', data.location);
    setCheckboxValue('emailNotifications', data.emailNotifications);
    setCheckboxValue('smsNotifications', data.smsNotifications);
    setCheckboxValue('marketingEmails', data.marketingEmails);
  }
  
  function setFieldValue(fieldId, value) {
    const field = document.getElementById(fieldId);
    if (field && value) {
      field.value = value;
    }
  }
  
  function setCheckboxValue(fieldId, value) {
    const field = document.getElementById(fieldId);
    if (field) {
      field.checked = !!value;
    }
  }
  
  function updateProfileUI(profileData) {
    // Update profile initials everywhere
    updateProfileInitials(profileData.fullName);
    
    // Update any profile displays
    updateProfileDisplays(profileData);
  }
  
  function updateProfileInitials(fullName) {
    if (!fullName) return;
    
    const initials = fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    
    // Update all profile initial displays
    const initialElements = document.querySelectorAll('.profile-initials, [data-profile-initials]');
    initialElements.forEach(el => {
      el.textContent = initials;
    });
    
    // Update specific profile elements
    const profileElements = document.querySelectorAll('#profileInitials, .user-initials');
    profileElements.forEach(el => {
      el.textContent = initials;
    });
  }
  
  function updateProfileDisplays(profileData) {
    // Update any other profile displays in the UI
    const displayElements = document.querySelectorAll('[data-profile-display]');
    displayElements.forEach(el => {
      const displayType = el.getAttribute('data-profile-display');
      if (profileData[displayType]) {
        el.textContent = profileData[displayType];
      }
    });
  }
  
  // Profile Picture System
  function initializeProfilePictureSystem() {
    window.updateProfilePicture = function(imageUrl) {
      console.log('📸 Updating profile picture:', imageUrl);
      
      try {
        // Save profile picture
        localStorage.setItem(PROFILE_PICTURE_KEY, imageUrl);
        
        // Update user data if available
        if (window.currentUser) {
          const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
          const userIndex = users.findIndex(u => u.id === window.currentUser.id);
          
          if (userIndex !== -1) {
            users[userIndex].profilePicture = imageUrl;
            users[userIndex].profilePictureUpdated = new Date().toISOString();
            localStorage.setItem('visualVibeUsers', JSON.stringify(users));
            
            window.currentUser.profilePicture = imageUrl;
          }
        }
        
        // Update UI
        updateProfilePictureDisplay(imageUrl);
        
        // Clear the "no photo uploaded" state
        clearProfilePictureError();
        
        showSuccessMessage('Profile picture updated successfully! 📸');
        
        console.log('✅ Profile picture updated');
        return true;
        
      } catch (error) {
        console.error('❌ Error updating profile picture:', error);
        showErrorMessage('Failed to update profile picture');
        return false;
      }
    };
    
    window.resetProfilePicture = function() {
      console.log('🔄 Resetting profile picture...');
      
      try {
        // Remove from storage
        localStorage.removeItem(PROFILE_PICTURE_KEY);
        
        // Update user data
        if (window.currentUser) {
          const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
          const userIndex = users.findIndex(u => u.id === window.currentUser.id);
          
          if (userIndex !== -1) {
            delete users[userIndex].profilePicture;
            delete users[userIndex].profilePictureUpdated;
            localStorage.setItem('visualVibeUsers', JSON.stringify(users));
            
            delete window.currentUser.profilePicture;
          }
        }
        
        // Reset to initials
        resetProfilePictureDisplay();
        
        showSuccessMessage('Profile picture reset to initials! 🔤');
        
        console.log('✅ Profile picture reset');
        return true;
        
      } catch (error) {
        console.error('❌ Error resetting profile picture:', error);
        showErrorMessage('Failed to reset profile picture');
        return false;
      }
    };
  }
  
  function loadSavedProfilePicture() {
    try {
      const savedPicture = localStorage.getItem(PROFILE_PICTURE_KEY);
      
      if (savedPicture) {
        updateProfilePictureDisplay(savedPicture);
        clearProfilePictureError();
      } else {
        resetProfilePictureDisplay();
      }
      
    } catch (error) {
      console.error('❌ Error loading profile picture:', error);
    }
  }
  
  function handleProfilePictureUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    console.log('📤 Uploading profile picture...');
    
    if (!file.type.startsWith('image/')) {
      showErrorMessage('Please select a valid image file');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      showErrorMessage('Image file is too large. Please select a file under 5MB');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
      const imageUrl = e.target.result;
      window.updateProfilePicture(imageUrl);
    };
    
    reader.onerror = function() {
      showErrorMessage('Failed to read image file');
    };
    
    reader.readAsDataURL(file);
  }
  
  function setupProfilePictureButtons() {
    // Upload new picture button
    const uploadBtn = document.querySelector('[onclick*="profilePhotoUpload"]');
    if (uploadBtn) {
      uploadBtn.onclick = function() {
        document.getElementById('profilePhotoUpload')?.click();
      };
    }
    
    // Use initials button
    const initialsBtn = document.querySelector('button[onclick*="resetProfilePicture"]');
    if (initialsBtn) {
      initialsBtn.onclick = function() {
        window.resetProfilePicture();
      };
    }
    
    // Random avatar button
    const randomBtn = document.querySelector('button[onclick*="Random Avatar"]');
    if (randomBtn) {
      randomBtn.onclick = function() {
        generateRandomAvatar();
      };
    }
  }
  
  function updateProfilePictureDisplay(imageUrl) {
    // Update profile picture in modal
    const modalPicture = document.getElementById('profilePictureDisplay');
    if (modalPicture) {
      modalPicture.innerHTML = `<img src="${imageUrl}" alt="Profile" class="w-full h-full object-cover rounded-full">`;
    }
    
    // Update profile pictures throughout the UI
    const profilePictures = document.querySelectorAll('.profile-picture, [data-profile-picture]');
    profilePictures.forEach(el => {
      el.innerHTML = `<img src="${imageUrl}" alt="Profile" class="w-full h-full object-cover rounded-full">`;
    });
  }
  
  function resetProfilePictureDisplay() {
    const profileData = JSON.parse(localStorage.getItem(PROFILE_STORAGE_KEY) || '{}');
    const initials = profileData.fullName ? 
      profileData.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 
      '👤';
    
    // Update profile picture in modal
    const modalPicture = document.getElementById('profilePictureDisplay');
    if (modalPicture) {
      modalPicture.innerHTML = `<div class="w-full h-full bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl">${initials}</div>`;
    }
    
    // Update profile pictures throughout the UI
    const profilePictures = document.querySelectorAll('.profile-picture, [data-profile-picture]');
    profilePictures.forEach(el => {
      el.innerHTML = `<div class="w-full h-full bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">${initials}</div>`;
    });
  }
  
  function generateRandomAvatar() {
    const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}&backgroundColor=transparent`;
    window.updateProfilePicture(avatarUrl);
  }
  
  function clearProfilePictureError() {
    // Remove any "please upload photo" messages
    const errorMessages = document.querySelectorAll('.profile-picture-error, .upload-required');
    errorMessages.forEach(el => el.remove());
  }
  
  // Utility functions
  function showSuccessMessage(message) {
    if (window.toastManager) {
      window.toastManager.success(message, { duration: 3000 });
    } else {
      alert(message);
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
    document.addEventListener('DOMContentLoaded', initializeProfileSystem);
  } else {
    setTimeout(initializeProfileSystem, 100);
  }
  
  // Also initialize after a delay to ensure all other scripts have loaded
  setTimeout(initializeProfileSystem, 1000);
  
})();

console.log('✅ Comprehensive profile fix loaded - All profile saving and photo upload issues should be resolved');
