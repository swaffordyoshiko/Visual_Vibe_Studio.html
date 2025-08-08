// TEST CURRENT FUNCTIONALITY - DIAGNOSE SIGN IN/SIGN UP ISSUES
console.log('🔍 Testing current sign in/sign up functionality...');

(function() {
  'use strict';

  console.log('🧪 === FUNCTIONALITY DIAGNOSTIC REPORT ===');

  // 1. Check if functions exist
  console.log('📋 Function Availability Check:');
  const functionsToCheck = [
    'openSignInModal', 'openSignUpModal', 'closeSignInModal', 'closeSignUpModal',
    'handleSignIn', 'handleSignUp', 'switchToSignIn', 'switchToSignUp'
  ];

  functionsToCheck.forEach(func => {
    const exists = typeof window[func] === 'function';
    console.log(`  ${exists ? '✅' : '❌'} ${func}: ${typeof window[func]}`);
    if (exists) {
      try {
        console.log(`    Source: ${window[func].toString().substring(0, 100)}...`);
      } catch(e) {
        console.log(`    Source: Unable to read function source`);
      }
    }
  });

  // 2. Check for modal elements in DOM
  console.log('\n🏗️ DOM Element Check:');
  const modalsToCheck = ['signInModal', 'signUpModal'];
  modalsToCheck.forEach(modalId => {
    const modal = document.getElementById(modalId);
    console.log(`  ${modal ? '✅' : '❌'} ${modalId}: ${modal ? 'Found' : 'Missing'}`);
    if (modal) {
      console.log(`    Display: ${modal.style.display || 'default'}`);
      console.log(`    Classes: ${modal.className}`);
      console.log(`    Hidden: ${modal.classList.contains('hidden')}`);
    }
  });

  // 3. Check for buttons
  console.log('\n🔘 Button Check:');
  const signInButtons = document.querySelectorAll('button[onclick*="openSignInModal"], a[onclick*="openSignInModal"]');
  const signUpButtons = document.querySelectorAll('button[onclick*="openSignUpModal"], a[onclick*="openSignUpModal"]');
  
  console.log(`  ✅ Sign In buttons found: ${signInButtons.length}`);
  console.log(`  ✅ Sign Up buttons found: ${signUpButtons.length}`);

  signInButtons.forEach((btn, index) => {
    console.log(`    Sign In Button ${index + 1}: onclick="${btn.getAttribute('onclick')}"`);
    console.log(`      Text: "${btn.textContent.trim()}"`);
    console.log(`      Visible: ${btn.offsetParent !== null}`);
  });

  signUpButtons.forEach((btn, index) => {
    console.log(`    Sign Up Button ${index + 1}: onclick="${btn.getAttribute('onclick')}"`);
    console.log(`      Text: "${btn.textContent.trim()}"`);
    console.log(`      Visible: ${btn.offsetParent !== null}`);
  });

  // 4. Test button clicks
  console.log('\n🖱️ Testing Button Clicks:');
  
  // Create a test function
  window.testSignInButton = function() {
    console.log('🧪 Testing Sign In button click...');
    try {
      if (typeof window.openSignInModal === 'function') {
        const result = window.openSignInModal();
        console.log(`  Result: ${result}`);
        
        // Check if modal appeared
        setTimeout(() => {
          const modal = document.getElementById('signInModal');
          if (modal && modal.style.display === 'flex') {
            console.log('  ✅ Modal opened successfully');
            // Close it
            if (typeof window.closeSignInModal === 'function') {
              window.closeSignInModal();
              console.log('  ✅ Modal closed successfully');
            }
          } else {
            console.log('  ❌ Modal did not open properly');
          }
        }, 500);
      } else {
        console.log('  ❌ openSignInModal function not available');
      }
    } catch (error) {
      console.error('  ❌ Error testing sign in button:', error);
    }
  };

  window.testSignUpButton = function() {
    console.log('🧪 Testing Sign Up button click...');
    try {
      if (typeof window.openSignUpModal === 'function') {
        const result = window.openSignUpModal();
        console.log(`  Result: ${result}`);
        
        // Check if modal appeared
        setTimeout(() => {
          const modal = document.getElementById('signUpModal');
          if (modal && modal.style.display === 'flex') {
            console.log('  ✅ Modal opened successfully');
            // Close it
            if (typeof window.closeSignUpModal === 'function') {
              window.closeSignUpModal();
              console.log('  ✅ Modal closed successfully');
            }
          } else {
            console.log('  ❌ Modal did not open properly');
          }
        }, 500);
      } else {
        console.log('  ❌ openSignUpModal function not available');
      }
    } catch (error) {
      console.error('  ❌ Error testing sign up button:', error);
    }
  };

  // 5. Check current user state
  console.log('\n👤 Current User State:');
  console.log(`  currentUser: ${window.currentUser ? 'Signed in as ' + window.currentUser.name : 'Not signed in'}`);
  
  // Check localStorage
  const savedUser = localStorage.getItem('visualVibeUser');
  console.log(`  localStorage user: ${savedUser ? 'Found' : 'Not found'}`);
  if (savedUser) {
    try {
      const userData = JSON.parse(savedUser);
      console.log(`    Name: ${userData.name || 'Unknown'}`);
      console.log(`    Email: ${userData.email || 'Unknown'}`);
    } catch(e) {
      console.log(`    Invalid user data in localStorage`);
    }
  }

  // 6. Check for script conflicts
  console.log('\n⚠️ Potential Script Conflicts:');
  const conflictingScripts = [
    'comprehensive-auth-system', 'auth-debug-fix', 'emergency-signup-fix',
    'critical-functions-fix', 'master-functionality-fix', 'definitive-button-fix'
  ];
  
  conflictingScripts.forEach(scriptName => {
    const scriptExists = document.querySelector(`script[src*="${scriptName}"]`);
    console.log(`  ${scriptExists ? '⚠️' : '✅'} ${scriptName}: ${scriptExists ? 'Loaded' : 'Not loaded'}`);
  });

  // 7. Provide manual test commands
  console.log('\n🛠️ Manual Test Commands:');
  console.log('  Run these commands to test:');
  console.log('  - testSignInButton()');
  console.log('  - testSignUpButton()');
  console.log('  - openSignInModal()');
  console.log('  - openSignUpModal()');

  console.log('\n🔍 === END DIAGNOSTIC REPORT ===');

})();
