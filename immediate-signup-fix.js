// FIX SIGN IN FUNCTIONALITY - Restore sign in while keeping signup working
console.log('🔧 FIXING SIGN IN: Restoring sign in functionality...');

// Restore complete authentication system
function restoreAuthSystem() {
  console.log('🔄 Restoring complete authentication system...');
  
  // Modal functions
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

  console.log('✅ Modal functions restored');
}

// Enhanced sign in handler
function createSignInHandler() {
  console.log('🔧 Creating sign in handler...');
  
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
    
    console.log(`🔍 Looking for user with email: ${email}`);
    
    // Get stored users safely
    let users = [];
    try {
      const userData = localStorage.getItem('visualVibeUsers');
      if (userData) {
        users = JSON.parse(userData);
        console.log(`📋 Found ${users.length} users in storage`);
        users.forEach((user, index) => {
          console.log(`  ${index + 1}. ${user.name} <${user.email}>`);
        });
      } else {
        console.log('📋 No users found in storage');
      }
    } catch (error) {
      console.error('❌ Error reading users:', error);
      users = [];
    }
    
    // Find user with matching credentials
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
      
      // Update UI
      if (typeof window.updateAuthUI === 'function') {
        setTimeout(() => window.updateAuthUI(), 100);
      }
      
      alert('Welcome back, ' + user.name + '!');
      console.log('✅ Sign in successful for:', user.name);
    } else {
      // Check if email exists with wrong password
      const existingUser = users.find(u => u && u.email && u.email.toLowerCase() === email);
      if (existingUser) {
        console.log('❌ Wrong password for existing user:', email);
        alert('Incorrect password. Please try again.');
      } else {
        console.log('❌ No user found with email:', email);
        alert('No account found with this email. Please sign up first.');
      }
    }
  };
  
  console.log('✅ Sign in handler created');
}

// Enhanced sign up handler (keeps working but doesn't wipe existing users)
function createSignUpHandler() {
  console.log('🔧 Creating enhanced sign up handler...');
  
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
    
    // Get existing users (preserve them)
    let users = [];
    try {
      const userData = localStorage.getItem('visualVibeUsers');
      if (userData) {
        users = JSON.parse(userData);
        console.log(`📋 Found ${users.length} existing users`);
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
      console.log('❌ User already exists:', email);
      alert('An account with this email already exists. Please sign in instead.');
      setTimeout(() => {
        window.closeSignUpModal();
        window.openSignInModal();
        const signInEmail = document.getElementById('signInEmail');
        if (signInEmail) signInEmail.value = email;
      }, 1000);
      return;
    }
    
    console.log('✅ Creating new user account...');
    
    // Create new user
    const newUser = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: name,
      email: email,
      password: password,
      orders: [],
      createdAt: new Date().toISOString()
    };
    
    // Add to existing users (don't replace)
    users.push(newUser);
    localStorage.setItem('visualVibeUsers', JSON.stringify(users));
    
    console.log(`💾 User added. Total users: ${users.length}`);
    
    // Create session
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
    
    // Update UI
    if (typeof window.updateAuthUI === 'function') {
      setTimeout(() => window.updateAuthUI(), 100);
    }
    
    alert('Account created successfully! Welcome, ' + name + '!');
    console.log('✅ Sign up successful for:', name);
  };
  
  console.log('✅ Enhanced sign up handler created');
}

// UI update function
function createUIUpdateFunction() {
  console.log('🔧 Creating UI update function...');
  
  window.updateAuthUI = function() {
    console.log('🔄 Updating auth UI...');
    
    const signedOutState = document.getElementById('signedOutState');
    const signedInState = document.getElementById('signedInState');
    const mobileSignedOutState = document.getElementById('mobileSignedOutState');
    const mobileSignedInState = document.getElementById('mobileSignedInState');
    const userNameSpan = document.getElementById('userName');
    
    if (window.currentUser) {
      console.log('✅ User authenticated:', window.currentUser.name);
      
      // Hide signed out states
      if (signedOutState) {
        signedOutState.classList.add('hidden');
        signedOutState.style.display = 'none';
      }
      if (mobileSignedOutState) {
        mobileSignedOutState.classList.add('hidden');
        mobileSignedOutState.style.display = 'none';
      }
      
      // Show signed in states
      if (signedInState) {
        signedInState.classList.remove('hidden');
        signedInState.style.display = 'flex';
        signedInState.style.visibility = 'visible';
        signedInState.style.opacity = '1';
      }
      if (mobileSignedInState) {
        mobileSignedInState.classList.remove('hidden');
        mobileSignedInState.style.display = 'block';
        mobileSignedInState.style.visibility = 'visible';
        mobileSignedInState.style.opacity = '1';
      }
      
      // Update user name
      if (userNameSpan) {
        userNameSpan.textContent = window.currentUser.name;
      }
      
      console.log('✅ UI updated for signed in user');
    } else {
      console.log('🚪 User not authenticated');
      
      // Show signed out states
      if (signedOutState) {
        signedOutState.classList.remove('hidden');
        signedOutState.style.display = 'flex';
      }
      if (mobileSignedOutState) {
        mobileSignedOutState.classList.remove('hidden');
        mobileSignedOutState.style.display = 'block';
      }
      
      // Hide signed in states
      if (signedInState) {
        signedInState.classList.add('hidden');
        signedInState.style.display = 'none';
      }
      if (mobileSignedInState) {
        mobileSignedInState.classList.add('hidden');
        mobileSignedInState.style.display = 'none';
      }
      
      console.log('✅ UI updated for signed out user');
    }
  };
  
  console.log('✅ UI update function created');
}

// Sign out function
function createSignOutFunction() {
  window.signOut = function() {
    console.log('🚪 Signing out...');
    window.currentUser = null;
    localStorage.removeItem('currentUser');
    window.updateAuthUI();
    alert('You have been signed out successfully.');
  };
  
  // Profile and orders placeholders
  window.openProfileModal = function() {
    alert('Profile editing feature coming soon! Your account is active.');
  };
  
  window.showOrderHistory = function() {
    alert('Order history feature coming soon! Your account is active.');
  };
  
  console.log('✅ Sign out and placeholder functions created');
}

// Setup form listeners
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

// Restore session
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
          window.updateAuthUI();
        }
      }
    } catch (error) {
      console.error('❌ Error restoring session:', error);
      localStorage.removeItem('currentUser');
      window.currentUser = null;
      window.updateAuthUI();
    }
  }, 1000);
}

// Initialize everything
function initializeAuth() {
  console.log('🚀 Initializing complete authentication system...');
  
  restoreAuthSystem();
  createSignInHandler();
  createSignUpHandler();
  createUIUpdateFunction();
  createSignOutFunction();
  setupFormListeners();
  restoreSession();
  
  console.log('✅ Authentication system fully restored');
}

// Execute immediately
initializeAuth();

// Debug functions
window.debugAuth = function() {
  const users = localStorage.getItem('visualVibeUsers');
  console.log('🔍 AUTH DEBUG:', {
    currentUser: window.currentUser,
    usersInStorage: users ? JSON.parse(users).length : 0,
    users: users ? JSON.parse(users) : []
  });
};

window.listUsers = function() {
  try {
    const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
    console.log('👥 USERS IN SYSTEM:');
    users.forEach((user, index) => {
      console.log(`  ${index + 1}. ${user.name} <${user.email}> (ID: ${user.id})`);
    });
    return users;
  } catch (error) {
    console.error('Error listing users:', error);
    return [];
  }
};

console.log('✅ SIGN IN FUNCTIONALITY RESTORED');
console.log('🧪 Debug commands: debugAuth(), listUsers()');
