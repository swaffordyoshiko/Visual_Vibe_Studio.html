// Fix missing openProfileModal function
console.log('👤 Loading profile modal function fix...');

function createOpenProfileModalFunction() {
  // Define a robust openProfileModal function
  function openProfileModal() {
    console.log('👤 Opening profile modal...');
    
    try {
      // Check if modal already exists
      let modal = document.getElementById('profileModal');
      
      if (!modal) {
        // Modal creation disabled - handled by final-check.js to prevent duplication
        console.log('❌ Profile modal not found - should be created by final-check.js');
        return;
        
        modal.innerHTML = `
          <div class="bg-white rounded-xl max-w-md w-full max-h-[90vh] flex flex-col shadow-2xl">
            <!-- Fixed Header -->
            <div class="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
              <h3 class="text-xl sm:text-2xl font-bold text-gray-800">Edit Profile</h3>
              <button onclick="closeProfileModal()" class="text-gray-500 hover:text-gray-700 p-2 -m-2">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            
            <!-- Scrollable Content -->
            <div class="flex-1 overflow-y-auto p-4 sm:p-6">
              <form id="profileForm" onsubmit="handleProfileUpdate(event)">
                <!-- Profile Picture Section -->
                <div class="text-center mb-6">
                  <div class="relative inline-block">
                    <div class="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
                      <span id="profileInitials">VS</span>
                    </div>
                    <button type="button" class="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-lg border border-gray-200 hover:bg-gray-50">
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
                           class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                           placeholder="Your full name">
                  </div>
                  
                  <div>
                    <label for="profileEmail" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input type="email" id="profileEmail" name="email" 
                           class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                           placeholder="your@email.com">
                  </div>
                  
                  <div>
                    <label for="profilePhone" class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input type="tel" id="profilePhone" name="phone" 
                           class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                           placeholder="(123) 456-7890">
                  </div>
                  
                  <div>
                    <label for="profileCompany" class="block text-sm font-medium text-gray-700 mb-1">Company/Organization</label>
                    <input type="text" id="profileCompany" name="company" 
                           class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                           placeholder="Company name (optional)">
                  </div>
                  
                  <div>
                    <label for="profileLocation" class="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input type="text" id="profileLocation" name="location" 
                           class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                           placeholder="City, State/Country">
                  </div>
                </div>

                <!-- Preferences -->
                <div class="mt-6 pt-6 border-t border-gray-200">
                  <h4 class="text-lg font-semibold text-gray-800 mb-4">Preferences</h4>
                  
                  <div class="space-y-3">
                    <label class="flex items-center">
                      <input type="checkbox" id="emailNotifications" name="emailNotifications" class="rounded border-gray-300 text-purple-600 focus:ring-purple-500">
                      <span class="ml-2 text-sm text-gray-700">Email notifications</span>
                    </label>
                    
                    <label class="flex items-center">
                      <input type="checkbox" id="smsNotifications" name="smsNotifications" class="rounded border-gray-300 text-purple-600 focus:ring-purple-500">
                      <span class="ml-2 text-sm text-gray-700">SMS notifications</span>
                    </label>
                    
                    <label class="flex items-center">
                      <input type="checkbox" id="marketingEmails" name="marketingEmails" class="rounded border-gray-300 text-purple-600 focus:ring-purple-500">
                      <span class="ml-2 text-sm text-gray-700">Marketing emails</span>
                    </label>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="mt-8 flex flex-col sm:flex-row gap-3">
                  <button type="submit" class="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
                    Save Changes
                  </button>
                  <button type="button" onclick="closeProfileModal()" class="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        `;
        
        document.body.appendChild(modal);
        console.log('✅ Profile modal created');
      }
      
      // Show the modal
      modal.classList.remove('hidden');
      modal.style.display = 'flex';
      modal.style.opacity = '0';
      modal.style.transform = 'scale(0.9)';
      
      // Animate in
      setTimeout(() => {
        modal.style.transition = 'all 0.3s ease';
        modal.style.opacity = '1';
        modal.style.transform = 'scale(1)';
      }, 10);
      
      // Disable body scroll
      document.body.style.overflow = 'hidden';
      
      console.log('✅ Profile modal opened');

      // Load existing profile data after DOM is ready
      setTimeout(() => {
        loadProfileData();
      }, 200);
      
    } catch (error) {
      console.error('❌ Error in openProfileModal:', error);
      alert('Error opening profile. Please try again.');
    }
  }
  
  return openProfileModal;
}

function createCloseProfileModalFunction() {
  function closeProfileModal() {
    console.log('👤 Closing profile modal...');
    
    try {
      const modal = document.getElementById('profileModal');
      if (modal) {
        // Animate out
        modal.style.transition = 'all 0.3s ease';
        modal.style.opacity = '0';
        modal.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
          modal.style.display = 'none';
          modal.classList.add('hidden');
        }, 300);
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        console.log('✅ Profile modal closed');
      }
    } catch (error) {
      console.error('❌ Error closing profile modal:', error);
    }
  }
  
  return closeProfileModal;
}

function createHandleProfileUpdateFunction() {
  function handleProfileUpdate(event) {
    console.log('💾 Handling profile update...');
    
    if (event) {
      event.preventDefault();
    }
    
    try {
      // Get form data
      const formData = new FormData(document.getElementById('profileForm'));
      const profileData = {
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        company: formData.get('company'),
        location: formData.get('location'),
        emailNotifications: formData.get('emailNotifications') === 'on',
        smsNotifications: formData.get('smsNotifications') === 'on',
        marketingEmails: formData.get('marketingEmails') === 'on',
        lastUpdated: new Date().toISOString()
      };
      
      // Save to localStorage
      localStorage.setItem('visualVibeProfile', JSON.stringify(profileData));
      
      // Update profile initials
      updateProfileInitials(profileData.fullName);
      
      // Show success message
      if (window.toastManager) {
        window.toastManager.success('Profile updated successfully!', { duration: 3000 });
      } else {
        alert('Profile updated successfully!');
      }
      
      // Close modal
      closeProfileModal();
      
      console.log('✅ Profile updated:', profileData);
      
    } catch (error) {
      console.error('❌ Error updating profile:', error);
      
      if (window.toastManager) {
        window.toastManager.error('Error updating profile. Please try again.', { duration: 3000 });
      } else {
        alert('Error updating profile. Please try again.');
      }
    }
  }
  
  return handleProfileUpdate;
}

function loadProfileData() {
  console.log('📊 Loading existing profile data...');

  try {
    const savedProfile = JSON.parse(localStorage.getItem('visualVibeProfile') || '{}');

    // Populate form fields with null checks
    const fullNameEl = document.getElementById('profileFullName');
    if (fullNameEl && savedProfile.fullName) fullNameEl.value = savedProfile.fullName;

    const emailEl = document.getElementById('profileEmail');
    if (emailEl && savedProfile.email) emailEl.value = savedProfile.email;

    const phoneEl = document.getElementById('profilePhone');
    if (phoneEl && savedProfile.phone) phoneEl.value = savedProfile.phone;

    const companyEl = document.getElementById('profileCompany');
    if (companyEl && savedProfile.company) companyEl.value = savedProfile.company;

    const locationEl = document.getElementById('profileLocation');
    if (locationEl && savedProfile.location) locationEl.value = savedProfile.location;

    // Set checkboxes with null checks
    const emailNotifEl = document.getElementById('emailNotifications');
    if (emailNotifEl) emailNotifEl.checked = savedProfile.emailNotifications !== false;

    const smsNotifEl = document.getElementById('smsNotifications');
    if (smsNotifEl) smsNotifEl.checked = savedProfile.smsNotifications === true;

    const marketingEl = document.getElementById('marketingEmails');
    if (marketingEl) marketingEl.checked = savedProfile.marketingEmails !== false;

    // Update initials
    updateProfileInitials(savedProfile.fullName);

    console.log('✅ Profile data loaded successfully');

  } catch (error) {
    console.error('❌ Error loading profile data:', error);
    console.log('Will retry loading profile data in 500ms...');

    // Retry after a delay to ensure DOM is ready
    setTimeout(() => {
      try {
        loadProfileData();
      } catch (retryError) {
        console.error('❌ Retry failed:', retryError);
      }
    }, 500);
  }
}

function updateProfileInitials(fullName) {
  try {
    const initialsEl = document.getElementById('profileInitials');
    if (initialsEl) {
      if (fullName && fullName.trim()) {
        const names = fullName.trim().split(' ').filter(name => name.length > 0);
        let initials = 'VS'; // Default

        if (names.length >= 2) {
          initials = (names[0][0] + names[names.length - 1][0]).toUpperCase();
        } else if (names.length === 1 && names[0].length >= 2) {
          initials = names[0].substring(0, 2).toUpperCase();
        } else if (names.length === 1 && names[0].length === 1) {
          initials = names[0].toUpperCase() + 'S';
        }

        initialsEl.textContent = initials;
        console.log(`✅ Updated initials to: ${initials}`);
      } else {
        // Set default initials if no name provided
        initialsEl.textContent = 'VS';
        console.log('ℹ️ Set default initials: VS');
      }
    } else {
      console.warn('⚠️ Profile initials element not found');
    }
  } catch (error) {
    console.error('❌ Error updating initials:', error);
  }
}

// Install the functions globally
function installProfileModalFunctions() {
  console.log('📦 Installing profile modal functions...');
  
  const openProfileModalFunction = createOpenProfileModalFunction();
  const closeProfileModalFunction = createCloseProfileModalFunction();
  const handleProfileUpdateFunction = createHandleProfileUpdateFunction();
  
  // Multiple installation methods for maximum compatibility
  window.openProfileModal = openProfileModalFunction;
  window.closeProfileModal = closeProfileModalFunction;
  window.handleProfileUpdate = handleProfileUpdateFunction;
  
  window['openProfileModal'] = openProfileModalFunction;
  window['closeProfileModal'] = closeProfileModalFunction;
  window['handleProfileUpdate'] = handleProfileUpdateFunction;
  
  // Global scope assignment
  if (typeof global !== 'undefined') {
    global.openProfileModal = openProfileModalFunction;
    global.closeProfileModal = closeProfileModalFunction;
    global.handleProfileUpdate = handleProfileUpdateFunction;
  }
  
  console.log('✅ Profile modal functions installed');
}

// Continuous protection
function protectProfileModalFunctions() {
  console.log('🛡️ Setting up profile modal function protection...');
  
  let protectionCount = 0;
  const maxProtections = 30; // Protect for 30 seconds
  
  const protectionInterval = setInterval(() => {
    if (typeof window.openProfileModal !== 'function') {
      console.warn('🛡️ openProfileModal function missing, reinstalling...');
      installProfileModalFunctions();
    }
    
    protectionCount++;
    if (protectionCount >= maxProtections) {
      clearInterval(protectionInterval);
      console.log('🛡️ Profile modal function protection period ended');
    }
  }, 1000);
}

// Initialize
function initializeProfileModalFix() {
  console.log('🚀 Initializing profile modal function fix...');
  
  // Install functions immediately
  installProfileModalFunctions();
  
  // Set up protection
  protectProfileModalFunctions();
  
  // Verify installation
  setTimeout(() => {
    console.log('🔍 VERIFICATION:');
    console.log('  openProfileModal type:', typeof window.openProfileModal);
    console.log('  closeProfileModal type:', typeof window.closeProfileModal);
    console.log('  handleProfileUpdate type:', typeof window.handleProfileUpdate);
    
    if (typeof window.openProfileModal === 'function') {
      console.log('✅ Profile modal functions are properly available');
    } else {
      console.error('❌ Profile modal function installation failed');
    }
  }, 500);
}

// Test function
window.testProfileModalFunctions = function() {
  console.log('🧪 Testing profile modal functions...');
  
  const openAvailable = typeof window.openProfileModal === 'function';
  const closeAvailable = typeof window.closeProfileModal === 'function';
  
  console.log('Open function available:', openAvailable);
  console.log('Close function available:', closeAvailable);
  
  if (openAvailable) {
    console.log('✅ Test: Opening profile modal...');
    window.openProfileModal();
    
    setTimeout(() => {
      if (closeAvailable) {
        console.log('✅ Test: Closing profile modal...');
        window.closeProfileModal();
      }
    }, 3000);
  }
  
  return { openAvailable, closeAvailable };
};

// Initialize immediately
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeProfileModalFix);
} else {
  initializeProfileModalFix();
}

setTimeout(initializeProfileModalFix, 1000);

console.log('👤 Profile modal function fix loaded - openProfileModal should now be available');
