// Add Profile Picture Button - Ensures manual control exists
console.log('📸 Loading profile picture button addition...');

function addProfilePictureButtonToModal() {
  console.log('🔧 Adding profile picture button to modal...');
  
  // Wait for modal to exist
  const checkForModal = setInterval(() => {
    const modal = document.getElementById('profileModal');
    if (modal) {
      clearInterval(checkForModal);
      
      // Check if button already exists
      if (modal.querySelector('.manual-picture-button')) {
        console.log('✅ Profile picture button already exists');
        return;
      }
      
      // Find the form
      const form = document.getElementById('profileForm');
      if (!form) {
        console.log('❌ Profile form not found');
        return;
      }
      
      // Create profile picture section
      const pictureSection = document.createElement('div');
      pictureSection.className = 'manual-picture-button text-center mb-6 pb-4 border-b border-gray-200';
      
      pictureSection.innerHTML = `
        <div class="mb-4">
          <div id="profilePictureDisplay" class="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-lg mx-auto mb-3">
            ${getInitials()}
          </div>
          <button type="button" onclick="window.changeProfilePictureManually()" class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
            📸 Change Profile Picture
          </button>
          <p class="text-xs text-gray-500 mt-2">Click button above to change your picture</p>
        </div>
      `;
      
      // Insert at the beginning of the form
      form.insertBefore(pictureSection, form.firstChild);
      
      console.log('✅ Profile picture button added to modal');
    }
  }, 500);
  
  // Stop checking after 10 seconds
  setTimeout(() => {
    clearInterval(checkForModal);
  }, 10000);
}

function getInitials() {
  if (window.currentUser && window.currentUser.name) {
    return window.currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  }
  return 'U';
}

// Run when modal opens
const originalOpenProfileModal = window.openProfileModal;
window.openProfileModal = function() {
  if (typeof originalOpenProfileModal === 'function') {
    originalOpenProfileModal();
  }
  
  // Add button after modal opens
  setTimeout(addProfilePictureButtonToModal, 200);
};

// Also run on page load
setTimeout(addProfilePictureButtonToModal, 3000);

console.log('📸 Profile picture button addition loaded');
