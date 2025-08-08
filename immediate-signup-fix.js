// CLEAN AUTH BUTTON FIX - Replace complex system with simple working solution
console.log('🔧 CLEAN AUTH FIX: Starting simple authentication system...');

// Clear any existing broken auth functions and conflicts
function clearAuthConflicts() {
  const functionsToClean = [
    'handleSignUp_EMERGENCY_DISABLED',
    'handleSignUp_DISABLED_BY_SIMPLE_OVERRIDE',
    'handleSignUp_AUTH_SYSTEM_DISABLED',
    'CrossDeviceAuth',
    'originalHandleSignUp',
    'originalHandleSignIn'
  ];
  
  functionsToClean.forEach(fn => {
    try {
      if (window[fn]) {
        delete window[fn];
      }
    } catch (e) {}
  });
  
  console.log('✅ Auth conflicts cleared');
}

// Clean and simple modal functions
function setupModalFunctions() {
  window.openSignInModal = function() {
    console.log('🔑 Opening sign in modal...');
    
    const modal = document.getElementById('signInModal');
    if (!modal) {
      console.error('❌ Sign in modal not found');
      alert('Sign in form not available. Please refresh the page.');
      return;
    }
    
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    modal.style.opacity = '1';
    
    // Focus on email input
    const emailInput = document.getElementById('signInEmail');
    if (emailInput) {
      setTimeout(() => emailInput.focus(), 100);
    }
    
    console.log('✅ Sign in modal opened');
  };

  window.openSignUpModal = function() {
    console.log('📝 Opening sign up modal...');
    
    const modal = document.getElementById('signUpModal');
    if (!modal) {
      console.error('❌ Sign up modal not found');
      alert('Sign up form not available. Please refresh the page.');
      return;
    }
    
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    modal.style.opacity = '1';
    
    // Focus on name input
    const nameInput = document.getElementById('signUpName');
    if (nameInput) {
      setTimeout(() => nameInput.focus(), 100);
    }
    
    console.log('��� Sign up modal opened');
  };

  window.closeSignInModal = function() {
    console.log('🔒 Closing sign in modal...');
    const modal = document.getElementById('signInModal');
    if (modal) {
      modal.classList.add('hidden');
      modal.style.display = 'none';
      
      // Reset form
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
      
      // Reset form
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
  
  console.log('✅ Modal functions setup complete');
}

// Simple form handlers
function setupFormHandlers() {
  window.handleSignIn = function(e) {
    if (e) e.preventDefault();
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
    let users = [];
    try {
      const userData = localStorage.getItem('visualVibeUsers');
      if (userData) {
        users = JSON.parse(userData);
      }
    } catch (error) {
      console.error('Error reading users:', error);
    }
    
    // Find user
    const user = users.find(u => 
      u && u.email && u.email.toLowerCase() === email && u.password === password
    );
    
    if (user) {
      // Successful login
      window.currentUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        loginTime: new Date().toISOString()
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
      const existingUser = users.find(u => u && u.email && u.email.toLowerCase() === email);
      if (existingUser) {
        alert('Incorrect password. Please try again.');
      } else {
        alert('No account found with this email. Please sign up first.');
      }
    }
  };

  window.handleSignUp = function(e) {
    if (e) e.preventDefault();
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
    
    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    
    // Get existing users
    let users = [];
    try {
      const userData = localStorage.getItem('visualVibeUsers');
      if (userData) {
        users = JSON.parse(userData);
      }
    } catch (error) {
      console.error('Error reading users:', error);
      users = [];
    }
    
    // Check if email already exists
    const existingUser = users.find(u => 
      u && u.email && u.email.toLowerCase() === email
    );
    
    if (existingUser) {
      alert('An account with this email already exists. Please sign in instead.');
      setTimeout(() => {
        window.closeSignUpModal();
        window.openSignInModal();
        // Pre-fill email
        const signInEmail = document.getElementById('signInEmail');
        if (signInEmail) signInEmail.value = emailInput.value;
      }, 1000);
      return;
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name: name,
      email: email,
      password: password,
      orders: [],
      createdAt: new Date().toISOString()
    };
    
    // Add user and save
    users.push(newUser);
    try {
      localStorage.setItem('visualVibeUsers', JSON.stringify(users));
    } catch (error) {
      console.error('Error saving users:', error);
      alert('Failed to create account. Please try again.');
      return;
    }
    
    // Auto sign in
    window.currentUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      loginTime: new Date().toISOString()
    };
    
    localStorage.setItem('currentUser', JSON.stringify(window.currentUser));
    
    // Update UI
    updateAuthUI();
    window.closeSignUpModal();
    alert('Account created successfully! Welcome, ' + name + '!');
    console.log('✅ User signed up:', name);
  };
  
  console.log('✅ Form handlers setup complete');
}

// Simple UI update function
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

window.updateAuthUI = updateAuthUI;

// Setup form event listeners
function setupFormListeners() {
  const signInForm = document.getElementById('signInForm');
  const signUpForm = document.getElementById('signUpForm');
  
  if (signInForm) {
    // Remove existing listeners
    signInForm.removeEventListener('submit', window.handleSignIn);
    signInForm.addEventListener('submit', window.handleSignIn);
    console.log('✅ Sign in form listener attached');
  }
  
  if (signUpForm) {
    // Remove existing listeners
    signUpForm.removeEventListener('submit', window.handleSignUp);
    signUpForm.addEventListener('submit', window.handleSignUp);
    console.log('✅ Sign up form listener attached');
  }
}

// Sign out function
window.signOut = function() {
  console.log('🚪 Signing out...');
  window.currentUser = null;
  localStorage.removeItem('currentUser');
  updateAuthUI();
  alert('You have been signed out successfully.');
};

// Restore session if exists
function restoreSession() {
  try {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      if (userData && userData.name && userData.email) {
        window.currentUser = userData;
        console.log('✅ Session restored:', userData.name);
        updateAuthUI();
      }
    }
  } catch (error) {
    console.error('Error restoring session:', error);
    localStorage.removeItem('currentUser');
  }
}

// Initialize everything
function initialize() {
  console.log('🔧 Initializing clean auth system...');
  
  // Clear conflicts first
  clearAuthConflicts();
  
  // Setup all functions
  setupModalFunctions();
  setupFormHandlers();
  
  // Setup form listeners when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupFormListeners);
  } else {
    setupFormListeners();
  }
  
  // Also try after a short delay
  setTimeout(setupFormListeners, 500);
  
  // Restore session
  restoreSession();
  
  console.log('✅ Clean auth system initialized');
}

// Start initialization
initialize();

// Test the functions
console.log('🧪 Testing auth functions:', {
  openSignInModal: typeof window.openSignInModal,
  openSignUpModal: typeof window.openSignUpModal,
  handleSignIn: typeof window.handleSignIn,
  handleSignUp: typeof window.handleSignUp,
  updateAuthUI: typeof window.updateAuthUI
});

console.log('✅ CLEAN AUTH FIX: Complete! Sign in and sign up buttons should now work.');
