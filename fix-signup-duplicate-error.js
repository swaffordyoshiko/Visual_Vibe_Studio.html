// FIX SIGNUP DUPLICATE ERROR - Diagnose and resolve account conflicts
console.log('🔧 SIGNUP DUPLICATE ERROR FIX: Starting diagnosis...');

(function() {
  'use strict';
  
  // STEP 1: Comprehensive diagnosis of user data
  function diagnoseUserData() {
    console.log('🔍 === COMPREHENSIVE USER DATA DIAGNOSIS ===');
    
    // Check all localStorage keys
    console.log('📋 All localStorage keys:');
    const allKeys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      allKeys.push(key);
      if (key.toLowerCase().includes('user') || key.toLowerCase().includes('vibe') || key.toLowerCase().includes('auth')) {
        const value = localStorage.getItem(key);
        console.log(`  ${key}:`, value ? value.substring(0, 100) + (value.length > 100 ? '...' : '') : 'null');
      }
    }
    
    // Specifically check main user storage
    const mainUserStorage = localStorage.getItem('visualVibeUsers');
    if (mainUserStorage) {
      try {
        const users = JSON.parse(mainUserStorage);
        console.log(`👥 Found ${users.length} users in visualVibeUsers:`);
        users.forEach((user, index) => {
          console.log(`  ${index + 1}. Name: "${user.name || 'NO_NAME'}" | Email: "${user.email || 'NO_EMAIL'}" | Created: ${user.createdAt || 'NO_DATE'} | ID: ${user.id || 'NO_ID'}`);
        });
        
        // Check for duplicate emails
        const emailCounts = {};
        users.forEach(user => {
          if (user.email) {
            const email = user.email.toLowerCase();
            emailCounts[email] = (emailCounts[email] || 0) + 1;
          }
        });
        
        console.log('📧 Email frequency analysis:');
        Object.entries(emailCounts).forEach(([email, count]) => {
          if (count > 1) {
            console.log(`  ⚠️ DUPLICATE: ${email} appears ${count} times`);
          } else {
            console.log(`  ✅ ${email} (unique)`);
          }
        });
        
      } catch (e) {
        console.error('❌ Users data is corrupted:', e);
      }
    } else {
      console.log('📋 No visualVibeUsers found in localStorage');
    }
    
    console.log('🔍 === END DIAGNOSIS ===');
  }
  
  // STEP 2: Clean duplicate and corrupted user data
  function cleanUserData() {
    console.log('🧹 CLEANING USER DATA...');
    
    try {
      const usersData = localStorage.getItem('visualVibeUsers');
      if (!usersData) {
        console.log('✅ No user data to clean');
        return;
      }
      
      let users = JSON.parse(usersData);
      if (!Array.isArray(users)) {
        console.log('⚠️ User data is not an array, resetting to empty array');
        localStorage.setItem('visualVibeUsers', JSON.stringify([]));
        return;
      }
      
      const originalCount = users.length;
      console.log(`📊 Original user count: ${originalCount}`);
      
      // Remove invalid/corrupted users
      users = users.filter(user => {
        if (!user || typeof user !== 'object') {
          console.log('🗑️ Removing invalid user object:', user);
          return false;
        }
        if (!user.email || !user.name) {
          console.log('🗑️ Removing incomplete user:', user);
          return false;
        }
        return true;
      });
      
      // Remove duplicates (keep the most recent one)
      const emailMap = new Map();
      users.forEach(user => {
        const email = user.email.toLowerCase();
        const existing = emailMap.get(email);
        
        if (!existing) {
          emailMap.set(email, user);
        } else {
          // Keep the one with the latest creation date
          const existingDate = new Date(existing.createdAt || 0);
          const currentDate = new Date(user.createdAt || 0);
          
          if (currentDate > existingDate) {
            console.log(`🔄 Replacing older duplicate for ${email}`);
            emailMap.set(email, user);
          } else {
            console.log(`🗑️ Removing older duplicate for ${email}`);
          }
        }
      });
      
      // Convert back to array
      const cleanedUsers = Array.from(emailMap.values());
      const finalCount = cleanedUsers.length;
      
      console.log(`📊 Cleaned user count: ${finalCount} (removed ${originalCount - finalCount} duplicates/invalid)`);
      
      // Save cleaned data
      localStorage.setItem('visualVibeUsers', JSON.stringify(cleanedUsers));
      console.log('✅ User data cleaned and saved');
      
      return cleanedUsers;
      
    } catch (error) {
      console.error('❌ Error cleaning user data:', error);
      // If there's an error, reset to empty array
      localStorage.setItem('visualVibeUsers', JSON.stringify([]));
      console.log('🔄 Reset user data to empty array due to error');
      return [];
    }
  }
  
  // STEP 3: Enhanced signup function that handles conflicts better
  function createFixedSignupHandler() {
    function fixedSignUp(e) {
      if (e) e.preventDefault();
      console.log('📝 FIXED SIGNUP: Processing...');
      
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
        
        console.log(`📝 Signup attempt for: "${name}" <${email}>`);
        
        // Validate inputs
        if (!name || !email || !password || !confirmPassword) {
          alert('Please fill in all fields.');
          return;
        }
        
        if (!email.includes('@')) {
          alert('Please enter a valid email address.');
          emailInput.focus();
          return;
        }
        
        if (password.length < 6) {
          alert('Password must be at least 6 characters long.');
          passwordInput.focus();
          return;
        }
        
        if (password !== confirmPassword) {
          alert('Passwords do not match.');
          confirmPasswordInput.focus();
          return;
        }
        
        // Clean existing user data first
        const cleanedUsers = cleanUserData();
        
        // Check for existing user AFTER cleaning
        const existingUser = cleanedUsers.find(u => u.email.toLowerCase() === email);
        
        if (existingUser) {
          console.log('❌ Email already exists after cleaning:', email);
          
          const choice = confirm(`An account already exists with email: ${email}\n\nWould you like to:\n• Click OK to sign in instead\n• Click Cancel to use a different email\n\nNote: You can also clear all data and start fresh.`);
          
          if (choice) {
            // Close signup modal and open signin
            const signUpModal = document.getElementById('signUpModal');
            if (signUpModal) {
              signUpModal.classList.add('hidden');
              signUpModal.style.display = 'none';
            }
            
            setTimeout(() => {
              const signInModal = document.getElementById('signInModal');
              if (signInModal) {
                signInModal.classList.remove('hidden');
                signInModal.style.display = 'flex';
                
                // Pre-fill email
                const signInEmail = document.getElementById('signInEmail');
                if (signInEmail) signInEmail.value = email;
              }
            }, 500);
          } else {
            // Clear email field for new attempt
            emailInput.value = '';
            emailInput.focus();
          }
          return;
        }
        
        console.log('✅ No existing account found, creating new user...');
        
        // Create new user
        const newUser = {
          id: 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
          name: name,
          firstName: name.split(' ')[0] || name,
          lastName: name.split(' ').slice(1).join(' ') || '',
          email: email,
          password: password,
          orders: [],
          reviews: [],
          createdAt: new Date().toISOString(),
          signUpMethod: 'fixed_signup'
        };
        
        // Add to cleaned users array
        cleanedUsers.push(newUser);
        localStorage.setItem('visualVibeUsers', JSON.stringify(cleanedUsers));
        
        console.log('✅ New user created successfully:', newUser.name);
        
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
        
        // Close modal and reset form
        const signUpModal = document.getElementById('signUpModal');
        if (signUpModal) {
          signUpModal.classList.add('hidden');
          signUpModal.style.display = 'none';
        }
        
        const signUpForm = document.getElementById('signUpForm');
        if (signUpForm) signUpForm.reset();
        
        // Force UI update to show signed-in buttons
        if (typeof window.criticalAuthForceUIFix === 'function') {
          setTimeout(() => window.criticalAuthForceUIFix(), 100);
        }
        
        alert(`✅ Welcome ${name}! Your account has been created successfully.`);
        console.log('✅ Signup completed successfully');
        
      } catch (error) {
        console.error('❌ Error in fixed signup:', error);
        alert('Sign-up error occurred. Please try again.');
      }
    }
    
    return fixedSignUp;
  }
  
  // STEP 4: Emergency data clearing functions
  function clearAllUserData() {
    console.log('💣 EMERGENCY: Clearing all user data...');
    
    const confirmed = confirm('⚠️ This will delete ALL user accounts and sign-in data.\n\nAre you sure you want to proceed?\n\nClick OK to clear everything, or Cancel to keep existing data.');
    
    if (!confirmed) {
      console.log('❌ User cancelled data clearing');
      return;
    }
    
    // Clear all user-related localStorage keys
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (
        key.toLowerCase().includes('user') || 
        key.toLowerCase().includes('vibe') || 
        key.toLowerCase().includes('auth') ||
        key.toLowerCase().includes('current')
      )) {
        keysToRemove.push(key);
      }
    }
    
    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
      console.log(`🗑️ Removed: ${key}`);
    });
    
    // Clear current user session
    window.currentUser = null;
    
    console.log('✅ All user data cleared successfully');
    alert('✅ All user data has been cleared. You can now sign up with any email address.');
  }
  
  // STEP 5: Apply fixes immediately
  function applySignupFixes() {
    console.log('🔧 Applying signup fixes...');
    
    try {
      // Diagnose current state
      diagnoseUserData();
      
      // Clean existing data
      cleanUserData();
      
      // Install fixed signup handler
      const fixedSignupHandler = createFixedSignupHandler();
      
      // Replace signup form handler
      const signUpForm = document.getElementById('signUpForm');
      if (signUpForm) {
        const newForm = signUpForm.cloneNode(true);
        signUpForm.parentNode.replaceChild(newForm, signUpForm);
        newForm.addEventListener('submit', fixedSignupHandler);
        newForm.onsubmit = fixedSignupHandler;
        console.log('✅ Fixed signup form handler installed');
      }
      
      // Override global signup handler
      window.handleSignUp = fixedSignupHandler;
      
      console.log('✅ All signup fixes applied');
      
    } catch (error) {
      console.error('❌ Error applying signup fixes:', error);
    }
  }
  
  // Execute fixes immediately
  applySignupFixes();
  
  // Retry fixes with delays
  setTimeout(applySignupFixes, 100);
  setTimeout(applySignupFixes, 500);
  setTimeout(applySignupFixes, 1000);
  
  // Expose utility functions
  window.fixSignupDuplicateError = applySignupFixes;
  window.diagnoseSignupIssue = diagnoseUserData;
  window.cleanSignupData = cleanUserData;
  window.clearAllSignupData = clearAllUserData;
  
  console.log('🎉 SIGNUP DUPLICATE ERROR FIX: Complete!');
  console.log('💡 Available commands:');
  console.log('- fixSignupDuplicateError() - Re-apply all fixes');
  console.log('- diagnoseSignupIssue() - Diagnose current user data');
  console.log('- cleanSignupData() - Clean duplicate/corrupted data');
  console.log('- clearAllSignupData() - Clear ALL user data (emergency)');
  
})();
