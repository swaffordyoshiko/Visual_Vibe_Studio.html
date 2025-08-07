// UNIFIED PROFILE FIX - Load the comprehensive solution
console.log('🔧 Loading unified profile fix from comprehensive profile fix...');

// Load the unified profile fix script
(function() {
  const script = document.createElement('script');
  script.src = 'unified-profile-fix.js';
  script.onload = function() {
    console.log('✅ Unified profile fix loaded successfully');

    // Load profile picture modal script
    const pictureScript = document.createElement('script');
    pictureScript.src = 'add-profile-picture-to-modal.js';
    pictureScript.onload = function() {
      console.log('✅ Profile picture modal script loaded');

      // Load test scripts
      const testScript = document.createElement('script');
      testScript.src = 'test-unified-profile-fix.js';
      testScript.onload = function() {
        console.log('✅ Unified profile fix test script loaded');

        // Load profile picture on signin script
        const signinScript = document.createElement('script');
        signinScript.src = 'load-profile-picture-on-signin.js';
        signinScript.onload = function() {
          console.log('✅ Profile picture on signin script loaded');

          // Load comprehensive My Orders fix (replaces all other order fixes)
          const comprehensiveOrdersScript = document.createElement('script');
          comprehensiveOrdersScript.src = 'comprehensive-my-orders-fix.js';
          comprehensiveOrdersScript.onload = function() {
            console.log('✅ Comprehensive My Orders fix loaded - overrides all other order scripts');

            // Load debug script for My Orders
            const debugScript = document.createElement('script');
            debugScript.src = 'debug-my-orders.js';
            debugScript.onload = function() {
              console.log('✅ My Orders debug script loaded');

              // Load profile picture modal test
              const pictureTestScript = document.createElement('script');
              pictureTestScript.src = 'test-profile-picture-modal.js';
              pictureTestScript.onload = function() {
                console.log('✅ Profile picture modal test script loaded');
              };
              document.head.appendChild(pictureTestScript);
            };
            document.head.appendChild(debugScript);
          };
          document.head.appendChild(comprehensiveOrdersScript);
        };
        document.head.appendChild(signinScript);
      };
      document.head.appendChild(testScript);
    };
    document.head.appendChild(pictureScript);
  };
  script.onerror = function() {
    console.error('❌ Failed to load unified profile fix');
  };
  document.head.appendChild(script);
})();

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

// Load the COMPREHENSIVE COMPLETE profile system with ALL fields
const comprehensiveCompleteScript = document.createElement('script');
comprehensiveCompleteScript.src = 'comprehensive-profile-complete.js';
comprehensiveCompleteScript.onload = function() {
  console.log('🔧 COMPREHENSIVE COMPLETE profile system loaded successfully');
  console.log('🚀 Saves ALL fields: full name, email, phone, company, location, preferences');

  // Load the profile picture button addition
  const pictureButtonScript = document.createElement('script');
  pictureButtonScript.src = 'add-profile-picture-button.js';
  pictureButtonScript.onload = function() {
    console.log('📸 Profile picture button script loaded');

    // Also load the test scripts
    const testScript = document.createElement('script');
    testScript.src = 'test-complete-profile-fix.js';
    testScript.onload = function() {
      console.log('🧪 Profile fix test script loaded');

      // Load comprehensive fields test
      const fieldsTestScript = document.createElement('script');
      fieldsTestScript.src = 'test-all-profile-fields.js';
      fieldsTestScript.onload = function() {
        console.log('🧪 All profile fields test script loaded');
      };
      document.head.appendChild(fieldsTestScript);
    };
    document.head.appendChild(testScript);
  };
  document.head.appendChild(pictureButtonScript);
};
comprehensiveCompleteScript.onerror = function() {
  console.error('❌ Failed to load comprehensive complete profile script');
};
document.head.appendChild(comprehensiveCompleteScript);

// ENHANCED PROFILE FIXES - Fix field mapping and auto-popup issues
(function() {
  'use strict';

  let isEnhancedFixInitialized = false;

  function initializeEnhancedProfileFixes() {
    if (isEnhancedFixInitialized) return;
    isEnhancedFixInitialized = true;

    console.log('🔧 Initializing enhanced profile fixes...');

    // Fix 1: Correct profile form saving with proper field mapping
    setupCorrectProfileFormHandling();

    // Fix 2: Prevent auto-popup of profile picture options
    fixProfilePictureAutoPopup();

    console.log('✅ Enhanced profile fixes initialized');
  }

  function setupCorrectProfileFormHandling() {
    console.log('📝 Setting up correct profile form handling...');

    // Override with correct field mapping
    window.handleProfileUpdate = function(event) {
      console.log('💾 Handling profile update with correct fields...');

      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }

      try {
        // Get form data with CORRECT field IDs from HTML
        const profileData = {
          firstName: getFieldValue('profileFirstName'),
          lastName: getFieldValue('profileLastName'),
          fullName: getFieldValue('profileFirstName') + ' ' + getFieldValue('profileLastName'),
          email: getFieldValue('profileEmail'),
          phone: getFieldValue('profilePhone'),
          companyName: getFieldValue('profileCompanyName'),
          lastUpdated: new Date().toISOString()
        };

        console.log('📊 Profile data gathered:', profileData);

        // Validate required fields
        if (!profileData.firstName || !profileData.lastName || !profileData.email) {
          if (window.toastManager) {
            window.toastManager.error('Please fill in all required fields', { duration: 4000 });
          } else {
            alert('Please fill in all required fields (First Name, Last Name, Email)');
          }
          return false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(profileData.email)) {
          if (window.toastManager) {
            window.toastManager.error('Please enter a valid email address', { duration: 4000 });
          } else {
            alert('Please enter a valid email address');
          }
          return false;
        }

        // Save to localStorage
        localStorage.setItem('visualVibeProfileData', JSON.stringify(profileData));

        // Update current user object
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

          // Update in users array
          const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
          const userIndex = users.findIndex(u => u.id === window.currentUser.id);
          if (userIndex !== -1) {
            Object.assign(users[userIndex], window.currentUser);
            localStorage.setItem('visualVibeUsers', JSON.stringify(users));
          }
        }

        // Update UI elements
        updateProfileUIElements(profileData);

        // Show success message
        if (window.toastManager) {
          window.toastManager.success('Profile updated successfully! 🎉', { duration: 3000 });
        } else {
          alert('Profile updated successfully! 🎉');
        }

        // Close modal after delay
        setTimeout(() => {
          if (typeof window.closeProfileModal === 'function') {
            window.closeProfileModal();
          }
        }, 1500);

        console.log('✅ Profile updated successfully');
        return false;

      } catch (error) {
        console.error('❌ Error updating profile:', error);
        if (window.toastManager) {
          window.toastManager.error('Failed to update profile. Please try again.', { duration: 4000 });
        } else {
          alert('Failed to update profile. Please try again.');
        }
        return false;
      }
    };

    // Enhance openProfileModal to load data correctly
    const originalOpenProfileModal = window.openProfileModal;
    window.openProfileModal = function() {
      console.log('👤 Opening profile modal with data loading...');

      if (typeof originalOpenProfileModal === 'function') {
        originalOpenProfileModal();
      } else {
        const modal = document.getElementById('profileModal');
        if (modal) {
          modal.classList.remove('hidden');
        }
      }

      setTimeout(() => {
        loadCurrentUserDataIntoForm();
        setupFormSubmissionHandler();
        setupControlledProfilePictureButton();
      }, 200);
    };
  }

  function loadCurrentUserDataIntoForm() {
    console.log('📋 Loading user data into form...');

    if (!window.currentUser) return;

    const savedProfile = JSON.parse(localStorage.getItem('visualVibeProfileData') || '{}');
    const userData = { ...window.currentUser, ...savedProfile };

    // Populate form with correct field IDs
    setFieldValue('profileFirstName', userData.firstName || userData.name?.split(' ')[0] || '');
    setFieldValue('profileLastName', userData.lastName || userData.name?.split(' ').slice(1).join(' ') || '');
    setFieldValue('profileEmail', userData.email || '');
    setFieldValue('profilePhone', userData.phone || '');
    setFieldValue('profileCompanyName', userData.companyName || userData.company || '');

    console.log('✅ Form populated with user data');
  }

  function setupFormSubmissionHandler() {
    const form = document.getElementById('profileForm');
    if (!form) return;

    // Clean up existing handlers
    form.onsubmit = null;
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);

    // Add our handler
    newForm.addEventListener('submit', window.handleProfileUpdate);

    console.log('✅ Form submission handler attached');
  }

  function fixProfilePictureAutoPopup() {
    console.log('📸 Fixing profile picture auto-popup issue...');

    // Override any existing auto-click handlers
    window.setupControlledProfilePictureButton = function() {
      const modal = document.getElementById('profileModal');
      if (!modal) return;

      // Find and disable any auto-click handlers on profile picture
      const profilePictureArea = modal.querySelector('.w-20.h-20') ||
                               modal.querySelector('[id*="profile"]') ||
                               modal.querySelector('.rounded-full');

      if (profilePictureArea) {
        // Remove all click handlers
        profilePictureArea.onclick = null;
        profilePictureArea.replaceWith(profilePictureArea.cloneNode(true));

        // Get the fresh element
        const newProfilePictureArea = modal.querySelector('.w-20.h-20') ||
                                     modal.querySelector('[id*="profile"]') ||
                                     modal.querySelector('.rounded-full');

        if (newProfilePictureArea) {
          // Only add a manual "Change Picture" button
          addChangePictureButton(newProfilePictureArea);
        }
      }
    };
  }

  function addChangePictureButton(profilePictureArea) {
    // Check if button already exists
    if (profilePictureArea.parentElement.querySelector('.change-picture-btn')) {
      return;
    }

    const changePictureBtn = document.createElement('button');
    changePictureBtn.type = 'button';
    changePictureBtn.className = 'change-picture-btn w-full mt-3 text-sm text-indigo-600 hover:text-indigo-800 font-medium py-2 px-3 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors';
    changePictureBtn.textContent = '📸 Change Profile Picture';

    changePictureBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('📸 Manual change picture button clicked');
      showManualProfilePictureOptions();
    });

    profilePictureArea.parentElement.appendChild(changePictureBtn);
    console.log('✅ Manual change picture button added');
  }

  function showManualProfilePictureOptions() {
    // Remove any existing modals
    const existing = document.getElementById('manualProfilePictureModal');
    if (existing) existing.remove();

    const optionsModal = document.createElement('div');
    optionsModal.id = 'manualProfilePictureModal';
    optionsModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4';

    optionsModal.innerHTML = `
      <div class="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl">
        <h3 class="text-xl font-bold text-gray-800 mb-4 text-center">Change Profile Picture</h3>

        <div class="space-y-3">
          <button id="manualUploadPicture" class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
            <span>📁</span>
            <span>Upload New Picture</span>
          </button>

          <button id="manualUseInitials" class="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
            <span>🔤</span>
            <span>Use Initials</span>
          </button>

          <button id="manualCancelChange" class="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(optionsModal);

    // Setup handlers
    optionsModal.querySelector('#manualUploadPicture').onclick = function() {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function(e) {
            const imageUrl = e.target.result;
            localStorage.setItem('visualVibeProfilePicture', imageUrl);
            updateProfilePictureDisplay(imageUrl);
            if (window.toastManager) {
              window.toastManager.success('Profile picture updated! 📸', { duration: 3000 });
            }
          };
          reader.readAsDataURL(file);
        }
        optionsModal.remove();
      };
      fileInput.click();
    };

    optionsModal.querySelector('#manualUseInitials').onclick = function() {
      localStorage.removeItem('visualVibeProfilePicture');
      updateProfilePictureDisplay(null);
      if (window.toastManager) {
        window.toastManager.success('Reset to initials! 🔤', { duration: 3000 });
      }
      optionsModal.remove();
    };

    optionsModal.querySelector('#manualCancelChange').onclick = function() {
      optionsModal.remove();
    };

    optionsModal.onclick = function(e) {
      if (e.target === optionsModal) {
        optionsModal.remove();
      }
    };
  }

  function updateProfilePictureDisplay(imageUrl) {
    const profileAreas = document.querySelectorAll('.w-20.h-20, [data-profile-picture], .profile-picture');

    profileAreas.forEach(area => {
      if (imageUrl) {
        area.innerHTML = `<img src="${imageUrl}" alt="Profile" class="w-full h-full object-cover rounded-full">`;
      } else {
        const initials = getInitials();
        area.innerHTML = `<div class="w-full h-full bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-lg">${initials}</div>`;
      }
    });
  }

  function updateProfileUIElements(profileData) {
    const nameElements = document.querySelectorAll('[data-user-name], .user-name');
    nameElements.forEach(el => {
      el.textContent = profileData.fullName;
    });

    const emailElements = document.querySelectorAll('[data-user-email], .user-email');
    emailElements.forEach(el => {
      el.textContent = profileData.email;
    });
  }

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

  function getInitials() {
    if (window.currentUser && window.currentUser.name) {
      return window.currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    }
    return 'U';
  }

  // Initialize enhanced fixes
  setTimeout(initializeEnhancedProfileFixes, 3000);

})();
