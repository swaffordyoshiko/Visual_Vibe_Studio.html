// IMMEDIATE SIGNUP ERROR FIX - Direct intervention to fix signup issues
console.log('🚨 IMMEDIATE SIGNUP FIX: Starting direct intervention...');

// First, let's see what's actually in localStorage
function inspectCurrentData() {
  console.log('🔍 === IMMEDIATE DATA INSPECTION ===');
  
  // Check all localStorage keys
  console.log('📋 All localStorage keys:');
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    if (key.toLowerCase().includes('user') || key.toLowerCase().includes('vibe')) {
      console.log(`  ${key}:`, value ? value.substring(0, 100) + (value.length > 100 ? '...' : '') : 'null');
    }
  }
  
  // Specifically check users
  const usersData = localStorage.getItem('visualVibeUsers');
  if (usersData) {
    try {
      const users = JSON.parse(usersData);
      console.log(`👥 Found ${users.length} users:`);
      users.forEach((user, index) => {
        console.log(`  ${index + 1}. ${user.name || 'NO_NAME'} <${user.email || 'NO_EMAIL'}> (${user.createdAt || 'NO_DATE'})`);
      });
    } catch (e) {
      console.error('❌ Users data is corrupted:', e);
    }
  } else {
    console.log('📋 No visualVibeUsers found');
  }
  
  console.log('🔍 === END INSPECTION ===');
}

// Nuclear option - clear all user data
function clearAllUserData() {
  console.log('💣 NUCLEAR CLEAR: Removing all user data...');
  
  const keysToRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (key.toLowerCase().includes('user') || 
        key.toLowerCase().includes('vibe') || 
        key.toLowerCase().includes('auth') ||
        key.toLowerCase().includes('current'))) {
      keysToRemove.push(key);
    }
  }
  
  keysToRemove.forEach(key => {
    localStorage.removeItem(key);
    console.log(`🗑️ Removed: ${key}`);
  });
  
  // Also clear window variables
  window.currentUser = null;
  
  console.log('✅ Nuclear clear complete - try signup now');
  alert('All user data cleared. You can now try signup again.');
}

// Simple, bulletproof signup function
function bulletproofSignUp(e) {
  if (e) e.preventDefault();
  
  console.log('📝 BULLETPROOF SIGNUP: Processing...');
  
  // Get form elements
  const nameInput = document.getElementById('signUpName');
  const emailInput = document.getElementById('signUpEmail');
  const passwordInput = document.getElementById('signUpPassword');
  const confirmPasswordInput = document.getElementById('signUpConfirmPassword');
  
  if (!nameInput || !emailInput || !passwordInput || !confirmPasswordInput) {
    console.error('❌ Form elements not found');
    alert('Form elements not found. Please refresh the page.');
    return;
  }
  
  const name = nameInput.value.trim();
  const email = emailInput.value.trim().toLowerCase();
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;
  
  console.log(`📝 Signup attempt: "${name}" <${email}>`);
  
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
  
  // Get existing users (with safety)
  let existingUsers = [];
  try {
    const userData = localStorage.getItem('visualVibeUsers');
    if (userData && userData !== 'null' && userData !== 'undefined') {
      existingUsers = JSON.parse(userData);
      if (!Array.isArray(existingUsers)) {
        console.warn('⚠️ Users data is not an array, resetting');
        existingUsers = [];
      }
    }
  } catch (error) {
    console.error('❌ Error reading users data:', error);
    existingUsers = [];
  }
  
  console.log(`📋 Found ${existingUsers.length} existing users`);
  existingUsers.forEach((user, index) => {
    console.log(`  ${index + 1}. ${user.name} <${user.email}>`);
  });
  
  // Check for duplicate with detailed logging
  const duplicateUser = existingUsers.find(user => {
    if (!user || !user.email) {
      console.log('⚠️ Found invalid user object:', user);
      return false;
    }
    const match = user.email.toLowerCase() === email;
    if (match) {
      console.log('🔍 Duplicate found:', {
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        id: user.id
      });
    }
    return match;
  });
  
  if (duplicateUser) {
    console.log('❌ Duplicate email detected for:', email);
    
    // Give user clear options
    const message = `An account already exists for "${duplicateUser.name}" with email ${email}.\n\n` +
                   `Created: ${duplicateUser.createdAt ? new Date(duplicateUser.createdAt).toLocaleDateString() : 'Unknown'}\n\n` +
                   `Options:\n` +
                   `• Click OK to sign in instead\n` +
                   `• Click Cancel to use a different email\n` +
                   `• Or clear all data and start fresh`;
    
    const userChoice = confirm(message);
    
    if (userChoice) {
      // Close signup modal and open signin
      if (typeof window.closeSignUpModal === 'function') {
        window.closeSignUpModal();
      }
      
      setTimeout(() => {
        if (typeof window.openSignInModal === 'function') {
          window.openSignInModal();
          // Pre-fill email
          const signInEmail = document.getElementById('signInEmail');
          if (signInEmail) signInEmail.value = email;
        }
      }, 500);
    } else {
      // Clear the email field for them to try a different one
      emailInput.value = '';
      emailInput.focus();
    }
    return;
  }
  
  console.log('✅ No duplicate found, creating account...');
  
  // Create new user
  const newUser = {
    id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    name: name,
    email: email,
    password: password,
    orders: [],
    reviews: [],
    createdAt: new Date().toISOString(),
    signUpMethod: 'bulletproof_fix'
  };
  
  // Add to users array
  existingUsers.push(newUser);
  
  // Save to localStorage
  try {
    localStorage.setItem('visualVibeUsers', JSON.stringify(existingUsers));
    console.log('💾 User saved successfully');
    console.log('👤 New user:', {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    });
  } catch (error) {
    console.error('❌ Error saving user:', error);
    alert('Error saving account. Please try again or clear all data.');
    return;
  }
  
  // Create session
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
  console.log('✅ Signup completed successfully');
}

// Immediate execution
(function() {
  console.log('🚨 RUNNING IMMEDIATE INSPECTION...');
  inspectCurrentData();
  
  // Override the signup function immediately
  window.handleSignUp = bulletproofSignUp;
  
  // Also attach to form directly after DOM is ready
  setTimeout(() => {
    const signUpForm = document.getElementById('signUpForm');
    if (signUpForm) {
      // Remove existing listeners by cloning
      const newForm = signUpForm.cloneNode(true);
      signUpForm.parentNode.replaceChild(newForm, signUpForm);
      
      // Add our handler
      newForm.addEventListener('submit', bulletproofSignUp);
      console.log('✅ Form handler attached directly to form');
    } else {
      console.warn('⚠️ Sign up form not found yet');
    }
  }, 1000);
  
  // Try again later if needed
  setTimeout(() => {
    if (typeof window.handleSignUp !== 'function' || window.handleSignUp !== bulletproofSignUp) {
      console.log('🔧 Re-installing signup handler...');
      window.handleSignUp = bulletproofSignUp;
    }
  }, 3000);
  
  console.log('✅ Bulletproof signup handler installed');
})();

// Expose utility functions for manual testing  
window.inspectUserData = inspectCurrentData;
window.clearAllUsers = clearAllUserData;
window.fixSignupNow = function() {
  console.log('🔧 MANUAL FIX: Installing handlers...');
  window.handleSignUp = bulletproofSignUp;
  
  const signUpForm = document.getElementById('signUpForm');
  if (signUpForm) {
    signUpForm.removeEventListener('submit', window.handleSignUp);
    signUpForm.addEventListener('submit', window.handleSignUp);
    console.log('✅ Manual fix applied');
  }
};

console.log('✅ IMMEDIATE SIGNUP FIX: Ready');
console.log('🧪 Available commands:');
console.log('- inspectUserData() - See what\'s in localStorage');
console.log('- clearAllUsers() - Delete everything and start fresh');
console.log('- fixSignupNow() - Re-install the fixed signup handler');
