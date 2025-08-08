// FIX AUTH UI STATE - Ensure signed-in buttons show after login/signup
console.log('🔧 FIXING AUTH UI STATE: Ensuring proper UI updates after authentication...');

// Enhanced UI update function that forces visibility of signed-in elements
function forceUpdateAuthUI() {
  console.log('🔄 FORCE UPDATE AUTH UI: Running comprehensive UI update...');
  
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
    
    // DESKTOP SIGNED OUT - Hide completely
    if (signedOutState) {
      signedOutState.classList.add('hidden');
      signedOutState.style.display = 'none';
      signedOutState.style.visibility = 'hidden';
      console.log('🖥️ Hidden desktop signed-out state');
    }
    
    // DESKTOP SIGNED IN - Force show with maximum visibility
    if (signedInState) {
      signedInState.classList.remove('hidden');
      signedInState.style.display = 'flex';
      signedInState.style.visibility = 'visible';
      signedInState.style.opacity = '1';
      signedInState.style.position = 'relative';
      signedInState.style.zIndex = 'auto';
      
      // Also ensure child elements are visible
      const childButtons = signedInState.querySelectorAll('button');
      childButtons.forEach(btn => {
        btn.style.display = 'flex';
        btn.style.visibility = 'visible';
        btn.style.opacity = '1';
      });
      
      console.log('🖥️ Forced desktop signed-in state visible');
    }
    
    // MOBILE SIGNED OUT - Hide completely
    if (mobileSignedOutState) {
      mobileSignedOutState.classList.add('hidden');
      mobileSignedOutState.style.display = 'none';
      mobileSignedOutState.style.visibility = 'hidden';
      console.log('📱 Hidden mobile signed-out state');
    }
    
    // MOBILE SIGNED IN - Force show with maximum visibility
    if (mobileSignedInState) {
      mobileSignedInState.classList.remove('hidden');
      mobileSignedInState.style.display = 'block';
      mobileSignedInState.style.visibility = 'visible';
      mobileSignedInState.style.opacity = '1';
      mobileSignedInState.style.position = 'relative';
      mobileSignedInState.style.zIndex = 'auto';
      
      // Also ensure child elements are visible
      const childButtons = mobileSignedInState.querySelectorAll('button');
      childButtons.forEach(btn => {
        btn.style.display = 'flex';
        btn.style.visibility = 'visible';
        btn.style.opacity = '1';
      });
      
      console.log('📱 Forced mobile signed-in state visible');
    }
    
    // Update user name display
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
    console.log('🚪 User is not authenticated');
    
    // DESKTOP SIGNED OUT - Force show
    if (signedOutState) {
      signedOutState.classList.remove('hidden');
      signedOutState.style.display = 'flex';
      signedOutState.style.visibility = 'visible';
      signedOutState.style.opacity = '1';
      console.log('🖥️ Showed desktop signed-out state');
    }
    
    // DESKTOP SIGNED IN - Hide completely
    if (signedInState) {
      signedInState.classList.add('hidden');
      signedInState.style.display = 'none';
      signedInState.style.visibility = 'hidden';
      console.log('🖥️ Hidden desktop signed-in state');
    }
    
    // MOBILE SIGNED OUT - Force show
    if (mobileSignedOutState) {
      mobileSignedOutState.classList.remove('hidden');
      mobileSignedOutState.style.display = 'block';
      mobileSignedOutState.style.visibility = 'visible';
      mobileSignedOutState.style.opacity = '1';
      console.log('📱 Showed mobile signed-out state');
    }
    
    // MOBILE SIGNED IN - Hide completely
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
  
  // Force reflow to ensure changes take effect
  document.body.offsetHeight;
  
  console.log('✅ FORCE UPDATE AUTH UI: Complete');
}

// Enhanced sign in function with guaranteed UI update
function enhancedSignIn(e) {
  if (e) e.preventDefault();
  console.log('🔑 ENHANCED SIGN IN: Processing...');
  
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
    
    // Close modal first
    if (typeof window.closeSignInModal === 'function') {
      window.closeSignInModal();
    }
    
    // Force UI update with multiple attempts
    console.log('🔄 Forcing UI update after sign in...');
    setTimeout(() => forceUpdateAuthUI(), 50);
    setTimeout(() => forceUpdateAuthUI(), 200);
    setTimeout(() => forceUpdateAuthUI(), 500);
    
    alert('Welcome back, ' + user.name + '!');
    console.log('✅ Sign in complete with UI update');
  } else {
    const existingUser = users.find(u => u && u.email && u.email.toLowerCase() === email);
    if (existingUser) {
      alert('Incorrect password. Please try again.');
    } else {
      alert('No account found with this email. Please sign up first.');
    }
  }
}

// Enhanced sign up function with guaranteed UI update
function enhancedSignUp(e) {
  if (e) e.preventDefault();
  console.log('📝 ENHANCED SIGN UP: Processing...');
  
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
  
  // Close modal first
  if (typeof window.closeSignUpModal === 'function') {
    window.closeSignUpModal();
  }
  
  // Clear form
  nameInput.value = '';
  emailInput.value = '';
  passwordInput.value = '';
  confirmPasswordInput.value = '';
  
  // Force UI update with multiple attempts
  console.log('🔄 Forcing UI update after sign up...');
  setTimeout(() => forceUpdateAuthUI(), 50);
  setTimeout(() => forceUpdateAuthUI(), 200);
  setTimeout(() => forceUpdateAuthUI(), 500);
  
  alert('Account created successfully! Welcome, ' + name + '!');
  console.log('✅ Sign up complete with UI update');
}

// Enhanced sign out function
function enhancedSignOut() {
  console.log('🚪 ENHANCED SIGN OUT: Processing...');
  
  window.currentUser = null;
  localStorage.removeItem('currentUser');
  
  // Force UI update immediately
  forceUpdateAuthUI();
  
  alert('You have been signed out successfully.');
  console.log('✅ Sign out complete with UI update');
}

// Install enhanced functions
console.log('🔧 Installing enhanced auth functions...');

// Override existing functions
window.handleSignIn = enhancedSignIn;
window.handleSignUp = enhancedSignUp;
window.signOut = enhancedSignOut;
window.updateAuthUI = forceUpdateAuthUI;

// Also create profile and orders functions if they don't exist
if (!window.openProfileModal) {
  window.openProfileModal = function() {
    alert('Profile editing feature coming soon! Your account is active.');
  };
}

if (!window.showOrderHistory) {
  window.showOrderHistory = function() {
    alert('Order history feature coming soon! Your account is active.');
  };
}

// Attach to forms
setTimeout(() => {
  const signInForm = document.getElementById('signInForm');
  const signUpForm = document.getElementById('signUpForm');
  
  if (signInForm) {
    signInForm.removeEventListener('submit', window.handleSignIn);
    signInForm.addEventListener('submit', window.handleSignIn);
    console.log('✅ Enhanced sign in handler attached');
  }
  
  if (signUpForm) {
    signUpForm.removeEventListener('submit', window.handleSignUp);
    signUpForm.addEventListener('submit', window.handleSignUp);
    console.log('✅ Enhanced sign up handler attached');
  }
}, 500);

// Check and restore session on load
setTimeout(() => {
  console.log('🔄 Checking for existing session...');
  
  try {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      if (userData && userData.name && userData.email) {
        window.currentUser = userData;
        console.log('✅ Session restored for:', userData.name);
        
        // Force UI update for restored session
        forceUpdateAuthUI();
      }
    } else {
      console.log('📋 No existing session found');
      // Ensure UI is in signed-out state
      forceUpdateAuthUI();
    }
  } catch (error) {
    console.error('❌ Error restoring session:', error);
    localStorage.removeItem('currentUser');
    window.currentUser = null;
    forceUpdateAuthUI();
  }
}, 1000);

// Manual fix function for testing
window.forceAuthUIUpdate = function() {
  console.log('🔧 MANUAL AUTH UI UPDATE: Forcing update...');
  forceUpdateAuthUI();
};

// Debug function to check current state
window.debugAuthState = function() {
  console.log('🔍 AUTH STATE DEBUG:', {
    currentUser: window.currentUser,
    signedOutVisible: !document.getElementById('signedOutState')?.classList.contains('hidden'),
    signedInVisible: !document.getElementById('signedInState')?.classList.contains('hidden'),
    mobileSignedOutVisible: !document.getElementById('mobileSignedOutState')?.classList.contains('hidden'),
    mobileSignedInVisible: !document.getElementById('mobileSignedInState')?.classList.contains('hidden')
  });
};

console.log('✅ AUTH UI STATE FIX: Complete - Sign in/up should now show profile, orders, and sign out buttons');
console.log('🧪 Available commands:');
console.log('- forceAuthUIUpdate() - Manually force UI update');
console.log('- debugAuthState() - Check current authentication state');
