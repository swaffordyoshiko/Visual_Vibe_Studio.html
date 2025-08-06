// Profile Photo Confirmation - Add OK button after editing
console.log('📸 Loading profile photo confirmation functionality...');

function initializeProfilePhotoConfirmation() {
  console.log('🚀 Initializing profile photo confirmation...');
  
  // Override profile picture functionality to add confirmation
  enhanceProfilePhotoWithConfirmation();
  
  console.log('✅ Profile photo confirmation initialized');
}

function enhanceProfilePhotoWithConfirmation() {
  console.log('📝 Enhancing profile photo with confirmation...');
  
  // Override the handleProfilePictureUpload function
  window.handleProfilePictureUpload = function(event) {
    console.log('📤 Handling profile picture upload with confirmation...');
    
    try {
      const file = event.target.files[0];
      if (!file) return;
      
      // Validate file
      if (!file.type.startsWith('image/')) {
        showAlert('Please select a valid image file', 'error');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        showAlert('Image must be smaller than 5MB', 'error');
        return;
      }
      
      // Read and show preview with confirmation
      const reader = new FileReader();
      reader.onload = function(e) {
        const imageUrl = e.target.result;
        showProfilePhotoConfirmation(imageUrl);
      };
      
      reader.onerror = function() {
        showAlert('Failed to read image file', 'error');
      };
      
      reader.readAsDataURL(file);
      
    } catch (error) {
      console.error('❌ Error handling profile picture upload:', error);
      showAlert('Upload failed. Please try again.', 'error');
    }
  };
  
  // Override reset function to add confirmation
  const originalResetProfilePicture = window.resetProfilePicture;
  window.resetProfilePicture = function() {
    console.log('🔄 Resetting profile picture with confirmation...');
    
    const initials = getInitials(window.currentUser?.name || 'Visual Studio');
    showProfilePhotoConfirmation(null, initials, 'reset');
  };
}

function showProfilePhotoConfirmation(imageUrl, initials = null, action = 'upload') {
  console.log('📋 Showing profile photo confirmation...');
  
  try {
    // Remove any existing confirmation modal
    const existingModal = document.getElementById('profilePhotoConfirmationModal');
    if (existingModal) {
      existingModal.remove();
    }
    
    // Close the options modal if open
    const optionsModal = document.getElementById('profilePictureOptionsModal');
    if (optionsModal) {
      optionsModal.remove();
    }
    
    // Get current user initials if needed
    if (!initials && window.currentUser) {
      initials = getInitials(window.currentUser.name);
    }
    
    // Create confirmation modal
    const confirmationModal = document.createElement('div');
    confirmationModal.id = 'profilePhotoConfirmationModal';
    confirmationModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[70] p-4';
    
    const actionText = action === 'reset' ? 'Reset to Initials' : 'New Profile Picture';
    const actionIcon = action === 'reset' ? '🔤' : '📸';
    
    confirmationModal.innerHTML = `
      <div class="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl transform scale-95 opacity-0 transition-all duration-300" id="confirmationContent">
        <div class="text-center mb-6">
          <div class="text-3xl mb-3">${actionIcon}</div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">${actionText}</h3>
          <p class="text-gray-600">Do you want to apply this change?</p>
        </div>
        
        <!-- Preview Section -->
        <div class="bg-gray-50 rounded-xl p-6 mb-6">
          <div class="flex items-center justify-center space-x-6">
            <!-- Current Photo -->
            <div class="text-center">
              <p class="text-sm text-gray-500 mb-2">Current</p>
              <div id="currentPhotoPreview" class="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-md">
                ${getCurrentProfilePictureHTML()}
              </div>
            </div>
            
            <!-- Arrow -->
            <div class="text-gray-400">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </div>
            
            <!-- New Photo -->
            <div class="text-center">
              <p class="text-sm text-gray-500 mb-2">New</p>
              <div id="newPhotoPreview" class="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-md">
                ${getNewProfilePictureHTML(imageUrl, initials)}
              </div>
            </div>
          </div>
        </div>
        
        <!-- Action Buttons -->
        <div class="space-y-3">
          <button onclick="confirmProfilePhotoChange('${imageUrl}', '${initials}', '${action}')" class="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
            <span>✅</span>
            <span>OK - Apply Change</span>
          </button>
          
          <button onclick="cancelProfilePhotoChange()" class="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center justify-center space-x-2">
            <span>❌</span>
            <span>Cancel</span>
          </button>
        </div>
        
        <div class="mt-4 text-center">
          <p class="text-xs text-gray-500">You can always change this later</p>
        </div>
      </div>
    `;
    
    document.body.appendChild(confirmationModal);
    
    // Animate in
    setTimeout(() => {
      const content = document.getElementById('confirmationContent');
      if (content) {
        content.style.transform = 'scale(1)';
        content.style.opacity = '1';
      }
    }, 10);
    
    // Prevent closing by clicking outside
    confirmationModal.addEventListener('click', function(e) {
      if (e.target === confirmationModal) {
        // Optional: uncomment to allow closing by clicking outside
        // cancelProfilePhotoChange();
      }
    });
    
    console.log('✅ Profile photo confirmation modal shown');
  } catch (error) {
    console.error('❌ Error showing profile photo confirmation:', error);
  }
}

function getCurrentProfilePictureHTML() {
  try {
    if (!window.currentUser) return 'VS';
    
    // Check if user has a saved profile picture
    const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
    const user = users.find(u => u.id === window.currentUser.id);
    
    if (user && user.profilePicture) {
      return `<img src="${user.profilePicture}" alt="Current" class="w-full h-full object-cover rounded-full">`;
    } else {
      const initials = getInitials(window.currentUser.name);
      return initials;
    }
  } catch (error) {
    console.error('❌ Error getting current profile picture:', error);
    return 'VS';
  }
}

function getNewProfilePictureHTML(imageUrl, initials) {
  if (imageUrl && imageUrl !== 'null') {
    return `<img src="${imageUrl}" alt="New" class="w-full h-full object-cover rounded-full">`;
  } else {
    return initials || 'VS';
  }
}

function confirmProfilePhotoChange(imageUrl, initials, action) {
  console.log('✅ Confirming profile photo change...');
  
  try {
    if (action === 'reset' || !imageUrl || imageUrl === 'null') {
      // Reset to initials
      applyProfilePictureReset(initials);
    } else {
      // Apply new image
      applyProfilePictureUpdate(imageUrl);
    }
    
    // Close confirmation modal
    closeProfilePhotoConfirmationModal();
    
    // Show success message
    const successMessage = action === 'reset' ? 
      'Profile picture reset to initials! 🔤' : 
      'Profile picture updated successfully! 📸';
    
    if (window.toastManager) {
      window.toastManager.success(successMessage, { duration: 3000 });
    } else {
      showAlert(successMessage, 'success');
    }
    
  } catch (error) {
    console.error('❌ Error confirming profile photo change:', error);
    showAlert('Failed to apply changes. Please try again.', 'error');
  }
}

function cancelProfilePhotoChange() {
  console.log('❌ Cancelling profile photo change...');
  
  // Close confirmation modal
  closeProfilePhotoConfirmationModal();
  
  // Clear any file inputs
  const fileInputs = document.querySelectorAll('input[type="file"]');
  fileInputs.forEach(input => {
    input.value = '';
  });
  
  if (window.toastManager) {
    window.toastManager.info('Profile picture change cancelled', { duration: 2000 });
  }
}

function closeProfilePhotoConfirmationModal() {
  const modal = document.getElementById('profilePhotoConfirmationModal');
  if (modal) {
    const content = modal.querySelector('#confirmationContent');
    if (content) {
      content.style.transform = 'scale(0.95)';
      content.style.opacity = '0';
    }
    
    setTimeout(() => {
      modal.remove();
    }, 300);
  }
}

function applyProfilePictureUpdate(imageUrl) {
  console.log('📸 Applying profile picture update...');
  
  try {
    if (!window.currentUser) {
      throw new Error('No current user');
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
      
      console.log('✅ Profile picture saved successfully');
      
      // Update all profile picture displays immediately
      updateAllProfilePictureDisplays(imageUrl);
      
      return true;
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.error('❌ Error applying profile picture update:', error);
    throw error;
  }
}

function applyProfilePictureReset(initials) {
  console.log('🔄 Applying profile picture reset...');
  
  try {
    if (!window.currentUser) {
      throw new Error('No current user');
    }
    
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
    updateAllProfilePictureDisplays(null, initials);
    
    console.log('✅ Profile picture reset successfully');
    return true;
    
  } catch (error) {
    console.error('❌ Error applying profile picture reset:', error);
    throw error;
  }
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

// Utility function to show alerts
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

// Make functions globally available
window.confirmProfilePhotoChange = confirmProfilePhotoChange;
window.cancelProfilePhotoChange = cancelProfilePhotoChange;

// Test function
window.testProfilePhotoConfirmation = function() {
  console.log('🧪 Testing profile photo confirmation...');
  
  // Show test confirmation with sample image
  const testImageUrl = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23ff6b6b"/><text x="50" y="55" text-anchor="middle" fill="white" font-size="20" font-family="Arial">TEST</text></svg>';
  showProfilePhotoConfirmation(testImageUrl);
};

// Initialize when DOM is ready
function initialize() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeProfilePhotoConfirmation);
  } else {
    initializeProfilePhotoConfirmation();
  }
}

// Initialize with delay to ensure other scripts load first
setTimeout(initialize, 3000);

console.log('📸 Profile photo confirmation functionality loaded');
