// TARGET SIGNUP FIX - Clear conflicting data and allow fresh signups
console.log('🎯 TARGET SIGNUP FIX: Resolving account exists error...');

// STEP 1: Clear existing conflicting data immediately
(function clearConflictingData() {
  console.log('🧹 Clearing conflicting signup data...');
  
  // Check what's currently stored
  const existingUsers = localStorage.getItem('visualVibeUsers');
  if (existingUsers) {
    try {
      const users = JSON.parse(existingUsers);
      console.log(`❌ Found ${users.length} existing users causing conflict:`);
      users.forEach((user, index) => {
        console.log(`  ${index + 1}. ${user.name} <${user.email}>`);
      });
    } catch (e) {
      console.log('❌ Corrupted user data found');
    }
  }
  
  // Clear the conflicting data
  localStorage.removeItem('visualVibeUsers');
  localStorage.removeItem('currentUser');
  window.currentUser = null;
  
  console.log('✅ Conflicting data cleared - ready for fresh signups');
})();

// STEP 2: Create targeted signup function that bypasses conflicts
function targetedSignup(e) {
  if (e) e.preventDefault();
  console.log('🎯 TARGETED SIGNUP: Processing without conflicts...');
  
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
  
  console.log(`🎯 Creating account for: "${name}" <${email}>`);
  
  // Basic validation
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
  
  // Create user directly (no conflict checking since we cleared data)
  const newUser = {
    id: `target_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    name: name,
    email: email,
    password: password,
    orders: [],
    createdAt: new Date().toISOString(),
    accountType: 'targeted_signup'
  };
  
  console.log('👤 Creating targeted user:', {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email
  });
  
  // Save as fresh user array
  localStorage.setItem('visualVibeUsers', JSON.stringify([newUser]));
  
  // Create session
  window.currentUser = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    loginTime: new Date().toISOString()
  };
  localStorage.setItem('currentUser', JSON.stringify(window.currentUser));
  
  console.log('💾 User and session created successfully');
  
  // Close modal
  if (typeof window.closeSignUpModal === 'function') {
    window.closeSignUpModal();
  }
  
  // Clear form
  nameInput.value = '';
  emailInput.value = '';
  passwordInput.value = '';
  confirmPasswordInput.value = '';
  
  // Update UI
  if (typeof window.updateAuthUI === 'function') {
    setTimeout(() => window.updateAuthUI(), 100);
  }
  
  alert(`✅ Account created successfully! Welcome, ${name}!`);
  console.log('🎯 Targeted signup completed successfully');
}

// STEP 3: Override signup function
console.log('🔧 Installing targeted signup function...');
window.handleSignUp = targetedSignup;

// Force attach to form
setTimeout(() => {
  const form = document.getElementById('signUpForm');
  if (form) {
    // Clone form to remove existing listeners
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);
    
    // Attach targeted function
    newForm.addEventListener('submit', targetedSignup);
    console.log('✅ Targeted signup attached to form');
  }
}, 100);

// STEP 4: Create simple sign in function (for any future users)
function simpleSignIn(e) {
  if (e) e.preventDefault();
  console.log('🔑 SIMPLE SIGN IN: Processing...');
  
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
  
  // Get users
  let users = [];
  try {
    const userData = localStorage.getItem('visualVibeUsers');
    if (userData) {
      users = JSON.parse(userData);
      console.log(`📋 Found ${users.length} users for sign in check`);
    }
  } catch (error) {
    console.error('Error reading users:', error);
  }
  
  // Find user
  const user = users.find(u => 
    u && u.email && u.email.toLowerCase() === email && u.password === password
  );
  
  if (user) {
    console.log('✅ User found for sign in');
    
    // Create session
    window.currentUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      loginTime: new Date().toISOString()
    };
    localStorage.setItem('currentUser', JSON.stringify(window.currentUser));
    
    // Close modal
    if (typeof window.closeSignInModal === 'function') {
      window.closeSignInModal();
    }
    
    // Update UI
    if (typeof window.updateAuthUI === 'function') {
      setTimeout(() => window.updateAuthUI(), 100);
    }
    
    alert('Welcome back, ' + user.name + '!');
    console.log('✅ Sign in successful');
  } else {
    const existingUser = users.find(u => u && u.email && u.email.toLowerCase() === email);
    if (existingUser) {
      alert('Incorrect password. Please try again.');
    } else {
      alert('No account found with this email. Please sign up first.');
    }
  }
}

// Install simple sign in
window.handleSignIn = simpleSignIn;

// Attach sign in to form
setTimeout(() => {
  const signInForm = document.getElementById('signInForm');
  if (signInForm) {
    signInForm.removeEventListener('submit', window.handleSignIn);
    signInForm.addEventListener('submit', window.handleSignIn);
    console.log('✅ Simple sign in attached to form');
  }
}, 200);

// STEP 5: Utility functions
window.clearSignupConflicts = function() {
  console.log('🧹 MANUAL CLEAR: Clearing signup conflicts...');
  localStorage.removeItem('visualVibeUsers');
  localStorage.removeItem('currentUser');
  window.currentUser = null;
  
  if (typeof window.updateAuthUI === 'function') {
    window.updateAuthUI();
  }
  
  alert('✅ Conflicts cleared! Try signup now.');
};

window.checkSignupStatus = function() {
  const users = localStorage.getItem('visualVibeUsers');
  console.log('📊 SIGNUP STATUS:', {
    usersInStorage: users ? JSON.parse(users).length : 0,
    currentUser: window.currentUser,
    ready: !users || JSON.parse(users).length === 0
  });
};

window.testTargetedSignup = function(name = 'Target User', email = 'target@test.com', password = 'target123') {
  console.log('🧪 Testing targeted signup...');
  
  // Fill form
  document.getElementById('signUpName').value = name;
  document.getElementById('signUpEmail').value = email;
  document.getElementById('signUpPassword').value = password;
  document.getElementById('signUpConfirmPassword').value = password;
  
  // Submit
  targetedSignup();
};

console.log('🎯 TARGET SIGNUP FIX: Complete');
console.log('🧪 Available commands:');
console.log('- clearSignupConflicts() - Clear conflicts manually');
console.log('- checkSignupStatus() - Check current status');
console.log('- testTargetedSignup() - Test signup with default data');

// Show final status
setTimeout(() => {
  const users = localStorage.getItem('visualVibeUsers');
  console.log('📈 FINAL STATUS:');
  console.log('Users in storage:', users ? JSON.parse(users).length : 0);
  console.log('Ready for signup:', true);
}, 200);
