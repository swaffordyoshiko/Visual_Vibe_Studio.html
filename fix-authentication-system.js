// COMPREHENSIVE AUTHENTICATION FIX - Sign-in and Cross-device Support
console.log('🔐 Loading comprehensive authentication fix...');

(function() {
  'use strict';
  
  let authFixApplied = false;
  
  function initializeAuthenticationFix() {
    if (authFixApplied) return;
    authFixApplied = true;
    
    console.log('🔧 Initializing comprehensive authentication fix...');
    
    // 1. Fix sign-in functionality
    fixSignInProcess();
    
    // 2. Fix sign-up functionality
    fixSignUpProcess();
    
    // 3. Fix session persistence
    fixSessionPersistence();
    
    // 4. Add cross-device sync capability
    addCrossDeviceSync();
    
    // 5. Fix password validation
    fixPasswordValidation();
    
    console.log('✅ Comprehensive authentication fix applied');
  }
  
  // === SIGN-IN PROCESS FIX ===
  function fixSignInProcess() {
    console.log('🔑 Fixing sign-in process...');
    
    window.handleSignIn = function(e) {
      console.log('🔑 [FIXED] Processing sign in...');
      if (e) e.preventDefault();
      
      try {
        const emailInput = document.getElementById('signInEmail');
        const passwordInput = document.getElementById('signInPassword');
        
        if (!emailInput || !passwordInput) {
          alert('Form elements not found. Please refresh the page.');
          return;
        }
        
        const email = emailInput.value.trim().toLowerCase(); // Normalize email
        const password = passwordInput.value;
        
        if (!email || !password) {
          alert('Please enter both email and password.');
          return;
        }
        
        console.log(`🔍 Attempting sign-in for email: ${email}`);
        
        // Get all users and debug info
        const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
        console.log(`👥 Found ${users.length} registered users in database`);
        
        // Debug: Show all registered emails (without passwords)
        const registeredEmails = users.map(u => u.email.toLowerCase());
        console.log('📧 Registered emails:', registeredEmails);
        
        // Find user with case-insensitive email matching
        const user = users.find(u => u.email.toLowerCase() === email);
        
        if (!user) {
          console.log('❌ No user found with email:', email);
          alert(`No account found with email "${email}". Please check your email or sign up first.`);
          return;
        }
        
        console.log('👤 Found user:', { name: user.name, email: user.email, hasPassword: !!user.password });
        
        // Check password
        if (user.password !== password) {
          console.log('❌ Password mismatch for user:', user.name);
          alert('Incorrect password. Please try again.');
          return;
        }
        
        console.log('✅ Authentication successful for:', user.name);
        
        // Create session
        const sessionUser = {
          id: user.id,
          name: user.name,
          email: user.email,
          firstName: user.firstName || user.name.split(' ')[0],
          lastName: user.lastName || user.name.split(' ').slice(1).join(' '),
          phone: user.phone || '',
          companyName: user.companyName || '',
          lastActivity: new Date().toISOString(),
          signedInAt: new Date().toISOString()
        };
        
        // Set global user
        window.currentUser = sessionUser;
        
        // Save session to localStorage
        localStorage.setItem('visualVibeUser', JSON.stringify(sessionUser));
        
        // Update UI
        if (typeof window.updateAuthUI === 'function') {
          window.updateAuthUI();
        }
        
        // Close modal
        if (typeof window.closeSignInModal === 'function') {
          window.closeSignInModal();
        }
        
        // Show success
        if (window.toastManager) {
          window.toastManager.success(`Welcome back, ${user.name}!`, { duration: 3000 });
        } else {
          alert(`Welcome back, ${user.name}!`);
        }
        
        // Show welcome banner
        if (typeof window.showWelcomeBanner === 'function') {
          window.showWelcomeBanner(user.name);
        }
        
        console.log('✅ Sign-in process completed successfully');
        
      } catch (error) {
        console.error('❌ Critical sign-in error:', error);
        alert('Sign-in error. Please try again or refresh the page.');
      }
    };
    
    console.log('✅ Sign-in process fix applied');
  }
  
  // === SIGN-UP PROCESS FIX ===
  function fixSignUpProcess() {
    console.log('📝 Fixing sign-up process...');
    
    window.handleSignUp = function(e) {
      console.log('📝 [FIXED] Processing sign up...');
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
        const email = emailInput.value.trim().toLowerCase(); // Normalize email
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
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
        
        console.log(`📝 Creating account for: ${name} (${email})`);
        
        // Get existing users
        const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
        console.log(`👥 Current users in database: ${users.length}`);
        
        // Check if email already exists
        const existingUser = users.find(u => u.email.toLowerCase() === email);
        if (existingUser) {
          console.log('❌ Email already exists:', email);
          alert('An account already exists with this email. Please sign in instead.');
          
          // Switch to sign-in and pre-fill email
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
        
        // Create new user with comprehensive data
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
          accountVersion: '2.0'
        };
        
        // Add to users array
        users.push(newUser);
        localStorage.setItem('visualVibeUsers', JSON.stringify(users));
        console.log('✅ New user created and saved:', newUser.name);
        
        // Create session
        const sessionUser = {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          lastActivity: new Date().toISOString(),
          signedInAt: new Date().toISOString()
        };
        
        // Set global user
        window.currentUser = sessionUser;
        
        // Save session
        localStorage.setItem('visualVibeUser', JSON.stringify(sessionUser));
        
        // Update UI
        if (typeof window.updateAuthUI === 'function') {
          window.updateAuthUI();
        }
        
        // Close modal
        if (typeof window.closeSignUpModal === 'function') {
          window.closeSignUpModal();
        }
        
        // Show success
        if (window.toastManager) {
          window.toastManager.success(`Account created successfully! Welcome, ${name}!`, { duration: 4000 });
        } else {
          alert(`Account created successfully! Welcome, ${name}!`);
        }
        
        // Show welcome banner
        if (typeof window.showWelcomeBanner === 'function') {
          window.showWelcomeBanner(name);
        }
        
        console.log('✅ Sign-up process completed successfully');
        
      } catch (error) {
        console.error('❌ Critical sign-up error:', error);
        alert('Sign-up error. Please try again or refresh the page.');
      }
    };
    
    console.log('✅ Sign-up process fix applied');
  }
  
  // === SESSION PERSISTENCE FIX ===
  function fixSessionPersistence() {
    console.log('💾 Fixing session persistence...');
    
    // Enhanced session restoration
    function restoreUserSession() {
      console.log('🔄 Attempting to restore user session...');
      
      try {
        const savedUser = localStorage.getItem('visualVibeUser');
        if (savedUser) {
          const user = JSON.parse(savedUser);
          console.log('👤 Found saved session for:', user.name);
          
          // Verify user still exists in database
          const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
          const currentUser = users.find(u => u.id === user.id);
          
          if (currentUser) {
            // Update session with latest user data
            const updatedSession = {
              ...user,
              name: currentUser.name,
              email: currentUser.email,
              firstName: currentUser.firstName || currentUser.name.split(' ')[0],
              lastName: currentUser.lastName || currentUser.name.split(' ').slice(1).join(' '),
              lastActivity: new Date().toISOString()
            };
            
            window.currentUser = updatedSession;
            localStorage.setItem('visualVibeUser', JSON.stringify(updatedSession));
            
            console.log('✅ Session restored and updated for:', user.name);
            
            // Update UI
            if (typeof window.updateAuthUI === 'function') {
              window.updateAuthUI();
            }
            
            return true;
          } else {
            console.log('❌ User no longer exists in database, clearing session');
            localStorage.removeItem('visualVibeUser');
            window.currentUser = null;
          }
        } else {
          console.log('ℹ️ No saved session found');
        }
      } catch (error) {
        console.error('❌ Error restoring session:', error);
        localStorage.removeItem('visualVibeUser');
        window.currentUser = null;
      }
      
      return false;
    }
    
    // Enhanced sign-out
    window.signOut = function() {
      console.log('👋 [FIXED] Signing out user...');
      
      try {
        if (window.currentUser) {
          console.log('Signing out:', window.currentUser.name);
        }
        
        // Clear session
        localStorage.removeItem('visualVibeUser');
        window.currentUser = null;
        
        // Update UI
        if (typeof window.updateAuthUI === 'function') {
          window.updateAuthUI();
        }
        
        // Hide welcome banner
        if (typeof window.hideWelcomeBanner === 'function') {
          window.hideWelcomeBanner();
        }
        
        // Show feedback
        if (window.toastManager) {
          window.toastManager.info('Signed out successfully', { duration: 2000 });
        } else {
          alert('Signed out successfully');
        }
        
        console.log('✅ Sign-out completed');
        
      } catch (error) {
        console.error('❌ Error during sign-out:', error);
        // Force clear everything
        localStorage.removeItem('visualVibeUser');
        window.currentUser = null;
        location.reload(); // Last resort
      }
    };
    
    // Restore session on page load
    restoreUserSession();
    
    // Make session restoration available globally
    window.restoreUserSession = restoreUserSession;
    
    console.log('✅ Session persistence fix applied');
  }
  
  // === CROSS-DEVICE SYNC CAPABILITY ===
  function addCrossDeviceSync() {
    console.log('🌐 Adding cross-device sync capability...');
    
    // Note: localStorage is device-specific, but we can implement 
    // a simple backup/restore system using email validation
    
    window.exportUserData = function() {
      if (!window.currentUser) {
        alert('Please sign in to export your data.');
        return;
      }
      
      try {
        const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
        const userData = users.find(u => u.id === window.currentUser.id);
        
        if (userData) {
          const exportData = {
            userData: userData,
            exportDate: new Date().toISOString(),
            exportSource: 'Visual Vibe Studio'
          };
          
          const dataStr = JSON.stringify(exportData, null, 2);
          const blob = new Blob([dataStr], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          
          const a = document.createElement('a');
          a.href = url;
          a.download = `visual-vibe-backup-${userData.email}.json`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          
          alert('✅ Account data exported successfully! Use this file to restore your account on other devices.');
        }
      } catch (error) {
        console.error('❌ Error exporting data:', error);
        alert('❌ Error exporting data');
      }
    };
    
    window.importUserData = function() {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';
      
      input.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(event) {
          try {
            const importData = JSON.parse(event.target.result);
            
            if (importData.userData && importData.userData.email) {
              const userData = importData.userData;
              
              // Check if user already exists
              const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
              const existingUser = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
              
              if (existingUser) {
                alert('An account with this email already exists on this device.');
                return;
              }
              
              // Add imported user
              users.push(userData);
              localStorage.setItem('visualVibeUsers', JSON.stringify(users));
              
              alert(`✅ Account for ${userData.name} imported successfully! You can now sign in with your email and password.`);
              
              // Optionally auto-sign in
              if (confirm('Would you like to sign in with the imported account now?')) {
                window.currentUser = {
                  id: userData.id,
                  name: userData.name,
                  email: userData.email,
                  lastActivity: new Date().toISOString()
                };
                localStorage.setItem('visualVibeUser', JSON.stringify(window.currentUser));
                
                if (typeof window.updateAuthUI === 'function') {
                  window.updateAuthUI();
                }
              }
              
            } else {
              alert('❌ Invalid backup file format');
            }
          } catch (error) {
            console.error('❌ Error importing data:', error);
            alert('❌ Error importing data. Please check the file format.');
          }
        };
        reader.readAsText(file);
      };
      
      input.click();
    };
    
    console.log('✅ Cross-device sync capability added');
  }
  
  // === PASSWORD VALIDATION FIX ===
  function fixPasswordValidation() {
    console.log('🔒 Fixing password validation...');
    
    // Add password strength indicator
    function addPasswordStrengthIndicator() {
      const passwordInput = document.getElementById('signUpPassword');
      if (passwordInput) {
        let strengthIndicator = document.getElementById('passwordStrength');
        
        if (!strengthIndicator) {
          strengthIndicator = document.createElement('div');
          strengthIndicator.id = 'passwordStrength';
          strengthIndicator.className = 'text-sm mt-1';
          passwordInput.parentNode.appendChild(strengthIndicator);
        }
        
        passwordInput.addEventListener('input', function() {
          const password = this.value;
          let strength = 0;
          let feedback = '';
          
          if (password.length >= 6) strength++;
          if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
          if (password.match(/[0-9]/)) strength++;
          if (password.match(/[^a-zA-Z0-9]/)) strength++;
          
          switch (strength) {
            case 0:
            case 1:
              feedback = '<span class="text-red-600">Weak password</span>';
              break;
            case 2:
              feedback = '<span class="text-yellow-600">Medium password</span>';
              break;
            case 3:
            case 4:
              feedback = '<span class="text-green-600">Strong password</span>';
              break;
          }
          
          strengthIndicator.innerHTML = feedback;
        });
      }
    }
    
    // Apply password strength indicator when modal opens
    const originalOpenSignUpModal = window.openSignUpModal;
    if (typeof originalOpenSignUpModal === 'function') {
      window.openSignUpModal = function() {
        originalOpenSignUpModal();
        setTimeout(addPasswordStrengthIndicator, 200);
      };
    }
    
    console.log('✅ Password validation fix applied');
  }
  
  // === DEBUGGING UTILITIES ===
  
  // Debug function to check authentication state
  window.debugAuth = function() {
    console.log('🔍 AUTHENTICATION DEBUG INFO:');
    console.log('Current User:', window.currentUser);
    
    const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
    console.log('Total Registered Users:', users.length);
    
    users.forEach((user, index) => {
      console.log(`User ${index + 1}:`, {
        name: user.name,
        email: user.email,
        id: user.id,
        hasPassword: !!user.password,
        createdAt: user.createdAt
      });
    });
    
    const savedSession = localStorage.getItem('visualVibeUser');
    console.log('Saved Session:', savedSession ? JSON.parse(savedSession) : 'None');
  };
  
  // Test authentication functions
  window.testAuth = function() {
    console.log('🧪 Testing authentication functions...');
    
    const tests = [
      { name: 'handleSignIn', func: window.handleSignIn },
      { name: 'handleSignUp', func: window.handleSignUp },
      { name: 'signOut', func: window.signOut },
      { name: 'restoreUserSession', func: window.restoreUserSession }
    ];
    
    tests.forEach(test => {
      console.log(`${test.name}: ${typeof test.func === 'function' ? '✅' : '❌'}`);
    });
    
    console.log('🧪 Authentication test completed');
  };
  
  // Initialize the authentication fix
  initializeAuthenticationFix();
  
  // Also initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAuthenticationFix);
  }
  
  // Apply with delays to override other scripts
  setTimeout(initializeAuthenticationFix, 1000);
  setTimeout(initializeAuthenticationFix, 3000);
  
})();

console.log('🔐 Comprehensive authentication fix loaded! Users should now be able to sign in consistently.');
console.log('💡 Debug commands: window.debugAuth() and window.testAuth()');
