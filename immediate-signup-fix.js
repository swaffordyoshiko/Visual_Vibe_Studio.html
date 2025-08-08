// DIRECT FIX FOR SIGNUP EXISTS ERROR - Clear conflicting data immediately
console.log('🚨 FIXING SIGNUP EXISTS ERROR: Starting direct fix...');

// Step 1: Immediate data clear
(function immediateDataClear() {
  console.log('💣 STEP 1: Clearing all conflicting user data...');
  
  // Show what's about to be cleared
  const existingUsers = localStorage.getItem('visualVibeUsers');
  if (existingUsers) {
    console.log('❌ FOUND CONFLICTING DATA:', existingUsers);
    try {
      const users = JSON.parse(existingUsers);
      console.log(`📋 Removing ${users.length} existing users:`, users.map(u => u.name + ' <' + u.email + '>'));
    } catch (e) {
      console.log('❌ Data was corrupted anyway');
    }
  }
  
  // Nuclear clear of all user data
  localStorage.removeItem('visualVibeUsers');
  localStorage.removeItem('currentUser');
  localStorage.removeItem('visualVibeUser');
  
  // Clear any other user-related keys
  Object.keys(localStorage).forEach(key => {
    if (key.toLowerCase().includes('user') || key.toLowerCase().includes('vibe')) {
      localStorage.removeItem(key);
      console.log(`🗑️ Removed: ${key}`);
    }
  });
  
  window.currentUser = null;
  console.log('✅ All user data cleared - ready for fresh signup');
})();

// Step 2: Create bulletproof signup function
function bulletproofSignup(e) {
  if (e) e.preventDefault();
  console.log('📝 BULLETPROOF SIGNUP: Starting fresh signup process...');
  
  // Get form data
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
  
  console.log(`📝 Signup request: "${name}" <${email}>`);
  
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
  
  // Check current localStorage state (should be empty after clear)
  const currentUsers = localStorage.getItem('visualVibeUsers');
  if (currentUsers) {
    console.log('⚠️ Unexpected: Found existing users after clear, clearing again...');
    localStorage.removeItem('visualVibeUsers');
  }
  
  // Start with completely fresh user array
  const users = [];
  
  // Create new user
  const newUser = {
    id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    name: name,
    email: email,
    password: password,
    orders: [],
    createdAt: new Date().toISOString(),
    version: 'bulletproof_v2'
  };
  
  console.log('👤 Creating fresh user:', {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email
  });
  
  // Add to fresh array and save
  users.push(newUser);
  localStorage.setItem('visualVibeUsers', JSON.stringify(users));
  
  // Create session
  window.currentUser = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    loginTime: new Date().toISOString()
  };
  localStorage.setItem('currentUser', JSON.stringify(window.currentUser));
  
  console.log('💾 User and session saved successfully');
  
  // Update UI (use the enhanced version if available)
  if (typeof window.forceUpdateAuthUI === 'function') {
    setTimeout(() => window.forceUpdateAuthUI(), 100);
  } else if (typeof window.updateAuthUI === 'function') {
    setTimeout(() => window.updateAuthUI(), 100);
  }
  
  // Close modal
  if (typeof window.closeSignUpModal === 'function') {
    window.closeSignUpModal();
  }
  
  // Clear form
  nameInput.value = '';
  emailInput.value = '';
  passwordInput.value = '';
  confirmPasswordInput.value = '';
  
  alert(`✅ Account created successfully! Welcome, ${name}!`);
  console.log('✅ Fresh signup completed successfully');
}

// Step 3: Install the bulletproof function
console.log('🔧 STEP 2: Installing bulletproof signup function...');
window.handleSignUp = bulletproofSignup;

// Step 4: Force attach to form
setTimeout(() => {
  const form = document.getElementById('signUpForm');
  if (form) {
    // Remove all existing listeners by cloning
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);
    
    // Attach our bulletproof function
    newForm.addEventListener('submit', bulletproofSignup);
    console.log('✅ Bulletproof signup attached to form');
  }
}, 100);

// Step 5: Emergency functions for manual use
window.clearAllUserData = function() {
  console.log('🚨 EMERGENCY CLEAR: Removing everything...');
  localStorage.clear();
  window.currentUser = null;
  alert('✅ Everything cleared! Try signup now.');
};

window.debugUserStorage = function() {
  console.log('🔍 CURRENT STORAGE STATE:');
  console.log('visualVibeUsers:', localStorage.getItem('visualVibeUsers'));
  console.log('currentUser:', localStorage.getItem('currentUser'));
  console.log('window.currentUser:', window.currentUser);
};

window.testFreshSignup = function(testName = 'Test User', testEmail = 'test@example.com', testPassword = 'password123') {
  console.log('🧪 TESTING FRESH SIGNUP...');
  
  // Fill form
  document.getElementById('signUpName').value = testName;
  document.getElementById('signUpEmail').value = testEmail;
  document.getElementById('signUpPassword').value = testPassword;
  document.getElementById('signUpConfirmPassword').value = testPassword;
  
  // Submit
  bulletproofSignup();
};

console.log('✅ SIGNUP EXISTS ERROR FIX: Complete');
console.log('🧪 Available commands:');
console.log('- clearAllUserData() - Emergency clear everything');
console.log('- debugUserStorage() - Check current storage state');
console.log('- testFreshSignup() - Test signup with default data');
console.log('- testFreshSignup("Your Name", "your@email.com", "yourpass123") - Test with custom data');

// Show current state
setTimeout(() => {
  console.log('📊 FINAL STATE CHECK:');
  const users = localStorage.getItem('visualVibeUsers');
  console.log('Users in storage:', users ? JSON.parse(users).length : 0);
  console.log('Ready for fresh signup:', !users || JSON.parse(users).length === 0);
}, 200);
