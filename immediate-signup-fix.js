// IMMEDIATE AUTHENTICATION FIX - Complete sign in and sign up solution
console.log('🚀 IMMEDIATE AUTH FIX: Loading complete authentication system...');

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
    
    // Get stored users
    const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
    const user = users.find(u => u.email.toLowerCase() === email && u.password === password);
    
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
      const existingUser = users.find(u => u.email.toLowerCase() === email);
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
    
    // Get existing users
    const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
    
    // Check if email already exists
    const existingUser = users.find(u => u.email.toLowerCase() === email);
    if (existingUser) {
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
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name: name,
      email: email,
      password: password,
      orders: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('visualVibeUsers', JSON.stringify(users));
    
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
    console.log('✅ User signed up:', name);
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
      window.currentUser = JSON.parse(savedUser);
      console.log('✅ User session restored:', window.currentUser.name);
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
    updateAuthUI: typeof window.updateAuthUI
  });
}

// Start immediately
initialize();

// Also initialize when DOM is ready (backup)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  setTimeout(initialize, 100);
}
