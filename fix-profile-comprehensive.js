// Comprehensive Profile Fix - Consolidate all profile functionality
console.log('🔧 Loading comprehensive profile fix...');

function initializeProfileFix() {
  console.log('🚀 Initializing comprehensive profile fix...');
  
  // Remove conflicting scripts and restore main functionality
  disableConflictingScripts();
  
  // Enhance the existing profile functionality
  enhanceProfileModal();
  
  // Add profile picture functionality
  addProfilePictureSupport();
  
  // Ensure data consistency
  consolidateProfileData();
  
  console.log('✅ Comprehensive profile fix initialized');
}

function disableConflictingScripts() {
  console.log('🛑 Disabling conflicting profile scripts...');
  
  try {
    // List of functions to disable from other profile scripts
    const functionsToDisable = [
      'fixProfileModalButtons',
      'createProfileModalWithWorkingButtons', 
      'setupProfileModalButtonHandlers',
      'preventProfileFormRefresh',
      'saveProfileDataDirectly',
      'setupProfilePictureClick'
    ];
    
    functionsToDisable.forEach(funcName => {
      if (window[funcName]) {
        window[funcName] = function() {
          console.log(`🚫 ${funcName} disabled - using consolidated version`);
        };
      }
    });
    
    console.log('✅ Conflicting scripts disabled');
  } catch (error) {
    console.error('❌ Error disabling conflicting scripts:', error);
  }
}

function enhanceProfileModal() {
  console.log('📝 Enhancing profile modal functionality...');
  
  try {
    // Store original function
    const originalOpenProfileModal = window.openProfileModal;
    
    // Enhanced version that ensures proper functionality
    window.openProfileModal = function() {
      console.log('👤 Opening enhanced profile modal...');
      
      try {
        // Call original function
        if (typeof originalOpenProfileModal === 'function') {
          originalOpenProfileModal();
          
          // Enhancement: Add profile picture support after modal opens
          setTimeout(() => {
            addProfilePictureToModal();
            setupEnhancedFormHandling();
            loadProfilePicture();
          }, 300);
        } else {
          console.error('❌ Original openProfileModal not found');
        }
      } catch (error) {
        console.error('❌ Error in enhanced openProfileModal:', error);
      }
    };
    
    console.log('✅ Profile modal enhanced');
  } catch (error) {
    console.error('❌ Error enhancing profile modal:', error);
  }
}

function addProfilePictureToModal() {
  console.log('📸 Adding profile picture to modal...');
  
  try {
    const modal = document.getElementById('profileModal');
    if (!modal) {
      console.warn('⚠️ Profile modal not found');
      return;
    }
    
    // Find where to add profile picture (top of form)
    const form = modal.querySelector('#profileForm');
    if (!form) {
      console.warn('⚠️ Profile form not found');
      return;
    }
    
    // Check if profile picture section already exists
    if (modal.querySelector('#profilePictureSection')) {
      console.log('ℹ️ Profile picture section already exists');
      return;
    }
    
    // Create profile picture section
    const pictureSection = document.createElement('div');
    pictureSection.id = 'profilePictureSection';
    pictureSection.className = 'text-center mb-6 border-b border-gray-200 pb-6';
    
    // Get user initials
    const userName = window.currentUser?.name || 'Visual Studio';
    const initials = getInitials(userName);
    
    pictureSection.innerHTML = `
      <div class="flex flex-col items-center">
        <div id="profilePictureDisplay" class="relative inline-block cursor-pointer group">
          <div class="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg transition-all duration-300 group-hover:scale-105">
            <span id="profileInitials">${initials}</span>
          </div>
          <div class="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity">
            <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
            </svg>
          </div>
        </div>
        <p class="text-sm text-gray-500 mt-2">Click to change profile picture</p>
        <input type="file" id="profilePictureInput" accept="image/*" style="display: none;">
      </div>
    `;
    
    // Insert at beginning of form
    form.insertBefore(pictureSection, form.firstChild);
    
    // Setup click handler
    const pictureDisplay = pictureSection.querySelector('#profilePictureDisplay');
    const fileInput = pictureSection.querySelector('#profilePictureInput');
    
    pictureDisplay.addEventListener('click', () => {
      fileInput.click();
    });
    
    fileInput.addEventListener('change', handleProfilePictureUpload);
    
    console.log('✅ Profile picture section added');
  } catch (error) {
    console.error('❌ Error adding profile picture to modal:', error);
  }
}

function getInitials(name) {
  try {
    if (!name || !name.trim()) return 'VS';
    
    const names = name.trim().split(' ').filter(n => n.length > 0);
    
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    } else if (names.length === 1 && names[0].length >= 1) {
      return names[0].substring(0, Math.min(2, names[0].length)).toUpperCase();
    }
    
    return 'VS';
  } catch (error) {
    console.error('❌ Error getting initials:', error);
    return 'VS';
  }
}

function handleProfilePictureUpload(event) {
  console.log('📤 Handling profile picture upload...');
  
  try {
    const file = event.target.files[0];
    if (!file) return;
    
    // Validate file
    if (!file.type.startsWith('image/')) {
      showAlert('Please select an image file.', 'error');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      showAlert('Image must be smaller than 5MB.', 'error');
      return;
    }
    
    // Read and display image
    const reader = new FileReader();
    reader.onload = function(e) {
      const imageUrl = e.target.result;
      
      // Update display
      const pictureDisplay = document.getElementById('profilePictureDisplay');
      if (pictureDisplay) {
        const circle = pictureDisplay.querySelector('div');
        circle.innerHTML = `
          <img src="${imageUrl}" alt="Profile Picture" class="w-full h-full object-cover rounded-full">
        `;
      }
      
      // Save picture with user profile
      saveProfilePicture(imageUrl);
      
      showAlert('Profile picture updated!', 'success');
    };
    
    reader.readAsDataURL(file);
    
  } catch (error) {
    console.error('❌ Error handling profile picture upload:', error);
    showAlert('Error uploading image. Please try again.', 'error');
  }
}

function saveProfilePicture(imageUrl) {
  console.log('💾 Saving profile picture...');
  
  try {
    if (!window.currentUser) {
      console.error('❌ No current user');
      return;
    }
    
    // Get current users array
    const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
    const userIndex = users.findIndex(u => u.id === window.currentUser.id);
    
    if (userIndex !== -1) {
      // Add profile picture to user data
      users[userIndex].profilePicture = imageUrl;
      users[userIndex].updatedAt = new Date().toISOString();
      
      // Save updated users array
      localStorage.setItem('visualVibeUsers', JSON.stringify(users));
      
      console.log('✅ Profile picture saved to user data');
    }
  } catch (error) {
    console.error('❌ Error saving profile picture:', error);
  }
}

function loadProfilePicture() {
  console.log('📂 Loading saved profile picture...');
  
  try {
    if (!window.currentUser) return;
    
    const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
    const user = users.find(u => u.id === window.currentUser.id);
    
    if (user && user.profilePicture) {
      const pictureDisplay = document.getElementById('profilePictureDisplay');
      if (pictureDisplay) {
        const circle = pictureDisplay.querySelector('div');
        circle.innerHTML = `
          <img src="${user.profilePicture}" alt="Profile Picture" class="w-full h-full object-cover rounded-full">
        `;
      }
    }
  } catch (error) {
    console.error('❌ Error loading profile picture:', error);
  }
}

function setupEnhancedFormHandling() {
  console.log('📝 Setting up enhanced form handling...');
  
  try {
    const form = document.getElementById('profileForm');
    if (!form) return;
    
    // Ensure form doesn't refresh page
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Call the original handleProfileUpdate but ensure no page refresh
      if (typeof window.handleProfileUpdate === 'function') {
        window.handleProfileUpdate(e);
      }
    });
    
    // Add enhanced validation and feedback
    const inputs = form.querySelectorAll('input[required]');
    inputs.forEach(input => {
      input.addEventListener('blur', validateField);
    });
    
    console.log('✅ Enhanced form handling setup complete');
  } catch (error) {
    console.error('❌ Error setting up enhanced form handling:', error);
  }
}

function validateField(event) {
  const field = event.target;
  const value = field.value.trim();
  
  // Remove existing error styling
  field.classList.remove('border-red-500', 'border-green-500');
  
  if (field.required && !value) {
    field.classList.add('border-red-500');
  } else if (field.type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(value)) {
      field.classList.add('border-green-500');
    } else {
      field.classList.add('border-red-500');
    }
  } else if (value) {
    field.classList.add('border-green-500');
  }
}

function consolidateProfileData() {
  console.log('🔄 Consolidating profile data...');
  
  try {
    // Check if there's data in visualVibeProfile that needs to be moved
    const legacyProfile = localStorage.getItem('visualVibeProfile');
    if (legacyProfile && window.currentUser) {
      const profileData = JSON.parse(legacyProfile);
      
      // Get current users array
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      const userIndex = users.findIndex(u => u.id === window.currentUser.id);
      
      if (userIndex !== -1) {
        // Merge legacy profile data into main user record
        const user = users[userIndex];
        
        if (profileData.fullName && !user.name) {
          const names = profileData.fullName.trim().split(' ');
          user.firstName = names[0] || '';
          user.lastName = names.slice(1).join(' ') || '';
          user.name = profileData.fullName;
        }
        
        if (profileData.email && !user.email) {
          user.email = profileData.email;
        }
        
        if (profileData.phone && !user.phone) {
          user.phone = profileData.phone;
        }
        
        if (profileData.company && !user.companyName) {
          user.companyName = profileData.company;
        }
        
        user.updatedAt = new Date().toISOString();
        
        // Save updated user data
        localStorage.setItem('visualVibeUsers', JSON.stringify(users));
        
        // Remove legacy profile data
        localStorage.removeItem('visualVibeProfile');
        
        console.log('✅ Legacy profile data consolidated');
      }
    }
  } catch (error) {
    console.error('❌ Error consolidating profile data:', error);
  }
}

function addProfilePictureSupport() {
  console.log('🖼️ Adding profile picture support...');
  
  // This function sets up global profile picture functionality
  // that works with the main user data system
  
  window.updateProfilePicture = function(imageUrl) {
    try {
      saveProfilePicture(imageUrl);
      
      // Update any profile displays on the page
      const profileDisplays = document.querySelectorAll('[id*="profile"], [class*="profile"]');
      profileDisplays.forEach(display => {
        if (display.querySelector('img') || display.textContent.length <= 3) {
          // This might be a profile picture display, update if needed
          updateProfileDisplay(display, imageUrl);
        }
      });
      
    } catch (error) {
      console.error('❌ Error updating profile picture:', error);
    }
  };
  
  window.resetProfilePicture = function() {
    try {
      if (!window.currentUser) return;
      
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      const userIndex = users.findIndex(u => u.id === window.currentUser.id);
      
      if (userIndex !== -1) {
        delete users[userIndex].profilePicture;
        localStorage.setItem('visualVibeUsers', JSON.stringify(users));
        
        // Update displays to show initials
        const initials = getInitials(window.currentUser.name);
        const pictureDisplay = document.getElementById('profilePictureDisplay');
        if (pictureDisplay) {
          const circle = pictureDisplay.querySelector('div');
          circle.innerHTML = `
            <span id="profileInitials" class="text-2xl font-bold text-white">${initials}</span>
          `;
        }
        
        showAlert('Profile picture reset to initials.', 'success');
      }
    } catch (error) {
      console.error('❌ Error resetting profile picture:', error);
    }
  };
}

function updateProfileDisplay(display, imageUrl) {
  try {
    if (imageUrl) {
      display.innerHTML = `
        <img src="${imageUrl}" alt="Profile Picture" class="w-full h-full object-cover rounded-full">
      `;
    } else {
      const initials = getInitials(window.currentUser?.name || '');
      display.innerHTML = `
        <span class="text-white font-bold">${initials}</span>
      `;
    }
  } catch (error) {
    console.error('❌ Error updating profile display:', error);
  }
}

// Utility function to show alerts (use existing if available)
function showAlert(message, type = 'info') {
  if (window.toastManager) {
    if (type === 'success') {
      window.toastManager.success(message, { duration: 3000 });
    } else if (type === 'error') {
      window.toastManager.error(message, { duration: 4000 });
    } else {
      window.toastManager.info(message, { duration: 3000 });
    }
  } else if (window.showAlert && typeof window.showAlert === 'function') {
    window.showAlert(message, type);
  } else {
    alert(message);
  }
}

// Test function
window.testProfileFix = function() {
  console.log('🧪 Testing comprehensive profile fix...');
  
  const tests = [
    () => typeof window.openProfileModal === 'function',
    () => typeof window.handleProfileUpdate === 'function',
    () => typeof window.updateProfilePicture === 'function',
    () => typeof window.resetProfilePicture === 'function'
  ];
  
  const results = tests.map((test, i) => {
    try {
      const result = test();
      console.log(`Test ${i + 1}: ${result ? '✅ PASS' : '❌ FAIL'}`);
      return result;
    } catch (error) {
      console.log(`Test ${i + 1}: ❌ ERROR - ${error.message}`);
      return false;
    }
  });
  
  const allPassed = results.every(r => r);
  console.log(`Overall: ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
  
  return allPassed;
};

// Initialize when DOM is ready
function initialize() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeProfileFix);
  } else {
    initializeProfileFix();
  }
}

// Initialize with delay to ensure other scripts load first
setTimeout(initialize, 1500);

console.log('🔧 Comprehensive profile fix loaded - will consolidate all profile functionality');
