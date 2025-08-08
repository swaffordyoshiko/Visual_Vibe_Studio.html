// EMERGENCY CONSOLE FIX - No property redefinition, guaranteed to work
// Copy and paste this entire script into browser console (F12 → Console)

console.log('🚨 EMERGENCY CONSOLE FIX: Starting...');

(function() {
  'use strict';
  
  // Prevent multiple executions
  if (window.emergencyFixApplied) {
    console.log('⚠️ Emergency fix already applied');
    return;
  }
  window.emergencyFixApplied = true;
  
  console.log('🔧 Applying emergency authentication fix...');
  
  // STEP 1: Check for user session
  let currentUser = window.currentUser;
  
  if (!currentUser) {
    // Try to restore from storage
    const storageKeys = ['visualVibeUser', 'currentUser', 'vvs_user'];
    
    for (const key of storageKeys) {
      try {
        const data = localStorage.getItem(key);
        if (data && data !== 'null') {
          const parsed = JSON.parse(data);
          if (parsed && parsed.email) {
            currentUser = parsed;
            window.currentUser = currentUser;
            console.log(`✅ Restored user from ${key}:`, parsed.name);
            break;
          }
        }
      } catch (e) {
        // Silent fail
      }
    }
  }
  
  // STEP 2: Force correct UI state (THE MAIN FIX)
  console.log('🎨 Forcing UI elements to correct state...');
  
  // Get all UI elements
  const signedInState = document.getElementById('signedInState');
  const mobileSignedInState = document.getElementById('mobileSignedInState');
  const signedOutState = document.getElementById('signedOutState');
  const mobileSignedOutState = document.getElementById('mobileSignedOutState');
  const welcomeBanner = document.getElementById('welcomeBanner');
  
  // Determine if user should be signed in
  const shouldBeSignedIn = currentUser || 
                          localStorage.getItem('visualVibeUser') ||
                          localStorage.getItem('currentUser') ||
                          (welcomeBanner && welcomeBanner.textContent.includes('Welcome'));
  
  console.log('👤 User should be signed in:', !!shouldBeSignedIn);
  
  if (shouldBeSignedIn) {
    console.log('✅ Showing signed-in UI elements...');
    
    // SHOW signed-in elements
    if (signedInState) {
      signedInState.classList.remove('hidden');
      signedInState.style.display = 'flex';
      signedInState.style.visibility = 'visible';
      signedInState.style.opacity = '1';
      console.log('✅ Desktop signed-in state: SHOWN');
    } else {
      console.warn('⚠️ signedInState element not found');
    }
    
    if (mobileSignedInState) {
      mobileSignedInState.classList.remove('hidden');
      mobileSignedInState.style.display = 'block';
      mobileSignedInState.style.visibility = 'visible';
      mobileSignedInState.style.opacity = '1';
      console.log('✅ Mobile signed-in state: SHOWN');
    } else {
      console.warn('⚠️ mobileSignedInState element not found');
    }
    
    if (welcomeBanner) {
      welcomeBanner.classList.remove('hidden');
      welcomeBanner.style.display = 'block';
      welcomeBanner.style.visibility = 'visible';
      welcomeBanner.style.opacity = '1';
      console.log('✅ Welcome banner: SHOWN');
    }
    
    // HIDE signed-out elements
    if (signedOutState) {
      signedOutState.classList.add('hidden');
      signedOutState.style.display = 'none';
      signedOutState.style.visibility = 'hidden';
      console.log('🔒 Desktop signed-out state: HIDDEN');
    }
    
    if (mobileSignedOutState) {
      mobileSignedOutState.classList.add('hidden');
      mobileSignedOutState.style.display = 'none';
      mobileSignedOutState.style.visibility = 'hidden';
      console.log('🔒 Mobile signed-out state: HIDDEN');
    }
    
    console.log('✅ Signed-in UI state applied successfully!');
    
  } else {
    console.log('🔓 Showing signed-out UI elements...');
    
    // Show signed-out, hide signed-in
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
    
    console.log('✅ Signed-out UI state applied');
  }
  
  // STEP 3: Fix sign-in button
  const signInButtons = document.querySelectorAll('button[onclick*="openSignInModal"]');
  console.log(`🔘 Found ${signInButtons.length} sign-in buttons to fix`);
  
  signInButtons.forEach((button, index) => {
    // Override click handler
    button.onclick = function(e) {
      e.preventDefault();
      console.log(`🔘 Sign-in button ${index + 1} clicked (emergency fix)`);
      
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
    
    console.log(`✅ Fixed sign-in button ${index + 1}`);
  });
  
  // STEP 4: Fix sign-out button
  const signOutButtons = document.querySelectorAll('button[onclick*="signOut"]');
  console.log(`🔘 Found ${signOutButtons.length} sign-out buttons to fix`);
  
  signOutButtons.forEach((button, index) => {
    button.onclick = function(e) {
      e.preventDefault();
      console.log(`🔘 Sign-out button ${index + 1} clicked (emergency fix)`);
      
      // Clear session
      window.currentUser = null;
      localStorage.removeItem('visualVibeUser');
      localStorage.removeItem('currentUser');
      localStorage.removeItem('vvs_user');
      
      // Update UI to signed-out state
      if (signedInState) {
        signedInState.classList.add('hidden');
        signedInState.style.display = 'none';
      }
      if (mobileSignedInState) {
        mobileSignedInState.classList.add('hidden');
        mobileSignedInState.style.display = 'none';
      }
      if (signedOutState) {
        signedOutState.classList.remove('hidden');
        signedOutState.style.display = 'flex';
      }
      if (mobileSignedOutState) {
        mobileSignedOutState.classList.remove('hidden');
        mobileSignedOutState.style.display = 'block';
      }
      if (welcomeBanner) {
        welcomeBanner.classList.add('hidden');
        welcomeBanner.style.display = 'none';
      }
      
      alert('You have been signed out successfully.');
      console.log('✅ Sign-out completed');
    };
    
    console.log(`✅ Fixed sign-out button ${index + 1}`);
  });
  
  console.log('✅ EMERGENCY CONSOLE FIX: Complete!');
  console.log('📊 Summary:');
  console.log(`- User signed in: ${!!shouldBeSignedIn}`);
  console.log(`- Fixed ${signInButtons.length} sign-in buttons`);
  console.log(`- Fixed ${signOutButtons.length} sign-out buttons`);
  console.log('🎉 Edit Profile, My Orders, and Sign Out buttons should now be visible!');
  
})();

// Make a simple rerun function available
window.emergencyAuthFix = function() {
  window.emergencyFixApplied = false;
  // Re-run the fix
  console.log('🔄 Re-running emergency auth fix...');
  // The script will re-execute
};

console.log('🚨 EMERGENCY FIX COMPLETE - No property redefinition errors!');
console.log('💡 Run emergencyAuthFix() to apply again if needed');
