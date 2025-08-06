// Fix profile modal button functionality - Save Changes and Cancel buttons
console.log('🔘 Loading profile modal button fix...');

function fixProfileModalButtons() {
  console.log('🔧 Fixing profile modal button functionality...');
  
  // Override the openProfileModal function to ensure buttons work
  const originalOpenProfileModal = window.openProfileModal;
  
  window.openProfileModal = function() {
    console.log('👤 Enhanced openProfileModal with working buttons...');
    
    try {
      // Call original function or create modal if it doesn't exist
      if (typeof originalOpenProfileModal === 'function') {
        originalOpenProfileModal();
      } else {
        createProfileModalWithWorkingButtons();
      }
      
      // Ensure buttons work after modal is created
      setTimeout(() => {
        setupProfileModalButtonHandlers();
      }, 300);
      
    } catch (error) {
      console.error('❌ Error in enhanced openProfileModal:', error);
      // Fallback: create modal directly
      createProfileModalWithWorkingButtons();
    }
  };
}

function createProfileModalWithWorkingButtons() {
  console.log('🆕 Creating profile modal with working buttons...');
  
  try {
    // Remove existing modal if it exists
    const existingModal = document.getElementById('profileModal');
    if (existingModal) {
      existingModal.remove();
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.id = 'profileModal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.style.display = 'flex';
    
    modal.innerHTML = `
      <div class="bg-white rounded-xl max-w-md w-full max-h-[90vh] flex flex-col shadow-2xl">
        <!-- Fixed Header -->
        <div class="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
          <h3 class="text-xl sm:text-2xl font-bold text-gray-800">Edit Profile</h3>
          <button id="profileModalCloseBtn" class="text-gray-500 hover:text-gray-700 p-2 -m-2 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <!-- Scrollable Content -->
        <div class="flex-1 overflow-y-auto p-4 sm:p-6">
          <form id="profileForm">
            <!-- Profile Picture Section -->
            <div class="text-center mb-6">
              <div class="relative inline-block">
                <div class="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
                  <span id="profileInitials">VS</span>
                </div>
                <button type="button" class="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                  </svg>
                </button>
              </div>
              <p class="text-sm text-gray-500">Click to change profile picture</p>
            </div>

            <!-- Personal Information -->
            <div class="space-y-4">
              <div>
                <label for="profileFullName" class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" id="profileFullName" name="fullName" 
                       class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                       placeholder="Your full name">
              </div>
              
              <div>
                <label for="profileEmail" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" id="profileEmail" name="email" 
                       class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                       placeholder="your@email.com">
              </div>
              
              <div>
                <label for="profilePhone" class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input type="tel" id="profilePhone" name="phone" 
                       class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                       placeholder="(123) 456-7890">
              </div>
              
              <div>
                <label for="profileCompany" class="block text-sm font-medium text-gray-700 mb-1">Company/Organization</label>
                <input type="text" id="profileCompany" name="company" 
                       class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                       placeholder="Company name (optional)">
              </div>
              
              <div>
                <label for="profileLocation" class="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input type="text" id="profileLocation" name="location" 
                       class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                       placeholder="City, State/Country">
              </div>
            </div>

            <!-- Preferences -->
            <div class="mt-6 pt-6 border-t border-gray-200">
              <h4 class="text-lg font-semibold text-gray-800 mb-4">Preferences</h4>
              
              <div class="space-y-3">
                <label class="flex items-center cursor-pointer">
                  <input type="checkbox" id="emailNotifications" name="emailNotifications" 
                         class="rounded border-gray-300 text-purple-600 focus:ring-purple-500 transition-colors">
                  <span class="ml-2 text-sm text-gray-700">Email notifications</span>
                </label>
                
                <label class="flex items-center cursor-pointer">
                  <input type="checkbox" id="smsNotifications" name="smsNotifications" 
                         class="rounded border-gray-300 text-purple-600 focus:ring-purple-500 transition-colors">
                  <span class="ml-2 text-sm text-gray-700">SMS notifications</span>
                </label>
                
                <label class="flex items-center cursor-pointer">
                  <input type="checkbox" id="marketingEmails" name="marketingEmails" 
                         class="rounded border-gray-300 text-purple-600 focus:ring-purple-500 transition-colors">
                  <span class="ml-2 text-sm text-gray-700">Marketing emails</span>
                </label>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="mt-8 flex flex-col sm:flex-row gap-3">
              <button type="button" id="saveProfileBtn" 
                      class="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                💾 Save Changes
              </button>
              <button type="button" id="cancelProfileBtn" 
                      class="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
                ❌ Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Disable body scroll
    document.body.style.overflow = 'hidden';
    
    // Animate in
    modal.style.opacity = '0';
    modal.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
      modal.style.transition = 'all 0.3s ease';
      modal.style.opacity = '1';
      modal.style.transform = 'scale(1)';
    }, 10);
    
    console.log('✅ Profile modal created with working buttons');
    
    // Setup button handlers immediately
    setupProfileModalButtonHandlers();
    
    // Load existing data
    setTimeout(() => {
      loadProfileDataSafely();
    }, 200);
    
  } catch (error) {
    console.error('❌ Error creating profile modal:', error);
  }
}

function setupProfileModalButtonHandlers() {
  console.log('🔗 Setting up profile modal button handlers...');
  
  try {
    // Save Changes button
    const saveBtn = document.getElementById('saveProfileBtn');
    if (saveBtn) {
      // Remove existing listeners
      saveBtn.onclick = null;
      
      // Add new click handler
      saveBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('💾 Save Changes button clicked');
        handleProfileSave();
      });
      
      console.log('✅ Save button handler attached');
    } else {
      console.warn('⚠️ Save button not found');
    }
    
    // Cancel button
    const cancelBtn = document.getElementById('cancelProfileBtn');
    if (cancelBtn) {
      // Remove existing listeners
      cancelBtn.onclick = null;
      
      // Add new click handler
      cancelBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('❌ Cancel button clicked');
        handleProfileCancel();
      });
      
      console.log('✅ Cancel button handler attached');
    } else {
      console.warn('⚠️ Cancel button not found');
    }
    
    // Close button (X)
    const closeBtn = document.getElementById('profileModalCloseBtn');
    if (closeBtn) {
      closeBtn.onclick = null;
      
      closeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('✖️ Close button clicked');
        handleProfileCancel();
      });
      
      console.log('✅ Close button handler attached');
    }
    
    // Form submission handler (backup)
    const form = document.getElementById('profileForm');
    if (form) {
      form.onsubmit = function(e) {
        e.preventDefault();
        console.log('📝 Form submitted via enter key');
        handleProfileSave();
        return false;
      };
      
      console.log('✅ Form submission handler attached');
    }
    
  } catch (error) {
    console.error('❌ Error setting up button handlers:', error);
  }
}

function handleProfileSave() {
  console.log('💾 Handling profile save...');
  
  try {
    // Get form data
    const form = document.getElementById('profileForm');
    if (!form) {
      throw new Error('Profile form not found');
    }
    
    const formData = new FormData(form);
    const profileData = {
      fullName: document.getElementById('profileFullName')?.value || '',
      email: document.getElementById('profileEmail')?.value || '',
      phone: document.getElementById('profilePhone')?.value || '',
      company: document.getElementById('profileCompany')?.value || '',
      location: document.getElementById('profileLocation')?.value || '',
      emailNotifications: document.getElementById('emailNotifications')?.checked || false,
      smsNotifications: document.getElementById('smsNotifications')?.checked || false,
      marketingEmails: document.getElementById('marketingEmails')?.checked || false,
      lastUpdated: new Date().toISOString()
    };
    
    console.log('📊 Profile data to save:', profileData);
    
    // Save to localStorage
    localStorage.setItem('visualVibeProfile', JSON.stringify(profileData));
    
    // Update profile initials in the modal and elsewhere
    updateProfileInitialsEverywhere(profileData.fullName);
    
    // Show success message
    if (window.toastManager) {
      window.toastManager.success('Profile updated successfully! 🎉', { duration: 4000 });
    } else {
      alert('Profile updated successfully!');
    }
    
    // Close modal with success animation
    const modal = document.getElementById('profileModal');
    if (modal) {
      modal.style.transition = 'all 0.4s ease';
      modal.style.backgroundColor = 'rgba(34, 197, 94, 0.1)'; // Green tint
      
      setTimeout(() => {
        closeProfileModalCompletely();
      }, 500);
    }
    
    console.log('✅ Profile saved successfully');
    
  } catch (error) {
    console.error('❌ Error saving profile:', error);
    
    if (window.toastManager) {
      window.toastManager.error('Error saving profile. Please try again.', { duration: 4000 });
    } else {
      alert('Error saving profile. Please try again.');
    }
  }
}

function handleProfileCancel() {
  console.log('❌ Handling profile cancel...');
  
  try {
    // Ask for confirmation if there are unsaved changes
    const hasChanges = checkForUnsavedChanges();
    
    if (hasChanges) {
      const confirmCancel = confirm('You have unsaved changes. Are you sure you want to cancel?');
      if (!confirmCancel) {
        console.log('ℹ️ Cancel cancelled by user');
        return;
      }
    }
    
    closeProfileModalCompletely();
    
  } catch (error) {
    console.error('❌ Error handling cancel:', error);
    closeProfileModalCompletely(); // Force close anyway
  }
}

function checkForUnsavedChanges() {
  try {
    const savedProfile = JSON.parse(localStorage.getItem('visualVibeProfile') || '{}');
    
    const currentData = {
      fullName: document.getElementById('profileFullName')?.value || '',
      email: document.getElementById('profileEmail')?.value || '',
      phone: document.getElementById('profilePhone')?.value || '',
      company: document.getElementById('profileCompany')?.value || '',
      location: document.getElementById('profileLocation')?.value || ''
    };
    
    const savedData = {
      fullName: savedProfile.fullName || '',
      email: savedProfile.email || '',
      phone: savedProfile.phone || '',
      company: savedProfile.company || '',
      location: savedProfile.location || ''
    };
    
    return JSON.stringify(currentData) !== JSON.stringify(savedData);
    
  } catch (error) {
    console.error('❌ Error checking for changes:', error);
    return false;
  }
}

function closeProfileModalCompletely() {
  console.log('🚪 Closing profile modal completely...');
  
  try {
    const modal = document.getElementById('profileModal');
    if (modal) {
      // Animate out
      modal.style.transition = 'all 0.3s ease';
      modal.style.opacity = '0';
      modal.style.transform = 'scale(0.9)';
      
      setTimeout(() => {
        modal.remove();
        console.log('✅ Profile modal removed from DOM');
      }, 300);
    }
    
    // Restore body scroll
    document.body.style.overflow = '';
    
  } catch (error) {
    console.error('❌ Error closing modal:', error);
  }
}

function loadProfileDataSafely() {
  console.log('📊 Loading profile data safely...');
  
  try {
    const savedProfile = JSON.parse(localStorage.getItem('visualVibeProfile') || '{}');
    
    // Populate fields safely
    const fields = [
      { id: 'profileFullName', value: savedProfile.fullName },
      { id: 'profileEmail', value: savedProfile.email },
      { id: 'profilePhone', value: savedProfile.phone },
      { id: 'profileCompany', value: savedProfile.company },
      { id: 'profileLocation', value: savedProfile.location }
    ];
    
    fields.forEach(({ id, value }) => {
      const element = document.getElementById(id);
      if (element && value) {
        element.value = value;
      }
    });
    
    // Set checkboxes
    const checkboxes = [
      { id: 'emailNotifications', value: savedProfile.emailNotifications !== false },
      { id: 'smsNotifications', value: savedProfile.smsNotifications === true },
      { id: 'marketingEmails', value: savedProfile.marketingEmails !== false }
    ];
    
    checkboxes.forEach(({ id, value }) => {
      const element = document.getElementById(id);
      if (element) {
        element.checked = value;
      }
    });
    
    // Update initials
    updateProfileInitialsEverywhere(savedProfile.fullName);
    
    console.log('✅ Profile data loaded safely');
    
  } catch (error) {
    console.error('❌ Error loading profile data safely:', error);
  }
}

function updateProfileInitialsEverywhere(fullName) {
  try {
    let initials = 'VS';
    
    if (fullName && fullName.trim()) {
      const names = fullName.trim().split(' ').filter(name => name.length > 0);
      
      if (names.length >= 2) {
        initials = (names[0][0] + names[names.length - 1][0]).toUpperCase();
      } else if (names.length === 1 && names[0].length >= 1) {
        initials = names[0].substring(0, Math.min(2, names[0].length)).toUpperCase();
      }
    }
    
    // Update in modal
    const modalInitials = document.getElementById('profileInitials');
    if (modalInitials) {
      modalInitials.textContent = initials;
    }
    
    console.log(`✅ Updated initials to: ${initials}`);
    
  } catch (error) {
    console.error('❌ Error updating initials:', error);
  }
}

// Initialize the fix
function initializeProfileModalButtonFix() {
  console.log('🚀 Initializing profile modal button fix...');
  
  // Fix the openProfileModal function
  fixProfileModalButtons();
  
  // Make functions globally available
  window.handleProfileSave = handleProfileSave;
  window.handleProfileCancel = handleProfileCancel;
  window.closeProfileModalCompletely = closeProfileModalCompletely;
  
  console.log('✅ Profile modal button fix initialized');
}

// Test function
window.testProfileModalButtons = function() {
  console.log('🧪 Testing profile modal buttons...');
  
  if (typeof window.openProfileModal === 'function') {
    console.log('🔴 Opening profile modal for button test...');
    window.openProfileModal();
    
    setTimeout(() => {
      const saveBtn = document.getElementById('saveProfileBtn');
      const cancelBtn = document.getElementById('cancelProfileBtn');
      
      console.log('Save button found:', !!saveBtn);
      console.log('Cancel button found:', !!cancelBtn);
      
      if (saveBtn && cancelBtn) {
        console.log('✅ Both buttons are available and should work');
      } else {
        console.error('❌ Buttons not found');
      }
    }, 1000);
  } else {
    console.error('❌ openProfileModal function not available');
  }
};

// Initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeProfileModalButtonFix);
} else {
  initializeProfileModalButtonFix();
}

setTimeout(initializeProfileModalButtonFix, 1000);

console.log('🔘 Profile modal button fix loaded - Save Changes and Cancel buttons should now work');
