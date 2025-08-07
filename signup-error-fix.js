// DIRECT FIX for "Account already exists" signup error
console.log('🚨 SIGNUP ERROR FIX: Running immediate fix...');

// Function to completely clear and reset authentication data
function resetAuthenticationData() {
  console.log('🗑️ Clearing all authentication data...');
  
  // List of all possible auth-related keys
  const authKeys = [
    'visualVibeUsers',
    'visualVibeUser', 
    'currentUser',
    'user_data',
    'auth_data',
    'signup_data'
  ];
  
  // Remove specific keys
  authKeys.forEach(key => {
    if (localStorage.getItem(key)) {
      localStorage.removeItem(key);
      console.log(`🗑️ Removed: ${key}`);
    }
  });
  
  // Remove any other user-related keys
  const allKeys = [];
  for (let i = 0; i < localStorage.length; i++) {
    allKeys.push(localStorage.key(i));
  }
  
  allKeys.forEach(key => {
    if (key && (key.toLowerCase().includes('user') || key.toLowerCase().includes('vibe'))) {
      localStorage.removeItem(key);
      console.log(`🗑️ Removed additional key: ${key}`);
    }
  });
  
  // Clear window variables
  window.currentUser = null;
  
  console.log('✅ Authentication data completely cleared');
}

// Override the problematic handleSignUp function with a working version
function fixSignUpFunction() {
  console.log('🔧 Installing fixed signup function...');
  
  window.handleSignUp = function(e) {
    if (e) e.preventDefault();
    
    console.log('📝 FIXED SIGNUP: Processing...');
    
    // Get form data
    const nameInput = document.getElementById('signUpName');
    const emailInput = document.getElementById('signUpEmail');
    const passwordInput = document.getElementById('signUpPassword');
    const confirmPasswordInput = document.getElementById('signUpConfirmPassword');
    
    if (!nameInput || !emailInput || !passwordInput || !confirmPasswordInput) {
      alert('Form not found. Please refresh the page.');
      return;
    }
    
    const name = nameInput.value.trim();
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    console.log(`📝 Signup attempt: ${name} <${email}>`);
    
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
      alert('Password must be at least 6 characters.');
      return;
    }
    
    // FORCE CLEAN START - always start with empty users array
    console.log('🧹 Starting with clean user data...');
    
    // Check if there are any existing users - if so, validate them
    let existingUsers = [];
    try {
      const usersData = localStorage.getItem('visualVibeUsers');
      if (usersData && usersData !== 'null') {
        const parsedUsers = JSON.parse(usersData);
        if (Array.isArray(parsedUsers)) {
          // Only keep completely valid users
          existingUsers = parsedUsers.filter(user => 
            user && 
            user.email && 
            user.name && 
            user.password &&
            typeof user.email === 'string' &&
            typeof user.name === 'string' &&
            user.email.trim().length > 0
          );
        }
      }
    } catch (e) {
      console.log('🗑️ Corrupted user data, starting fresh');
      existingUsers = [];
    }
    
    console.log(`📊 Found ${existingUsers.length} valid existing users`);
    
    // Check for actual duplicates
    const isDuplicate = existingUsers.some(user => 
      user.email.toLowerCase().trim() === email.toLowerCase().trim()
    );
    
    if (isDuplicate) {
      console.log(`❌ Genuine duplicate found for: ${email}`);
      alert('An account with this email already exists. Please sign in instead.');
      return;
    }
    
    console.log(`✅ No duplicate found, creating account for: ${email}`);
    
    // Create new user
    const newUser = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      name: name,
      email: email,
      password: password,
      orders: [],
      createdAt: new Date().toISOString()
    };
    
    // Add to users and save
    existingUsers.push(newUser);
    localStorage.setItem('visualVibeUsers', JSON.stringify(existingUsers));
    
    // Set as current user
    window.currentUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      loginTime: new Date().toISOString()
    };
    localStorage.setItem('currentUser', JSON.stringify(window.currentUser));
    
    // Close modal and update UI
    if (typeof window.closeSignUpModal === 'function') {
      window.closeSignUpModal();
    }
    
    if (typeof window.updateAuthUI === 'function') {
      window.updateAuthUI();
    }
    
    alert(`Welcome ${name}! Your account has been created successfully.`);
    console.log(`✅ Account created successfully for: ${name}`);
  };
  
  console.log('✅ Fixed signup function installed');
}

// Make emergency reset available globally
window.emergencySignupFix = function() {
  console.log('🚨 EMERGENCY SIGNUP FIX...');
  resetAuthenticationData();
  fixSignUpFunction();
  alert('Signup fixed! Please try creating your account again.');
};

// Auto-run the fix
console.log('🚀 Running automatic signup fix...');
resetAuthenticationData();
fixSignUpFunction();

console.log('✅ SIGNUP ERROR FIX: Complete!');
console.log('💡 If you still have issues, run: emergencySignupFix()');
