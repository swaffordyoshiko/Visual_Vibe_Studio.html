// Definitive Profile Fix - Clean implementation to resolve all conflicts
console.log('🔧 Loading definitive profile fix...');

(function() {
  'use strict';
  
  let isDefinitiveFixActive = false;
  
  function initializeDefinitiveProfileFix() {
    if (isDefinitiveFixActive) return;
    isDefinitiveFixActive = true;
    
    console.log('🚀 Initializing definitive profile fix...');
    
    // Clear all existing conflicts
    clearProfileConflicts();
    
    // Set up clean profile system
    setupCleanProfileSystem();
    
    console.log('✅ Definitive profile fix active');
  }
  
  function clearProfileConflicts() {
    console.log('🧹 Clearing profile conflicts...');
    
    // Remove any existing profile handlers that might conflict
    if (window.handleProfileUpdate) {
      delete window.handleProfileUpdate;
    }
    
    // Clear any auto-running picture handlers
    const existingIntervals = window.profileIntervals || [];
    existingIntervals.forEach(interval => clearInterval(interval));
    window.profileIntervals = [];
    
    console.log('✅ Profile conflicts cleared');
  }
  
  function setupCleanProfileSystem() {
    console.log('📝 Setting up clean profile system...');
    
    // CLEAN OPEN PROFILE MODAL FUNCTION - NO AUTO PICTURE POPUP
    window.openProfileModal = function() {
      console.log('👤 Opening profile modal (definitive version)...');
      
      try {
        const modal = document.getElementById('profileModal');
        if (!modal) {
          console.error('❌ Profile modal not found');
          return;
        }
        
        // Show modal
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
        
        // Load user data into form
        setTimeout(() => {
          loadUserDataIntoForm();
          setupCleanFormHandler();
        }, 100);
        
        console.log('✅ Profile modal opened (no auto picture popup)');
        
      } catch (error) {
        console.error('❌ Error opening profile modal:', error);
      }
    };
    
    // CLEAN PROFILE UPDATE FUNCTION - ACTUALLY SAVES DATA
    window.handleProfileUpdate = function(event) {
      console.log('💾 Handling profile update (definitive version)...');
      
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      
      try {
        // Get form data with correct field IDs
        const profileData = {
          firstName: getFieldValue('profileFirstName'),
          lastName: getFieldValue('profileLastName'),
          email: getFieldValue('profileEmail'),
          phone: getFieldValue('profilePhone'),
          companyName: getFieldValue('profileCompanyName'),
          lastUpdated: new Date().toISOString()
        };
        
        // Create full name
        profileData.fullName = `${profileData.firstName} ${profileData.lastName}`.trim();
        
        console.log('📊 Profile data to save:', profileData);
        
        // Validate required fields
        if (!profileData.firstName || !profileData.lastName || !profileData.email) {
          showError('Please fill in all required fields (First Name, Last Name, Email)');
          return false;
        }
        
        // Email validation
        if (!isValidEmail(profileData.email)) {
          showError('Please enter a valid email address');
          return false;
        }
        
        // ACTUALLY SAVE THE DATA
        const saveSuccess = saveProfileDataPermanently(profileData);
        
        if (saveSuccess) {
          showSuccess('Profile updated successfully! 🎉');
          
          // Close modal after delay
          setTimeout(() => {
            window.closeProfileModal();
          }, 1500);
        } else {
          showError('Failed to save profile data. Please try again.');
        }
        
        return false;
        
      } catch (error) {
        console.error('❌ Error updating profile:', error);
        showError('An error occurred while saving your profile');
        return false;
      }
    };
    
    // CLEAN CLOSE MODAL FUNCTION
    window.closeProfileModal = function() {
      console.log('📝 Closing profile modal (definitive version)...');
      
      const modal = document.getElementById('profileModal');
      if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
    };
    
    // MANUAL PROFILE PICTURE CHANGE FUNCTION - ONLY WHEN USER CLICKS
    window.changeProfilePictureManually = function() {
      console.log('📸 Manual profile picture change requested...');
      showProfilePictureOptions();
    };
  }
  
  function loadUserDataIntoForm() {
    console.log('📋 Loading user data into form (definitive version)...');
    
    try {
      // Get saved profile data
      const savedProfile = JSON.parse(localStorage.getItem('visualVibeProfileData') || '{}');
      
      // Get current user data
      const currentUser = window.currentUser || {};
      
      // Combine data
      const userData = { ...currentUser, ...savedProfile };
      
      console.log('👤 User data to load:', userData);
      
      // Populate form fields with correct IDs
      setFieldValue('profileFirstName', userData.firstName || currentUser.name?.split(' ')[0] || '');
      setFieldValue('profileLastName', userData.lastName || currentUser.name?.split(' ').slice(1).join(' ') || '');
      setFieldValue('profileEmail', userData.email || '');
      setFieldValue('profilePhone', userData.phone || '');
      setFieldValue('profileCompanyName', userData.companyName || userData.company || '');
      
      console.log('✅ User data loaded into form');
      
    } catch (error) {
      console.error('❌ Error loading user data:', error);
    }
  }
  
  function setupCleanFormHandler() {
    console.log('🔧 Setting up clean form handler...');
    
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
      submitBtn.onclick = null;
      submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.handleProfileUpdate();
      });
    }
    
    console.log('✅ Clean form handler set up');
  }
  
  function saveProfileDataPermanently(profileData) {
    console.log('💾 Saving profile data permanently...');
    
    try {
      // Save to profile data storage
      localStorage.setItem('visualVibeProfileData', JSON.stringify(profileData));
      console.log('✅ Saved to visualVibeProfileData');
      
      // Update current user object
      if (window.currentUser) {
        const updatedUser = {
          ...window.currentUser,
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          name: profileData.fullName,
          email: profileData.email,
          phone: profileData.phone,
          companyName: profileData.companyName,
          lastUpdated: profileData.lastUpdated
        };
        
        window.currentUser = updatedUser;
        localStorage.setItem('visualVibeUser', JSON.stringify(updatedUser));
        console.log('✅ Updated currentUser');
        
        // Update in users array
        const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
        const userIndex = users.findIndex(u => u.id === window.currentUser.id);
        if (userIndex !== -1) {
          users[userIndex] = { ...users[userIndex], ...updatedUser };
          localStorage.setItem('visualVibeUsers', JSON.stringify(users));
          console.log('✅ Updated users array');
        }
      }
      
      console.log('✅ Profile data saved permanently');
      return true;
      
    } catch (error) {
      console.error('❌ Error saving profile data permanently:', error);
      return false;
    }
  }
  
  function showProfilePictureOptions() {
    console.log('📸 Showing profile picture options (manual only)...');
    
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
          
          <button id="cancelPictureBtn" class="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Setup handlers
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
    
    showSuccess('Reset to initials! 🔤');
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
  
  // Test function
  window.testDefinitiveProfileFix = function() {
    console.log('🧪 Testing definitive profile fix...');
    
    const tests = [
      {
        name: 'openProfileModal function exists',
        test: () => typeof window.openProfileModal === 'function'
      },
      {
        name: 'handleProfileUpdate function exists',
        test: () => typeof window.handleProfileUpdate === 'function'
      },
      {
        name: 'closeProfileModal function exists',
        test: () => typeof window.closeProfileModal === 'function'
      },
      {
        name: 'changeProfilePictureManually function exists',
        test: () => typeof window.changeProfilePictureManually === 'function'
      },
      {
        name: 'Profile form exists',
        test: () => !!document.getElementById('profileForm')
      }
    ];
    
    console.log('🧪 Running definitive profile tests...');
    
    const results = tests.map(test => {
      const passed = test.test();
      console.log(`${passed ? '✅' : '❌'} ${test.name}: ${passed}`);
      return { name: test.name, passed };
    });
    
    const passedCount = results.filter(r => r.passed).length;
    console.log(`🧪 Test Results: ${passedCount}/${tests.length} tests passed`);
    
    return results;
  };
  
  // Initialize immediately with high priority
  initializeDefinitiveProfileFix();
  
  // Also initialize with delays to override any conflicting scripts
  setTimeout(initializeDefinitiveProfileFix, 2000);
  setTimeout(initializeDefinitiveProfileFix, 5000);
  
})();

console.log('🔧 Definitive profile fix loaded - clean implementation active');
