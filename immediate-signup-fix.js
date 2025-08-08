// COMPLETE AUTHENTICATION SYSTEM FIX - Restore all functionality
console.log('🔧 COMPLETE AUTH SYSTEM FIX: Starting comprehensive restoration...');

// Step 1: Define all required modal functions
function defineModalFunctions() {
  console.log('🔧 Defining modal functions...');
  
  // Open Sign In Modal
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
    
    const emailInput = document.getElementById('signInEmail');
    if (emailInput) {
      setTimeout(() => emailInput.focus(), 100);
    }
    
    console.log('✅ Sign in modal opened');
  };

  // Open Sign Up Modal
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
    
    const nameInput = document.getElementById('signUpName');
    if (nameInput) {
      setTimeout(() => nameInput.focus(), 100);
    }
    
    console.log('✅ Sign up modal opened');
  };

  // Close Modal Functions
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

  // Switch Functions
  window.switchToSignUp = function() {
    window.closeSignInModal();
    setTimeout(() => window.openSignUpModal(), 100);
  };

  window.switchToSignIn = function() {
    window.closeSignUpModal();
    setTimeout(() => window.openSignInModal(), 100);
  };

  console.log('✅ Modal functions defined');
}

// Step 2: Define comprehensive UI update function
function defineUIUpdateFunction() {
  console.log('🔧 Defining UI update function...');
  
  window.updateAuthUI = function() {
    console.log('🔄 UPDATE AUTH UI: Running comprehensive update...');
    
    const signedOutState = document.getElementById('signedOutState');
    const signedInState = document.getElementById('signedInState');
    const mobileSignedOutState = document.getElementById('mobileSignedOutState');
    const mobileSignedInState = document.getElementById('mobileSignedInState');
    const userNameSpan = document.getElementById('userName');
    const welcomeBanner = document.getElementById('welcomeBanner');
    
    console.log('🔍 Elements found:', {
      signedOutState: !!signedOutState,
      signedInState: !!signedInState,
      mobileSignedOutState: !!mobileSignedOutState,
      mobileSignedInState: !!mobileSignedInState,
      currentUser: !!window.currentUser
    });

    if (window.currentUser) {
      console.log('✅ User is authenticated:', window.currentUser.name);
      
      // HIDE SIGNED OUT STATES
      if (signedOutState) {
        signedOutState.classList.add('hidden');
        signedOutState.style.display = 'none';
        signedOutState.style.visibility = 'hidden';
        console.log('🖥️ Hidden desktop signed-out state');
      }
      
      if (mobileSignedOutState) {
        mobileSignedOutState.classList.add('hidden');
        mobileSignedOutState.style.display = 'none';
        mobileSignedOutState.style.visibility = 'hidden';
        console.log('📱 Hidden mobile signed-out state');
      }
      
      // SHOW SIGNED IN STATES WITH MAXIMUM FORCE
      if (signedInState) {
        signedInState.classList.remove('hidden');
        signedInState.style.display = 'flex';
        signedInState.style.visibility = 'visible';
        signedInState.style.opacity = '1';
        signedInState.style.position = 'relative';
        signedInState.style.zIndex = 'auto';
        
        // Force child buttons to be visible
        const childButtons = signedInState.querySelectorAll('button');
        childButtons.forEach(btn => {
          btn.style.display = 'flex';
          btn.style.visibility = 'visible';
          btn.style.opacity = '1';
        });
        
        console.log('🖥️ FORCED desktop signed-in state visible with', childButtons.length, 'buttons');
      }
      
      if (mobileSignedInState) {
        mobileSignedInState.classList.remove('hidden');
        mobileSignedInState.style.display = 'block';
        mobileSignedInState.style.visibility = 'visible';
        mobileSignedInState.style.opacity = '1';
        mobileSignedInState.style.position = 'relative';
        mobileSignedInState.style.zIndex = 'auto';
        
        // Force child buttons to be visible
        const childButtons = mobileSignedInState.querySelectorAll('button');
        childButtons.forEach(btn => {
          btn.style.display = 'flex';
          btn.style.visibility = 'visible';
          btn.style.opacity = '1';
        });
        
        console.log('📱 FORCED mobile signed-in state visible with', childButtons.length, 'buttons');
      }
      
      // Update user name
      if (userNameSpan) {
        userNameSpan.textContent = window.currentUser.name;
        console.log('👤 Updated user name display');
      }
      
      // Show welcome banner
      if (welcomeBanner) {
        welcomeBanner.classList.remove('hidden');
        welcomeBanner.style.display = 'block';
        
        const welcomeMessage = document.getElementById('welcomeMessage');
        if (welcomeMessage) {
          welcomeMessage.textContent = `Welcome, ${window.currentUser.name}! 👋`;
        }
        console.log('🎉 Showed welcome banner');
      }
      
    } else {
      console.log('🚪 User is NOT authenticated');
      
      // SHOW SIGNED OUT STATES
      if (signedOutState) {
        signedOutState.classList.remove('hidden');
        signedOutState.style.display = 'flex';
        signedOutState.style.visibility = 'visible';
        signedOutState.style.opacity = '1';
        console.log('🖥️ Showed desktop signed-out state');
      }
      
      if (mobileSignedOutState) {
        mobileSignedOutState.classList.remove('hidden');
        mobileSignedOutState.style.display = 'block';
        mobileSignedOutState.style.visibility = 'visible';
        mobileSignedOutState.style.opacity = '1';
        console.log('📱 Showed mobile signed-out state');
      }
      
      // HIDE SIGNED IN STATES
      if (signedInState) {
        signedInState.classList.add('hidden');
        signedInState.style.display = 'none';
        signedInState.style.visibility = 'hidden';
        console.log('🖥️ Hidden desktop signed-in state');
      }
      
      if (mobileSignedInState) {
        mobileSignedInState.classList.add('hidden');
        mobileSignedInState.style.display = 'none';
        mobileSignedInState.style.visibility = 'hidden';
        console.log('📱 Hidden mobile signed-in state');
      }
      
      // Hide welcome banner
      if (welcomeBanner) {
        welcomeBanner.classList.add('hidden');
        welcomeBanner.style.display = 'none';
        console.log('🙈 Hidden welcome banner');
      }
    }
    
    // Force DOM reflow
    document.body.offsetHeight;
    
    console.log('✅ UPDATE AUTH UI: Complete');
  };
  
  console.log('✅ UI update function defined');
}

// Step 3: Define authentication handlers
function defineAuthHandlers() {
  console.log('🔧 Defining authentication handlers...');
  
  // Sign In Handler
  window.handleSignIn = function(e) {
    if (e) e.preventDefault();
    console.log('🔑 PROCESSING SIGN IN...');
    
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
      console.log('✅ User found, creating session...');
      
      // Create session
      window.currentUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        loginTime: new Date().toISOString()
      };
      
      localStorage.setItem('currentUser', JSON.stringify(window.currentUser));
      
      // Close modal
      window.closeSignInModal();
      
      // Force UI update with multiple attempts
      console.log('🔄 Forcing UI update after sign in...');
      setTimeout(() => window.updateAuthUI(), 50);
      setTimeout(() => window.updateAuthUI(), 200);
      setTimeout(() => window.updateAuthUI(), 500);
      
      alert('Welcome back, ' + user.name + '!');
      console.log('✅ Sign in complete');
    } else {
      const existingUser = users.find(u => u && u.email && u.email.toLowerCase() === email);
      if (existingUser) {
        alert('Incorrect password. Please try again.');
      } else {
        alert('No account found with this email. Please sign up first.');
      }
    }
  };

  // Sign Up Handler
  window.handleSignUp = function(e) {
    if (e) e.preventDefault();
    console.log('📝 PROCESSING SIGN UP...');
    
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
    
    // Validation
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
    
    // Check for duplicate
    const existingUser = users.find(u => 
      u && u.email && u.email.toLowerCase() === email
    );
    
    if (existingUser) {
      alert('An account with this email already exists. Please sign in instead.');
      return;
    }
    
    console.log('✅ Creating new user account...');
    
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
    
    // Close modal and clear form
    window.closeSignUpModal();
    nameInput.value = '';
    emailInput.value = '';
    passwordInput.value = '';
    confirmPasswordInput.value = '';
    
    // Force UI update with multiple attempts
    console.log('🔄 Forcing UI update after sign up...');
    setTimeout(() => window.updateAuthUI(), 50);
    setTimeout(() => window.updateAuthUI(), 200);
    setTimeout(() => window.updateAuthUI(), 500);
    
    alert('Account created successfully! Welcome, ' + name + '!');
    console.log('✅ Sign up complete');
  };

  // Sign Out Handler
  window.signOut = function() {
    console.log('🚪 PROCESSING SIGN OUT...');
    
    window.currentUser = null;
    localStorage.removeItem('currentUser');
    
    // Force UI update immediately
    window.updateAuthUI();
    
    alert('You have been signed out successfully.');
    console.log('✅ Sign out complete');
  };

  // Profile and Orders placeholder functions
  window.openProfileModal = function() {
    alert('Profile editing feature coming soon! Your account is active and working.');
  };

  window.showOrderHistory = function() {
    alert('Order history feature coming soon! Your account is active and working.');
  };

  console.log('✅ Authentication handlers defined');
}

// Step 4: Setup form listeners
function setupFormListeners() {
  console.log('🔧 Setting up form listeners...');
  
  setTimeout(() => {
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');
    
    if (signInForm) {
      signInForm.removeEventListener('submit', window.handleSignIn);
      signInForm.addEventListener('submit', window.handleSignIn);
      console.log('✅ Sign in form listener attached');
    }
    
    if (signUpForm) {
      signUpForm.removeEventListener('submit', window.handleSignUp);
      signUpForm.addEventListener('submit', window.handleSignUp);
      console.log('✅ Sign up form listener attached');
    }
  }, 500);
}

// Step 5: Restore session if exists
function restoreSession() {
  console.log('🔄 Checking for existing session...');
  
  setTimeout(() => {
    try {
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        if (userData && userData.name && userData.email) {
          window.currentUser = userData;
          console.log('✅ Session restored for:', userData.name);
          
          // Force UI update for restored session
          window.updateAuthUI();
        }
      } else {
        console.log('📋 No existing session found');
        window.currentUser = null;
        window.updateAuthUI();
      }
    } catch (error) {
      console.error('❌ Error restoring session:', error);
      localStorage.removeItem('currentUser');
      window.currentUser = null;
      window.updateAuthUI();
    }
  }, 1000);
}

// Step 6: Initialize everything
function initializeCompleteAuthSystem() {
  console.log('🚀 INITIALIZING COMPLETE AUTH SYSTEM...');
  
  defineModalFunctions();
  defineUIUpdateFunction();
  defineAuthHandlers();
  setupFormListeners();
  restoreSession();
  
  console.log('✅ COMPLETE AUTH SYSTEM: Initialized successfully');
}

// Execute immediately
initializeCompleteAuthSystem();

// Manual testing functions
window.testAuthSystem = function() {
  console.log('🧪 TESTING AUTH SYSTEM...');
  console.log('Functions available:', {
    openSignInModal: typeof window.openSignInModal,
    openSignUpModal: typeof window.openSignUpModal,
    handleSignIn: typeof window.handleSignIn,
    handleSignUp: typeof window.handleSignUp,
    updateAuthUI: typeof window.updateAuthUI,
    signOut: typeof window.signOut
  });
  
  console.log('Testing modal opening...');
  window.openSignUpModal();
  setTimeout(() => {
    window.closeSignUpModal();
    console.log('✅ Auth system test complete');
  }, 2000);
};

window.forceUIUpdate = function() {
  console.log('🔧 MANUAL UI UPDATE...');
  window.updateAuthUI();
};

window.debugCurrentState = function() {
  console.log('🔍 CURRENT AUTH STATE:', {
    currentUser: window.currentUser,
    signedOutVisible: !document.getElementById('signedOutState')?.classList.contains('hidden'),
    signedInVisible: !document.getElementById('signedInState')?.classList.contains('hidden'),
    mobileSignedOutVisible: !document.getElementById('mobileSignedOutState')?.classList.contains('hidden'),
    mobileSignedInVisible: !document.getElementById('mobileSignedInState')?.classList.contains('hidden')
  });
};

console.log('✅ COMPLETE AUTH SYSTEM FIX: Ready - Sign in/up buttons and signed-in state should work properly');
console.log('🧪 Available test commands:');
console.log('- testAuthSystem() - Test all auth functions');
console.log('- forceUIUpdate() - Manually update UI');
console.log('- debugCurrentState() - Check current state');
