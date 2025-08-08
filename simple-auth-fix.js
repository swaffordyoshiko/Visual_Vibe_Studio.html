// SIMPLE AUTHENTICATION FIX - No property redefinition issues
console.log('🔧 SIMPLE AUTH FIX: Applying direct authentication fixes...');

// Flag to prevent multiple executions
if (window.simpleAuthFixApplied) {
  console.log('⚠️ Simple auth fix already applied, skipping...');
} else {
  window.simpleAuthFixApplied = true;
  
  // STEP 1: Check and restore user session
  function restoreUserSession() {
    console.log('🔍 Checking for existing user session...');
    
    if (window.currentUser) {
      console.log('✅ currentUser already exists:', window.currentUser.name);
      return window.currentUser;
    }
    
    // Check storage locations
    const storageKeys = ['visualVibeUser', 'currentUser', 'vvs_user'];
    
    for (const key of storageKeys) {
      try {
        const userData = localStorage.getItem(key);
        if (userData && userData !== 'null') {
          const parsed = JSON.parse(userData);
          if (parsed && parsed.email) {
            window.currentUser = parsed;
            console.log(`✅ Restored user session from ${key}:`, parsed.name);
            return parsed;
          }
        }
      } catch (e) {
        console.warn(`⚠️ Error reading ${key}:`, e);
      }
    }
    
    console.log('📋 No active user session found');
    return null;
  }
  
  // STEP 2: Force UI to correct state (the main fix)
  function forceCorrectUIState() {
    console.log('🎨 Forcing correct UI state...');
    
    const user = restoreUserSession();
    
    // Get UI elements
    const signedInState = document.getElementById('signedInState');
    const mobileSignedInState = document.getElementById('mobileSignedInState');
    const signedOutState = document.getElementById('signedOutState');
    const mobileSignedOutState = document.getElementById('mobileSignedOutState');
    const welcomeBanner = document.getElementById('welcomeBanner');
    
    if (user) {
      console.log('👤 User is signed in, showing signed-in UI for:', user.name);
      
      // SHOW signed-in elements (remove hidden class AND set display)
      if (signedInState) {
        signedInState.classList.remove('hidden');
        signedInState.style.display = 'flex';
        signedInState.style.visibility = 'visible';
        signedInState.style.opacity = '1';
        console.log('✅ Showed desktop signed-in state');
      }
      
      if (mobileSignedInState) {
        mobileSignedInState.classList.remove('hidden');
        mobileSignedInState.style.display = 'block';
        mobileSignedInState.style.visibility = 'visible';
        mobileSignedInState.style.opacity = '1';
        console.log('✅ Showed mobile signed-in state');
      }
      
      if (welcomeBanner) {
        welcomeBanner.classList.remove('hidden');
        welcomeBanner.style.display = 'block';
        welcomeBanner.style.visibility = 'visible';
        welcomeBanner.style.opacity = '1';
        console.log('✅ Showed welcome banner');
      }
      
      // HIDE signed-out elements
      if (signedOutState) {
        signedOutState.classList.add('hidden');
        signedOutState.style.display = 'none';
        signedOutState.style.visibility = 'hidden';
      }
      
      if (mobileSignedOutState) {
        mobileSignedOutState.classList.add('hidden');
        mobileSignedOutState.style.display = 'none';
        mobileSignedOutState.style.visibility = 'hidden';
      }
      
      console.log('✅ Signed-in UI state applied successfully');
      
    } else {
      console.log('🔓 No user signed in, showing signed-out UI');
      
      // Show signed-out elements
      if (signedOutState) {
        signedOutState.classList.remove('hidden');
        signedOutState.style.display = 'flex';
        signedOutState.style.visibility = 'visible';
      }
      
      if (mobileSignedOutState) {
        mobileSignedOutState.classList.remove('hidden');
        mobileSignedOutState.style.display = 'block';
        mobileSignedOutState.style.visibility = 'visible';
      }
      
      // Hide signed-in elements
      if (signedInState) {
        signedInState.classList.add('hidden');
        signedInState.style.display = 'none';
      }
      
      if (mobileSignedInState) {
        mobileSignedInState.classList.add('hidden');
        mobileSignedInState.style.display = 'none';
      }
      
      if (welcomeBanner) {
        welcomeBanner.classList.add('hidden');
        welcomeBanner.style.display = 'none';
      }
    }
  }
  
  // STEP 3: Fix sign-in button functionality
  function fixSignInButton() {
    console.log('🔘 Fixing sign-in button functionality...');
    
    const signInButtons = document.querySelectorAll('button[onclick*="openSignInModal"]');
    
    signInButtons.forEach((button, index) => {
      // Create new click handler
      const newHandler = function(e) {
        e.preventDefault();
        console.log(`🔘 Sign-in button ${index + 1} clicked (fixed)`);
        
        const modal = document.getElementById('signInModal');
        if (modal) {
          modal.classList.remove('hidden');
          modal.style.display = 'flex';
          modal.style.opacity = '1';
          modal.style.visibility = 'visible';
          modal.style.zIndex = '9999';
          
          // Focus email input
          const emailInput = document.getElementById('signInEmail');
          if (emailInput) {
            setTimeout(() => emailInput.focus(), 100);
          }
          
          console.log('✅ Sign-in modal opened');
        } else {
          console.error('❌ Sign-in modal not found');
          alert('Sign-in form not available. Please refresh the page.');
        }
      };
      
      // Replace onclick handler
      button.onclick = newHandler;
      button.removeAttribute('onclick');
      button.setAttribute('onclick', 'return false;');
      button.addEventListener('click', newHandler);
      
      console.log(`✅ Fixed sign-in button ${index + 1}`);
    });
    
    console.log(`✅ Fixed ${signInButtons.length} sign-in buttons`);
  }
  
  // STEP 4: Fix sign-out button functionality
  function fixSignOutButton() {
    console.log('🔘 Fixing sign-out button functionality...');
    
    const signOutButtons = document.querySelectorAll('button[onclick*="signOut"]');
    
    signOutButtons.forEach((button, index) => {
      const newHandler = function(e) {
        e.preventDefault();
        console.log(`🔘 Sign-out button ${index + 1} clicked (fixed)`);
        
        // Clear user session
        window.currentUser = null;
        localStorage.removeItem('visualVibeUser');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('vvs_user');
        
        // Force UI to signed-out state
        forceCorrectUIState();
        
        alert('You have been signed out successfully.');
        console.log('✅ Sign-out completed');
      };
      
      button.onclick = newHandler;
      button.removeAttribute('onclick');
      button.setAttribute('onclick', 'return false;');
      button.addEventListener('click', newHandler);
      
      console.log(`✅ Fixed sign-out button ${index + 1}`);
    });
    
    console.log(`✅ Fixed ${signOutButtons.length} sign-out buttons`);
  }
  
  // STEP 5: Enhanced sign-in form handler
  function fixSignInForm() {
    console.log('📝 Fixing sign-in form handler...');
    
    const signInForm = document.getElementById('signInForm');
    if (!signInForm) {
      console.warn('⚠️ Sign-in form not found');
      return;
    }
    
    // Create new submit handler
    const newSubmitHandler = function(e) {
      e.preventDefault();
      console.log('🔑 Processing sign-in (simple fix)...');
      
      const emailInput = document.getElementById('signInEmail');
      const passwordInput = document.getElementById('signInPassword');
      
      if (!emailInput || !passwordInput) {
        alert('Sign-in form not found. Please refresh the page.');
        return;
      }
      
      const email = emailInput.value.trim().toLowerCase();
      const password = passwordInput.value;
      
      if (!email || !password) {
        alert('Please enter both email and password.');
        return;
      }
      
      // Get users from storage
      let users = [];
      try {
        users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      } catch (e) {
        console.error('❌ Error reading users:', e);
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
      
      // Update user's last login
      user.lastLogin = new Date().toISOString();
      localStorage.setItem('visualVibeUsers', JSON.stringify(users));
      
      // Close modal
      const modal = document.getElementById('signInModal');
      if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
      }
      signInForm.reset();
      
      // Force UI update
      forceCorrectUIState();
      
      alert(`Welcome back, ${user.name}!`);
      console.log('✅ Sign-in completed successfully');
    };
    
    // Remove existing listeners and add new one
    signInForm.onsubmit = newSubmitHandler;
    signInForm.addEventListener('submit', newSubmitHandler);
    
    console.log('✅ Sign-in form handler fixed');
  }
  
  // STEP 6: Execute all fixes
  function applyAllFixes() {
    console.log('🚀 Applying all authentication fixes...');
    
    try {
      forceCorrectUIState();
      fixSignInButton();
      fixSignOutButton();
      fixSignInForm();
      
      console.log('✅ All authentication fixes applied successfully');
    } catch (error) {
      console.error('❌ Error applying fixes:', error);
    }
  }
  
  // Execute immediately
  applyAllFixes();
  
  // Execute with delays for various load scenarios
  setTimeout(applyAllFixes, 100);
  setTimeout(applyAllFixes, 500);
  setTimeout(applyAllFixes, 1000);
  
  // Execute on DOM content loaded if still loading
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(applyAllFixes, 100);
    });
  }
  
  // Make functions available globally for manual use
  window.forceCorrectUIState = forceCorrectUIState;
  window.fixAuthButtons = function() {
    fixSignInButton();
    fixSignOutButton();
  };
  
  console.log('✅ SIMPLE AUTH FIX: Complete');
  console.log('💡 Available commands:');
  console.log('- forceCorrectUIState() - Force UI to correct state');
  console.log('- fixAuthButtons() - Fix sign-in/sign-out buttons');
}
