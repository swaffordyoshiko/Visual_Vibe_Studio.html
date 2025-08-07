// PROFILE MODAL EXISTENCE FIX - Ensures modal always exists and works
console.log('🔧 Loading profile modal existence fix...');

(function() {
  'use strict';
  
  // Prevent multiple loads
  if (window.profileModalExistenceFix) {
    return;
  }
  window.profileModalExistenceFix = true;
  
  console.log('🛠️ Ensuring profile modal exists and works...');
  
  // Function to ensure profile modal exists
  function ensureProfileModalExists() {
    let modal = document.getElementById('profileModal');
    
    if (!modal) {
      console.log('⚠️ Profile modal not found, creating it...');
      createProfileModal();
      modal = document.getElementById('profileModal');
    }
    
    return modal;
  }
  
  // Create profile modal if it doesn't exist
  function createProfileModal() {
    const modal = document.createElement('div');
    modal.id = 'profileModal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden p-4';
    modal.innerHTML = `
      <div class="bg-white rounded-xl max-w-md w-full max-h-[90vh] flex flex-col shadow-2xl">
        <!-- Header -->
        <div class="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
          <h3 class="text-xl sm:text-2xl font-bold text-gray-800">Edit Profile</h3>
          <button onclick="closeProfileModal()" class="text-gray-500 hover:text-gray-700 p-2 -m-2">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Profile Picture Section -->
        <div class="p-6 border-b border-gray-100 bg-gray-50">
          <div class="text-center">
            <h4 class="text-sm font-semibold text-gray-700 mb-4">Profile Picture</h4>
            <div class="relative inline-block mb-4">
              <div id="profilePicPreview" class="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-xl text-gray-500 overflow-hidden border-4 border-white shadow-lg">
                👤
              </div>
            </div>
            <button type="button" onclick="openPictureUploader()" 
                    class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm">
              📸 Change Picture
            </button>
          </div>
        </div>

        <!-- Scrollable Content -->
        <div class="flex-1 overflow-y-auto px-6 py-4">
          <form id="profileForm" class="space-y-4">
            <!-- First Name -->
            <div>
              <label for="profileFirstName" class="block text-sm font-medium text-gray-700 mb-2">
                First Name *
              </label>
              <input
                type="text"
                id="profileFirstName"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter your first name"
              />
            </div>

            <!-- Last Name -->
            <div>
              <label for="profileLastName" class="block text-sm font-medium text-gray-700 mb-2">
                Last Name *
              </label>
              <input
                type="text"
                id="profileLastName"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter your last name"
              />
            </div>

            <!-- Email -->
            <div>
              <label for="profileEmail" class="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="profileEmail"
                readonly
                class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                placeholder="Email address"
              />
            </div>

            <!-- Phone -->
            <div>
              <label for="profilePhone" class="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="profilePhone"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter your phone number"
              />
            </div>

            <!-- Company -->
            <div>
              <label for="profileCompanyName" class="block text-sm font-medium text-gray-700 mb-2">
                Company Name
              </label>
              <input
                type="text"
                id="profileCompanyName"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter your company name"
              />
            </div>
          </form>
        </div>

        <!-- Footer -->
        <div class="flex gap-3 p-4 sm:p-6 border-t border-gray-200 flex-shrink-0 bg-gray-50">
          <button type="button" onclick="closeProfileModal()" 
                  class="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button type="button" onclick="saveProfile()" 
                  class="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
            💾 Save Changes
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    console.log('✅ Profile modal created successfully');
  }
  
  // Track user clicks for profile modal
  let userClickedProfile = false;
  
  document.addEventListener('click', function(e) {
    const target = e.target.closest('button');
    if (target && (
      target.textContent.includes('Edit Profile') ||
      target.onclick?.toString().includes('openProfileModal') ||
      target.getAttribute('onclick')?.includes('openProfileModal')
    )) {
      userClickedProfile = true;
      console.log('✅ User clicked profile button');
      
      // Reset after 2 seconds
      setTimeout(() => {
        userClickedProfile = false;
      }, 2000);
    }
  });
  
  // Simple, working openProfileModal function
  window.openProfileModal = function() {
    console.log('👤 Opening profile modal...');
    
    // Block if not user-initiated
    if (!userClickedProfile) {
      console.log('🚫 BLOCKED: Profile modal not user-initiated');
      return false;
    }
    
    if (!window.currentUser) {
      alert('Please sign in to edit your profile.');
      return false;
    }
    
    // Ensure modal exists
    const modal = ensureProfileModalExists();
    if (!modal) {
      alert('Profile modal could not be created. Please refresh the page.');
      return false;
    }
    
    // Populate form
    populateProfileForm();
    
    // Show modal
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    console.log('✅ Profile modal opened successfully');
    
    // Focus first input
    setTimeout(() => {
      const firstInput = document.getElementById('profileFirstName');
      if (firstInput) firstInput.focus();
    }, 100);
    
    return true;
  };
  
  // Populate profile form with current data
  function populateProfileForm() {
    if (!window.currentUser) return;
    
    try {
      // Get user data from storage
      const userKey = `user_${window.currentUser.email}`;
      const userData = JSON.parse(localStorage.getItem(userKey) || '{}');
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      const legacyUser = users.find(u => u.email === window.currentUser.email || u.id === window.currentUser.id);
      
      // Combine data
      const completeData = { ...legacyUser, ...userData, ...window.currentUser };
      
      // Populate form fields
      const fields = {
        'profileFirstName': completeData.firstName || '',
        'profileLastName': completeData.lastName || '',
        'profileEmail': completeData.email || '',
        'profilePhone': completeData.phone || '',
        'profileCompanyName': completeData.companyName || ''
      };
      
      Object.entries(fields).forEach(([fieldId, value]) => {
        const field = document.getElementById(fieldId);
        if (field) {
          field.value = value;
        }
      });
      
      // Update profile picture preview
      const preview = document.getElementById('profilePicPreview');
      if (preview && completeData.profilePicture) {
        preview.innerHTML = `<img src="${completeData.profilePicture}" class="w-full h-full object-cover rounded-full" alt="Profile">`;
      }
      
      console.log('✅ Profile form populated');
      
    } catch (error) {
      console.error('❌ Error populating profile form:', error);
    }
  }
  
  // Simple picture uploader
  window.openPictureUploader = function() {
    console.log('📸 Opening picture uploader...');
    
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.style.display = 'none';
    
    input.onchange = function(e) {
      const file = e.target.files[0];
      if (!file) return;
      
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = function(event) {
        const preview = document.getElementById('profilePicPreview');
        if (preview) {
          preview.innerHTML = `<img src="${event.target.result}" class="w-full h-full object-cover rounded-full" alt="Profile">`;
        }
        
        // Store the image data
        window.selectedProfilePicture = event.target.result;
        console.log('✅ Profile picture selected');
      };
      reader.readAsDataURL(file);
    };
    
    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
  };
  
  // Save profile function
  window.saveProfile = function() {
    console.log('💾 Saving profile...');
    
    if (!window.currentUser) {
      alert('Please sign in to save profile');
      return;
    }
    
    const firstName = document.getElementById('profileFirstName')?.value.trim() || '';
    const lastName = document.getElementById('profileLastName')?.value.trim() || '';
    const phone = document.getElementById('profilePhone')?.value.trim() || '';
    const company = document.getElementById('profileCompanyName')?.value.trim() || '';
    
    if (!firstName || !lastName) {
      alert('First name and last name are required');
      return;
    }
    
    try {
      // Update user data
      window.currentUser.firstName = firstName;
      window.currentUser.lastName = lastName;
      window.currentUser.name = `${firstName} ${lastName}`;
      window.currentUser.phone = phone;
      window.currentUser.companyName = company;
      
      if (window.selectedProfilePicture) {
        window.currentUser.profilePicture = window.selectedProfilePicture;
      }
      
      // Save to storage
      const userKey = `user_${window.currentUser.email}`;
      const userData = { ...window.currentUser, lastUpdated: new Date().toISOString() };
      localStorage.setItem(userKey, JSON.stringify(userData));
      
      // Save to legacy storage
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      const userIndex = users.findIndex(u => u.email === window.currentUser.email || u.id === window.currentUser.id);
      
      if (userIndex !== -1) {
        Object.assign(users[userIndex], userData);
      } else {
        users.push(userData);
      }
      localStorage.setItem('visualVibeUsers', JSON.stringify(users));
      
      console.log('✅ Profile saved successfully');
      alert('✅ Profile saved successfully!');
      closeProfileModal();
      
    } catch (error) {
      console.error('❌ Error saving profile:', error);
      alert('❌ Error saving profile. Please try again.');
    }
  };
  
  // Close profile modal
  window.closeProfileModal = function() {
    console.log('👤 Closing profile modal...');
    
    const modal = document.getElementById('profileModal');
    if (modal) {
      modal.classList.add('hidden');
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
    
    // Reset selected picture
    window.selectedProfilePicture = null;
  };
  
  // Initialize - ensure modal exists
  setTimeout(() => {
    ensureProfileModalExists();
    console.log('✅ Profile modal existence verified');
  }, 100);
  
  // Periodically check modal existence
  setInterval(() => {
    const modal = document.getElementById('profileModal');
    if (!modal) {
      console.log('⚠️ Profile modal missing, recreating...');
      ensureProfileModalExists();
    }
  }, 5000);
  
  console.log('✅ Profile modal existence fix applied successfully');
  console.log('🛡️ Modal will always exist and work properly');
  
})();
