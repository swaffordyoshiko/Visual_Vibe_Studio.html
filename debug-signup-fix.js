// DEBUG AND FIX SIGNUP ISSUE
console.log('🔍 DEBUGGING SIGNUP ISSUE: Starting investigation...');

// Debug function to inspect current user data
function debugUserData() {
  console.log('🔍 === USER DATA INSPECTION ===');
  
  try {
    const rawUsers = localStorage.getItem('visualVibeUsers');
    console.log('📋 Raw users data:', rawUsers);
    
    if (rawUsers) {
      const users = JSON.parse(rawUsers);
      console.log('👥 Total users found:', users.length);
      
      users.forEach((user, index) => {
        console.log(`👤 User ${index + 1}:`, {
          id: user.id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          hasPassword: !!user.password,
          passwordLength: user.password ? user.password.length : 0
        });
      });
      
      // Check for duplicate emails
      const emails = users.map(u => u.email?.toLowerCase()).filter(Boolean);
      const duplicates = emails.filter((email, index) => emails.indexOf(email) !== index);
      
      if (duplicates.length > 0) {
        console.warn('⚠️ DUPLICATE EMAILS FOUND:', duplicates);
      } else {
        console.log('✅ No duplicate emails found');
      }
    } else {
      console.log('📋 No users data found in localStorage');
    }
    
    // Check current user
    const currentUser = localStorage.getItem('currentUser');
    console.log('👤 Current user session:', currentUser);
    
  } catch (error) {
    console.error('❌ Error inspecting user data:', error);
  }
  
  console.log('🔍 === END INSPECTION ===');
}

// Clean function to remove phantom/invalid users
function cleanPhantomUsers() {
  console.log('🧹 CLEANING PHANTOM USERS...');
  
  try {
    const rawUsers = localStorage.getItem('visualVibeUsers');
    if (!rawUsers) {
      console.log('📋 No users to clean');
      return;
    }
    
    const users = JSON.parse(rawUsers);
    const originalCount = users.length;
    
    // Filter out invalid users
    const validUsers = users.filter(user => {
      if (!user) return false;
      if (!user.email || typeof user.email !== 'string') return false;
      if (!user.name || typeof user.name !== 'string') return false;
      if (!user.password || typeof user.password !== 'string') return false;
      if (user.password.length < 6) return false;
      
      // Remove users with suspicious properties that indicate they're test/phantom accounts
      if (user.syncedFromCloud) return false;
      if (user.password === 'temp123' || user.password === 'temporary') return false;
      if (user.emergencyCreated && !user.realAccount) return false;
      
      return true;
    });
    
    // Remove duplicates by email (keep the most recent one)
    const uniqueUsers = [];
    const seenEmails = new Set();
    
    // Sort by creation date (most recent first)
    validUsers.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    
    validUsers.forEach(user => {
      const email = user.email.toLowerCase();
      if (!seenEmails.has(email)) {
        seenEmails.add(email);
        uniqueUsers.push(user);
      } else {
        console.log('🗑️ Removing duplicate user:', user.email);
      }
    });
    
    if (uniqueUsers.length !== originalCount) {
      localStorage.setItem('visualVibeUsers', JSON.stringify(uniqueUsers));
      console.log(`✅ Cleaned users: ${originalCount} → ${uniqueUsers.length}`);
    } else {
      console.log('✅ No phantom users found to clean');
    }
    
    return uniqueUsers;
    
  } catch (error) {
    console.error('❌ Error cleaning phantom users:', error);
    return [];
  }
}

// Fixed signup function with better duplicate detection
function fixedHandleSignUp(e) {
  if (e) e.preventDefault();
  console.log('📝 FIXED SIGNUP: Processing sign up...');
  
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
  
  console.log(`📝 Attempting signup for: ${name} <${email}>`);
  
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
  
  // Email validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }
  
  // Clean phantom users first
  const cleanUsers = cleanPhantomUsers();
  
  // Check for REAL duplicates only
  const existingUser = cleanUsers.find(user => {
    return user.email && user.email.toLowerCase() === email;
  });
  
  if (existingUser) {
    console.log('❌ Real duplicate found:', existingUser);
    alert(`An account with this email already exists (created ${new Date(existingUser.createdAt).toLocaleDateString()}). Please sign in instead.`);
    
    setTimeout(() => {
      if (typeof window.closeSignUpModal === 'function') {
        window.closeSignUpModal();
      }
      if (typeof window.openSignInModal === 'function') {
        window.openSignInModal();
        // Pre-fill email
        const signInEmail = document.getElementById('signInEmail');
        if (signInEmail) signInEmail.value = emailInput.value;
      }
    }, 1000);
    return;
  }
  
  console.log('✅ No duplicate found, creating new account...');
  
  // Create new user
  const newUser = {
    id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    name: name,
    email: email,
    password: password,
    orders: [],
    createdAt: new Date().toISOString(),
    realAccount: true,
    signUpMethod: 'fixed_signup'
  };
  
  // Add user and save
  cleanUsers.push(newUser);
  try {
    localStorage.setItem('visualVibeUsers', JSON.stringify(cleanUsers));
    console.log('💾 User saved successfully');
  } catch (error) {
    console.error('❌ Error saving user:', error);
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
  
  // Close modal
  if (typeof window.closeSignUpModal === 'function') {
    window.closeSignUpModal();
  }
  
  alert(`✅ Account created successfully! Welcome, ${name}!`);
  console.log('✅ User signed up successfully:', name);
}

// Enhanced signin with better error handling
function fixedHandleSignIn(e) {
  if (e) e.preventDefault();
  console.log('🔑 FIXED SIGNIN: Processing sign in...');
  
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
  
  // Clean phantom users first
  const cleanUsers = cleanPhantomUsers();
  
  // Find user with exact match
  const user = cleanUsers.find(u => 
    u.email && u.email.toLowerCase() === email && u.password === password
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
    
    if (typeof window.updateAuthUI === 'function') {
      window.updateAuthUI();
    }
    
    if (typeof window.closeSignInModal === 'function') {
      window.closeSignInModal();
    }
    
    alert('Welcome back, ' + user.name + '!');
    console.log('✅ User signed in:', user.name);
  } else {
    // Check if email exists
    const existingUser = cleanUsers.find(u => u.email && u.email.toLowerCase() === email);
    if (existingUser) {
      alert('Incorrect password. Please try again.');
      console.log('❌ Wrong password for:', email);
    } else {
      alert('No account found with this email. Please sign up first.');
      console.log('❌ No account found for:', email);
    }
  }
}

// Override the existing functions
window.handleSignUp = fixedHandleSignUp;
window.handleSignIn = fixedHandleSignIn;

// Debug utilities for manual testing
window.debugUserData = debugUserData;
window.cleanPhantomUsers = cleanPhantomUsers;
window.clearAllUsers = function() {
  localStorage.removeItem('visualVibeUsers');
  localStorage.removeItem('currentUser');
  window.currentUser = null;
  if (typeof window.updateAuthUI === 'function') {
    window.updateAuthUI();
  }
  console.log('🗑️ All user data cleared');
  alert('All user data cleared. You can now test signup fresh.');
};

// Auto-run debug on load
setTimeout(() => {
  console.log('🔍 AUTO-DEBUG: Running initial inspection...');
  debugUserData();
}, 1000);

console.log('✅ SIGNUP DEBUG FIX: Loaded successfully');
console.log('🧪 Available debug functions:');
console.log('- window.debugUserData() - Inspect current user data');
console.log('- window.cleanPhantomUsers() - Remove invalid users');
console.log('- window.clearAllUsers() - Clear all user data for fresh testing');
