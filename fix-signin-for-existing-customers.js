// FIX SIGN IN FOR EXISTING CUSTOMERS
console.log('🔑 FIXING SIGN IN: Restoring sign in functionality for existing customers...');

// Clear any broken functions first
window.openSignInModal_DISABLED = window.openSignInModal;
window.handleSignIn_DISABLED = window.handleSignIn;

// WORKING SIGN IN MODAL FUNCTION
window.openSignInModal = function() {
  console.log('🔑 Opening sign in modal...');
  
  try {
    const modal = document.getElementById('signInModal');
    if (!modal) {
      console.error('❌ Sign in modal not found');
      alert('Sign in form not available. Please refresh the page.');
      return;
    }
    
    // Show modal
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    modal.style.opacity = '1';
    modal.style.visibility = 'visible';
    
    // Focus on email input
    const emailInput = document.getElementById('signInEmail');
    if (emailInput) {
      setTimeout(() => emailInput.focus(), 200);
    }
    
    console.log('✅ Sign in modal opened successfully');
  } catch (error) {
    console.error('❌ Error opening sign in modal:', error);
    alert('Error opening sign in form. Please refresh the page.');
  }
};

// WORKING SIGN IN HANDLER FOR EXISTING CUSTOMERS
window.handleSignIn = function(e) {
  if (e) e.preventDefault();
  console.log('🔑 Processing sign in for existing customer...');
  
  try {
    const emailInput = document.getElementById('signInEmail');
    const passwordInput = document.getElementById('signInPassword');
    
    if (!emailInput || !passwordInput) {
      alert('Sign in form not found. Please refresh the page.');
      return;
    }
    
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;
    
    console.log('🔍 Attempting sign in for:', email);
    
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }
    
    // Get stored users - handle both formats
    let users = [];
    try {
      const userData = localStorage.getItem('visualVibeUsers');
      if (userData) {
        users = JSON.parse(userData);
        console.log('📚 Found', users.length, 'users in storage');
      }
    } catch (error) {
      console.error('❌ Error reading users:', error);
      users = [];
    }
    
    // Find matching user (case-insensitive email)
    const user = users.find(u => {
      if (!u || !u.email) return false;
      return u.email.toLowerCase() === email && u.password === password;
    });
    
    if (user) {
      // SUCCESS: Create user session
      console.log('✅ User found, creating session...');
      
      window.currentUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        loginTime: new Date().toISOString(),
        lastActivity: new Date().toISOString()
      };
      
      // Save session
      localStorage.setItem('currentUser', JSON.stringify(window.currentUser));
      
      // Update last login
      user.lastLogin = new Date().toISOString();
      localStorage.setItem('visualVibeUsers', JSON.stringify(users));
      
      // Update UI
      updateAuthUI();
      
      // Close modal
      closeSignInModal();
      
      // Success message
      alert('✅ Welcome back, ' + user.name + '!');
      console.log('✅ Sign in successful for:', user.name);
      
    } else {
      // Check if email exists (for better error messages)
      const emailExists = users.find(u => u && u.email && u.email.toLowerCase() === email);
      
      if (emailExists) {
        alert('❌ Incorrect password for this email address. Please try again.');
        console.log('❌ Wrong password for existing email:', email);
      } else {
        alert('❌ No account found with this email address. Please sign up first or check your email spelling.');
        console.log('❌ No account found for email:', email);
      }
    }
    
  } catch (error) {
    console.error('❌ Error in sign in process:', error);
    alert('Sign in error. Please try again.');
  }
};

// CLOSE MODAL FUNCTION
window.closeSignInModal = function() {
  console.log('🔒 Closing sign in modal...');
  try {
    const modal = document.getElementById('signInModal');
    if (modal) {
      modal.classList.add('hidden');
      modal.style.display = 'none';
      
      // Reset form
      const form = document.getElementById('signInForm');
      if (form) form.reset();
    }
  } catch (error) {
    console.error('Error closing sign in modal:', error);
  }
};

// UPDATE AUTH UI FUNCTION
function updateAuthUI() {
  console.log('🔄 Updating auth UI...');
  
  try {
    const signedOutState = document.getElementById('signedOutState');
    const signedInState = document.getElementById('signedInState');
    const mobileSignedOutState = document.getElementById('mobileSignedOutState');
    const mobileSignedInState = document.getElementById('mobileSignedInState');
    const userNameSpan = document.getElementById('userName');
    
    if (window.currentUser) {
      // User is signed in
      if (signedOutState) {
        signedOutState.style.display = 'none';
        signedOutState.classList.add('hidden');
      }
      if (signedInState) {
        signedInState.style.display = 'flex';
        signedInState.classList.remove('hidden');
        signedInState.style.visibility = 'visible';
      }
      if (mobileSignedOutState) {
        mobileSignedOutState.style.display = 'none';
        mobileSignedOutState.classList.add('hidden');
      }
      if (mobileSignedInState) {
        mobileSignedInState.style.display = 'block';
        mobileSignedInState.classList.remove('hidden');
        mobileSignedInState.style.visibility = 'visible';
      }
      if (userNameSpan) {
        userNameSpan.textContent = window.currentUser.name;
      }
      
      console.log('✅ UI updated for signed in user:', window.currentUser.name);
    } else {
      // User is signed out
      if (signedOutState) {
        signedOutState.style.display = 'flex';
        signedOutState.classList.remove('hidden');
      }
      if (signedInState) {
        signedInState.style.display = 'none';
        signedInState.classList.add('hidden');
      }
      if (mobileSignedOutState) {
        mobileSignedOutState.style.display = 'block';
        mobileSignedOutState.classList.remove('hidden');
      }
      if (mobileSignedInState) {
        mobileSignedInState.style.display = 'none';
        mobileSignedInState.classList.add('hidden');
      }
      
      console.log('✅ UI updated for signed out user');
    }
  } catch (error) {
    console.error('❌ Error updating auth UI:', error);
  }
}

window.updateAuthUI = updateAuthUI;

// SETUP FORM LISTENERS
function setupSignInFormListener() {
  console.log('🔗 Setting up sign in form listener...');
  
  const signInForm = document.getElementById('signInForm');
  if (signInForm) {
    // Remove any existing listeners
    signInForm.removeEventListener('submit', window.handleSignIn);
    
    // Add our listener
    signInForm.addEventListener('submit', window.handleSignIn);
    signInForm.onsubmit = window.handleSignIn;
    
    console.log('✅ Sign in form listener attached');
  } else {
    console.log('⏳ Sign in form not found, will retry...');
  }
}

// RESTORE SESSION IF EXISTS
function restoreSession() {
  try {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      if (userData && userData.name && userData.email) {
        window.currentUser = userData;
        console.log('✅ Session restored for:', userData.name);
        updateAuthUI();
      }
    }
  } catch (error) {
    console.error('❌ Error restoring session:', error);
    localStorage.removeItem('currentUser');
  }
}

// SIGN OUT FUNCTION
window.signOut = function() {
  console.log('🚪 Signing out user...');
  window.currentUser = null;
  localStorage.removeItem('currentUser');
  updateAuthUI();
  alert('✅ You have been signed out successfully.');
};

// INITIALIZE
function initializeSignIn() {
  console.log('🔧 Initializing sign in fix...');
  
  // Setup form listener immediately
  setupSignInFormListener();
  
  // Try again when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupSignInFormListener);
  }
  
  // Also try after delays
  setTimeout(setupSignInFormListener, 100);
  setTimeout(setupSignInFormListener, 500);
  setTimeout(setupSignInFormListener, 1000);
  
  // Restore any existing session
  restoreSession();
  
  console.log('✅ Sign in fix initialized');
}

// Start initialization
initializeSignIn();

// TEST FUNCTION - Available in console
window.testSignIn = function(email = 'test@example.com', password = 'test123') {
  console.log('🧪 Testing sign in with:', email);
  
  const emailInput = document.getElementById('signInEmail');
  const passwordInput = document.getElementById('signInPassword');
  
  if (emailInput && passwordInput) {
    emailInput.value = email;
    passwordInput.value = password;
    window.handleSignIn();
  } else {
    console.log('❌ Sign in form not found');
  }
};

console.log('✅ SIGN IN FIX COMPLETE!');
console.log('🔧 Available functions:');
console.log('- openSignInModal() - Open sign in modal');
console.log('- testSignIn() - Test sign in functionality');
console.log('- signOut() - Sign out current user');
