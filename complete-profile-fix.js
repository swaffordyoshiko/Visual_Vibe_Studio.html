// Complete Profile Fix - Resolves saving and profile picture issues
console.log('🔧 Loading complete profile fix...');

(function() {
  'use strict';
  
  let isProfileSystemReady = false;
  
  function initializeCompleteProfileSystem() {
    if (isProfileSystemReady) return;
    isProfileSystemReady = true;
    
    console.log('🚀 Initializing complete profile system...');
    
    // Override all profile functions with working versions
    setupWorkingProfileSystem();
    
    console.log('✅ Complete profile system ready');
  }
  
  function setupWorkingProfileSystem() {
    console.log('📝 Setting up working profile system...');
    
    // WORKING OPEN PROFILE MODAL FUNCTION
    window.openProfileModal = function() {
      console.log('👤 Opening profile modal with complete functionality...');
      
      try {
        const modal = document.getElementById('profileModal');
        if (!modal) {
          console.error('❌ Profile modal not found');
          return;
        }
        
        // Show modal
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
        
        // Add profile picture section if missing
        addProfilePictureSection();
        
        // Load existing user data
        loadUserDataIntoForm();
        
        // Setup form handler
        setupFormSubmissionHandler();
        
        // Setup profile picture functionality
        setupProfilePictureButton();
        
        console.log('✅ Profile modal opened with all functionality');
        
      } catch (error) {
        console.error('❌ Error opening profile modal:', error);
      }
    };
    
    // WORKING PROFILE UPDATE FUNCTION
    window.handleProfileUpdate = function(event) {
      console.log('💾 Handling profile update...');
      
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      
      try {
        // Collect form data
        const formData = {
          firstName: getFieldValue('profileFirstName'),
          lastName: getFieldValue('profileLastName'),
          email: getFieldValue('profileEmail'),
          phone: getFieldValue('profilePhone'),
          companyName: getFieldValue('profileCompanyName'),
          lastUpdated: new Date().toISOString()
        };
        
        // Create full name
        formData.fullName = `${formData.firstName} ${formData.lastName}`.trim();
        
        console.log('📊 Form data collected:', formData);
        
        // Validate required fields
        if (!formData.firstName || !formData.lastName || !formData.email) {
          showError('Please fill in all required fields (First Name, Last Name, Email)');
          return false;
        }
        
        // Email validation
        if (!isValidEmail(formData.email)) {
          showError('Please enter a valid email address');
          return false;
        }
        
        // Save the data
        if (saveProfileData(formData)) {
          showSuccess('Profile updated successfully! 🎉');
          
          // Close modal after short delay
          setTimeout(() => {
            closeProfileModal();
          }, 1500);
        } else {
          showError('Failed to save profile data');
        }
        
        return false;
        
      } catch (error) {
        console.error('❌ Error updating profile:', error);
        showError('An error occurred while saving your profile');
        return false;
      }
    };
    
    // WORKING CLOSE MODAL FUNCTION
    window.closeProfileModal = function() {
      console.log('📝 Closing profile modal...');
      
      const modal = document.getElementById('profileModal');
      if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
    };
  }
  
  function addProfilePictureSection() {
    console.log('📸 Adding profile picture section...');
    
    const form = document.getElementById('profileForm');
    if (!form) return;
    
    // Check if profile picture section already exists
    if (form.querySelector('.profile-picture-section')) {
      return;
    }
    
    // Create profile picture section
    const pictureSection = document.createElement('div');
    pictureSection.className = 'profile-picture-section text-center mb-6 pb-6 border-b border-gray-200';
    
    pictureSection.innerHTML = `
      <div class="mb-4">
        <div id="profilePictureDisplay" class="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl mx-auto mb-3">
          ${getInitials()}
        </div>
        <button type="button" id="changeProfilePictureBtn" class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm">
          📸 Change Profile Picture
        </button>
      </div>
    `;
    
    // Insert at the beginning of the form
    form.insertBefore(pictureSection, form.firstChild);
    
    console.log('✅ Profile picture section added');
  }
  
  function loadUserDataIntoForm() {
    console.log('📋 Loading user data into form...');
    
    try {
      // Get saved profile data
      const savedProfile = JSON.parse(localStorage.getItem('visualVibeProfileData') || '{}');
      
      // Get current user data
      const currentUser = window.currentUser || {};
      
      // Combine data, prioritizing saved profile data
      const userData = { ...currentUser, ...savedProfile };
      
      console.log('👤 User data to load:', userData);
      
      // Populate form fields
      setFieldValue('profileFirstName', userData.firstName || currentUser.name?.split(' ')[0] || '');
      setFieldValue('profileLastName', userData.lastName || currentUser.name?.split(' ').slice(1).join(' ') || '');
      setFieldValue('profileEmail', userData.email || '');
      setFieldValue('profilePhone', userData.phone || '');
      setFieldValue('profileCompanyName', userData.companyName || userData.company || '');
      
      // Load profile picture
      loadProfilePicture();
      
      console.log('✅ User data loaded into form');
      
    } catch (error) {
      console.error('❌ Error loading user data:', error);
    }
  }
  
  function setupFormSubmissionHandler() {
    console.log('🔧 Setting up form submission handler...');
    
    const form = document.getElementById('profileForm');
    if (!form) {
      console.error('❌ Profile form not found');
      return;
    }
    
    // Remove all existing listeners
    form.onsubmit = null;
    const clonedForm = form.cloneNode(true);
    form.parentNode.replaceChild(clonedForm, form);
    
    // Get the new form reference
    const newForm = document.getElementById('profileForm');
    
    // Add our handler
    newForm.addEventListener('submit', window.handleProfileUpdate);
    
    // Also handle the submit button specifically
    const submitBtn = document.querySelector('button[form="profileForm"]');
    if (submitBtn) {
      submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.handleProfileUpdate();
      });
    }
    
    console.log('✅ Form submission handler set up');
  }
  
  function setupProfilePictureButton() {
    console.log('📸 Setting up profile picture button...');
    
    const changeBtn = document.getElementById('changeProfilePictureBtn');
    if (!changeBtn) {
      console.log('⚠️ Change profile picture button not found');
      return;
    }
    
    changeBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('📸 Profile picture button clicked');
      showProfilePictureOptions();
    });
    
    console.log('✅ Profile picture button set up');
  }
  
  function showProfilePictureOptions() {
    console.log('📋 Showing profile picture options...');
    
    // Remove any existing modal
    const existing = document.getElementById('profilePictureOptionsModal');
    if (existing) existing.remove();
    
    // Create options modal
    const modal = document.createElement('div');
    modal.id = 'profilePictureOptionsModal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[70] p-4';
    
    modal.innerHTML = `
      <div class="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl">
        <h3 class="text-xl font-bold text-gray-800 mb-4 text-center">Change Profile Picture</h3>
        
        <div class="space-y-3">
          <button id="uploadPictureBtn" class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
            <span>📁</span>
            <span>Upload New Picture</span>
          </button>
          
          <button id="useInitialsBtn" class="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
            <span>🔤</span>
            <span>Use Initials</span>
          </button>
          
          <button id="randomAvatarBtn" class="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2">
            <span>🎲</span>
            <span>Random Avatar</span>
          </button>
          
          <button id="cancelPictureBtn" class="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Setup event handlers
    setupPictureOptionsHandlers(modal);
    
    console.log('✅ Profile picture options modal shown');
  }
  
  function setupPictureOptionsHandlers(modal) {
    // Upload picture
    modal.querySelector('#uploadPictureBtn').addEventListener('click', function() {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
          handleImageUpload(file);
        }
        modal.remove();
      };
      fileInput.click();
    });
    
    // Use initials
    modal.querySelector('#useInitialsBtn').addEventListener('click', function() {
      resetToInitials();
      modal.remove();
    });
    
    // Random avatar
    modal.querySelector('#randomAvatarBtn').addEventListener('click', function() {
      generateRandomAvatar();
      modal.remove();
    });
    
    // Cancel
    modal.querySelector('#cancelPictureBtn').addEventListener('click', function() {
      modal.remove();
    });
    
    // Click outside to close
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.remove();
      }
    });
  }
  
  function handleImageUpload(file) {
    console.log('📤 Handling image upload...');
    
    const reader = new FileReader();
    reader.onload = function(e) {
      const imageUrl = e.target.result;
      
      // Save profile picture
      localStorage.setItem('visualVibeProfilePicture', imageUrl);
      
      // Update current user
      if (window.currentUser) {
        window.currentUser.profilePicture = imageUrl;
        localStorage.setItem('visualVibeUser', JSON.stringify(window.currentUser));
      }
      
      // Update display
      updateProfilePictureDisplay(imageUrl);
      
      showSuccess('Profile picture updated! 📸');
    };
    reader.readAsDataURL(file);
  }
  
  function resetToInitials() {
    console.log('🔤 Resetting to initials...');
    
    // Remove saved picture
    localStorage.removeItem('visualVibeProfilePicture');
    
    // Remove from current user
    if (window.currentUser) {
      delete window.currentUser.profilePicture;
      localStorage.setItem('visualVibeUser', JSON.stringify(window.currentUser));
    }
    
    // Update display
    updateProfilePictureDisplay(null);
    
    showSuccess('Reset to initials! 🔤');
  }
  
  function generateRandomAvatar() {
    console.log('🎲 Generating random avatar...');
    
    const seed = Math.random().toString(36).substring(7);
    const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=transparent`;
    
    // Save profile picture
    localStorage.setItem('visualVibeProfilePicture', avatarUrl);
    
    // Update current user
    if (window.currentUser) {
      window.currentUser.profilePicture = avatarUrl;
      localStorage.setItem('visualVibeUser', JSON.stringify(window.currentUser));
    }
    
    // Update display
    updateProfilePictureDisplay(avatarUrl);
    
    showSuccess('Random avatar generated! 🎲');
  }
  
  function loadProfilePicture() {
    console.log('🖼️ Loading saved profile picture...');
    
    const savedPicture = localStorage.getItem('visualVibeProfilePicture');
    if (savedPicture) {
      updateProfilePictureDisplay(savedPicture);
    }
  }
  
  function updateProfilePictureDisplay(imageUrl) {
    const display = document.getElementById('profilePictureDisplay');
    if (!display) return;
    
    if (imageUrl) {
      display.innerHTML = `<img src="${imageUrl}" alt="Profile" class="w-full h-full object-cover rounded-full">`;
    } else {
      const initials = getInitials();
      display.innerHTML = initials;
      display.className = 'w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl mx-auto mb-3';
    }
  }
  
  function saveProfileData(profileData) {
    console.log('💾 Saving profile data...');
    
    try {
      // Save to profile storage
      localStorage.setItem('visualVibeProfileData', JSON.stringify(profileData));
      
      // Update current user
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
        
        console.log('👤 Current user updated:', window.currentUser);
      }
      
      console.log('✅ Profile data saved successfully');
      return true;
      
    } catch (error) {
      console.error('❌ Error saving profile data:', error);
      return false;
    }
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
  
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  function getInitials() {
    if (window.currentUser && window.currentUser.name) {
      return window.currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    }
    return 'U';
  }
  
  function showSuccess(message) {
    console.log('✅', message);
    if (window.toastManager) {
      window.toastManager.success(message, { duration: 3000 });
    } else {
      alert(message);
    }
  }
  
  function showError(message) {
    console.log('❌', message);
    if (window.toastManager) {
      window.toastManager.error(message, { duration: 4000 });
    } else {
      alert(message);
    }
  }
  
  // Initialize when ready
  function initialize() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializeCompleteProfileSystem);
    } else {
      initializeCompleteProfileSystem();
    }
  }
  
  // Initialize immediately and with delays to ensure it takes effect
  initialize();
  setTimeout(initializeCompleteProfileSystem, 1000);
  setTimeout(initializeCompleteProfileSystem, 3000);
  
})();

console.log('🔧 Complete profile fix loaded - All profile issues should be resolved');
