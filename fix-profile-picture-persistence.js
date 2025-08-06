// Fix profile picture persistence - stop "change profile picture" prompts
console.log('📸 Loading profile picture persistence fix...');

function initializeProfilePictureFix() {
  console.log('🚀 Initializing profile picture persistence fix...');
  
  // Override profile picture functionality to ensure proper saving
  enhanceProfilePictureSaving();
  
  // Fix profile picture display and loading
  fixProfilePictureDisplay();
  
  // Add persistent storage management
  setupPersistentProfilePicture();
  
  console.log('✅ Profile picture persistence fix initialized');
}

function enhanceProfilePictureSaving() {
  console.log('💾 Enhancing profile picture saving...');
  
  // Override the profile picture update function
  window.updateProfilePicture = function(imageUrl) {
    console.log('📸 Updating profile picture with persistence...');
    
    try {
      if (!window.currentUser) {
        console.error('❌ No current user for profile picture update');
        return false;
      }
      
      // Save to main user data system
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      const userIndex = users.findIndex(u => u.id === window.currentUser.id);
      
      if (userIndex !== -1) {
        // Save profile picture to user record
        users[userIndex].profilePicture = imageUrl;
        users[userIndex].profilePictureUpdated = new Date().toISOString();
        users[userIndex].updatedAt = new Date().toISOString();
        
        // Save updated users array
        localStorage.setItem('visualVibeUsers', JSON.stringify(users));
        
        // Also save to dedicated profile picture storage for quick access
        localStorage.setItem('profilePictureUrl', imageUrl);
        localStorage.setItem('profilePictureUserId', window.currentUser.id);
        localStorage.setItem('profilePictureTimestamp', new Date().toISOString());
        
        console.log('✅ Profile picture saved to multiple storage locations');
        
        // Update all profile picture displays immediately
        updateAllProfilePictureDisplays(imageUrl);
        
        // Show success notification
        if (window.toastManager) {
          window.toastManager.success('Profile picture saved successfully! 📸', { duration: 3000 });
        }
        
        return true;
      } else {
        console.error('❌ User not found for profile picture update');
        return false;
      }
    } catch (error) {
      console.error('�� Error updating profile picture:', error);
      return false;
    }
  };
  
  // Override reset function
  window.resetProfilePicture = function() {
    console.log('🔄 Resetting profile picture...');
    
    try {
      if (!window.currentUser) return false;
      
      // Remove from main user data
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      const userIndex = users.findIndex(u => u.id === window.currentUser.id);
      
      if (userIndex !== -1) {
        delete users[userIndex].profilePicture;
        delete users[userIndex].profilePictureUpdated;
        users[userIndex].updatedAt = new Date().toISOString();
        
        localStorage.setItem('visualVibeUsers', JSON.stringify(users));
      }
      
      // Remove from dedicated storage
      localStorage.removeItem('profilePictureUrl');
      localStorage.removeItem('profilePictureUserId');
      localStorage.removeItem('profilePictureTimestamp');
      
      // Update displays to show initials
      const initials = getInitials(window.currentUser.name);
      updateAllProfilePictureDisplays(null, initials);
      
      if (window.toastManager) {
        window.toastManager.success('Profile picture reset to initials! 🔤', { duration: 3000 });
      }
      
      return true;
    } catch (error) {
      console.error('❌ Error resetting profile picture:', error);
      return false;
    }
  };
}

function updateAllProfilePictureDisplays(imageUrl, initials = null) {
  console.log('🔄 Updating all profile picture displays...');
  
  try {
    // Get user initials if not provided
    if (!initials && window.currentUser) {
      initials = getInitials(window.currentUser.name);
    }
    
    // Find all profile picture containers
    const profileContainers = [
      // In profile modal
      document.querySelector('#profileModal .w-20.h-20, #profileModal .w-24.h-24'),
      document.querySelector('#profilePictureDisplay'),
      // In header/navigation
      document.querySelector('[onclick*="openProfileModal"] div'),
      // Any other profile displays
      ...document.querySelectorAll('[class*="profile"], [id*="profile"]')
    ].filter(el => el && (el.querySelector('img') || el.textContent.length <= 3));
    
    profileContainers.forEach(container => {
      if (container) {
        updateSingleProfileDisplay(container, imageUrl, initials);
      }
    });
    
    console.log(`✅ Updated ${profileContainers.length} profile displays`);
  } catch (error) {
    console.error('❌ Error updating profile displays:', error);
  }
}

function updateSingleProfileDisplay(container, imageUrl, initials) {
  try {
    if (imageUrl) {
      // Show image
      if (container.tagName === 'IMG') {
        container.src = imageUrl;
        container.alt = 'Profile Picture';
      } else {
        container.innerHTML = `
          <img src="${imageUrl}" alt="Profile Picture" class="w-full h-full object-cover rounded-full border-2 border-white shadow-lg">
        `;
      }
    } else {
      // Show initials
      if (container.tagName === 'IMG') {
        // Replace img with div for initials
        const initialsDiv = document.createElement('div');
        initialsDiv.className = container.className;
        initialsDiv.style.cssText = container.style.cssText;
        initialsDiv.innerHTML = `
          <span class="text-white font-bold">${initials || 'VS'}</span>
        `;
        container.parentNode.replaceChild(initialsDiv, container);
      } else {
        container.innerHTML = `
          <span class="text-white font-bold text-xl">${initials || 'VS'}</span>
        `;
      }
    }
  } catch (error) {
    console.error('❌ Error updating single profile display:', error);
  }
}

function fixProfilePictureDisplay() {
  console.log('🖼️ Fixing profile picture display...');
  
  // Override openProfileModal to ensure picture loads correctly
  const originalOpenProfileModal = window.openProfileModal;
  
  window.openProfileModal = function() {
    console.log('👤 Opening profile modal with picture fix...');
    
    // Call original function
    if (typeof originalOpenProfileModal === 'function') {
      originalOpenProfileModal();
    }
    
    // Fix profile picture display after modal opens
    setTimeout(() => {
      loadAndDisplayProfilePicture();
      fixProfilePictureClickHandler();
    }, 300);
  };
}

function loadAndDisplayProfilePicture() {
  console.log('📂 Loading and displaying saved profile picture...');
  
  try {
    if (!window.currentUser) return;
    
    let profilePictureUrl = null;
    
    // Try to get from user data first
    const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
    const user = users.find(u => u.id === window.currentUser.id);
    
    if (user && user.profilePicture) {
      profilePictureUrl = user.profilePicture;
      console.log('📸 Found profile picture in user data');
    } else {
      // Fallback to dedicated storage
      const savedPictureUrl = localStorage.getItem('profilePictureUrl');
      const savedUserId = localStorage.getItem('profilePictureUserId');
      
      if (savedPictureUrl && savedUserId === window.currentUser.id) {
        profilePictureUrl = savedPictureUrl;
        console.log('📸 Found profile picture in dedicated storage');
      }
    }
    
    // Update display
    if (profilePictureUrl) {
      updateAllProfilePictureDisplays(profilePictureUrl);
    } else {
      const initials = getInitials(window.currentUser.name);
      updateAllProfilePictureDisplays(null, initials);
    }
    
  } catch (error) {
    console.error('❌ Error loading profile picture:', error);
  }
}

function fixProfilePictureClickHandler() {
  console.log('🖱️ Fixing profile picture click handler...');
  
  try {
    const modal = document.getElementById('profileModal');
    if (!modal) return;
    
    // Find profile picture area
    const pictureAreas = [
      modal.querySelector('#profilePictureDisplay'),
      modal.querySelector('.w-20.h-20'),
      modal.querySelector('.w-24.h-24'),
      modal.querySelector('[class*="rounded-full"]')
    ].filter(el => el);
    
    pictureAreas.forEach(area => {
      if (area && !area.hasAttribute('data-click-fixed')) {
        // Mark as fixed to prevent duplicate handlers
        area.setAttribute('data-click-fixed', 'true');
        
        // Make clickable
        area.style.cursor = 'pointer';
        area.style.transition = 'transform 0.3s ease';
        
        // Add hover effect
        area.addEventListener('mouseenter', function() {
          this.style.transform = 'scale(1.05)';
        });
        
        area.addEventListener('mouseleave', function() {
          this.style.transform = 'scale(1)';
        });
        
        // Add click handler
        area.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          console.log('📸 Profile picture clicked');
          showProfilePictureOptions();
        });
      }
    });
    
    console.log('✅ Profile picture click handlers fixed');
  } catch (error) {
    console.error('❌ Error fixing click handlers:', error);
  }
}

function setupPersistentProfilePicture() {
  console.log('💾 Setting up persistent profile picture...');
  
  // Create enhanced file input handler
  window.handleProfilePictureUpload = function(event) {
    console.log('📤 Handling profile picture upload with persistence...');
    
    try {
      const file = event.target.files[0];
      if (!file) return;
      
      // Validate file
      if (!file.type.startsWith('image/')) {
        showProfilePictureError('Please select a valid image file');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        showProfilePictureError('Image must be smaller than 5MB');
        return;
      }
      
      // Show uploading state
      showProfilePictureUploading();
      
      // Read and process the image
      const reader = new FileReader();
      reader.onload = function(e) {
        const imageUrl = e.target.result;
        
        // Save the image with persistence
        const saved = window.updateProfilePicture(imageUrl);
        
        if (saved) {
          console.log('✅ Profile picture uploaded and saved successfully');
        } else {
          showProfilePictureError('Failed to save profile picture');
        }
      };
      
      reader.onerror = function() {
        showProfilePictureError('Failed to read image file');
      };
      
      reader.readAsDataURL(file);
      
    } catch (error) {
      console.error('❌ Error handling profile picture upload:', error);
      showProfilePictureError('Upload failed. Please try again.');
    }
  };
}

function showProfilePictureOptions() {
  console.log('📋 Showing profile picture options...');
  
  try {
    // Remove existing options modal
    const existingModal = document.getElementById('profilePictureOptionsModal');
    if (existingModal) {
      existingModal.remove();
    }
    
    // Create options modal
    const optionsModal = document.createElement('div');
    optionsModal.id = 'profilePictureOptionsModal';
    optionsModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4';
    
    optionsModal.innerHTML = `
      <div class="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl">
        <h3 class="text-xl font-bold text-gray-800 mb-4 text-center">Change Profile Picture</h3>
        
        <div class="space-y-3">
          <button onclick="triggerFileUpload()" class="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
            <span>📁</span>
            <span>Upload New Picture</span>
          </button>
          
          <button onclick="window.resetProfilePicture(); closeProfilePictureOptionsModal();" class="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white py-3 px-4 rounded-lg hover:from-green-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
            <span>🔤</span>
            <span>Use Initials</span>
          </button>
          
          <button onclick="closeProfilePictureOptionsModal()" class="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors">
            Cancel
          </button>
        </div>
        
        <!-- Hidden file input -->
        <input type="file" id="profilePictureFileInput" accept="image/*" style="display: none;" onchange="window.handleProfilePictureUpload(event)">
      </div>
    `;
    
    document.body.appendChild(optionsModal);
    
    // Animate in
    optionsModal.style.opacity = '0';
    setTimeout(() => {
      optionsModal.style.transition = 'opacity 0.3s ease';
      optionsModal.style.opacity = '1';
    }, 10);
    
    // Click outside to close
    optionsModal.addEventListener('click', function(e) {
      if (e.target === optionsModal) {
        closeProfilePictureOptionsModal();
      }
    });
    
    console.log('✅ Profile picture options modal shown');
  } catch (error) {
    console.error('❌ Error showing profile picture options:', error);
  }
}

function triggerFileUpload() {
  console.log('📁 Triggering file upload...');
  closeProfilePictureOptionsModal();
  
  const fileInput = document.getElementById('profilePictureFileInput');
  if (fileInput) {
    fileInput.click();
  } else {
    console.error('❌ File input not found');
  }
}

function closeProfilePictureOptionsModal() {
  const modal = document.getElementById('profilePictureOptionsModal');
  if (modal) {
    modal.style.opacity = '0';
    setTimeout(() => {
      modal.remove();
    }, 300);
  }
}

function showProfilePictureUploading() {
  if (window.toastManager) {
    window.toastManager.info('📤 Uploading profile picture...', { duration: 2000 });
  }
}

function showProfilePictureError(message) {
  if (window.toastManager) {
    window.toastManager.error(`❌ ${message}`, { duration: 4000 });
  } else {
    alert(message);
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

// Load saved profile picture on page load
function loadProfilePictureOnPageLoad() {
  console.log('🚀 Loading profile picture on page load...');
  
  setTimeout(() => {
    if (window.currentUser) {
      loadAndDisplayProfilePicture();
    }
  }, 1000);
}

// Test function
window.testProfilePicturePersistence = function() {
  console.log('🧪 Testing profile picture persistence...');
  
  const tests = [
    () => typeof window.updateProfilePicture === 'function',
    () => typeof window.resetProfilePicture === 'function',
    () => typeof window.handleProfilePictureUpload === 'function',
    () => typeof loadAndDisplayProfilePicture === 'function'
  ];
  
  tests.forEach((test, index) => {
    try {
      const result = test();
      console.log(`Test ${index + 1}: ${result ? '✅ PASS' : '❌ FAIL'}`);
    } catch (error) {
      console.log(`Test ${index + 1}: ❌ ERROR - ${error.message}`);
    }
  });
};

// Initialize when DOM is ready
function initialize() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initializeProfilePictureFix();
      loadProfilePictureOnPageLoad();
    });
  } else {
    initializeProfilePictureFix();
    loadProfilePictureOnPageLoad();
  }
}

// Initialize with delay to ensure other scripts load first
setTimeout(initialize, 2500);

console.log('📸 Profile picture persistence fix loaded');
