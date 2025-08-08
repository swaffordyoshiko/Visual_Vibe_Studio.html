// CRITICAL AUTH FIX - Immediate authentication and UI fix
console.log('🔧 CRITICAL AUTH FIX: Starting immediate authentication repair...');

(function() {
  'use strict';
  
  console.log('🚀 Applying comprehensive authentication fix...');
  
  // STEP 1: Session Management Functions
  function detectAndRestoreUserSession() {
    console.log('🔍 Detecting and restoring user session...');
    
    let currentUser = window.currentUser;
    
    // Check multiple storage locations
    const storageKeys = ['visualVibeUser', 'currentUser', 'vvs_user'];
    
    if (!currentUser) {
      for (const key of storageKeys) {
        try {
          const data = localStorage.getItem(key);
          if (data && data !== 'null' && data !== 'undefined') {
            const parsed = JSON.parse(data);
            if (parsed && parsed.email && parsed.name) {
              currentUser = parsed;
              window.currentUser = currentUser;
              console.log(`✅ Restored session from ${key}:`, parsed.name);
              break;
            }
          }
        } catch (e) {
          // Silent fail
        }
      }
    }
    
    return currentUser;
  }
  
  // STEP 2: FORCE UI TO CORRECT STATE (Main fix for hidden buttons)
  function forceUIToCorrectState() {
    console.log('🎨 FORCING UI elements to correct state...');
    
    const currentUser = detectAndRestoreUserSession();
    
    // Get all critical UI elements
    const signedInState = document.getElementById('signedInState');
    const mobileSignedInState = document.getElementById('mobileSignedInState');
    const signedOutState = document.getElementById('signedOutState');
    const mobileSignedOutState = document.getElementById('mobileSignedOutState');
    const welcomeBanner = document.getElementById('welcomeBanner');
    
    // Determine if user should be signed in
    const shouldBeSignedIn = !!(currentUser || 
      localStorage.getItem('visualVibeUser') ||
      localStorage.getItem('currentUser') ||
      (welcomeBanner && welcomeBanner.textContent.includes('Welcome')));
    
    console.log('👤 Should be signed in:', shouldBeSignedIn);
    
    if (shouldBeSignedIn) {
      console.log('✅ SHOWING SIGNED-IN UI ELEMENTS...');
      
      // FORCE SHOW signed-in elements (remove hidden class AND set display)
      if (signedInState) {
        signedInState.classList.remove('hidden');
        signedInState.style.display = 'flex';
        signedInState.style.visibility = 'visible';
        signedInState.style.opacity = '1';
        console.log('✅ Desktop Edit Profile, My Orders, Sign Out buttons: NOW VISIBLE');
      }
      
      if (mobileSignedInState) {
        mobileSignedInState.classList.remove('hidden');
        mobileSignedInState.style.display = 'block';
        mobileSignedInState.style.visibility = 'visible';
        mobileSignedInState.style.opacity = '1';
        console.log('✅ Mobile Edit Profile, My Orders, Sign Out buttons: NOW VISIBLE');
      }
      
      if (welcomeBanner) {
        welcomeBanner.classList.remove('hidden');
        welcomeBanner.style.display = 'block';
        welcomeBanner.style.visibility = 'visible';
        welcomeBanner.style.opacity = '1';
      }
      
      // FORCE HIDE signed-out elements
      if (signedOutState) {
        signedOutState.classList.add('hidden');
        signedOutState.style.display = 'none';
      }
      
      if (mobileSignedOutState) {
        mobileSignedOutState.classList.add('hidden');
        mobileSignedOutState.style.display = 'none';
      }
      
      console.log('🎉 SIGNED-IN UI STATE APPLIED - Edit Profile, My Orders, Sign Out buttons should now be VISIBLE!');
      
    } else {
      console.log('🔓 Showing signed-out UI elements...');
      
      // Show signed-out, hide signed-in
      if (signedOutState) {
        signedOutState.classList.remove('hidden');
        signedOutState.style.display = 'flex';
      }
      
      if (mobileSignedOutState) {
        mobileSignedOutState.classList.remove('hidden');
        mobileSignedOutState.style.display = 'block';
      }
      
      if (signedInState) {
        signedInState.classList.add('hidden');
        signedInState.style.display = 'none';
      }
      
      if (mobileSignedInState) {
        mobileSignedInState.classList.add('hidden');
        mobileSignedInState.style.display = 'none';
      }
    }
  }
  
  // STEP 3: Enhanced Sign-In Handler
  function createWorkingSignInHandler() {
    function workingSignIn(e) {
      if (e) e.preventDefault();
      console.log('🔑 Processing sign-in (critical fix)...');
      
      try {
        const emailInput = document.getElementById('signInEmail');
        const passwordInput = document.getElementById('signInPassword');
        
        if (!emailInput || !passwordInput) {
          alert('Sign-in form not found. Please refresh the page.');
          return;
        }
        
        const email = emailInput.value.trim().toLowerCase();
        const password = passwordInput.value.trim();
        
        if (!email || !password) {
          alert('Please enter both email and password.');
          return;
        }
        
        // Get users from storage
        let users = [];
        try {
          const usersData = localStorage.getItem('visualVibeUsers');
          if (usersData && usersData !== 'null') {
            users = JSON.parse(usersData);
            if (!Array.isArray(users)) users = [];
          }
        } catch (e) {
          users = [];
        }
        
        if (users.length === 0) {
          alert('No accounts found. Please sign up first.');
          return;
        }
        
        // Find user
        const user = users.find(u => u && u.email && u.email.toLowerCase() === email);
        
        if (!user) {
          alert(`No account found with email: ${email}\nPlease check your email or sign up.`);
          return;
        }
        
        if (user.password !== password) {
          alert('Incorrect password. Please try again.');
          passwordInput.focus();
          return;
        }
        
        // Success - create session
        const sessionUser = {
          id: user.id,
          name: user.name,
          email: user.email,
          loginTime: new Date().toISOString()
        };
        
        window.currentUser = sessionUser;
        localStorage.setItem('visualVibeUser', JSON.stringify(sessionUser));
        localStorage.setItem('currentUser', JSON.stringify(sessionUser));
        
        // Close modal
        const modal = document.getElementById('signInModal');
        if (modal) {
          modal.classList.add('hidden');
          modal.style.display = 'none';
        }
        const form = document.getElementById('signInForm');
        if (form) form.reset();
        
        // FORCE UI UPDATE
        setTimeout(forceUIToCorrectState, 100);
        
        alert(`Welcome back, ${user.name}!`);
        console.log('✅ Sign-in completed - UI should now show signed-in buttons');
        
      } catch (error) {
        console.error('❌ Sign-in error:', error);
        alert('Sign-in error. Please try again.');
      }
    }
    
    return workingSignIn;
  }
  
  // STEP 4: Enhanced Sign-Up Handler  
  function createWorkingSignUpHandler() {
    function workingSignUp(e) {
      if (e) e.preventDefault();
      console.log('📝 Processing sign-up (critical fix)...');
      
      try {
        const nameInput = document.getElementById('signUpName');
        const emailInput = document.getElementById('signUpEmail');
        const passwordInput = document.getElementById('signUpPassword');
        const confirmPasswordInput = document.getElementById('signUpConfirmPassword');
        
        if (!nameInput || !emailInput || !passwordInput || !confirmPasswordInput) {
          alert('Sign-up form not found. Please refresh the page.');
          return;
        }
        
        const name = nameInput.value.trim();
        const email = emailInput.value.trim().toLowerCase();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();
        
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
        
        // Get existing users
        let users = [];
        try {
          const usersData = localStorage.getItem('visualVibeUsers');
          if (usersData && usersData !== 'null') {
            users = JSON.parse(usersData);
            if (!Array.isArray(users)) users = [];
          }
        } catch (e) {
          users = [];
        }
        
        // Check for duplicate
        const existingUser = users.find(u => u && u.email && u.email.toLowerCase() === email);
        if (existingUser) {
          alert(`An account already exists with email: ${email}\nPlease sign in instead.`);
          return;
        }
        
        // Create new user
        const newUser = {
          id: 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
          name: name,
          email: email,
          password: password,
          createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        localStorage.setItem('visualVibeUsers', JSON.stringify(users));
        
        // Create session
        const sessionUser = {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          loginTime: new Date().toISOString()
        };
        
        window.currentUser = sessionUser;
        localStorage.setItem('visualVibeUser', JSON.stringify(sessionUser));
        localStorage.setItem('currentUser', JSON.stringify(sessionUser));
        
        // Close modal
        const modal = document.getElementById('signUpModal');
        if (modal) {
          modal.classList.add('hidden');
          modal.style.display = 'none';
        }
        const form = document.getElementById('signUpForm');
        if (form) form.reset();
        
        // FORCE UI UPDATE
        setTimeout(forceUIToCorrectState, 100);
        
        alert(`Welcome ${name}! Your account has been created.`);
        console.log('✅ Sign-up completed - UI should now show signed-in buttons');
        
      } catch (error) {
        console.error('❌ Sign-up error:', error);
        alert('Sign-up error. Please try again.');
      }
    }
    
    return workingSignUp;
  }
  
  // STEP 5: Fix Forms and Buttons
  function fixAuthenticationSystem() {
    console.log('🔧 Fixing authentication system...');
    
    const workingSignInHandler = createWorkingSignInHandler();
    const workingSignUpHandler = createWorkingSignUpHandler();
    
    // Fix sign-in form
    const signInForm = document.getElementById('signInForm');
    if (signInForm) {
      const newForm = signInForm.cloneNode(true);
      signInForm.parentNode.replaceChild(newForm, signInForm);
      newForm.addEventListener('submit', workingSignInHandler);
      console.log('✅ Sign-in form fixed');
    }
    
    // Fix sign-up form
    const signUpForm = document.getElementById('signUpForm');
    if (signUpForm) {
      const newForm = signUpForm.cloneNode(true);
      signUpForm.parentNode.replaceChild(newForm, signUpForm);
      newForm.addEventListener('submit', workingSignUpHandler);
      console.log('✅ Sign-up form fixed');
    }
    
    // Fix sign-in buttons
    const signInButtons = document.querySelectorAll('button[onclick*="openSignInModal"]');
    signInButtons.forEach((button, index) => {
      button.onclick = function(e) {
        e.preventDefault();
        const modal = document.getElementById('signInModal');
        if (modal) {
          modal.classList.remove('hidden');
          modal.style.display = 'flex';
          modal.style.zIndex = '9999';
          const emailInput = document.getElementById('signInEmail');
          if (emailInput) setTimeout(() => emailInput.focus(), 100);
        }
      };
      console.log(`✅ Fixed sign-in button ${index + 1}`);
    });
    
    // Fix sign-up buttons
    const signUpButtons = document.querySelectorAll('button[onclick*="openSignUpModal"]');
    signUpButtons.forEach((button, index) => {
      button.onclick = function(e) {
        e.preventDefault();
        const modal = document.getElementById('signUpModal');
        if (modal) {
          modal.classList.remove('hidden');
          modal.style.display = 'flex';
          modal.style.zIndex = '9999';
          const nameInput = document.getElementById('signUpName');
          if (nameInput) setTimeout(() => nameInput.focus(), 100);
        }
      };
      console.log(`✅ Fixed sign-up button ${index + 1}`);
    });
    
    // Fix sign-out buttons
    const signOutButtons = document.querySelectorAll('button[onclick*="signOut"]');
    signOutButtons.forEach((button, index) => {
      button.onclick = function(e) {
        e.preventDefault();
        window.currentUser = null;
        localStorage.removeItem('visualVibeUser');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('vvs_user');
        forceUIToCorrectState();
        alert('Signed out successfully!');
      };
      console.log(`✅ Fixed sign-out button ${index + 1}`);
    });
  }
  
  // STEP 6: Create test user
  function createTestUser() {
    const testUser = {
      id: 'test_critical_' + Date.now(),
      name: 'Test User',
      email: 'test@example.com',
      password: 'test123',
      createdAt: new Date().toISOString()
    };
    
    let users = [];
    try {
      users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
    } catch (e) {
      users = [];
    }
    
    users = users.filter(u => u.email !== 'test@example.com');
    users.push(testUser);
    localStorage.setItem('visualVibeUsers', JSON.stringify(users));
    
    console.log('✅ Test user created: test@example.com / test123');
  }
  
  // STEP 7: Execute all fixes
  function applyAllFixes() {
    try {
      forceUIToCorrectState();
      fixAuthenticationSystem();
      console.log('✅ All critical authentication fixes applied');
    } catch (error) {
      console.error('❌ Error applying fixes:', error);
    }
  }
  
  // Execute immediately
  applyAllFixes();
  
  // Create test user if none exists
  setTimeout(() => {
    const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
    if (users.length === 0) createTestUser();
  }, 1000);
  
  // Retry fixes
  setTimeout(applyAllFixes, 100);
  setTimeout(applyAllFixes, 500);
  setTimeout(applyAllFixes, 1000);
  setTimeout(applyAllFixes, 2000);
  
  // Continuous monitoring to ensure UI stays visible
  let monitorCount = 0;
  function monitorUIState() {
    if (monitorCount < 20) {
      monitorCount++;
      const signedInState = document.getElementById('signedInState');
      const currentUser = window.currentUser || localStorage.getItem('visualVibeUser');
      
      if (currentUser && signedInState && signedInState.classList.contains('hidden')) {
        console.log('🔧 Re-fixing hidden signed-in elements...');
        forceUIToCorrectState();
      }
      
      setTimeout(monitorUIState, 3000);
    }
  }
  
  setTimeout(monitorUIState, 5000);
  
  // Expose functions globally
  window.criticalAuthForceUIFix = forceUIToCorrectState;
  window.criticalAuthApplyAllFixes = applyAllFixes;
  
  console.log('🎉 CRITICAL AUTH FIX: Complete!');
  console.log('✅ Sign-in should work and buttons should be visible!');
  console.log('💡 Available commands:');
  console.log('- criticalAuthForceUIFix() - Force UI to correct state');
  console.log('- criticalAuthApplyAllFixes() - Re-apply all fixes');
  
})();
