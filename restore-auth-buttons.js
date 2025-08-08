// RESTORE AUTH BUTTONS - Make sign in and sign up buttons work again
console.log('🔧 RESTORING AUTH BUTTONS: Making sign in/up buttons functional...');

// Simple, working modal functions
window.openSignInModal = function() {
  console.log('🔑 Opening sign in modal...');
  
  const modal = document.getElementById('signInModal');
  if (!modal) {
    console.error('❌ Sign in modal not found');
    alert('Sign in form not available. Please refresh the page.');
    return;
  }
  
  // Show the modal
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
    console.error('�� Sign up modal not found');
    alert('Sign up form not available. Please refresh the page.');
    return;
  }
  
  // Show the modal
  modal.classList.remove('hidden');
  modal.style.display = 'flex';
  modal.style.opacity = '1';
  
  // Focus on name input
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

// Working form handlers
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
    
    localStorage.setItem('currentUser', JSON.stringify(window.currentUser));
    
    // Update UI
    if (typeof window.updateAuthUI === 'function') {
      window.updateAuthUI();
    }
    
    window.closeSignInModal();
    alert('Welcome back, ' + user.name + '!');
    console.log('✅ User signed in:', user.name);
  } else {
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
    setTimeout(() => {
      window.closeSignUpModal();
      window.openSignInModal();
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
  if (typeof window.updateAuthUI === 'function') {
    window.updateAuthUI();
  }
  
  window.closeSignUpModal();
  alert('Account created successfully! Welcome, ' + name + '!');
  console.log('✅ User signed up:', name);
};

// Simple UI update function
window.updateAuthUI = function() {
  const signedOutState = document.getElementById('signedOutState');
  const signedInState = document.getElementById('signedInState');
  const mobileSignedOutState = document.getElementById('mobileSignedOutState');
  const mobileSignedInState = document.getElementById('mobileSignedInState');
  const userNameSpan = document.getElementById('userName');
  
  if (window.currentUser) {
    // User is signed in
    if (signedOutState) {
      signedOutState.classList.add('hidden');
      signedOutState.style.display = 'none';
    }
    if (signedInState) {
      signedInState.classList.remove('hidden');
      signedInState.style.display = 'flex';
    }
    if (mobileSignedOutState) {
      mobileSignedOutState.classList.add('hidden');
      mobileSignedOutState.style.display = 'none';
    }
    if (mobileSignedInState) {
      mobileSignedInState.classList.remove('hidden');
      mobileSignedInState.style.display = 'block';
    }
    if (userNameSpan) {
      userNameSpan.textContent = window.currentUser.name;
    }
    console.log('✅ UI updated for signed in user');
  } else {
    // User is signed out
    if (signedOutState) {
      signedOutState.classList.remove('hidden');
      signedOutState.style.display = 'flex';
    }
    if (signedInState) {
      signedInState.classList.add('hidden');
      signedInState.style.display = 'none';
    }
    if (mobileSignedOutState) {
      mobileSignedOutState.classList.remove('hidden');
      mobileSignedOutState.style.display = 'block';
    }
    if (mobileSignedInState) {
      mobileSignedInState.classList.add('hidden');
      mobileSignedInState.style.display = 'none';
    }
    console.log('✅ UI updated for signed out user');
  }
};

// Setup form event listeners
function setupFormListeners() {
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
}

// Sign out function
window.signOut = function() {
  console.log('🚪 Signing out...');
  window.currentUser = null;
  localStorage.removeItem('currentUser');
  window.updateAuthUI();
  alert('You have been signed out successfully.');
};

// Initialize
setTimeout(() => {
  setupFormListeners();
  
  // Restore session if exists
  try {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      if (userData && userData.name && userData.email) {
        window.currentUser = userData;
        console.log('✅ Session restored:', userData.name);
        window.updateAuthUI();
      }
    }
  } catch (error) {
    console.error('Error restoring session:', error);
    localStorage.removeItem('currentUser');
  }
}, 500);

// Test function
window.testAuthButtons = function() {
  console.log('🧪 Testing auth button functions...');
  console.log('openSignInModal:', typeof window.openSignInModal);
  console.log('openSignUpModal:', typeof window.openSignUpModal);
  console.log('handleSignIn:', typeof window.handleSignIn);
  console.log('handleSignUp:', typeof window.handleSignUp);
  
  // Test opening modals
  console.log('Testing sign up modal...');
  window.openSignUpModal();
  setTimeout(() => {
    window.closeSignUpModal();
    console.log('Testing sign in modal...');
    window.openSignInModal();
    setTimeout(() => {
      window.closeSignInModal();
      console.log('✅ Modal tests complete');
    }, 1000);
  }, 1000);
};

console.log('✅ AUTH BUTTONS RESTORED: Sign in and sign up buttons should work now');
console.log('🧪 Test command: testAuthButtons()');
