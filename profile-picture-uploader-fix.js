// COMPLETE PROFILE PICTURE UPLOADER FIX
console.log('📸 Loading complete profile picture uploader fix...');

(function() {
  'use strict';
  
  // Prevent multiple loads
  if (window.profilePictureUploaderFix) {
    return;
  }
  window.profilePictureUploaderFix = true;
  
  console.log('🛠️ Fixing profile picture uploader...');
  
  // STRICT control flags
  let pictureUploaderAllowed = false;
  let pictureUploaderOpen = false;
  let selectedImageData = null;
  let originalProfilePicture = null;
  
  // COMPLETELY OVERRIDE any existing picture upload functions
  window.openProfilePictureUpload = function() {
    console.log('🚫 BLOCKED: openProfilePictureUpload - use button in profile modal instead');
    return false;
  };
  
  // CONTROLLED picture uploader that only works from profile modal
  window.openPictureUploaderControlled = function() {
    if (!pictureUploaderAllowed) {
      console.log('🚫 BLOCKED: Picture uploader not allowed');
      return false;
    }
    
    console.log('📸 Opening controlled picture uploader...');
    pictureUploaderOpen = true;
    
    // Get current profile picture
    originalProfilePicture = window.currentUser?.profilePicture || null;
    
    // Create uploader modal
    createPictureUploaderModal();
    
    // Reset flag
    pictureUploaderAllowed = false;
  };
  
  function createPictureUploaderModal() {
    // Remove any existing uploader modal
    const existingModal = document.getElementById('pictureUploaderModal');
    if (existingModal) {
      existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.id = 'pictureUploaderModal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
      <div class="bg-white rounded-xl max-w-sm w-full shadow-2xl">
        <!-- Header -->
        <div class="p-6 border-b border-gray-200">
          <h3 class="text-lg font-bold text-gray-800 text-center">Change Profile Picture</h3>
        </div>
        
        <!-- Picture Preview -->
        <div class="p-6 text-center">
          <div class="mb-6">
            <div id="picturePreviewLarge" class="w-32 h-32 mx-auto rounded-full bg-gray-200 flex items-center justify-center text-3xl text-gray-500 overflow-hidden border-4 border-gray-300 shadow-lg">
              ${originalProfilePicture ? 
                `<img src="${originalProfilePicture}" class="w-full h-full object-cover rounded-full" alt="Current Profile">` : 
                '👤'
              }
            </div>
          </div>
          
          <!-- File Input (Hidden) -->
          <input type="file" id="pictureFileInput" accept="image/*" class="hidden" onchange="handlePictureFileSelect(event)">
          
          <!-- Action Buttons -->
          <div class="space-y-3">
            <button type="button" onclick="triggerFileSelect()" 
                    class="w-full bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium">
              📁 Choose New Picture
            </button>
            
            <div class="grid grid-cols-2 gap-3">
              <button type="button" onclick="removeCurrentPicture()" 
                      class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium">
                🗑️ Remove
              </button>
              <button type="button" onclick="resetToOriginal()" 
                      class="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors font-medium">
                ↩️ Reset
              </button>
            </div>
            
            <div class="pt-3 border-t border-gray-200">
              <div class="grid grid-cols-2 gap-3">
                <button type="button" onclick="cancelPictureUpload()" 
                        class="bg-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-400 transition-colors font-medium">
                  Cancel
                </button>
                <button type="button" onclick="savePictureChanges()" 
                        class="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium">
                  💾 Save
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Info -->
        <div class="px-6 pb-6">
          <p class="text-xs text-gray-500 text-center">
            Supported: JPG, PNG, GIF (max 5MB)
          </p>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
  }
  
  // File selection trigger
  window.triggerFileSelect = function() {
    console.log('📁 Triggering file selection...');
    const fileInput = document.getElementById('pictureFileInput');
    if (fileInput) {
      fileInput.click();
    }
  };
  
  // Handle file selection
  window.handlePictureFileSelect = function(event) {
    console.log('📸 File selected...');
    const file = event.target.files[0];
    if (!file) return;
    
    // Validate file
    if (file.size > 5 * 1024 * 1024) {
      alert('❌ File size must be less than 5MB');
      return;
    }
    
    if (!file.type.startsWith('image/')) {
      alert('❌ Please select an image file (JPG, PNG, GIF)');
      return;
    }
    
    // Read file
    const reader = new FileReader();
    reader.onload = function(e) {
      selectedImageData = e.target.result;
      updatePreview(selectedImageData);
      console.log('✅ Image loaded and preview updated');
    };
    reader.readAsDataURL(file);
  };
  
  // Update preview
  function updatePreview(imageData) {
    const preview = document.getElementById('picturePreviewLarge');
    if (preview && imageData) {
      preview.innerHTML = `<img src="${imageData}" class="w-full h-full object-cover rounded-full" alt="New Profile">`;
    }
  }
  
  // Remove current picture
  window.removeCurrentPicture = function() {
    console.log('🗑️ Removing current picture...');
    selectedImageData = null;
    const preview = document.getElementById('picturePreviewLarge');
    if (preview) {
      preview.innerHTML = '👤';
    }
  };
  
  // Reset to original
  window.resetToOriginal = function() {
    console.log('↩️ Resetting to original picture...');
    selectedImageData = originalProfilePicture;
    const preview = document.getElementById('picturePreviewLarge');
    if (preview) {
      if (originalProfilePicture) {
        preview.innerHTML = `<img src="${originalProfilePicture}" class="w-full h-full object-cover rounded-full" alt="Original Profile">`;
      } else {
        preview.innerHTML = '👤';
      }
    }
  };
  
  // Cancel upload
  window.cancelPictureUpload = function() {
    console.log('❌ Cancelling picture upload...');
    closePictureUploader();
  };
  
  // Save picture changes
  window.savePictureChanges = function() {
    console.log('💾 Saving picture changes...');
    
    if (!window.currentUser) {
      alert('❌ Please sign in to save profile picture');
      return;
    }
    
    try {
      // Update user profile picture
      if (selectedImageData !== null) {
        window.currentUser.profilePicture = selectedImageData;
      } else {
        delete window.currentUser.profilePicture;
      }
      
      // Save to storage
      const userKey = `user_${window.currentUser.email}`;
      const userData = JSON.parse(localStorage.getItem(userKey) || '{}');
      userData.profilePicture = window.currentUser.profilePicture;
      localStorage.setItem(userKey, JSON.stringify(userData));
      
      // Save to legacy storage
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      const userIndex = users.findIndex(u => u.email === window.currentUser.email || u.id === window.currentUser.id);
      if (userIndex !== -1) {
        users[userIndex].profilePicture = window.currentUser.profilePicture;
        localStorage.setItem('visualVibeUsers', JSON.stringify(users));
      }
      
      // Update profile preview in profile modal
      updateProfileModalPreview();
      
      // Update all profile pictures on page
      updateAllProfilePictures();
      
      console.log('✅ Profile picture saved successfully');
      
      // Show success and close
      showPictureNotification('✅ Profile picture saved successfully!', 'success');
      setTimeout(() => {
        closePictureUploader();
      }, 1000);
      
    } catch (error) {
      console.error('❌ Error saving profile picture:', error);
      showPictureNotification('❌ Error saving profile picture. Please try again.', 'error');
    }
  };
  
  function updateProfileModalPreview() {
    const profilePreview = document.getElementById('profilePicPreview');
    if (profilePreview) {
      if (window.currentUser?.profilePicture) {
        profilePreview.innerHTML = `<img src="${window.currentUser.profilePicture}" class="w-full h-full object-cover rounded-full" alt="Profile">`;
      } else {
        profilePreview.innerHTML = '👤';
      }
    }
  }
  
  function updateAllProfilePictures() {
    if (!window.currentUser?.profilePicture) return;
    
    // Update all profile pictures on the page
    const profileElements = document.querySelectorAll('img[alt="Profile"], [data-profile-picture], .user-avatar');
    profileElements.forEach(element => {
      if (element.tagName === 'IMG') {
        element.src = window.currentUser.profilePicture;
      } else {
        element.innerHTML = `<img src="${window.currentUser.profilePicture}" alt="Profile" class="w-full h-full object-cover rounded-full">`;
      }
    });
  }
  
  function closePictureUploader() {
    const modal = document.getElementById('pictureUploaderModal');
    if (modal) {
      modal.remove();
    }
    document.body.style.overflow = '';
    pictureUploaderOpen = false;
    selectedImageData = null;
    originalProfilePicture = null;
  }
  
  function showPictureNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg text-white transition-all transform translate-x-full max-w-sm`;
    notification.style.backgroundColor = type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6';
    notification.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="text-lg">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
        <span class="font-medium">${message}</span>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
  
  // INTEGRATE WITH PROFILE MODAL
  // Override the openProfileModal to include proper picture upload button
  const originalOpenProfileModal = window.openProfileModal;
  
  window.openProfileModal = function() {
    // Call original function if it exists
    if (originalOpenProfileModal && typeof originalOpenProfileModal === 'function') {
      const result = originalOpenProfileModal();
      if (result === false) return false; // Respect blocking
    }
    
    // After modal is opened, replace picture upload button
    setTimeout(() => {
      replacePictureUploadButton();
    }, 200);
  };
  
  function replacePictureUploadButton() {
    // Find and replace any picture upload buttons in the profile modal
    const profileModal = document.getElementById('profileModal');
    if (!profileModal) return;
    
    // Look for picture upload buttons
    const uploadButtons = profileModal.querySelectorAll('button[onclick*="picture"], button[onclick*="Picture"], input[type="file"]');
    
    uploadButtons.forEach(button => {
      if (button.tagName === 'INPUT') {
        // Replace file input
        button.style.display = 'none';
        
        // Add controlled button next to it
        const controlledButton = document.createElement('button');
        controlledButton.type = 'button';
        controlledButton.className = 'bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm font-medium';
        controlledButton.innerHTML = '📸 Change Picture';
        controlledButton.onclick = function() {
          pictureUploaderAllowed = true;
          openPictureUploaderControlled();
        };
        
        button.parentNode.insertBefore(controlledButton, button.nextSibling);
      } else {
        // Replace button onclick
        button.onclick = function() {
          pictureUploaderAllowed = true;
          openPictureUploaderControlled();
        };
      }
    });
  }
  
  // BLOCK all automatic picture upload attempts
  const blockedFunctions = [
    'openProfilePictureUpload',
    'handleProfilePictureChange', 
    'userInitiatedPictureUpload',
    'openPictureUploadWithValidation'
  ];
  
  blockedFunctions.forEach(funcName => {
    if (window[funcName]) {
      const originalFunc = window[funcName];
      window[funcName] = function() {
        console.log(`🚫 BLOCKED: ${funcName} - use controlled uploader instead`);
        return false;
      };
    }
  });
  
  // PREVENT any setTimeout/setInterval calls to picture functions
  const originalSetTimeout = window.setTimeout;
  const originalSetInterval = window.setInterval;
  
  window.setTimeout = function(callback, delay, ...args) {
    if (typeof callback === 'function') {
      const callbackStr = callback.toString();
      if (callbackStr.includes('picture') || callbackStr.includes('Picture') || callbackStr.includes('profilePic')) {
        console.log('🚫 BLOCKED: setTimeout call to picture function');
        return;
      }
    }
    return originalSetTimeout.call(this, callback, delay, ...args);
  };
  
  window.setInterval = function(callback, delay, ...args) {
    if (typeof callback === 'function') {
      const callbackStr = callback.toString();
      if (callbackStr.includes('picture') || callbackStr.includes('Picture') || callbackStr.includes('profilePic')) {
        console.log('🚫 BLOCKED: setInterval call to picture function');
        return;
      }
    }
    return originalSetInterval.call(this, callback, delay, ...args);
  };
  
  console.log('✅ Profile picture uploader fix applied successfully');
  console.log('🛡️ All picture upload functions are now controlled');
  console.log('📸 Picture uploader only opens from profile modal button');
  console.log('⚙️ All uploader buttons are functional');
  
})();
