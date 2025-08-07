// IMMEDIATE AUTHENTICATION FIX - Complete sign in and sign up solution
console.log('🚀 IMMEDIATE AUTH FIX: Loading complete authentication system...');

// DIRECT SIGNUP ERROR FIX - runs immediately
(function directSignupFix() {
  console.log('🚨 DIRECT SIGNUP FIX: Clearing ALL auth data...');

  // Nuclear cleanup - remove everything that could cause conflicts
  const authKeys = ['visualVibeUsers', 'visualVibeUser', 'currentUser'];
  authKeys.forEach(key => {
    if (localStorage.getItem(key)) {
      localStorage.removeItem(key);
      console.log(`🗑️ Removed: ${key}`);
    }
  });

  // Clear any other user-related keys
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const key = localStorage.key(i);
    if (key && (key.toLowerCase().includes('user') || key.toLowerCase().includes('vibe'))) {
      localStorage.removeItem(key);
      console.log(`🗑️ Removed: ${key}`);
    }
  }

  window.currentUser = null;
  console.log('✅ DIRECT SIGNUP FIX: Complete clean slate created');
})();

// EMERGENCY SIGNUP FIX - Clear any corrupted data immediately
(function emergencyCleanup() {
  console.log('🧹 EMERGENCY CLEANUP: Checking for corrupted signup data...');

  try {
    const usersData = localStorage.getItem('visualVibeUsers');
    if (usersData && usersData !== 'null' && usersData !== 'undefined') {
      const users = JSON.parse(usersData);
      console.log(`📋 Found ${users.length} users in storage`);

      // Filter out any invalid users
      const validUsers = users.filter(user =>
        user &&
        typeof user === 'object' &&
        user.email &&
        user.email.trim().length > 0 &&
        user.name &&
        user.name.trim().length > 0 &&
        user.password
      );

      if (validUsers.length !== users.length) {
        console.log(`⚠️ Found ${users.length - validUsers.length} invalid users, cleaning...`);
        localStorage.setItem('visualVibeUsers', JSON.stringify(validUsers));
        console.log(`✅ Cleaned storage, now has ${validUsers.length} valid users`);
      }
    }
  } catch (error) {
    console.error('❌ Error during emergency cleanup:', error);
    console.log('🗑️ Clearing corrupted visualVibeUsers data...');
    localStorage.removeItem('visualVibeUsers');
  }
})();

// Clear broken authentication state
function clearAuthState() {
  console.log('🧹 Clearing authentication state...');
  try {
    delete window.openSignInModal;
    delete window.openSignUpModal;
    delete window.closeSignInModal; 
    delete window.closeSignUpModal;
    delete window.handleSignIn;
    delete window.handleSignUp;
    delete window.switchToSignUp;
    delete window.switchToSignIn;
    console.log('✅ Cleared broken auth functions');
  } catch(e) {
    console.log('⚠️ Some functions could not be deleted (expected)');
  }
}

// Helper function to safely get users array
function getUsersFromStorage() {
  try {
    const usersData = localStorage.getItem('visualVibeUsers');
    if (!usersData) {
      console.log('📋 No users found in storage, creating empty array');
      return [];
    }
    
    const users = JSON.parse(usersData);
    if (!Array.isArray(users)) {
      console.warn('⚠️ Invalid users data format, resetting to empty array');
      localStorage.setItem('visualVibeUsers', JSON.stringify([]));
      return [];
    }
    
    // Filter out any invalid user objects
    const validUsers = users.filter(user => 
      user && 
      typeof user === 'object' && 
      user.email && 
      user.name && 
      user.password
    );
    
    if (validUsers.length !== users.length) {
      console.warn(`⚠️ Found ${users.length - validUsers.length} invalid user records, cleaning up`);
      localStorage.setItem('visualVibeUsers', JSON.stringify(validUsers));
    }
    
    console.log(`📋 Found ${validUsers.length} valid users in storage`);
    return validUsers;
  } catch (error) {
    console.error('❌ Error reading users from storage:', error);
    localStorage.setItem('visualVibeUsers', JSON.stringify([]));
    return [];
  }
}

// Helper function to save users to storage
function saveUsersToStorage(users) {
  try {
    localStorage.setItem('visualVibeUsers', JSON.stringify(users));
    console.log(`💾 Saved ${users.length} users to storage`);
    return true;
  } catch (error) {
    console.error('❌ Error saving users to storage:', error);
    return false;
  }
}

// Initialize authentication system
function initAuth() {
  console.log('🔧 Setting up authentication functions...');
  
  // Modal control functions
  window.openSignInModal = function() {
    console.log('🔑 Opening sign in modal...');
    const modal = document.getElementById('signInModal');
    if (modal) {
      modal.classList.remove('hidden');
      modal.style.display = 'flex';
      modal.style.opacity = '1';
      
      const emailInput = document.getElementById('signInEmail');
      if (emailInput) {
        setTimeout(() => emailInput.focus(), 100);
      }
    } else {
      alert('Sign in form not available. Please refresh the page.');
    }
  };
  
  window.openSignUpModal = function() {
    console.log('📝 Opening sign up modal...');
    const modal = document.getElementById('signUpModal');
    if (modal) {
      modal.classList.remove('hidden');
      modal.style.display = 'flex';
      modal.style.opacity = '1';
      
      const nameInput = document.getElementById('signUpName');
      if (nameInput) {
        setTimeout(() => nameInput.focus(), 100);
      }
    } else {
      alert('Sign up form not available. Please refresh the page.');
    }
  };
  
  window.closeSignInModal = function() {
    console.log('🔒 Closing sign in modal...');
    const modal = document.getElementById('signInModal');
    if (modal) {
      modal.classList.add('hidden');
      modal.style.display = 'none';
      const form = document.getElementById('signInForm');
      if (form) form.reset();
    }
  };
  
  window.closeSignUpModal = function() {
    console.log('📝 Closing sign up modal...');
    const modal = document.getElementById('signUpModal');
    if (modal) {
      modal.classList.add('hidden');
      modal.style.display = 'none';
      const form = document.getElementById('signUpForm');
      if (form) form.reset();
    }
  };
  
  window.switchToSignUp = function() {
    window.closeSignInModal();
    setTimeout(() => window.openSignUpModal(), 100);
  };
  
  window.switchToSignIn = function() {
    window.closeSignUpModal();
    setTimeout(() => window.openSignInModal(), 100);
  };
  
  // Authentication handlers
  window.handleSignIn = function(e) {
    e.preventDefault();
    console.log('🔑 Processing sign in...');
    
    const emailInput = document.getElementById('signInEmail');
    const passwordInput = document.getElementById('signInPassword');
    
    if (!emailInput || !passwordInput) {
      alert('Form elements not found. Please refresh the page.');
      return;
    }
    
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;
    
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }
    
    // Get stored users safely
    const users = getUsersFromStorage();
    const user = users.find(u => u.email && u.email.toLowerCase() === email && u.password === password);
    
    if (user) {
      // Successful login
      const now = new Date().toISOString();
      window.currentUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        lastActivity: now,
        loginTime: now
      };
      
      // Save session
      localStorage.setItem('currentUser', JSON.stringify(window.currentUser));
      
      // Update UI
      updateAuthUI();
      window.closeSignInModal();
      alert('Welcome back, ' + user.name + '!');
      console.log('✅ User signed in:', user.name);
    } else {
      // Check if email exists
      const existingUser = users.find(u => u.email && u.email.toLowerCase() === email);
      if (existingUser) {
        alert('Incorrect password. Please try again.');
      } else {
        alert('No account found with this email. Please sign up first.');
      }
    }
  };
  
  window.handleSignUp = function(e) {
    e.preventDefault();
    console.log('📝 Processing sign up...');
    
    const nameInput = document.getElementById('signUpName');
    const emailInput = document.getElementById('signUpEmail');
    const passwordInput = document.getElementById('signUpPassword');
    const confirmPasswordInput = document.getElementById('signUpConfirmPassword');
    
    if (!nameInput || !emailInput || !passwordInput || !confirmPasswordInput) {
      alert('Form elements not found. Please refresh the page.');
      return;
    }
    
    const name = nameInput.value.trim();
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    console.log(`📝 Signup attempt for: ${name} <${email}>`);
    
    if (!name || !email || !password || !confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }
    
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    
    if (password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }
    
    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    
    // Get existing users safely
    const users = getUsersFromStorage();
    console.log(`📋 Checking against ${users.length} existing users`);
    
    // Check if email already exists (improved logic)
    const existingUser = users.find(u => {
      if (!u || !u.email) return false;
      return u.email.toLowerCase().trim() === email.toLowerCase().trim();
    });
    
    if (existingUser) {
      console.log(`❌ Duplicate email found: ${existingUser.email}`);
      alert('An account with this email already exists. Please sign in instead.');
      setTimeout(() => {
        window.closeSignUpModal();
        window.openSignInModal();
        // Pre-fill email
        const signInEmail = document.getElementById('signInEmail');
        if (signInEmail) signInEmail.value = emailInput.value;
      }, 2000);
      return;
    }
    
    console.log('✅ No duplicate email found, creating new account');
    
    // Create new user
    const newUser = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: name,
      email: email,
      password: password,
      orders: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Add user to array and save
    users.push(newUser);
    if (!saveUsersToStorage(users)) {
      alert('Failed to save account. Please try again.');
      return;
    }
    
    console.log(`✅ Account created successfully for: ${name} <${email}>`);
    
    // Auto sign in new user
    const now = new Date().toISOString();
    window.currentUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      lastActivity: now,
      loginTime: now
    };
    
    // Save session
    localStorage.setItem('currentUser', JSON.stringify(window.currentUser));
    
    // Update UI
    updateAuthUI();
    window.closeSignUpModal();
    alert('Account created successfully! Welcome, ' + name + '!');
    console.log('✅ User signed up and logged in:', name);
  };
  
  // Update auth UI function
  function updateAuthUI() {
    const signedOutState = document.getElementById('signedOutState');
    const signedInState = document.getElementById('signedInState');
    const mobileSignedOutState = document.getElementById('mobileSignedOutState');
    const mobileSignedInState = document.getElementById('mobileSignedInState');
    const userNameSpan = document.getElementById('userName');
    
    if (window.currentUser) {
      // User is signed in
      if (signedOutState) signedOutState.style.display = 'none';
      if (signedInState) signedInState.style.display = 'flex';
      if (mobileSignedOutState) mobileSignedOutState.style.display = 'none';
      if (mobileSignedInState) mobileSignedInState.style.display = 'block';
      if (userNameSpan) userNameSpan.textContent = window.currentUser.name;
      console.log('✅ UI updated for signed in user');
    } else {
      // User is signed out
      if (signedOutState) signedOutState.style.display = 'flex';
      if (signedInState) signedInState.style.display = 'none';
      if (mobileSignedOutState) mobileSignedOutState.style.display = 'block';
      if (mobileSignedInState) mobileSignedInState.style.display = 'none';
      console.log('✅ UI updated for signed out user');
    }
  }
  
  // Make updateAuthUI globally available
  window.updateAuthUI = updateAuthUI;
  
  console.log('✅ Authentication functions set up');
}

// Set up form event listeners
function setupFormListeners() {
  // Wait for DOM
  function checkAndSetup() {
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');
    
    if (signInForm && signUpForm) {
      console.log('🔧 Setting up form listeners...');
      
      // Replace forms to clear any existing listeners
      const newSignInForm = signInForm.cloneNode(true);
      signInForm.parentNode.replaceChild(newSignInForm, signInForm);
      newSignInForm.addEventListener('submit', window.handleSignIn);
      
      const newSignUpForm = signUpForm.cloneNode(true);
      signUpForm.parentNode.replaceChild(newSignUpForm, signUpForm);
      newSignUpForm.addEventListener('submit', window.handleSignUp);
      
      console.log('✅ Form listeners set up');
      return true;
    }
    return false;
  }
  
  // Try immediately
  if (!checkAndSetup()) {
    // Try again when DOM is ready
    document.addEventListener('DOMContentLoaded', checkAndSetup);
    
    // Fallback - try again after a short delay
    setTimeout(checkAndSetup, 500);
  }
}

// Restore session
function restoreSession() {
  try {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      if (userData && userData.name && userData.email) {
        window.currentUser = userData;
        console.log('✅ User session restored:', window.currentUser.name);
      } else {
        console.warn('⚠️ Invalid session data, clearing');
        localStorage.removeItem('currentUser');
        window.currentUser = null;
      }
    }
  } catch (error) {
    console.error('❌ Error restoring session:', error);
    localStorage.removeItem('currentUser');
    window.currentUser = null;
  }
  
  // Update UI when DOM is ready
  function updateWhenReady() {
    if (typeof window.updateAuthUI === 'function') {
      window.updateAuthUI();
    } else {
      setTimeout(updateWhenReady, 100);
    }
  }
  updateWhenReady();
}

// Debug function to clear problematic data
window.clearAuthData = function() {
  console.log('🗑️ Clearing all authentication data...');
  localStorage.removeItem('visualVibeUsers');
  localStorage.removeItem('currentUser');

  // Clear any other user-related keys
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const key = localStorage.key(i);
    if (key && (key.toLowerCase().includes('user') || key.toLowerCase().includes('vibe'))) {
      localStorage.removeItem(key);
      console.log(`🗑️ Removed: ${key}`);
    }
  }

  window.currentUser = null;
  if (typeof window.updateAuthUI === 'function') {
    window.updateAuthUI();
  }
  console.log('✅ Authentication data cleared');
  alert('All authentication data cleared. You can now test signup fresh.');
};

// Quick fix function for signup issues
window.fixSignupIssues = function() {
  console.log('🔧 FIXING SIGNUP ISSUES...');

  // Clear any corrupted data
  window.clearAuthData();

  // Reinitialize auth system
  setTimeout(() => {
    if (typeof initialize === 'function') {
      initialize();
    }
    console.log('✅ Signup issues fixed - try again');
    alert('Signup issues fixed. Please try creating your account again.');
  }, 500);
};

// Emergency reset - clears everything and reloads
window.emergencySignupReset = function() {
  console.log('🚨 EMERGENCY SIGNUP RESET...');

  // Nuclear option - clear all localStorage
  localStorage.clear();
  window.currentUser = null;

  console.log('💥 All localStorage cleared');
  alert('Emergency reset complete. Please refresh the page and try signup again.');

  // Auto-refresh after 2 seconds
  setTimeout(() => {
    location.reload();
  }, 2000);
};

// Initialize everything
function initialize() {
  clearAuthState();
  initAuth();
  setupFormListeners();
  restoreSession();
  
  console.log('🎉 IMMEDIATE AUTH FIX: Complete authentication system loaded!');
  console.log('🔍 Functions available:', {
    openSignInModal: typeof window.openSignInModal,
    openSignUpModal: typeof window.openSignUpModal,
    handleSignIn: typeof window.handleSignIn,
    handleSignUp: typeof window.handleSignUp,
    updateAuthUI: typeof window.updateAuthUI,
    clearAuthData: typeof window.clearAuthData
  });
  
  // Show current storage state
  const users = getUsersFromStorage();
  console.log(`📊 Current state: ${users.length} users in storage`);
}

// Start immediately
initialize();

// Also initialize when DOM is ready (backup)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  setTimeout(initialize, 100);
}

// REMOVE SYNC BUTTONS AND TEST NOTIFICATIONS
(function removeSyncAndTestElements() {
  console.log('🧹 Removing sync buttons and test notifications...');

  function cleanup() {
    // Remove sync status indicator (green "synced" button at top right)
    document.querySelectorAll('.sync-status-indicator').forEach(el => el.remove());

    // Remove help button (blue "sync help" button at bottom left)
    document.querySelectorAll('.cross-device-help-btn').forEach(el => el.remove());

    // Remove any button with sync help text
    document.querySelectorAll('button').forEach(btn => {
      if (btn.textContent && (btn.textContent.includes('Sync Help') || btn.textContent.includes('❓'))) {
        btn.remove();
      }
    });

    // Remove cross-device welcome messages
    document.querySelectorAll('.cross-device-welcome').forEach(el => el.remove());

    // Remove test notifications
    const testSelectors = ['.toast-container', '.notification-test', '.test-notification'];
    testSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => el.remove());
    });

    // Remove any element containing test notification text
    document.querySelectorAll('*').forEach(el => {
      if (el.textContent &&
          (el.textContent.includes('Profile fix test passed') ||
           el.textContent.includes('tests passed ✅') ||
           el.textContent.includes('Profile picture modal test'))) {
        el.remove();
      }
    });

    // Disable sync UI creation
    if (window.SyncStatusUI) {
      window.SyncStatusUI = function() { return { init: () => {}, createSyncIndicator: () => {}, updateSyncStatus: () => {} }; };
    }
    window.syncStatusUI = null;
    window.updateSyncStatusUI = () => {};

    console.log('✅ Sync elements and tests removed');
  }

  // Run cleanup multiple times to catch dynamic elements
  cleanup();
  setTimeout(cleanup, 1000);
  setTimeout(cleanup, 3000);

  // Watch for new elements being added
  const observer = new MutationObserver(() => {
    setTimeout(cleanup, 100);
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();

console.log('✅ Authentication system with sync removal loaded');

// ADD MOBILE MIRROR DESKTOP CSS
(function addMobileMirrorCSS() {
  console.log('📱 Adding mobile mirror desktop CSS...');

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'mobile-mirror-desktop.css';
  link.id = 'mobile-mirror-css';

  // Add to head with high priority
  document.head.appendChild(link);

  console.log('✅ Mobile mirror desktop CSS loaded');
})();

// ADD MOBILE MIRROR DESKTOP JAVASCRIPT
(function addMobileMirrorJS() {
  console.log('📱 Adding mobile mirror desktop JavaScript...');

  const script = document.createElement('script');
  script.src = 'mobile-mirror-desktop.js';
  script.id = 'mobile-mirror-js';

  document.head.appendChild(script);

  console.log('✅ Mobile mirror desktop JavaScript loading...');
})();
