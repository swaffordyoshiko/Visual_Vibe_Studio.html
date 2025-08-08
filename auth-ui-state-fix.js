// AUTHENTICATION UI STATE FIX - Fix hidden class issue and sign-in functionality
console.log('🔧 AUTH UI STATE FIX: Fixing sign-in button and hidden UI elements...');

// STEP 1: Check current authentication state and restore session if needed
function checkAndRestoreAuth() {
  console.log('🔍 Checking authentication state...');
  
  // Check for existing user session
  const possibleKeys = ['visualVibeUser', 'currentUser', 'vvs_user'];
  let foundUser = null;
  
  for (const key of possibleKeys) {
    try {
      const userData = localStorage.getItem(key);
      if (userData && userData !== 'null') {
        const parsed = JSON.parse(userData);
        if (parsed && parsed.email) {
          foundUser = parsed;
          console.log(`✅ Found user session in ${key}:`, parsed.name);
          break;
        }
      }
    } catch (e) {
      console.warn(`⚠️ Error reading ${key}:`, e);
    }
  }
  
  // Set global currentUser if found
  if (foundUser && !window.currentUser) {
    window.currentUser = foundUser;
    console.log('✅ Restored currentUser from storage:', foundUser.name);
  }
  
  return foundUser;
}

// STEP 2: Enhanced updateAuthUI that properly handles the hidden class
function fixedUpdateAuthUI() {
  console.log('🎨 Updating authentication UI (fixed version)...');
  
  try {
    // Get UI elements
    const signedOutState = document.getElementById('signedOutState');
    const signedInState = document.getElementById('signedInState');
    const mobileSignedOutState = document.getElementById('mobileSignedOutState');
    const mobileSignedInState = document.getElementById('mobileSignedInState');
    const userNameSpan = document.getElementById('userName');
    const welcomeBanner = document.getElementById('welcomeBanner');
    
    console.log('📋 UI Elements found:', {
      signedOutState: !!signedOutState,
      signedInState: !!signedInState,
      mobileSignedOutState: !!mobileSignedOutState,
      mobileSignedInState: !!mobileSignedInState,
      welcomeBanner: !!welcomeBanner
    });
    
    if (window.currentUser) {
      console.log('👤 User is signed in, showing signed-in UI for:', window.currentUser.name);
      
      // HIDE signed-out elements (add hidden class AND set display none)
      if (signedOutState) {
        signedOutState.classList.add('hidden');
        signedOutState.style.display = 'none';
        signedOutState.style.visibility = 'hidden';
      }
      if (mobileSignedOutState) {
        mobileSignedOutState.classList.add('hidden');
        mobileSignedOutState.style.display = 'none';
        mobileSignedOutState.style.visibility = 'hidden';
      }
      
      // SHOW signed-in elements (remove hidden class AND set display)
      if (signedInState) {
        signedInState.classList.remove('hidden');
        signedInState.style.display = 'flex';
        signedInState.style.visibility = 'visible';
        signedInState.style.opacity = '1';
        console.log('✅ Showed desktop signed-in state');
      }
      if (mobileSignedInState) {
        mobileSignedInState.classList.remove('hidden');
        mobileSignedInState.style.display = 'block';
        mobileSignedInState.style.visibility = 'visible';
        mobileSignedInState.style.opacity = '1';
        console.log('✅ Showed mobile signed-in state');
      }
      
      // Update user name
      if (userNameSpan) {
        userNameSpan.textContent = window.currentUser.name;
      }
      
      // Show welcome banner
      if (welcomeBanner) {
        welcomeBanner.classList.remove('hidden');
        welcomeBanner.style.display = 'block';
        welcomeBanner.style.visibility = 'visible';
        welcomeBanner.style.opacity = '1';
        console.log('✅ Showed welcome banner');
      }
      
      console.log('✅ Signed-in UI state applied');
      
    } else {
      console.log('🔓 User is signed out, showing signed-out UI');
      
      // SHOW signed-out elements (remove hidden class AND set display)
      if (signedOutState) {
        signedOutState.classList.remove('hidden');
        signedOutState.style.display = 'flex';
        signedOutState.style.visibility = 'visible';
        signedOutState.style.opacity = '1';
      }
      if (mobileSignedOutState) {
        mobileSignedOutState.classList.remove('hidden');
        mobileSignedOutState.style.display = 'block';
        mobileSignedOutState.style.visibility = 'visible';
        mobileSignedOutState.style.opacity = '1';
      }
      
      // HIDE signed-in elements (add hidden class AND set display none)
      if (signedInState) {
        signedInState.classList.add('hidden');
        signedInState.style.display = 'none';
        signedInState.style.visibility = 'hidden';
      }
      if (mobileSignedInState) {
        mobileSignedInState.classList.add('hidden');
        mobileSignedInState.style.display = 'none';
        mobileSignedInState.style.visibility = 'hidden';
      }
      
      // Hide welcome banner
      if (welcomeBanner) {
        welcomeBanner.classList.add('hidden');
        welcomeBanner.style.display = 'none';
        welcomeBanner.style.visibility = 'hidden';
      }
      
      console.log('✅ Signed-out UI state applied');
    }
    
  } catch (error) {
    console.error('❌ Error updating auth UI:', error);
  }
}

// STEP 3: Fixed sign-in modal function
function fixedOpenSignInModal() {
  console.log('🔑 Opening sign-in modal (fixed)...');
  
  try {
    const modal = document.getElementById('signInModal');
    if (!modal) {
      console.error('❌ Sign-in modal not found');
      alert('Sign-in form not available. Please refresh the page.');
      return;
    }
    
    // Show modal properly
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    modal.style.opacity = '1';
    modal.style.visibility = 'visible';
    modal.style.zIndex = '9999';
    
    // Focus email input
    const emailInput = document.getElementById('signInEmail');
    if (emailInput) {
      setTimeout(() => {
        emailInput.focus();
        emailInput.value = '';
      }, 100);
    }
    
    console.log('✅ Sign-in modal opened successfully');
  } catch (error) {
    console.error('❌ Error opening sign-in modal:', error);
    alert('Error opening sign-in form. Please refresh the page.');
  }
}

// STEP 4: Fixed sign-in handler
function fixedHandleSignIn(event) {
  if (event) event.preventDefault();
  console.log('🔑 Processing sign-in (fixed)...');
  
  try {
    const emailInput = document.getElementById('signInEmail');
    const passwordInput = document.getElementById('signInPassword');
    
    if (!emailInput || !passwordInput) {
      console.error('❌ Sign-in form inputs not found');
      alert('Sign-in form not found. Please refresh the page.');
      return;
    }
    
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;
    
    console.log(`🔍 Sign-in attempt for: ${email}`);
    
    // Validate inputs
    if (!email || !password) {
      alert('Please enter both email and password.');
      if (!email) emailInput.focus();
      else passwordInput.focus();
      return;
    }
    
    // Get users from storage
    let users = [];
    try {
      const userData = localStorage.getItem('visualVibeUsers');
      if (userData && userData !== 'null') {
        users = JSON.parse(userData);
        if (!Array.isArray(users)) {
          console.warn('⚠️ Users data is not an array, resetting');
          users = [];
        }
      }
    } catch (e) {
      console.error('❌ Error reading users data:', e);
      users = [];
    }
    
    console.log(`📋 Found ${users.length} registered users`);
    
    if (users.length === 0) {
      console.log('📋 No users found');
      alert('No accounts found. Please sign up first.');
      return;
    }
    
    // Find user by email
    const user = users.find(u => u && u.email && u.email.toLowerCase() === email);
    
    if (!user) {
      console.log('❌ No user found with email:', email);
      alert(`No account found with email: ${email}\nPlease check your email or sign up for a new account.`);
      return;
    }
    
    console.log('👤 Found user:', user.name);
    
    // Check password
    if (user.password !== password) {
      console.log('❌ Incorrect password');
      alert('Incorrect password. Please try again.');
      passwordInput.focus();
      passwordInput.select();
      return;
    }
    
    console.log('✅ Password correct, signing in...');
    
    // Create session
    const sessionUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      loginTime: new Date().toISOString(),
      lastActivity: new Date().toISOString()
    };
    
    // Save session to multiple locations for compatibility
    window.currentUser = sessionUser;
    localStorage.setItem('visualVibeUser', JSON.stringify(sessionUser));
    localStorage.setItem('currentUser', JSON.stringify(sessionUser));
    localStorage.setItem('vvs_user', JSON.stringify(sessionUser));
    
    // Update user's last login
    user.lastLogin = new Date().toISOString();
    user.signedIn = true;
    localStorage.setItem('visualVibeUsers', JSON.stringify(users));
    
    // Update UI using fixed function
    fixedUpdateAuthUI();
    
    // Close modal
    const modal = document.getElementById('signInModal');
    if (modal) {
      modal.classList.add('hidden');
      modal.style.display = 'none';
    }
    const form = document.getElementById('signInForm');
    if (form) form.reset();
    
    // Show success message
    if (typeof window.showAlert === 'function') {
      window.showAlert(`Welcome back, ${user.name}!`, 'success');
    } else {
      alert(`Welcome back, ${user.name}!`);
    }
    
    console.log('✅ Sign-in completed successfully');
    
  } catch (error) {
    console.error('❌ Error in sign-in process:', error);
    alert('Sign-in error occurred. Please try again.');
  }
}

// STEP 5: Fixed sign-out function
function fixedSignOut() {
  console.log('🔓 Signing out user...');
  
  try {
    // Clear user session
    window.currentUser = null;
    localStorage.removeItem('visualVibeUser');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('vvs_user');
    
    // Update users array to mark as signed out
    try {
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      users.forEach(user => {
        if (user.signedIn) {
          user.signedIn = false;
          user.lastLogout = new Date().toISOString();
        }
      });
      localStorage.setItem('visualVibeUsers', JSON.stringify(users));
    } catch (e) {
      console.warn('⚠️ Error updating users data on logout:', e);
    }
    
    // Update UI
    fixedUpdateAuthUI();
    
    // Show message
    if (typeof window.showAlert === 'function') {
      window.showAlert('You have been signed out successfully.', 'success');
    } else {
      alert('You have been signed out successfully.');
    }
    
    console.log('✅ Sign-out completed');
    
  } catch (error) {
    console.error('❌ Error during sign-out:', error);
    alert('Error during sign-out. Please refresh the page.');
  }
}

// STEP 6: Install fixed functions globally and override existing ones
console.log('🔧 Installing fixed authentication functions...');

// Override existing functions
window.updateAuthUI = fixedUpdateAuthUI;
window.openSignInModal = fixedOpenSignInModal;
window.handleSignIn = fixedHandleSignIn;
window.signOut = fixedSignOut;

// Make functions non-writable to prevent conflicts
Object.defineProperty(window, 'updateAuthUI', {
  value: fixedUpdateAuthUI,
  writable: false,
  configurable: false
});

console.log('✅ Fixed authentication functions installed');

// STEP 7: Attach form listeners
function attachFixedFormListeners() {
  console.log('🔗 Attaching fixed form event listeners...');
  
  try {
    const signInForm = document.getElementById('signInForm');
    if (signInForm) {
      // Remove existing listeners by cloning
      const newForm = signInForm.cloneNode(true);
      signInForm.parentNode.replaceChild(newForm, signInForm);
      
      // Attach fixed listener
      newForm.addEventListener('submit', fixedHandleSignIn);
      newForm.onsubmit = fixedHandleSignIn;
      
      console.log('✅ Sign-in form listener attached');
    } else {
      console.warn('⚠️ Sign-in form not found');
    }
  } catch (error) {
    console.error('❌ Error attaching form listeners:', error);
  }
}

// STEP 8: Fix button onclick handlers
function fixButtonHandlers() {
  console.log('🔘 Fixing button handlers...');
  
  try {
    // Fix sign-in buttons
    const signInButtons = document.querySelectorAll('button[onclick*="openSignInModal"]');
    signInButtons.forEach((button, index) => {
      button.onclick = function(e) {
        e.preventDefault();
        console.log(`🔘 Sign-in button ${index + 1} clicked (fixed)`);
        fixedOpenSignInModal();
      };
      button.setAttribute('onclick', 'window.openSignInModal(); return false;');
    });
    console.log(`✅ Fixed ${signInButtons.length} sign-in buttons`);
    
    // Fix sign-out buttons
    const signOutButtons = document.querySelectorAll('button[onclick*="signOut"]');
    signOutButtons.forEach((button, index) => {
      button.onclick = function(e) {
        e.preventDefault();
        console.log(`🔘 Sign-out button ${index + 1} clicked (fixed)`);
        fixedSignOut();
      };
      button.setAttribute('onclick', 'window.signOut(); return false;');
    });
    console.log(`✅ Fixed ${signOutButtons.length} sign-out buttons`);
    
  } catch (error) {
    console.error('❌ Error fixing button handlers:', error);
  }
}

// STEP 9: Initialize immediately
function initializeAuthFix() {
  console.log('🚀 Initializing authentication fix...');
  
  // Check and restore any existing session
  checkAndRestoreAuth();
  
  // Update UI based on current state
  fixedUpdateAuthUI();
  
  // Attach form listeners
  attachFixedFormListeners();
  
  // Fix button handlers
  fixButtonHandlers();
  
  console.log('✅ Authentication fix initialized');
}

// STEP 10: Execute immediately and with delays
console.log('🚀 Starting authentication UI state fix...');

// Execute immediately
initializeAuthFix();

// Execute when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeAuthFix, 100);
  });
}

// Execute with delays for various load scenarios
setTimeout(initializeAuthFix, 100);
setTimeout(initializeAuthFix, 500);
setTimeout(initializeAuthFix, 1000);

// STEP 11: Diagnostic functions
window.diagnoseAuthUI = function() {
  console.log('🔍 === AUTHENTICATION UI DIAGNOSTIC ===');
  
  // Check current user
  console.log('👤 Current User:', window.currentUser);
  
  // Check storage
  const storageKeys = ['visualVibeUser', 'currentUser', 'vvs_user', 'visualVibeUsers'];
  storageKeys.forEach(key => {
    const data = localStorage.getItem(key);
    if (data) {
      try {
        const parsed = JSON.parse(data);
        console.log(`📋 ${key}:`, parsed);
      } catch (e) {
        console.log(`📋 ${key}:`, data);
      }
    } else {
      console.log(`📋 ${key}: Not found`);
    }
  });
  
  // Check UI elements
  const elements = [
    'signedOutState', 'signedInState', 
    'mobileSignedOutState', 'mobileSignedInState',
    'signInModal', 'signInForm', 'welcomeBanner'
  ];
  
  elements.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      const computedStyle = window.getComputedStyle(element);
      console.log(`🎨 ${id}:`, {
        found: true,
        hasHiddenClass: element.classList.contains('hidden'),
        inlineDisplay: element.style.display,
        computedDisplay: computedStyle.display,
        visibility: computedStyle.visibility,
        opacity: computedStyle.opacity
      });
    } else {
      console.log(`🎨 ${id}: Not found`);
    }
  });
  
  console.log('🔍 === END DIAGNOSTIC ===');
};

window.forceFixAuthUI = function() {
  console.log('🔧 Force fixing authentication UI...');
  checkAndRestoreAuth();
  fixedUpdateAuthUI();
  fixButtonHandlers();
};

window.testSignInFixed = function(email = 'test@example.com', password = 'password123') {
  console.log('🧪 Testing fixed sign-in...');
  
  // Create test user if it doesn't exist
  let users = [];
  try {
    users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
  } catch (e) {
    users = [];
  }
  
  let testUser = users.find(u => u.email === email);
  if (!testUser) {
    testUser = {
      id: 'test_user_' + Date.now(),
      name: 'Test User',
      email: email,
      password: password,
      createdAt: new Date().toISOString()
    };
    users.push(testUser);
    localStorage.setItem('visualVibeUsers', JSON.stringify(users));
    console.log('✅ Test user created');
  }
  
  // Fill form and sign in
  const emailInput = document.getElementById('signInEmail');
  const passwordInput = document.getElementById('signInPassword');
  
  if (emailInput && passwordInput) {
    emailInput.value = email;
    passwordInput.value = password;
    fixedHandleSignIn();
  } else {
    console.error('❌ Form inputs not found');
  }
};

console.log('✅ AUTH UI STATE FIX: Complete');
console.log('🧪 Available commands:');
console.log('- diagnoseAuthUI() - Check authentication UI status');
console.log('- forceFixAuthUI() - Force fix authentication UI');
console.log('- testSignInFixed() - Test sign-in with test user');
console.log('🔑 Sign-in button and UI should now work correctly!');
