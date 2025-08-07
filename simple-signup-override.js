// SIMPLE, DIRECT SIGNUP OVERRIDE - NO CONFLICTS
console.log('🚀 Loading simple signup override...');

// IMMEDIATELY disable all other signup functions
window.handleSignUp_DISABLED_BY_SIMPLE_OVERRIDE = window.handleSignUp;
delete window.handleSignUp;

// Wait for DOM and completely override everything
setTimeout(() => {
  console.log('🔧 Applying simple signup override...');

  // Force override handleSignUp - nuclear approach
  try {
    delete window.handleSignUp;
  } catch (e) {
    console.log('Could not delete existing handleSignUp');
  }
  
  window.handleSignUp = function(e) {
    console.log('📝 [SIMPLE OVERRIDE] Processing sign up...');
    if (e) e.preventDefault();
    
    try {
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
      
      // Basic validation
      if (!name || !email || !password || !confirmPassword) {
        alert('Please fill in all fields.');
        return;
      }
      
      if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
      }
      
      if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }
      
      console.log('✅ Validation passed, creating account...');
      
      // NUCLEAR APPROACH: Clear everything first and provide debug info
      console.log('🧹 About to clear all existing data for fresh signup...');

      // Check what exists before clearing
      const existingUsers = localStorage.getItem('visualVibeUsers');
      if (existingUsers) {
        try {
          const users = JSON.parse(existingUsers);
          const matchingUsers = users.filter(u => u.email && u.email.toLowerCase() === email);
          console.log(`🔍 Found ${users.length} total users, ${matchingUsers.length} matching email ${email}`);
          if (matchingUsers.length > 0) {
            console.log('🗑️ Existing accounts for this email:', matchingUsers.map(u => ({
              name: u.name,
              realAccount: u.realAccount,
              signUpMethod: u.signUpMethod,
              createdAt: u.createdAt
            })));
          }
        } catch (e) {
          console.log('Could not parse existing users data');
        }
      }

      try {
        // Clear all possible storage locations
        localStorage.removeItem('visualVibeUsers');
        localStorage.removeItem('visualVibeUser');
        localStorage.removeItem(`user_${email}`);
        localStorage.removeItem('visualVibeCloudSync');
        localStorage.removeItem('crossDeviceUsers');
        localStorage.removeItem('deviceFingerprint');

        // Clear any other user-related items
        Object.keys(localStorage).forEach(key => {
          if (key.startsWith('user_') || key.includes('User') || key.includes('user')) {
            localStorage.removeItem(key);
          }
        });

        console.log('🧹 Cleared all existing data successfully');
      } catch (error) {
        console.log('⚠️ Could not clear some data:', error);
      }
      
      // Create fresh user
      const newUser = {
        id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: name,
        firstName: name.split(' ')[0],
        lastName: name.split(' ').slice(1).join(' ') || '',
        email: email,
        password: password,
        orders: [],
        reviews: [],
        createdAt: new Date().toISOString(),
        lastActivity: new Date().toISOString(),
        accountVersion: '3.0',
        realAccount: true,
        signUpMethod: 'simple-override'
      };
      
      console.log('✅ Creating fresh account:', { name, email });
      
      // Save user data
      localStorage.setItem('visualVibeUsers', JSON.stringify([newUser]));
      localStorage.setItem(`user_${email}`, JSON.stringify(newUser));
      
      // Create session
      const sessionUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        orders: [],
        reviews: [],
        signedIn: true,
        signInTime: new Date().toISOString()
      };
      
      window.currentUser = sessionUser;
      localStorage.setItem('visualVibeUser', JSON.stringify(sessionUser));
      
      console.log('✅ Account created successfully:', name);
      
      // Clear form
      nameInput.value = '';
      emailInput.value = '';
      passwordInput.value = '';
      confirmPasswordInput.value = '';
      
      // Close modal
      try {
        const modal = document.getElementById('signUpModal');
        if (modal) {
          modal.classList.add('hidden');
          modal.style.display = 'none';
        }
      } catch (error) {
        console.log('Could not close modal:', error);
      }
      
      // Show success
      alert(`✅ Welcome ${name}! Your account has been created successfully.`);
      
      // Update UI
      try {
        if (typeof window.updateSignInUI === 'function') {
          window.updateSignInUI();
        }
      } catch (error) {
        console.log('Could not update UI:', error);
      }
      
      // Show welcome banner
      try {
        if (typeof window.showWelcomeBanner === 'function') {
          setTimeout(() => window.showWelcomeBanner(), 1000);
        }
      } catch (error) {
        console.log('Could not show welcome banner:', error);
      }
      
    } catch (error) {
      console.error('❌ Signup failed:', error);
      alert('❌ Sign up failed. Please try again or refresh the page.');
    }
  };
  
  // Ensure our function can't be overridden
  Object.defineProperty(window, 'handleSignUp', {
    value: window.handleSignUp,
    writable: false,
    configurable: false
  });
  
  console.log('✅ Simple signup override applied and locked');
  
}, 50); // Run very early

// Also provide manual override function
window.forceSignUp = function(name, email, password) {
  console.log('🚀 Force signup requested');
  
  if (!name || !email || !password) {
    console.log('❌ Missing required parameters');
    return;
  }
  
  // Clear everything
  localStorage.clear();
  
  const newUser = {
    id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    name: name,
    firstName: name.split(' ')[0],
    lastName: name.split(' ').slice(1).join(' ') || '',
    email: email.toLowerCase(),
    password: password,
    orders: [],
    reviews: [],
    createdAt: new Date().toISOString(),
    lastActivity: new Date().toISOString(),
    accountVersion: '3.0',
    realAccount: true,
    signUpMethod: 'force-override'
  };
  
  localStorage.setItem('visualVibeUsers', JSON.stringify([newUser]));
  localStorage.setItem(`user_${email}`, JSON.stringify(newUser));
  
  const sessionUser = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    orders: [],
    reviews: [],
    signedIn: true,
    signInTime: new Date().toISOString()
  };
  
  window.currentUser = sessionUser;
  localStorage.setItem('visualVibeUser', JSON.stringify(sessionUser));
  
  alert(`✅ Force signup successful for ${name}!`);
  
  if (typeof window.updateSignInUI === 'function') {
    window.updateSignInUI();
  }
  
  console.log('✅ Force signup completed');
};

// NUCLEAR RESET FUNCTION
window.nuclearResetSignup = function() {
  console.log('💥 NUCLEAR RESET: Clearing ALL user data...');

  // Clear localStorage completely
  Object.keys(localStorage).forEach(key => {
    if (key.includes('user') || key.includes('User') ||
        key.includes('vibe') || key.includes('Vibe') ||
        key.includes('auth') || key.includes('Auth') ||
        key.includes('device') || key.includes('Device') ||
        key.includes('sync') || key.includes('Sync')) {
      localStorage.removeItem(key);
      console.log('🗑️ Removed:', key);
    }
  });

  // Reset global variables
  window.currentUser = null;
  window.selectedProfilePicture = null;

  alert('💥 NUCLEAR RESET COMPLETE. All user data cleared. Try signing up again.');
  console.log('✅ Nuclear reset completed');
};

console.log('🛡️ Simple signup protection loaded');
console.log('💡 Manual override available: forceSignUp("Name", "email@example.com", "password")');
console.log('💥 Nuclear reset available: nuclearResetSignup()');
