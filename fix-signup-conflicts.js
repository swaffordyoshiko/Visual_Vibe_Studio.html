// DEFINITIVE SIGN-UP CONFLICT FIX - DISABLED
// This script is disabled because simple-signup-override.js provides better functionality
console.log('🚨 fix-signup-conflicts.js DISABLED - using simple-signup-override.js instead');
return; // Exit immediately

(function() {
  'use strict';
  
  // IMMEDIATELY disable problematic cross-device auth
  window.CrossDeviceAuth = null;
  
  // Wait for DOM and override everything
  setTimeout(() => {
    console.log('🔧 Overriding all sign-up functions to fix conflicts...');
    
    // COMPLETELY OVERRIDE handleSignUp to bypass all conflicts
    try {
      // Delete existing property if it exists and is non-configurable
      if (window.hasOwnProperty('handleSignUp')) {
        delete window.handleSignUp;
      }
    } catch (e) {
      console.log('Could not delete existing handleSignUp property');
    }

    window.handleSignUp = function(e) {
      console.log('📝 [DEFINITIVE FIX] Processing sign up...');
      if (e) e.preventDefault();
      
      try {
        const nameInput = document.getElementById('signUpName');
        const emailInput = document.getElementById('signUpEmail');
        const passwordInput = document.getElementById('signUpPassword');
        const confirmPasswordInput = document.getElementById('signUpConfirmPassword');
        
        if (!nameInput || !emailInput || !passwordInput || !confirmPasswordInput) {
          console.log('❌ Form elements not found');
          alert('Form elements not found. Please refresh the page.');
          return;
        }
        
        const name = nameInput.value.trim();
        const email = emailInput.value.trim().toLowerCase();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        console.log(`📝 Attempting to create account for: ${name} (${email})`);

        // EMERGENCY: If signup keeps failing, provide option to clear conflicts
        window.clearSignUpConflicts = function(emailToClear) {
          const targetEmail = emailToClear || email;
          console.log('🧹 EMERGENCY: Clearing all accounts for:', targetEmail);
          try {
            const allUsers = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
            const filteredUsers = allUsers.filter(u => !u.email || u.email.toLowerCase() !== targetEmail.toLowerCase());
            localStorage.setItem('visualVibeUsers', JSON.stringify(filteredUsers));
            localStorage.removeItem(`user_${targetEmail}`);
            console.log('✅ Cleared all accounts for:', targetEmail);
            alert(`Cleared all accounts for ${targetEmail}. Please try signing up again.`);
          } catch (error) {
            console.error('❌ Failed to clear accounts:', error);
          }
        };

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
        
        // AGGRESSIVE APPROACH: Clear all potential conflicts first
        try {
          // Clear any problematic sync data
          localStorage.removeItem('visualVibeCloudSync');
          localStorage.removeItem('crossDeviceUsers');
          localStorage.removeItem('deviceFingerprint');
          console.log('🧹 Cleared problematic sync data');
        } catch (error) {
          console.log('⚠️ Sync data clearing failed:', error);
        }
        
        // Get existing users with smart filtering
        let users = [];
        try {
          users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
          console.log(`👥 Found ${users.length} existing users for email: ${email}`);

          // Debug: Show all users with same email
          const sameEmailUsers = users.filter(u => u.email && u.email.toLowerCase() === email);
          if (sameEmailUsers.length > 0) {
            console.log('🔍 Users with same email:', sameEmailUsers.map(u => ({
              email: u.email,
              realAccount: u.realAccount,
              signUpMethod: u.signUpMethod,
              createdAt: u.createdAt,
              syncedFromCloud: u.syncedFromCloud,
              hasPassword: !!u.password
            })));
          }
        } catch (error) {
          console.log('⚠️ Users data corrupted, starting fresh');
          users = [];
        }
        
        // SMART DUPLICATE DETECTION - Only block real accounts
        const existingRealUser = users.find(u => {
          const emailMatch = u.email && u.email.toLowerCase() === email;

          // Debug: Log what we're checking
          console.log('🔍 Checking user:', {
            email: u.email,
            password: u.password ? '[HIDDEN]' : 'none',
            syncedFromCloud: u.syncedFromCloud,
            createdAt: u.createdAt,
            realAccount: u.realAccount,
            signUpMethod: u.signUpMethod
          });

          const isRealUser = (
            u.password &&
            u.password !== 'temp123' &&
            u.password !== 'temporary' &&
            !u.syncedFromCloud &&
            u.createdAt &&
            u.realAccount === true && // Must be explicitly set to true
            u.signUpMethod !== 'sync' &&
            u.signUpMethod !== 'phantom'
          );

          console.log('🔍 Is real user?', isRealUser);
          return emailMatch && isRealUser;
        });
        
        if (existingRealUser) {
          console.log('❌ Real account found:', email);
          console.log('🔍 Existing account details:', {
            name: existingRealUser.name,
            createdAt: existingRealUser.createdAt,
            realAccount: existingRealUser.realAccount,
            signUpMethod: existingRealUser.signUpMethod,
            hasPassword: !!existingRealUser.password
          });

          // Give user option to clear the conflict
          const userChoice = confirm(
            `An account already exists with this email: ${email}\n\n` +
            `Account Name: ${existingRealUser.name || 'Unknown'}\n` +
            `Created: ${existingRealUser.createdAt || 'Unknown'}\n\n` +
            `Click OK to clear this account and create a new one,\n` +
            `or Cancel to switch to sign-in instead.`
          );

          if (userChoice) {
            console.log('🧹 User chose to clear existing account and create new one');
            // Remove the existing account and continue with signup
            const cleanedUsers = users.filter(u => u !== existingRealUser);
            localStorage.setItem('visualVibeUsers', JSON.stringify(cleanedUsers));
            localStorage.removeItem(`user_${email}`);
            console.log('✅ Existing account cleared, continuing with signup...');
            // Continue execution - don't return here
          } else {
            console.log('🔄 User chose to switch to sign-in');
            alert('Please sign in with your existing account.');

            // Switch to sign-in
            setTimeout(() => {
              if (typeof window.switchToSignIn === 'function') {
                window.switchToSignIn();
                setTimeout(() => {
                  const signInEmailInput = document.getElementById('signInEmail');
                  if (signInEmailInput) {
                    signInEmailInput.value = email;
                  }
                }, 200);
              }
            }, 1000);
            return;
          }
        }
        
        // Remove any phantom/sync accounts with same email
        const cleanUsers = users.filter(u => {
          if (u.email && u.email.toLowerCase() === email) {
            const isPhantom = (
              !u.password ||
              u.password === 'temp123' ||
              u.password === 'temporary' ||
              u.syncedFromCloud ||
              !u.createdAt ||
              u.realAccount === false ||
              u.realAccount === undefined ||
              u.signUpMethod === 'sync' ||
              u.signUpMethod === 'phantom' ||
              !u.signUpMethod
            );
            if (isPhantom) {
              console.log('🗑️ Removing phantom account:', u.email, 'Reason:', {
                noPassword: !u.password,
                tempPassword: u.password === 'temp123' || u.password === 'temporary',
                syncedFromCloud: u.syncedFromCloud,
                noCreatedAt: !u.createdAt,
                realAccountFalse: u.realAccount === false,
                realAccountUndefined: u.realAccount === undefined,
                syncMethod: u.signUpMethod === 'sync' || u.signUpMethod === 'phantom',
                noSignUpMethod: !u.signUpMethod
              });
              return false;
            }
          }
          return true;
        });
        
        // Create new user
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
          signUpMethod: 'direct'
        };
        
        console.log('✅ Creating new user:', newUser);
        
        // Add to clean users array
        cleanUsers.push(newUser);
        
        // Save to all storage locations
        localStorage.setItem('visualVibeUsers', JSON.stringify(cleanUsers));
        localStorage.setItem(`user_${email}`, JSON.stringify(newUser));
        
        // Create user session
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
        
        // Set current user
        window.currentUser = sessionUser;
        localStorage.setItem('visualVibeUser', JSON.stringify(sessionUser));
        
        console.log('✅ User created successfully:', newUser.name);
        console.log('��� Session established for:', sessionUser.name);
        
        // Clear form
        nameInput.value = '';
        emailInput.value = '';
        passwordInput.value = '';
        confirmPasswordInput.value = '';
        
        // Close modal
        if (typeof window.closeSignUpModal === 'function') {
          window.closeSignUpModal();
        }
        
        // Show success message
        alert(`✅ Welcome ${name}! Your account has been created successfully.`);
        
        // Update UI
        if (typeof window.updateSignInUI === 'function') {
          window.updateSignInUI();
        }
        
        // Trigger any welcome flows
        if (typeof window.showWelcomeBanner === 'function') {
          setTimeout(() => {
            window.showWelcomeBanner();
          }, 1000);
        }
        
      } catch (error) {
        console.error('❌ Sign-up process failed:', error);
        alert('❌ Sign up failed. Please try again.');
      }
    };
    
    // BLOCK CrossDeviceAuth from interfering
    if (window.CrossDeviceAuth) {
      console.log('🚫 Disabling CrossDeviceAuth to prevent conflicts...');
      window.CrossDeviceAuth.prototype.signUpWithSync = function() {
        console.log('🚫 CrossDeviceAuth.signUpWithSync blocked - using direct sign-up instead');
        return { success: false, message: 'Using direct sign-up method' };
      };
    }
    
    // Store reference to our function to prevent conflicts
    const ourHandleSignUp = window.handleSignUp;

    // Ensure our function stays active (but keep it writable to prevent errors)
    Object.defineProperty(window, 'handleSignUp', {
      value: ourHandleSignUp,
      writable: true,
      configurable: true
    });
    
    console.log('✅ Sign-up conflict fix applied - all conflicts disabled');
    
  }, 100);
  
  // Monitor for conflicts and re-apply fix if needed
  setInterval(() => {
    if (window.handleSignUp && window.handleSignUp.toString().includes('CrossDeviceAuth')) {
      console.log('🔄 Re-applying sign-up fix due to conflict detected');
      location.reload(); // Force reload to ensure our fix takes precedence
    }
  }, 5000);
  
})();

console.log('🛡️ Sign-up conflict protection loaded');
