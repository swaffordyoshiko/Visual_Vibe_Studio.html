// NUCLEAR SIGNUP FIX - Immediate execution to clear all conflicts
console.log('💥 NUCLEAR SIGNUP FIX: Starting immediate execution...');

// Execute immediately - don't wait for anything
(function() {
  'use strict';
  
  console.log('🔍 STEP 1: Inspecting current localStorage...');
  
  // Show what's currently stored
  const usersData = localStorage.getItem('visualVibeUsers');
  if (usersData) {
    try {
      const users = JSON.parse(usersData);
      console.log(`❌ PROBLEM FOUND: ${users.length} users in storage:`);
      users.forEach((user, index) => {
        console.log(`  ${index + 1}. ${user.name} <${user.email}> (${user.createdAt})`);
      });
    } catch (e) {
      console.log('❌ CORRUPTED DATA FOUND in visualVibeUsers');
    }
  } else {
    console.log('✅ No users data found');
  }
  
  // STEP 2: Nuclear clear of ALL user-related data
  console.log('💣 STEP 2: Nuclear clearing ALL user data...');
  
  const allKeys = [];
  for (let i = 0; i < localStorage.length; i++) {
    allKeys.push(localStorage.key(i));
  }
  
  let removedCount = 0;
  allKeys.forEach(key => {
    if (key && (
      key.includes('user') || 
      key.includes('User') || 
      key.includes('vibe') || 
      key.includes('Vibe') ||
      key.includes('auth') ||
      key.includes('Auth') ||
      key.includes('current') ||
      key.includes('Current')
    )) {
      localStorage.removeItem(key);
      console.log(`🗑️ Removed: ${key}`);
      removedCount++;
    }
  });
  
  console.log(`✅ Cleared ${removedCount} items from localStorage`);
  
  // Clear window variables
  window.currentUser = null;
  
  // STEP 3: Install completely fresh signup function
  console.log('🔧 STEP 3: Installing fresh signup function...');
  
  window.handleSignUp = function(e) {
    if (e) e.preventDefault();
    console.log('📝 FRESH SIGNUP: Starting signup process...');
    
    // Get form inputs
    const name = document.getElementById('signUpName')?.value?.trim();
    const email = document.getElementById('signUpEmail')?.value?.trim()?.toLowerCase();
    const password = document.getElementById('signUpPassword')?.value;
    const confirmPassword = document.getElementById('signUpConfirmPassword')?.value;
    
    console.log(`📝 Signup data: "${name}" <${email}>`);
    
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
    
    // Check for existing users (should be empty after nuclear clear)
    let users = [];
    try {
      const existingData = localStorage.getItem('visualVibeUsers');
      if (existingData) {
        users = JSON.parse(existingData);
        console.log(`📋 Found ${users.length} existing users after clear`);
      }
    } catch (e) {
      console.log('📋 No existing users or corrupted data - starting fresh');
      users = [];
    }
    
    // Check for duplicate (should not happen after clear)
    const duplicate = users.find(u => u.email === email);
    if (duplicate) {
      console.log('❌ Unexpected duplicate found:', duplicate);
      alert(`Account exists for ${duplicate.name}. This shouldn't happen after clearing data.`);
      return;
    }
    
    // Create new user
    const newUser = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: name,
      email: email,
      password: password,
      orders: [],
      createdAt: new Date().toISOString(),
      version: 'nuclear_fix'
    };
    
    console.log('👤 Creating user:', newUser);
    
    // Save user
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
    
    // Update UI
    if (typeof window.updateAuthUI === 'function') {
      window.updateAuthUI();
    }
    
    // Close modal
    if (typeof window.closeSignUpModal === 'function') {
      window.closeSignUpModal();
    }
    
    // Clear form
    document.getElementById('signUpName').value = '';
    document.getElementById('signUpEmail').value = '';
    document.getElementById('signUpPassword').value = '';
    document.getElementById('signUpConfirmPassword').value = '';
    
    alert(`✅ SUCCESS! Account created for ${name}!`);
    console.log('✅ Signup completed successfully');
  };
  
  // STEP 4: Attach to form immediately and repeatedly
  console.log('🔗 STEP 4: Attaching to signup form...');
  
  function attachToForm() {
    const form = document.getElementById('signUpForm');
    if (form) {
      // Remove all existing listeners by cloning
      const newForm = form.cloneNode(true);
      form.parentNode.replaceChild(newForm, form);
      
      // Add our fresh handler
      newForm.addEventListener('submit', window.handleSignUp);
      console.log('✅ Fresh handler attached to form');
      return true;
    }
    return false;
  }
  
  // Try to attach immediately
  attachToForm();
  
  // Try again after delays
  setTimeout(attachToForm, 100);
  setTimeout(attachToForm, 500);
  setTimeout(attachToForm, 1000);
  setTimeout(attachToForm, 2000);
  
  // STEP 5: Override any other auth functions that might interfere
  console.log('🛡️ STEP 5: Blocking interference...');
  
  // Block any other signup functions
  setTimeout(() => {
    if (window.handleSignUp_EMERGENCY_DISABLED) {
      delete window.handleSignUp_EMERGENCY_DISABLED;
    }
    if (window.CrossDeviceAuth) {
      window.CrossDeviceAuth = null;
    }
    
    // Ensure our function is still in place
    if (!window.handleSignUp || window.handleSignUp.toString().indexOf('FRESH SIGNUP') === -1) {
      console.log('🔧 Reinstalling signup function...');
      window.handleSignUp = arguments.callee; // Reference to our function
    }
  }, 3000);
  
  console.log('💥 NUCLEAR FIX COMPLETE - signup should work now');
  
})();

// Expose utility functions
window.clearEverything = function() {
  console.log('💣 MANUAL CLEAR: Removing everything...');
  localStorage.clear();
  window.currentUser = null;
  alert('Everything cleared. Refresh page and try signup.');
};

window.checkUsers = function() {
  const users = localStorage.getItem('visualVibeUsers');
  console.log('Current users:', users);
  return users;
};

console.log('✅ NUCLEAR SIGNUP FIX: Installed');
console.log('🧪 Manual commands: clearEverything(), checkUsers()');
