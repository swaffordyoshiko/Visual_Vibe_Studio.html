// Auto-save profile functionality - saves without closing modal
console.log('💾 Loading auto-save profile functionality...');

function initializeAutoSaveProfile() {
  console.log('🚀 Initializing auto-save profile system...');
  
  // Enhance the existing profile functionality with auto-save
  enhanceProfileModalWithAutoSave();
  
  // Add save indicators and feedback
  addSaveIndicators();
  
  console.log('✅ Auto-save profile system initialized');
}

function enhanceProfileModalWithAutoSave() {
  console.log('📝 Enhancing profile modal with auto-save...');
  
  try {
    // Store original function
    const originalOpenProfileModal = window.openProfileModal;
    
    // Enhanced version with auto-save
    window.openProfileModal = function() {
      console.log('👤 Opening profile modal with auto-save...');
      
      // Call original function
      if (typeof originalOpenProfileModal === 'function') {
        originalOpenProfileModal();
        
        // Add auto-save after modal opens
        setTimeout(() => {
          setupAutoSave();
          addSaveWithoutCloseButton();
          setupAutoSaveIndicators();
        }, 300);
      }
    };
    
    console.log('✅ Profile modal enhanced with auto-save');
  } catch (error) {
    console.error('❌ Error enhancing profile modal:', error);
  }
}

function setupAutoSave() {
  console.log('⚡ Setting up auto-save functionality...');
  
  try {
    const form = document.getElementById('profileForm');
    if (!form) {
      console.warn('⚠️ Profile form not found');
      return;
    }
    
    // Get all form inputs
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
      // Add auto-save on input change with debounce
      let saveTimeout;
      
      const autoSave = () => {
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => {
          saveProfileDataSilently();
        }, 1000); // Save 1 second after user stops typing
      };
      
      input.addEventListener('input', autoSave);
      input.addEventListener('change', autoSave);
      input.addEventListener('blur', () => {
        // Save immediately when field loses focus
        clearTimeout(saveTimeout);
        saveProfileDataSilently();
      });
    });
    
    console.log('✅ Auto-save event listeners attached to form inputs');
  } catch (error) {
    console.error('❌ Error setting up auto-save:', error);
  }
}

function saveProfileDataSilently() {
  console.log('💾 Auto-saving profile data...');
  
  try {
    if (!window.currentUser) {
      console.warn('⚠️ No current user for auto-save');
      return false;
    }
    
    // Get form data
    const firstName = document.getElementById('profileFirstName')?.value?.trim() || '';
    const lastName = document.getElementById('profileLastName')?.value?.trim() || '';
    const email = document.getElementById('profileEmail')?.value?.trim() || '';
    const phone = document.getElementById('profilePhone')?.value?.trim() || '';
    const companyName = document.getElementById('profileCompanyName')?.value?.trim() || '';
    
    // Basic validation - only save if required fields are present
    if (!firstName || !lastName || !email) {
      console.log('ℹ️ Skipping auto-save - required fields missing');
      showSaveIndicator('pending', 'Fill in required fields to save');
      return false;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('ℹ️ Skipping auto-save - invalid email format');
      showSaveIndicator('error', 'Invalid email format');
      return false;
    }
    
    // Get users array
    const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
    const userIndex = users.findIndex(u => u.id === window.currentUser.id);
    
    if (userIndex === -1) {
      console.error('❌ User not found for auto-save');
      showSaveIndicator('error', 'User not found');
      return false;
    }
    
    // Check if email is changed and if new email already exists
    const currentUser = users[userIndex];
    if (email.toLowerCase() !== currentUser.email.toLowerCase()) {
      const emailExists = users.some((u, index) =>
        index !== userIndex && u.email.toLowerCase() === email.toLowerCase()
      );
      
      if (emailExists) {
        console.log('ℹ️ Skipping auto-save - email already exists');
        showSaveIndicator('error', 'Email already in use');
        return false;
      }
    }
    
    // Update user data
    const updatedUser = {
      ...currentUser,
      firstName: firstName,
      lastName: lastName,
      companyName: companyName,
      phone: phone,
      email: email,
      name: `${firstName} ${lastName}`,
      updatedAt: new Date().toISOString()
    };
    
    users[userIndex] = updatedUser;
    
    // Save to localStorage
    localStorage.setItem('visualVibeUsers', JSON.stringify(users));
    
    // Update current user session
    window.currentUser = {
      ...window.currentUser,
      name: updatedUser.name,
      email: updatedUser.email,
      lastActivity: new Date().toISOString()
    };
    
    if (typeof saveUserSession === 'function') {
      saveUserSession(window.currentUser);
    } else {
      localStorage.setItem('visualVibeUser', JSON.stringify(window.currentUser));
    }
    
    // Update UI if function exists
    if (typeof updateAuthUI === 'function') {
      updateAuthUI();
    }
    
    // Show success indicator
    showSaveIndicator('success', 'Profile saved automatically');
    
    console.log('✅ Profile auto-saved successfully');
    return true;
    
  } catch (error) {
    console.error('❌ Error auto-saving profile:', error);
    showSaveIndicator('error', 'Auto-save failed');
    return false;
  }
}

function addSaveWithoutCloseButton() {
  console.log('🔘 Adding save without close button...');
  
  try {
    const form = document.getElementById('profileForm');
    if (!form) return;
    
    // Check if button already exists
    if (document.getElementById('saveWithoutCloseBtn')) {
      console.log('ℹ️ Save without close button already exists');
      return;
    }
    
    // Find the existing button container
    const buttonContainer = form.querySelector('.mt-8') || form.querySelector('[class*="flex"]');
    if (!buttonContainer) {
      console.warn('⚠️ Button container not found');
      return;
    }
    
    // Create save without close button
    const saveWithoutCloseBtn = document.createElement('button');
    saveWithoutCloseBtn.id = 'saveWithoutCloseBtn';
    saveWithoutCloseBtn.type = 'button';
    saveWithoutCloseBtn.className = 'flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2';
    saveWithoutCloseBtn.innerHTML = '💾 Save & Continue Editing';
    
    // Add click handler
    saveWithoutCloseBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('💾 Save & Continue button clicked');
      
      const saved = saveProfileDataSilently();
      if (saved) {
        // Show success message but keep modal open
        if (window.toastManager) {
          window.toastManager.success('Profile saved! You can continue editing.', { duration: 3000 });
        } else {
          showSaveIndicator('success', 'Profile saved! Continue editing.', 3000);
        }
      }
    });
    
    // Insert the button before the existing Save Changes button
    const existingSaveBtn = buttonContainer.querySelector('button[type="submit"]') ||
                           buttonContainer.querySelector('button');
    
    if (existingSaveBtn) {
      buttonContainer.insertBefore(saveWithoutCloseBtn, existingSaveBtn);
    } else {
      buttonContainer.appendChild(saveWithoutCloseBtn);
    }
    
    console.log('✅ Save without close button added');
  } catch (error) {
    console.error('❌ Error adding save without close button:', error);
  }
}

function setupAutoSaveIndicators() {
  console.log('📊 Setting up auto-save indicators...');
  
  try {
    const modal = document.getElementById('profileModal');
    if (!modal) return;
    
    // Check if indicator already exists
    if (modal.querySelector('#autoSaveIndicator')) {
      console.log('ℹ️ Auto-save indicator already exists');
      return;
    }
    
    // Find the modal header
    const header = modal.querySelector('.flex.justify-between.items-center') ||
                  modal.querySelector('h3')?.parentElement;
    
    if (!header) {
      console.warn('⚠️ Modal header not found');
      return;
    }
    
    // Create auto-save indicator
    const indicator = document.createElement('div');
    indicator.id = 'autoSaveIndicator';
    indicator.className = 'flex items-center space-x-2 text-sm';
    indicator.innerHTML = `
      <div id="saveStatus" class="flex items-center space-x-1">
        <div id="saveIcon" class="w-3 h-3 rounded-full bg-gray-300"></div>
        <span id="saveText" class="text-gray-500">Auto-save enabled</span>
      </div>
    `;
    
    // Add to header
    header.appendChild(indicator);
    
    console.log('✅ Auto-save indicator added');
  } catch (error) {
    console.error('❌ Error setting up auto-save indicators:', error);
  }
}

function showSaveIndicator(status, message, duration = 2000) {
  try {
    const saveIcon = document.getElementById('saveIcon');
    const saveText = document.getElementById('saveText');
    
    if (!saveIcon || !saveText) return;
    
    // Update indicator based on status
    switch (status) {
      case 'saving':
        saveIcon.className = 'w-3 h-3 rounded-full bg-blue-500 animate-pulse';
        saveText.textContent = 'Saving...';
        saveText.className = 'text-blue-600';
        break;
        
      case 'success':
        saveIcon.className = 'w-3 h-3 rounded-full bg-green-500';
        saveText.textContent = message || 'Saved';
        saveText.className = 'text-green-600';
        break;
        
      case 'error':
        saveIcon.className = 'w-3 h-3 rounded-full bg-red-500';
        saveText.textContent = message || 'Save failed';
        saveText.className = 'text-red-600';
        break;
        
      case 'pending':
        saveIcon.className = 'w-3 h-3 rounded-full bg-yellow-500';
        saveText.textContent = message || 'Waiting...';
        saveText.className = 'text-yellow-600';
        break;
        
      default:
        saveIcon.className = 'w-3 h-3 rounded-full bg-gray-300';
        saveText.textContent = 'Auto-save enabled';
        saveText.className = 'text-gray-500';
    }
    
    // Reset to default after duration
    if (status !== 'saving' && status !== 'pending') {
      setTimeout(() => {
        saveIcon.className = 'w-3 h-3 rounded-full bg-gray-300';
        saveText.textContent = 'Auto-save enabled';
        saveText.className = 'text-gray-500';
      }, duration);
    }
    
  } catch (error) {
    console.error('❌ Error showing save indicator:', error);
  }
}

function addSaveIndicators() {
  console.log('📍 Adding save indicators...');
  
  // Enhanced version of existing profile modal with better save feedback
  window.showSaveIndicator = showSaveIndicator;
  
  // Add visual feedback for form changes
  window.markFormAsChanged = function() {
    const modal = document.getElementById('profileModal');
    if (modal) {
      modal.classList.add('form-changed');
      showSaveIndicator('pending', 'Unsaved changes');
    }
  };
  
  window.markFormAsSaved = function() {
    const modal = document.getElementById('profileModal');
    if (modal) {
      modal.classList.remove('form-changed');
      showSaveIndicator('success', 'All changes saved');
    }
  };
}

// Enhanced manual save function that doesn't close modal
window.saveProfileAndContinue = function() {
  console.log('💾 Manual save and continue...');
  
  showSaveIndicator('saving', 'Saving...');
  
  const saved = saveProfileDataSilently();
  if (saved) {
    if (window.toastManager) {
      window.toastManager.success('✅ Profile saved! You can continue editing.', { duration: 3000 });
    } else {
      alert('Profile saved successfully! You can continue editing.');
    }
  }
  
  return saved;
};

// Test function
window.testAutoSaveProfile = function() {
  console.log('🧪 Testing auto-save profile functionality...');
  
  const tests = [
    {
      name: 'Auto-save setup',
      test: () => typeof setupAutoSave === 'function'
    },
    {
      name: 'Silent save function',
      test: () => typeof saveProfileDataSilently === 'function'
    },
    {
      name: 'Save indicators',
      test: () => typeof showSaveIndicator === 'function'
    },
    {
      name: 'Save and continue function',
      test: () => typeof window.saveProfileAndContinue === 'function'
    }
  ];
  
  tests.forEach((test, index) => {
    try {
      const result = test.test();
      console.log(`Test ${index + 1}: ${test.name} - ${result ? '✅ PASS' : '❌ FAIL'}`);
    } catch (error) {
      console.log(`Test ${index + 1}: ${test.name} - ❌ ERROR: ${error.message}`);
    }
  });
};

// Initialize when DOM is ready
function initialize() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAutoSaveProfile);
  } else {
    initializeAutoSaveProfile();
  }
}

// Initialize with delay to ensure other scripts load first
setTimeout(initialize, 2000);

console.log('💾 Auto-save profile functionality loaded');
