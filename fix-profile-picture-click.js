// Fix profile picture click functionality in edit profile modal
console.log('📸 Loading profile picture click fix...');

function setupProfilePictureClick() {
  console.log('🖼️ Setting up profile picture click functionality...');
  
  // Wait for modal to exist
  const checkForModal = setInterval(() => {
    const modal = document.getElementById('profileModal');
    
    if (modal) {
      clearInterval(checkForModal);
      
      // Find profile picture elements
      const profilePictureArea = modal.querySelector('.w-20.h-20') || 
                               modal.querySelector('[id*="profile"]') ||
                               modal.querySelector('.rounded-full');
      
      const editButton = modal.querySelector('button[type="button"]') ||
                        modal.querySelector('.absolute.bottom-0.right-0');
      
      console.log('Profile picture area found:', !!profilePictureArea);
      console.log('Edit button found:', !!editButton);
      
      if (profilePictureArea) {
        setupProfilePictureClickHandler(profilePictureArea);
      }
      
      if (editButton) {
        setupEditButtonClickHandler(editButton);
      }
      
      // Also create file input for image upload
      createFileInputForProfilePicture();
    }
  }, 500);
  
  // Stop checking after 10 seconds
  setTimeout(() => {
    clearInterval(checkForModal);
  }, 10000);
}

function setupProfilePictureClickHandler(profilePictureArea) {
  console.log('🖼️ Setting up profile picture click handler...');
  
  try {
    // Make it clearly clickable
    profilePictureArea.style.cursor = 'pointer';
    profilePictureArea.style.transition = 'all 0.3s ease';
    
    // Add hover effect
    profilePictureArea.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
      this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
    });
    
    profilePictureArea.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
      this.style.boxShadow = '';
    });
    
    // Add click handler
    profilePictureArea.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('📸 Profile picture area clicked');
      handleProfilePictureClick();
    });
    
    console.log('✅ Profile picture click handler setup complete');
    
  } catch (error) {
    console.error('❌ Error setting up profile picture click handler:', error);
  }
}

function setupEditButtonClickHandler(editButton) {
  console.log('✏️ Setting up edit button click handler...');
  
  try {
    // Make sure it's clickable
    editButton.style.cursor = 'pointer';
    
    // Clear any existing handlers
    editButton.onclick = null;
    
    // Add click handler
    editButton.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('✏️ Edit button clicked');
      handleProfilePictureClick();
    });
    
    console.log('✅ Edit button click handler setup complete');
    
  } catch (error) {
    console.error('❌ Error setting up edit button click handler:', error);
  }
}

function createFileInputForProfilePicture() {
  console.log('📁 Creating file input for profile picture...');
  
  try {
    // Remove existing file input if it exists
    const existingInput = document.getElementById('profilePictureInput');
    if (existingInput) {
      existingInput.remove();
    }
    
    // Create hidden file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.id = 'profilePictureInput';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    
    // Add change handler
    fileInput.addEventListener('change', function(e) {
      handleProfilePictureUpload(e);
    });
    
    // Append to body
    document.body.appendChild(fileInput);
    
    console.log('✅ File input created successfully');
    
  } catch (error) {
    console.error('❌ Error creating file input:', error);
  }
}

function handleProfilePictureClick() {
  console.log('📸 Handling profile picture click...');
  
  try {
    // Show options modal
    showProfilePictureOptions();
    
  } catch (error) {
    console.error('❌ Error handling profile picture click:', error);
  }
}

function showProfilePictureOptions() {
  console.log('📋 Showing profile picture options...');
  
  try {
    // Create options modal
    const optionsModal = document.createElement('div');
    optionsModal.id = 'profilePictureOptionsModal';
    optionsModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4';
    
    optionsModal.innerHTML = `
      <div class="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl">
        <h3 class="text-xl font-bold text-gray-800 mb-4 text-center">Change Profile Picture</h3>
        
        <div class="space-y-3">
          <button id="uploadNewPicture" class="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
            <span>📁</span>
            <span>Upload New Picture</span>
          </button>
          
          <button id="useInitials" class="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white py-3 px-4 rounded-lg hover:from-green-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
            <span>🔤</span>
            <span>Use Initials (Default)</span>
          </button>
          
          <button id="randomAvatar" class="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 px-4 rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
            <span>🎲</span>
            <span>Random Avatar</span>
          </button>
          
          <button id="cancelPictureChange" class="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(optionsModal);
    
    // Setup button handlers
    setupProfilePictureOptionHandlers(optionsModal);
    
    // Animate in
    optionsModal.style.opacity = '0';
    setTimeout(() => {
      optionsModal.style.transition = 'opacity 0.3s ease';
      optionsModal.style.opacity = '1';
    }, 10);
    
    console.log('✅ Profile picture options modal shown');
    
  } catch (error) {
    console.error('❌ Error showing profile picture options:', error);
  }
}

function setupProfilePictureOptionHandlers(modal) {
  console.log('🔗 Setting up profile picture option handlers...');
  
  try {
    // Upload new picture
    const uploadBtn = modal.querySelector('#uploadNewPicture');
    uploadBtn.addEventListener('click', function() {
      closeProfilePictureOptionsModal();
      triggerFileUpload();
    });
    
    // Use initials
    const initialsBtn = modal.querySelector('#useInitials');
    initialsBtn.addEventListener('click', function() {
      closeProfilePictureOptionsModal();
      resetToInitials();
    });
    
    // Random avatar
    const randomBtn = modal.querySelector('#randomAvatar');
    randomBtn.addEventListener('click', function() {
      closeProfilePictureOptionsModal();
      setRandomAvatar();
    });
    
    // Cancel
    const cancelBtn = modal.querySelector('#cancelPictureChange');
    cancelBtn.addEventListener('click', function() {
      closeProfilePictureOptionsModal();
    });
    
    // Click outside to close
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeProfilePictureOptionsModal();
      }
    });
    
    console.log('✅ Profile picture option handlers setup complete');
    
  } catch (error) {
    console.error('❌ Error setting up option handlers:', error);
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

function triggerFileUpload() {
  console.log('📁 Triggering file upload...');
  
  const fileInput = document.getElementById('profilePictureInput');
  if (fileInput) {
    fileInput.click();
  } else {
    console.error('❌ File input not found');
  }
}

function handleProfilePictureUpload(event) {
  console.log('📤 Handling profile picture upload...');
  
  try {
    const file = event.target.files[0];
    if (!file) {
      console.log('No file selected');
      return;
    }
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      if (window.toastManager) {
        window.toastManager.error('Please select an image file', { duration: 3000 });
      } else {
        alert('Please select an image file');
      }
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      if (window.toastManager) {
        window.toastManager.error('Image must be smaller than 5MB', { duration: 3000 });
      } else {
        alert('Image must be smaller than 5MB');
      }
      return;
    }
    
    // Read and display the image
    const reader = new FileReader();
    reader.onload = function(e) {
      const imageUrl = e.target.result;
      updateProfilePictureDisplay(imageUrl);
      
      // Save to localStorage
      localStorage.setItem('profilePictureUrl', imageUrl);
      
      if (window.toastManager) {
        window.toastManager.success('Profile picture updated!', { duration: 3000 });
      }
    };
    
    reader.readAsDataURL(file);
    
  } catch (error) {
    console.error('❌ Error handling file upload:', error);
    
    if (window.toastManager) {
      window.toastManager.error('Error uploading image', { duration: 3000 });
    } else {
      alert('Error uploading image');
    }
  }
}

function updateProfilePictureDisplay(imageUrl) {
  console.log('🖼️ Updating profile picture display...');
  
  try {
    const profilePictureArea = document.querySelector('#profileModal .w-20.h-20');
    if (profilePictureArea) {
      // Replace initials with image
      profilePictureArea.innerHTML = `
        <img src="${imageUrl}" alt="Profile Picture" class="w-full h-full object-cover rounded-full border-2 border-white shadow-lg">
      `;
      
      console.log('✅ Profile picture display updated');
    }
  } catch (error) {
    console.error('❌ Error updating profile picture display:', error);
  }
}

function resetToInitials() {
  console.log('🔤 Resetting to initials...');
  
  try {
    // Remove saved profile picture
    localStorage.removeItem('profilePictureUrl');
    
    // Get user's name for initials
    const fullName = document.getElementById('profileFullName')?.value || 
                    JSON.parse(localStorage.getItem('visualVibeProfile') || '{}').fullName || 
                    'Visual Studio';
    
    const names = fullName.trim().split(' ').filter(name => name.length > 0);
    let initials = 'VS';
    
    if (names.length >= 2) {
      initials = (names[0][0] + names[names.length - 1][0]).toUpperCase();
    } else if (names.length === 1 && names[0].length >= 1) {
      initials = names[0].substring(0, Math.min(2, names[0].length)).toUpperCase();
    }
    
    // Update display
    const profilePictureArea = document.querySelector('#profileModal .w-20.h-20');
    if (profilePictureArea) {
      profilePictureArea.innerHTML = `
        <span class="text-2xl font-bold text-white">${initials}</span>
      `;
    }
    
    if (window.toastManager) {
      window.toastManager.success('Reset to initials!', { duration: 2000 });
    }
    
    console.log('✅ Reset to initials complete');
    
  } catch (error) {
    console.error('❌ Error resetting to initials:', error);
  }
}

function setRandomAvatar() {
  console.log('🎲 Setting random avatar...');
  
  try {
    // Array of fun avatar URLs or emoji combinations
    const avatars = [
      'https://api.dicebear.com/7.x/avataaars/svg?seed=random1',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=random2',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=random3',
      'https://api.dicebear.com/7.x/personas/svg?seed=random1',
      'https://api.dicebear.com/7.x/personas/svg?seed=random2'
    ];
    
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
    
    updateProfilePictureDisplay(randomAvatar);
    localStorage.setItem('profilePictureUrl', randomAvatar);
    
    if (window.toastManager) {
      window.toastManager.success('Random avatar set!', { duration: 2000 });
    }
    
    console.log('✅ Random avatar set');
    
  } catch (error) {
    console.error('❌ Error setting random avatar:', error);
  }
}

// Override openProfileModal to include picture functionality
function enhanceOpenProfileModalWithPicture() {
  const originalOpenProfileModal = window.openProfileModal;
  
  window.openProfileModal = function() {
    console.log('👤 Enhanced openProfileModal with picture functionality...');
    
    // Call original function
    if (typeof originalOpenProfileModal === 'function') {
      originalOpenProfileModal();
    }
    
    // Setup picture functionality after modal opens
    setTimeout(() => {
      setupProfilePictureClick();
      loadSavedProfilePicture();
    }, 300);
  };
}

function loadSavedProfilePicture() {
  console.log('💾 Loading saved profile picture...');
  
  try {
    const savedPictureUrl = localStorage.getItem('profilePictureUrl');
    if (savedPictureUrl) {
      updateProfilePictureDisplay(savedPictureUrl);
    }
  } catch (error) {
    console.error('❌ Error loading saved profile picture:', error);
  }
}

// Initialize the fix
function initializeProfilePictureClickFix() {
  console.log('🚀 Initializing profile picture click fix...');
  
  // Enhance the openProfileModal function
  enhanceOpenProfileModalWithPicture();
  
  // Also setup for any existing modal
  setupProfilePictureClick();
  
  console.log('✅ Profile picture click fix initialized');
}

// Test function
window.testProfilePictureClick = function() {
  console.log('🧪 Testing profile picture click functionality...');
  
  if (typeof window.openProfileModal === 'function') {
    window.openProfileModal();
    
    setTimeout(() => {
      const profileArea = document.querySelector('#profileModal .w-20.h-20');
      console.log('Profile picture area found:', !!profileArea);
      
      if (profileArea) {
        console.log('Cursor style:', profileArea.style.cursor);
        console.log('Click handlers attached:', !!profileArea.onclick || profileArea.hasAttribute('onclick'));
      }
    }, 1000);
  }
};

// Initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeProfilePictureClickFix);
} else {
  initializeProfilePictureClickFix();
}

setTimeout(initializeProfilePictureClickFix, 1000);

console.log('📸 Profile picture click fix loaded - profile picture should now be clickable');
