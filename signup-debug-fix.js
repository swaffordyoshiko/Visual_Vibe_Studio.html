// QUICK FIX for signup duplicate error
console.log('🚀 SIGNUP DEBUG FIX: Loading...');

// Function to check and clean localStorage
function debugAndCleanStorage() {
  console.log('🔍 Debugging localStorage for signup issues...');
  
  // Check what's in visualVibeUsers
  try {
    const usersData = localStorage.getItem('visualVibeUsers');
    console.log('📋 Raw visualVibeUsers data:', usersData);
    
    if (usersData) {
      const users = JSON.parse(usersData);
      console.log('👥 Parsed users:', users);
      console.log('📊 User count:', users.length);
      
      // Log each user
      users.forEach((user, index) => {
        console.log(`   ${index + 1}. Name: "${user.name}", Email: "${user.email}"`);
      });
      
      // Check for any empty or invalid users
      const validUsers = users.filter(user => 
        user && 
        user.email && 
        user.email.trim().length > 0 &&
        user.name &&
        user.name.trim().length > 0
      );
      
      if (validUsers.length !== users.length) {
        console.log(`⚠️ Found ${users.length - validUsers.length} invalid users, cleaning...`);
        localStorage.setItem('visualVibeUsers', JSON.stringify(validUsers));
        console.log(`✅ Cleaned storage, now has ${validUsers.length} valid users`);
      }
    } else {
      console.log('📋 No visualVibeUsers data found');
    }
  } catch (error) {
    console.error('❌ Error reading/parsing visualVibeUsers:', error);
    console.log('🗑️ Clearing corrupted visualVibeUsers data...');
    localStorage.removeItem('visualVibeUsers');
  }
  
  // Check all localStorage keys for user-related data
  console.log('🔍 Checking all localStorage keys...');
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (key.toLowerCase().includes('user') || key.toLowerCase().includes('vibe'))) {
      const value = localStorage.getItem(key);
      console.log(`🔑 Found: ${key} = ${value.substring(0, 100)}...`);
    }
  }
}

// Fixed handleSignUp function with better debugging
function createFixedSignUpHandler() {
  console.log('🔧 Creating fixed signup handler...');
  
  const originalHandleSignUp = window.handleSignUp;
  
  window.handleSignUp = function(e) {
    console.log('📝 FIXED SIGNUP: Starting signup process...');
    
    if (e) e.preventDefault();
    
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
    
    console.log(`📝 SIGNUP ATTEMPT: "${name}" <${email}>`);
    
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
    
    // Get users with debugging
    let users = [];
    try {
      const usersData = localStorage.getItem('visualVibeUsers');
      console.log('📋 Raw users data:', usersData);
      
      if (usersData && usersData !== 'null' && usersData !== 'undefined') {
        users = JSON.parse(usersData);
        console.log('👥 Parsed users array:', users);
        console.log('📊 User count:', users.length);
      } else {
        console.log('📋 No existing users, starting fresh');
        users = [];
      }
    } catch (error) {
      console.error('❌ Error parsing users data:', error);
      console.log('🗑️ Clearing corrupted data and starting fresh');
      localStorage.removeItem('visualVibeUsers');
      users = [];
    }
    
    // Check for duplicates with detailed logging
    console.log(`🔍 Checking if email "${email}" already exists...`);
    
    let foundDuplicate = false;
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      console.log(`   Checking user ${i + 1}: "${user.name}" <${user.email}>`);
      
      if (user && user.email && user.email.toLowerCase().trim() === email) {
        console.log(`❌ DUPLICATE FOUND at index ${i}: ${user.email}`);
        foundDuplicate = true;
        break;
      }
    }
    
    if (foundDuplicate) {
      console.log('❌ Signup blocked due to duplicate email');
      alert('An account with this email already exists. Please sign in instead.');
      setTimeout(() => {
        if (typeof window.closeSignUpModal === 'function') {
          window.closeSignUpModal();
        }
        if (typeof window.openSignInModal === 'function') {
          window.openSignInModal();
          const signInEmail = document.getElementById('signInEmail');
          if (signInEmail) signInEmail.value = emailInput.value;
        }
      }, 2000);
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
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    console.log('👤 Creating user:', newUser);
    
    // Add to users array
    users.push(newUser);
    
    // Save to localStorage
    try {
      localStorage.setItem('visualVibeUsers', JSON.stringify(users));
      console.log(`💾 Saved ${users.length} users to storage`);
    } catch (error) {
      console.error('❌ Error saving users:', error);
      alert('Failed to save account. Please try again.');
      return;
    }
    
    // Set current user
    const now = new Date().toISOString();
    window.currentUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      lastActivity: now,
      loginTime: now
    };
    
    localStorage.setItem('currentUser', JSON.stringify(window.currentUser));
    
    // Close modal and show success
    if (typeof window.closeSignUpModal === 'function') {
      window.closeSignUpModal();
    }
    
    if (typeof window.updateAuthUI === 'function') {
      window.updateAuthUI();
    }
    
    alert(`Account created successfully! Welcome, ${name}!`);
    console.log('✅ Signup completed successfully');
  };
  
  console.log('✅ Fixed signup handler installed');
}

// Function to clear all auth data (for testing)
window.clearAllAuthData = function() {
  console.log('🗑️ Clearing all authentication data...');
  
  // Remove all user-related localStorage items
  const keysToRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (key.toLowerCase().includes('user') || key.toLowerCase().includes('vibe'))) {
      keysToRemove.push(key);
    }
  }
  
  keysToRemove.forEach(key => {
    localStorage.removeItem(key);
    console.log(`🗑️ Removed: ${key}`);
  });
  
  window.currentUser = null;
  
  if (typeof window.updateAuthUI === 'function') {
    window.updateAuthUI();
  }
  
  console.log('✅ All auth data cleared');
  alert('All authentication data cleared. You can now test signup fresh.');
};

// Initialize
function initialize() {
  console.log('🚀 SIGNUP DEBUG FIX: Initializing...');
  
  debugAndCleanStorage();
  createFixedSignUpHandler();
  
  console.log('✅ SIGNUP DEBUG FIX: Ready!');
  console.log('🧪 Test command: clearAllAuthData()');
}

// Run when ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}

console.log('✅ SIGNUP DEBUG FIX: Loaded');
