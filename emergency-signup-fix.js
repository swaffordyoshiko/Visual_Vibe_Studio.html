// EMERGENCY SIGNUP FIX - RUNS IMMEDIATELY
(function() {
  'use strict';
  
  console.log('🚨 EMERGENCY SIGNUP FIX LOADING...');
  
  // IMMEDIATE OVERRIDE - Block the problematic function NOW
  window.handleSignUp = function(e) {
    console.log('📝 [EMERGENCY] Processing sign up...');
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
      
      console.log(`📝 [EMERGENCY] Creating account for: ${name} (${email})`);
      
      // Validation
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
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }
      
      // FORCE CLEAN STORAGE IMMEDIATELY
      try {
        localStorage.removeItem('visualVibeCloudSync');
        localStorage.removeItem('crossDeviceUsers');
        localStorage.removeItem('deviceFingerprint');
        localStorage.removeItem('visualVibeCloudData');
        console.log('🧹 [EMERGENCY] Cleaned problematic storage');
      } catch (error) {
        console.log('⚠️ Storage cleaning failed:', error);
      }
      
      // Get users with aggressive cleanup
      let users = [];
      try {
        const rawUsers = localStorage.getItem('visualVibeUsers');
        if (rawUsers) {
          users = JSON.parse(rawUsers);
          // Remove ANY phantom accounts immediately
          users = users.filter(u => {
            const isPhantom = (
              !u.email ||
              u.password === 'temp123' ||
              u.password === 'temporary' ||
              u.syncedFromCloud ||
              !u.createdAt ||
              u.accountVersion !== '2.0'
            );
            if (isPhantom) {
              console.log('🗑️ [EMERGENCY] Removing phantom:', u.email || 'unknown');
              return false;
            }
            return true;
          });
        }
      } catch (error) {
        console.log('⚠️ [EMERGENCY] Users data corrupted, starting fresh');
        users = [];
      }
      
      // Check for REAL duplicate only
      const realDuplicate = users.find(u => {
        return u.email && u.email.toLowerCase() === email && u.realAccount === true;
      });
      
      if (realDuplicate) {
        console.log('❌ [EMERGENCY] Real account exists:', email);
        alert('An account already exists with this email. Please sign in instead.');
        return;
      }
      
      // FORCE CREATE NEW USER
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
        accountVersion: '2.0',
        realAccount: true,
        signUpMethod: 'emergency_direct',
        emergencyCreated: true
      };
      
      console.log('✅ [EMERGENCY] Force creating user:', newUser);
      
      // Add to users
      users.push(newUser);
      
      // FORCE SAVE TO ALL LOCATIONS
      localStorage.setItem('visualVibeUsers', JSON.stringify(users));
      localStorage.setItem(`user_${email}`, JSON.stringify(newUser));
      localStorage.setItem(`emergency_user_${email}`, JSON.stringify(newUser));
      
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
      
      console.log('✅ [EMERGENCY] User created and session established');
      
      // Clear form
      nameInput.value = '';
      emailInput.value = '';
      passwordInput.value = '';
      confirmPasswordInput.value = '';
      
      // Close modal
      if (typeof window.closeSignUpModal === 'function') {
        window.closeSignUpModal();
      }
      
      alert(`✅ Welcome ${name}! Your account has been created successfully.`);
      
      // Update UI
      if (typeof window.updateSignInUI === 'function') {
        window.updateSignInUI();
      }
      
    } catch (error) {
      console.error('❌ [EMERGENCY] Sign-up failed:', error);
      alert('❌ Sign up failed. Please try again.');
    }
  };
  
  // BLOCK CrossDeviceAuth completely
  window.CrossDeviceAuth = function() {
    console.log('🚫 [EMERGENCY] CrossDeviceAuth blocked');
    return {
      signUpWithSync: function() {
        console.log('🚫 [EMERGENCY] signUpWithSync blocked');
        return { success: false, message: 'Using emergency sign-up instead' };
      }
    };
  };
  
  // Override any existing CrossDeviceAuth
  if (window.CrossDeviceAuth && window.CrossDeviceAuth.prototype) {
    window.CrossDeviceAuth.prototype.signUpWithSync = function() {
      console.log('🚫 [EMERGENCY] CrossDeviceAuth.prototype.signUpWithSync blocked');
      return { success: false, message: 'Using emergency sign-up instead' };
    };
  }
  
  // Make the function non-writable
  try {
    Object.defineProperty(window, 'handleSignUp', {
      value: window.handleSignUp,
      writable: false,
      configurable: false
    });
    console.log('🔒 [EMERGENCY] handleSignUp locked against overwrites');
  } catch (error) {
    console.log('⚠️ [EMERGENCY] Could not lock handleSignUp');
  }
  
  console.log('🚨 EMERGENCY SIGNUP FIX LOADED AND LOCKED');
  
})();
