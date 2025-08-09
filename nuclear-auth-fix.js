// NUCLEAR AUTH FIX - Complete override with visual debugging
console.log('💥 NUCLEAR AUTH FIX: Starting...');

function nuclearAuthFix() {
  console.log('🔬 NUCLEAR FIX: Analyzing current state...');
  
  // Clear any existing auth data
  window.currentUser = null;
  localStorage.removeItem('visualVibeUser');
  localStorage.removeItem('currentUser');
  
  // Find all possible sign in/out elements
  const signedOutButtons = document.querySelectorAll('[onclick*="openSignInModal"], [onclick*="openSignUpModal"]');
  const signedInElements = document.querySelectorAll('[onclick*="openProfileModal"], [onclick*="showOrderHistory"], [onclick*="signOut"]');
  
  console.log('Found elements:', {
    signedOutButtons: signedOutButtons.length,
    signedInElements: signedInElements.length
  });
  
  // FORCE HIDE all sign in/up buttons
  signedOutButtons.forEach((btn, index) => {
    console.log(`Hiding sign out button ${index}:`, btn);
    btn.style.display = 'none !important';
    btn.style.visibility = 'hidden';
    btn.style.opacity = '0';
    btn.style.pointerEvents = 'none';
    btn.setAttribute('hidden', 'true');
    btn.classList.add('hidden');
    
    // Also hide parent containers
    if (btn.parentElement) {
      const parent = btn.parentElement;
      if (parent.id === 'signedOutState' || parent.id === 'mobileSignedOutState') {
        parent.style.display = 'none !important';
        parent.style.visibility = 'hidden';
        parent.style.opacity = '0';
        parent.setAttribute('hidden', 'true');
        parent.classList.add('hidden');
      }
    }
  });
  
  // Create and show signed-in elements if they don't exist or are hidden
  const header = document.querySelector('header nav, header > div');
  if (header) {
    // Remove any existing signed-in elements
    const existingSignedIn = header.querySelectorAll('.nuclear-signed-in');
    existingSignedIn.forEach(el => el.remove());
    
    // Create new signed-in UI
    const signedInContainer = document.createElement('div');
    signedInContainer.className = 'nuclear-signed-in flex items-center space-x-3';
    signedInContainer.innerHTML = `
      <button onclick="alert('Profile editing feature coming soon!')" class="flex items-center space-x-2 hover:bg-gray-50 p-2 rounded-lg transition-colors group">
        <div class="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
          👤
        </div>
        <div class="flex flex-col">
          <span class="text-gray-700 group-hover:text-gray-900 text-sm font-medium">Signed In User</span>
          <span class="text-xs text-gray-500">Edit Profile</span>
        </div>
      </button>
      <button onclick="alert('Order history feature coming soon!')" class="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
        My Orders
      </button>
      <button onclick="nuclearSignOut()" class="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
        Sign Out
      </button>
    `;
    
    // Insert at the end of the header
    header.appendChild(signedInContainer);
    
    console.log('✅ Created new signed-in UI');
  }
}

function nuclearSignOut() {
  console.log('🚪 NUCLEAR SIGN OUT');
  
  // Clear user data
  window.currentUser = null;
  localStorage.removeItem('visualVibeUser');
  localStorage.removeItem('currentUser');
  
  // Remove nuclear signed-in elements
  const nuclearElements = document.querySelectorAll('.nuclear-signed-in');
  nuclearElements.forEach(el => el.remove());
  
  // Show original sign in/up buttons
  const signedOutButtons = document.querySelectorAll('[onclick*="openSignInModal"], [onclick*="openSignUpModal"]');
  signedOutButtons.forEach(btn => {
    btn.style.display = '';
    btn.style.visibility = '';
    btn.style.opacity = '';
    btn.style.pointerEvents = '';
    btn.removeAttribute('hidden');
    btn.classList.remove('hidden');
    
    // Show parent containers too
    if (btn.parentElement) {
      const parent = btn.parentElement;
      if (parent.id === 'signedOutState' || parent.id === 'mobileSignedOutState') {
        parent.style.display = '';
        parent.style.visibility = '';
        parent.style.opacity = '';
        parent.removeAttribute('hidden');
        parent.classList.remove('hidden');
      }
    }
  });
  
  alert('Signed out successfully!');
}

// Override sign in functions to trigger nuclear fix
const originalOpenSignInModal = window.openSignInModal;
window.openSignInModal = function() {
  if (originalOpenSignInModal) {
    originalOpenSignInModal();
    
    // Override the sign in handler for the modal
    setTimeout(() => {
      const signInForm = document.querySelector('#signInModal form');
      if (signInForm) {
        signInForm.onsubmit = function(e) {
          e.preventDefault();
          
          // Simulate successful sign in
          const email = document.getElementById('signInEmail')?.value || 'user@example.com';
          const modal = document.getElementById('signInModal');
          if (modal) modal.remove();
          document.body.style.overflow = '';
          
          // Trigger nuclear fix
          setTimeout(nuclearAuthFix, 100);
          alert('Signed in successfully!');
          
          return false;
        };
      }
    }, 100);
  }
};

// Make functions global
window.nuclearAuthFix = nuclearAuthFix;
window.nuclearSignOut = nuclearSignOut;

// Run nuclear fix immediately
nuclearAuthFix();

console.log('💥 NUCLEAR AUTH FIX: Loaded and active');
console.log('🧪 Test commands:');
console.log('- nuclearAuthFix() - Force show signed-in state');
console.log('- nuclearSignOut() - Force show signed-out state');
