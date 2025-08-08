// COMPREHENSIVE SIGN-IN FIX - Stop conflicts and restore proper authentication
console.log('🔑 COMPREHENSIVE SIGN-IN FIX: Restoring sign-in functionality...');

// STEP 1: Clear ALL conflicting functions to prevent interference
console.log('🧹 Clearing conflicting authentication functions...');

const conflictingFunctions = [
  'handleSignIn_DISABLED', 'handleSignIn_EMERGENCY_DISABLED', 'handleSignIn_conflicted',
  'openSignInModal_conflicted', 'openSignInModal_DISABLED', 'actualOpenSignInModal',
  'CrossDeviceAuth', 'aggressiveSignup', 'bulletproofSignUp'
];

conflictingFunctions.forEach(fn => {
  if (window[fn]) {
    delete window[fn];
    console.log(`🗑️ Removed conflicting function: ${fn}`);
  }
});

// STEP 2: Create clean, working authentication functions
function cleanOpenSignInModal() {
  console.log('🔑 Opening sign-in modal (clean version)...');
  
  try {
    const modal = document.getElementById('signInModal');
    if (!modal) {
      console.error('❌ Sign-in modal element not found in DOM');
      alert('Sign-in form not available. Please refresh the page.');
      return;
    }
    
    // Clear any existing inline styles and show modal
    modal.style.display = 'flex';
    modal.style.opacity = '1';
    modal.style.visibility = 'visible';
    modal.classList.remove('hidden');
    
    // Focus on email input for better UX
    const emailInput = document.getElementById('signInEmail');
    if (emailInput) {
      setTimeout(() => {
        emailInput.focus();
        emailInput.value = ''; // Clear any existing value
      }, 100);
    }
    
    console.log('✅ Sign-in modal opened successfully');
  } catch (error) {
    console.error('❌ Error opening sign-in modal:', error);
    alert('Error opening sign-in form. Please refresh the page.');
  }
}

function cleanCloseSignInModal() {
  console.log('🔑 Closing sign-in modal (clean version)...');
  
  try {
    const modal = document.getElementById('signInModal');
    if (modal) {
      modal.style.display = 'none';
      modal.classList.add('hidden');
    }
    
    // Clear form
    const form = document.getElementById('signInForm');
    if (form) {
      form.reset();
    }
    
    console.log('✅ Sign-in modal closed successfully');
  } catch (error) {
    console.error('❌ Error closing sign-in modal:', error);
  }
}

function cleanHandleSignIn(event) {
  if (event) event.preventDefault();
  console.log('🔑 Processing sign-in (clean version)...');
  
  try {
    // Get form inputs
    const emailInput = document.getElementById('signInEmail');
    const passwordInput = document.getElementById('signInPassword');
    
    if (!emailInput || !passwordInput) {
      console.error('❌ Sign-in form inputs not found');
      alert('Sign-in form not found. Please refresh the page.');
      return;
    }
    
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;
    
    console.log(`🔍 Attempting sign-in for: ${email}`);
    
    // Validate inputs
    if (!email || !password) {
      alert('Please enter both email and password.');
      if (!email) emailInput.focus();
      else passwordInput.focus();
      return;
    }
    
    if (!email.includes('@')) {
      alert('Please enter a valid email address.');
      emailInput.focus();
      return;
    }
    
    // Get stored users with comprehensive fallback
    let users = [];
    const possibleKeys = ['visualVibeUsers', 'vvs_users', 'userData'];
    
    for (const key of possibleKeys) {
      try {
        const data = localStorage.getItem(key);
        if (data && data !== 'null' && data !== 'undefined') {
          const parsed = JSON.parse(data);
          if (Array.isArray(parsed) && parsed.length > 0) {
            users = parsed;
            console.log(`📋 Found ${users.length} users in ${key}`);
            break;
          }
        }
      } catch (e) {
        console.warn(`⚠️ Error reading ${key}:`, e);
      }
    }
    
    if (users.length === 0) {
      console.log('📋 No users found in storage');
      alert('No accounts found. Please sign up first.');
      return;
    }
    
    // Debug: Show all users (email only for privacy)
    console.log('👥 Available users:');
    users.forEach((user, index) => {
      console.log(`  ${index + 1}. ${user.email || 'NO_EMAIL'} (${user.name || 'NO_NAME'})`);
    });
    
    // Find user by email (case-insensitive)
    const user = users.find(u => u && u.email && u.email.toLowerCase() === email);
    
    if (!user) {
      console.log('❌ No user found with email:', email);
      alert(`No account found with email: ${email}\nPlease check your email or sign up for a new account.`);
      return;
    }
    
    console.log('👤 Found user:', user.name, '<' + user.email + '>');
    
    // Check password
    if (!user.password) {
      console.error('❌ User has no password set');
      alert('Account error: No password found. Please contact support.');
      return;
    }
    
    if (user.password !== password) {
      console.log('❌ Password mismatch for user:', user.email);
      alert('Incorrect password. Please try again.');
      passwordInput.focus();
      passwordInput.select();
      return;
    }
    
    console.log('✅ Password correct, logging in user...');
    
    // Create session
    const currentUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      loginTime: new Date().toISOString(),
      lastActivity: new Date().toISOString()
    };
    
    // Save session to multiple locations for compatibility
    window.currentUser = currentUser;
    localStorage.setItem('visualVibeUser', JSON.stringify(currentUser));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    localStorage.setItem('vvs_user', JSON.stringify(currentUser));
    
    // Update user's last login time
    user.lastLogin = new Date().toISOString();
    user.signedIn = true;
    localStorage.setItem('visualVibeUsers', JSON.stringify(users));
    
    // Update UI
    if (typeof window.updateAuthUI === 'function') {
      window.updateAuthUI();
    }
    
    // Close modal and show success
    cleanCloseSignInModal();
    
    // Show welcome message
    if (typeof window.showAlert === 'function') {
      window.showAlert(`Welcome back, ${user.name}!`, 'success');
    } else {
      alert(`Welcome back, ${user.name}!`);
    }
    
    console.log('✅ Sign-in completed successfully for:', user.name);
    
  } catch (error) {
    console.error('❌ Error in sign-in process:', error);
    alert('Sign-in error occurred. Please try again or refresh the page.');
  }
}

// STEP 3: Install clean functions globally
console.log('🔧 Installing clean authentication functions...');

window.openSignInModal = cleanOpenSignInModal;
window.closeSignInModal = cleanCloseSignInModal;
window.handleSignIn = cleanHandleSignIn;

// Make functions non-writable to prevent conflicts
Object.defineProperty(window, 'openSignInModal', {
  value: cleanOpenSignInModal,
  writable: false,
  configurable: false
});

Object.defineProperty(window, 'handleSignIn', {
  value: cleanHandleSignIn,
  writable: false,
  configurable: false
});

console.log('🔒 Authentication functions locked to prevent conflicts');

// STEP 4: Attach event listeners to forms
function attachFormListeners() {
  console.log('🔗 Attaching form event listeners...');
  
  try {
    const signInForm = document.getElementById('signInForm');
    if (signInForm) {
      // Remove any existing listeners by cloning the form
      const newForm = signInForm.cloneNode(true);
      signInForm.parentNode.replaceChild(newForm, signInForm);
      
      // Attach clean listener
      newForm.addEventListener('submit', cleanHandleSignIn);
      newForm.onsubmit = cleanHandleSignIn;
      
      console.log('✅ Sign-in form listener attached');
    } else {
      console.warn('⚠️ Sign-in form not found yet');
    }
  } catch (error) {
    console.error('❌ Error attaching form listeners:', error);
  }
}

// STEP 5: Fix button onclick handlers
function fixButtonHandlers() {
  console.log('🔘 Fixing sign-in button handlers...');
  
  try {
    // Find all sign-in buttons
    const signInButtons = document.querySelectorAll('button[onclick*="openSignInModal"], button[onclick*="signIn"]');
    
    signInButtons.forEach((button, index) => {
      const originalOnclick = button.getAttribute('onclick');
      console.log(`🔘 Fixing button ${index + 1}: ${originalOnclick}`);
      
      // Replace onclick with clean function
      button.onclick = function(e) {
        e.preventDefault();
        console.log(`🔘 Sign-in button ${index + 1} clicked (fixed)`);
        cleanOpenSignInModal();
      };
      
      // Also set the attribute for compatibility
      button.setAttribute('onclick', 'window.openSignInModal(); return false;');
    });
    
    console.log(`✅ Fixed ${signInButtons.length} sign-in buttons`);
  } catch (error) {
    console.error('❌ Error fixing button handlers:', error);
  }
}

// STEP 6: Execute fixes immediately and on DOM ready
console.log('🚀 Executing sign-in fixes...');

// Execute immediately
attachFormListeners();
fixButtonHandlers();

// Execute when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
      attachFormListeners();
      fixButtonHandlers();
    }, 100);
  });
}

// Execute with delays for various load times
setTimeout(attachFormListeners, 100);
setTimeout(fixButtonHandlers, 200);
setTimeout(attachFormListeners, 500);
setTimeout(fixButtonHandlers, 1000);

// STEP 7: Diagnostic functions for troubleshooting
window.diagnoseSignIn = function() {
  console.log('🔍 === SIGN-IN DIAGNOSTIC ===');
  
  // Check DOM elements
  const modal = document.getElementById('signInModal');
  const form = document.getElementById('signInForm');
  const emailInput = document.getElementById('signInEmail');
  const passwordInput = document.getElementById('signInPassword');
  
  console.log('📋 DOM Elements:', {
    modal: !!modal,
    form: !!form,
    emailInput: !!emailInput,
    passwordInput: !!passwordInput
  });
  
  // Check stored users
  const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
  console.log(`👥 Found ${users.length} stored users:`);
  users.forEach((user, index) => {
    console.log(`  ${index + 1}. ${user.name} <${user.email}>`);
  });
  
  // Check functions
  console.log('⚙️ Functions:', {
    openSignInModal: typeof window.openSignInModal,
    handleSignIn: typeof window.handleSignIn,
    closeSignInModal: typeof window.closeSignInModal
  });
  
  // Check buttons
  const buttons = document.querySelectorAll('button[onclick*="openSignInModal"]');
  console.log(`🔘 Found ${buttons.length} sign-in buttons`);
  
  console.log('🔍 === END DIAGNOSTIC ===');
};

window.testSignIn = function(email = '', password = '') {
  console.log('🧪 Testing sign-in function...');
  
  if (!email || !password) {
    console.log('📝 Fill in the form manually and run: testSignIn("your@email.com", "yourpassword")');
    return;
  }
  
  // Fill form
  const emailInput = document.getElementById('signInEmail');
  const passwordInput = document.getElementById('signInPassword');
  
  if (emailInput && passwordInput) {
    emailInput.value = email;
    passwordInput.value = password;
    cleanHandleSignIn();
  } else {
    console.error('❌ Form inputs not found');
  }
};

console.log('✅ COMPREHENSIVE SIGN-IN FIX: Complete');
console.log('🧪 Available diagnostic commands:');
console.log('- diagnoseSignIn() - Check sign-in system status');
console.log('- testSignIn("email", "password") - Test sign-in with credentials');
console.log('🔑 Sign-in button should now work correctly for existing customers');
