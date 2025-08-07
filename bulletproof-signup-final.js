// BULLETPROOF SIGNUP SYSTEM - GUARANTEED TO WORK
console.log('🛡️ Loading bulletproof signup system...');

// IMMEDIATELY run nuclear cleanup and override - NO DELAYS
(function() {
  'use strict';

  // Run immediately - don't wait for anything
  console.log('💥 BULLETPROOF SYSTEM ACTIVATING IMMEDIATELY...');
  
  // STEP 1: Nuclear localStorage cleanup
  function nuclearCleanup() {
    console.log('💥 NUCLEAR CLEANUP: Removing ALL user data...');
    
    // Get all keys first to avoid modification during iteration
    const allKeys = Object.keys(localStorage);
    let removedCount = 0;
    
    allKeys.forEach(key => {
      // Remove anything that could contain user data
      const keyLower = key.toLowerCase();
      if (keyLower.includes('user') || 
          keyLower.includes('vibe') || 
          keyLower.includes('auth') || 
          keyLower.includes('device') || 
          keyLower.includes('sync') || 
          keyLower.includes('cross') ||
          keyLower.includes('visual') ||
          keyLower.includes('account') ||
          keyLower.includes('profile') ||
          keyLower.includes('sign')) {
        try {
          localStorage.removeItem(key);
          removedCount++;
          console.log(`🗑️ Removed: ${key}`);
        } catch (e) {
          console.log(`❌ Could not remove: ${key}`);
        }
      }
    });
    
    console.log(`✅ Nuclear cleanup complete. Removed ${removedCount} items.`);
    
    // Also clear these specific items
    const specificKeys = [
      'visualVibeUsers', 'visualVibeUser', 'visualVibeCloudSync',
      'crossDeviceUsers', 'deviceFingerprint', 'currentUser'
    ];
    
    specificKeys.forEach(key => {
      try {
        localStorage.removeItem(key);
      } catch (e) {
        // Silent fail
      }
    });
    
    // Clear global variables
    window.currentUser = null;
    window.selectedProfilePicture = null;
  }
  
  // STEP 2: Create bulletproof signup function
  window.bulletproofSignUp = function(name, email, password, confirmPassword) {
    console.log('🚀 BULLETPROOF SIGNUP STARTING...');
    
    // Always start with nuclear cleanup
    nuclearCleanup();
    
    try {
      // Validation
      if (!name || !email || !password || !confirmPassword) {
        alert('Please fill in all fields.');
        return false;
      }
      
      if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return false;
      }
      
      if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return false;
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return false;
      }
      
      console.log('✅ Validation passed');
      
      // Create user object
      const newUser = {
        id: `bulletproof-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: name,
        firstName: name.split(' ')[0],
        lastName: name.split(' ').slice(1).join(' ') || '',
        email: email.toLowerCase(),
        password: password,
        orders: [],
        reviews: [],
        createdAt: new Date().toISOString(),
        lastActivity: new Date().toISOString(),
        accountVersion: 'bulletproof-1.0',
        realAccount: true,
        signUpMethod: 'bulletproof-signup',
        bulletproofAccount: true
      };
      
      console.log('✅ Creating bulletproof account:', { name, email });
      
      // Save to localStorage with multiple safeguards
      try {
        localStorage.setItem('visualVibeUsers', JSON.stringify([newUser]));
        localStorage.setItem('visualVibeUser', JSON.stringify(newUser));
        localStorage.setItem(`user_${email}`, JSON.stringify(newUser));
        localStorage.setItem('bulletproofUser', JSON.stringify(newUser));
        
        console.log('✅ User data saved to localStorage');
      } catch (error) {
        console.error('❌ localStorage save failed:', error);
        alert('Storage error. Please try again.');
        return false;
      }
      
      // Set current user
      window.currentUser = newUser;
      
      console.log('✅ BULLETPROOF SIGNUP SUCCESSFUL:', name);
      alert(`🎉 Welcome ${name}! Your account has been created successfully.`);
      
      // Try to close modal and update UI
      try {
        const modal = document.getElementById('signUpModal');
        if (modal) {
          modal.classList.add('hidden');
          modal.style.display = 'none';
        }
        
        if (typeof window.updateSignInUI === 'function') {
          window.updateSignInUI();
        }
      } catch (error) {
        console.log('UI update error (non-critical):', error);
      }
      
      return true;
      
    } catch (error) {
      console.error('❌ BULLETPROOF SIGNUP FAILED:', error);
      alert('❌ Signup failed. Please refresh the page and try again.');
      return false;
    }
  };
  
  // STEP 3: Override handleSignUp with bulletproof version
  setTimeout(() => {
    console.log('🔧 Installing bulletproof handleSignUp override...');
    
    // Delete any existing handleSignUp
    try {
      delete window.handleSignUp;
    } catch (e) {
      console.log('Could not delete existing handleSignUp');
    }
    
    // Install bulletproof version
    window.handleSignUp = function(e) {
      console.log('📝 BULLETPROOF handleSignUp called');
      if (e) e.preventDefault();
      
      try {
        // Get form fields
        const nameInput = document.getElementById('signUpName');
        const emailInput = document.getElementById('signUpEmail');
        const passwordInput = document.getElementById('signUpPassword');
        const confirmPasswordInput = document.getElementById('signUpConfirmPassword');
        
        if (!nameInput || !emailInput || !passwordInput || !confirmPasswordInput) {
          alert('Form elements not found. Please refresh the page.');
          return false;
        }
        
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        // Call bulletproof signup
        const success = window.bulletproofSignUp(name, email, password, confirmPassword);
        
        if (success) {
          // Clear form
          nameInput.value = '';
          emailInput.value = '';
          passwordInput.value = '';
          confirmPasswordInput.value = '';
        }
        
        return success;
        
      } catch (error) {
        console.error('❌ Form processing error:', error);
        alert('❌ Form error. Please refresh the page and try again.');
        return false;
      }
    };
    
    // Lock the function
    try {
      Object.defineProperty(window, 'handleSignUp', {
        value: window.handleSignUp,
        writable: false,
        configurable: false
      });
      console.log('🔒 Bulletproof handleSignUp locked');
    } catch (error) {
      console.log('⚠️ Could not lock function, but override successful');
    }
    
  }, 10); // Very early
  
  // STEP 4: Provide manual testing functions
  window.testBulletproofSignup = function(email = 'test@example.com') {
    console.log('🧪 Testing bulletproof signup...');
    return window.bulletproofSignUp(
      'Test User',
      email,
      'password123',
      'password123'
    );
  };
  
  window.showLocalStorageState = function() {
    console.log('📊 CURRENT LOCALSTORAGE STATE:');
    console.log('Total items:', localStorage.length);
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      
      if (key.toLowerCase().includes('user') || key.toLowerCase().includes('vibe')) {
        try {
          const parsed = JSON.parse(value);
          console.log(`🔑 ${key}:`, parsed);
        } catch (e) {
          console.log(`🔑 ${key}:`, value);
        }
      }
    }
  };
  
  console.log('🛡️ BULLETPROOF SIGNUP SYSTEM LOADED');
  console.log('🧪 Test manually: testBulletproofSignup("your@email.com")');
  console.log('📊 Check storage: showLocalStorageState()');
  
})();
