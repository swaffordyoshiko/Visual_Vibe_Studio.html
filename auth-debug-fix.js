// AUTHENTICATION DEBUG AND FIX SCRIPT
console.log('🔧 Loading Authentication Debug and Fix...');

(function() {
  'use strict';

  // Debug function to check current state
  function debugAuthState() {
    console.log('🔍 === AUTHENTICATION DEBUG ===');
    
    // Check localStorage
    console.log('📦 LocalStorage Data:');
    try {
      const users = localStorage.getItem('visualVibeUsers');
      const currentSession = localStorage.getItem('visualVibeUser');
      
      console.log('- visualVibeUsers:', users ? JSON.parse(users).length + ' users' : 'none');
      console.log('- visualVibeUser session:', currentSession ? JSON.parse(currentSession) : 'none');
      
      if (users) {
        const userList = JSON.parse(users);
        console.log('- Registered users:', userList.map(u => ({ name: u.name, email: u.email })));
      }
    } catch (e) {
      console.error('Error reading localStorage:', e);
    }
    
    // Check DOM elements
    console.log('🎯 DOM Elements:');
    const elements = {
      signInModal: document.getElementById('signInModal'),
      signUpModal: document.getElementById('signUpModal'),
      signInForm: document.getElementById('signInForm'),
      signUpForm: document.getElementById('signUpForm'),
      signInEmail: document.getElementById('signInEmail'),
      signInPassword: document.getElementById('signInPassword'),
      signUpName: document.getElementById('signUpName'),
      signUpEmail: document.getElementById('signUpEmail'),
      signedOutState: document.getElementById('signedOutState'),
      signedInState: document.getElementById('signedInState')
    };
    
    Object.entries(elements).forEach(([name, element]) => {
      console.log(`- ${name}: ${element ? '✅ found' : '❌ missing'}`);
    });
    
    // Check functions
    console.log('🔧 Available Functions:');
    const functions = {
      openSignInModal: window.openSignInModal,
      openSignUpModal: window.openSignUpModal,
      handleSignIn: window.handleSignIn,
      handleSignUp: window.handleSignUp,
      signOut: window.signOut,
      updateAuthUI: window.updateAuthUI
    };
    
    Object.entries(functions).forEach(([name, func]) => {
      console.log(`- ${name}: ${typeof func === 'function' ? '✅ available' : '❌ missing'}`);
    });
    
    // Check current user state
    console.log('👤 Current User State:');
    console.log('- window.currentUser:', window.currentUser);
    console.log('- Signed in state visible:', elements.signedInState ? elements.signedInState.style.display : 'unknown');
    console.log('- Signed out state visible:', elements.signedOutState ? elements.signedOutState.style.display : 'unknown');
    
    console.log('🔍 === END DEBUG ===');
  }

  // Enhanced sign in function with better debugging
  function fixedHandleSignIn(event) {
    if (event) event.preventDefault();
    
    console.log('🔑 FIXED: Sign in attempt started...');
    debugAuthState();
    
    try {
      const emailInput = document.getElementById('signInEmail');
      const passwordInput = document.getElementById('signInPassword');

      if (!emailInput || !passwordInput) {
        console.error('❌ Form inputs not found');
        alert('Sign in form not available. Please refresh the page.');
        return false;
      }

      const email = emailInput.value.trim().toLowerCase();
      const password = passwordInput.value.trim();

      console.log('📧 Sign in attempt for email:', email);
      console.log('🔐 Password provided:', password ? 'yes (' + password.length + ' chars)' : 'no');

      // Validation
      if (!email || !password) {
        console.error('❌ Missing email or password');
        alert('Please enter both email and password.');
        return false;
      }

      // Get users from storage with enhanced debugging
      let users = [];
      try {
        const storedUsers = localStorage.getItem('visualVibeUsers');
        console.log('📦 Raw stored users:', storedUsers);
        
        if (storedUsers) {
          users = JSON.parse(storedUsers);
          console.log('👥 Parsed users:', users.length, 'total');
          console.log('👥 User emails:', users.map(u => u.email));
        } else {
          console.log('📦 No users in storage - creating test user');
          // Create a test user for debugging
          const testUser = {
            id: 'test_user_' + Date.now(),
            name: 'Test User',
            firstName: 'Test',
            lastName: 'User',
            email: 'test@example.com',
            password: 'test123',
            phone: '',
            companyName: '',
            orders: [],
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString()
          };
          users = [testUser];
          localStorage.setItem('visualVibeUsers', JSON.stringify(users));
          console.log('✅ Created test user: test@example.com / test123');
        }
      } catch (storageError) {
        console.error('❌ Error reading users from storage:', storageError);
        alert('Error accessing user data. Please refresh the page.');
        return false;
      }

      // Find matching user with detailed logging
      console.log('🔍 Searching for user with email:', email);
      let matchingUser = null;
      
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        console.log(`- User ${i + 1}: ${user.email} (${user.name})`);
        
        if (user.email && user.email.toLowerCase() === email) {
          console.log('📧 Email match found!');
          
          if (user.password === password) {
            console.log('🔐 Password match found!');
            matchingUser = user;
            break;
          } else {
            console.log('❌ Password mismatch for user:', user.name);
            console.log('Expected:', user.password, 'Got:', password);
          }
        }
      }

      if (matchingUser) {
        console.log('✅ SUCCESSFUL SIGN IN for:', matchingUser.name);
        
        // Update last login
        matchingUser.lastLogin = new Date().toISOString();
        localStorage.setItem('visualVibeUsers', JSON.stringify(users));
        
        // Create session
        const sessionData = {
          id: matchingUser.id,
          name: matchingUser.name,
          email: matchingUser.email,
          firstName: matchingUser.firstName || matchingUser.name.split(' ')[0],
          lastName: matchingUser.lastName || matchingUser.name.split(' ').slice(1).join(' '),
          phone: matchingUser.phone || '',
          companyName: matchingUser.companyName || '',
          signedIn: true,
          lastActivity: new Date().toISOString(),
          loginTime: new Date().toISOString()
        };
        
        // Save session
        localStorage.setItem('visualVibeUser', JSON.stringify(sessionData));
        window.currentUser = sessionData;
        
        console.log('💾 Session saved:', sessionData);
        
        // Update UI immediately
        updateAuthUIFixed();
        
        // Close modal
        const modal = document.getElementById('signInModal');
        if (modal) {
          modal.classList.add('hidden');
          modal.style.display = 'none';
        }
        
        // Reset form
        const form = document.getElementById('signInForm');
        if (form) form.reset();
        
        // Show success message
        alert(`Welcome back, ${sessionData.firstName}!`);
        
        return true;
        
      } else {
        // Check if email exists but wrong password
        const emailExists = users.some(u => u.email && u.email.toLowerCase() === email);
        
        if (emailExists) {
          console.log('❌ Email exists but wrong password');
          alert('Incorrect password. Please try again.');
        } else {
          console.log('❌ Email not found in system');
          alert('No account found with this email. Please sign up first or try: test@example.com');
        }
        
        return false;
      }

    } catch (error) {
      console.error('❌ Sign in error:', error);
      alert('Sign in failed. Please try again.');
      return false;
    }
  }

  // Enhanced sign up function
  function fixedHandleSignUp(event) {
    if (event) event.preventDefault();
    
    console.log('📝 FIXED: Sign up attempt started...');
    
    try {
      const nameInput = document.getElementById('signUpName');
      const emailInput = document.getElementById('signUpEmail');
      const passwordInput = document.getElementById('signUpPassword');
      const confirmPasswordInput = document.getElementById('signUpConfirmPassword');

      if (!nameInput || !emailInput || !passwordInput || !confirmPasswordInput) {
        alert('Sign up form not available. Please refresh the page.');
        return false;
      }

      const name = nameInput.value.trim();
      const email = emailInput.value.trim().toLowerCase();
      const password = passwordInput.value.trim();
      const confirmPassword = confirmPasswordInput.value.trim();

      console.log('📝 Sign up attempt for:', name, email);

      // Validation
      if (!name || !email || !password || !confirmPassword) {
        alert('Please fill in all fields.');
        return false;
      }

      if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return false;
      }

      if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return false;
      }

      // Check for existing email
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      const existingUser = users.find(u => u.email && u.email.toLowerCase() === email);
      
      if (existingUser) {
        alert(`Account already exists for ${email}. Please sign in instead.`);
        
        // Switch to sign in and pre-fill email
        const signUpModal = document.getElementById('signUpModal');
        const signInModal = document.getElementById('signInModal');
        
        if (signUpModal) {
          signUpModal.classList.add('hidden');
          signUpModal.style.display = 'none';
        }
        
        if (signInModal) {
          signInModal.classList.remove('hidden');
          signInModal.style.display = 'flex';
          
          const signInEmail = document.getElementById('signInEmail');
          if (signInEmail) signInEmail.value = email;
        }
        
        return false;
      }

      // Create new user
      const nameParts = name.split(' ');
      const newUser = {
        id: 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
        name: name,
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        email: email,
        password: password,
        phone: '',
        companyName: '',
        orders: [],
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };

      // Save user
      users.push(newUser);
      localStorage.setItem('visualVibeUsers', JSON.stringify(users));
      
      console.log('✅ New user created:', newUser.name);

      // Create session and sign in
      const sessionData = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        phone: newUser.phone,
        companyName: newUser.companyName,
        signedIn: true,
        lastActivity: new Date().toISOString(),
        loginTime: new Date().toISOString()
      };
      
      localStorage.setItem('visualVibeUser', JSON.stringify(sessionData));
      window.currentUser = sessionData;
      
      // Update UI
      updateAuthUIFixed();
      
      // Close modal
      const modal = document.getElementById('signUpModal');
      if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
      }
      
      // Reset form
      const form = document.getElementById('signUpForm');
      if (form) form.reset();
      
      alert(`Welcome, ${newUser.firstName}! Your account has been created.`);
      
      return true;

    } catch (error) {
      console.error('❌ Sign up error:', error);
      alert('Sign up failed. Please try again.');
      return false;
    }
  }

  // Fixed UI update function
  function updateAuthUIFixed() {
    try {
      console.log('🎨 Updating auth UI...');
      
      const signedOutState = document.getElementById('signedOutState');
      const signedInState = document.getElementById('signedInState');
      const mobileSignedOutState = document.getElementById('mobileSignedOutState');
      const mobileSignedInState = document.getElementById('mobileSignedInState');
      const userNameSpan = document.getElementById('userName');

      const user = window.currentUser;
      console.log('👤 Current user for UI update:', user);

      if (user && user.signedIn) {
        console.log('✅ Showing signed-in state');
        
        // Show signed in state
        if (signedOutState) {
          signedOutState.style.display = 'none';
          console.log('🔹 Hidden signedOutState');
        }
        if (signedInState) {
          signedInState.style.display = 'flex';
          console.log('🔹 Showed signedInState');
        }
        if (mobileSignedOutState) {
          mobileSignedOutState.style.display = 'none';
          console.log('🔹 Hidden mobileSignedOutState');
        }
        if (mobileSignedInState) {
          mobileSignedInState.style.display = 'block';
          console.log('🔹 Showed mobileSignedInState');
        }
        if (userNameSpan) {
          userNameSpan.textContent = user.firstName || user.name;
          console.log('🔹 Updated userName to:', user.firstName || user.name);
        }

        console.log('✅ UI updated to signed in state for:', user.name);
        
      } else {
        console.log('✅ Showing signed-out state');
        
        // Show signed out state
        if (signedOutState) {
          signedOutState.style.display = 'flex';
          console.log('🔹 Showed signedOutState');
        }
        if (signedInState) {
          signedInState.style.display = 'none';
          console.log('🔹 Hidden signedInState');
        }
        if (mobileSignedOutState) {
          mobileSignedOutState.style.display = 'block';
          console.log('🔹 Showed mobileSignedOutState');
        }
        if (mobileSignedInState) {
          mobileSignedInState.style.display = 'none';
          console.log('🔹 Hidden mobileSignedInState');
        }

        console.log('✅ UI updated to signed out state');
      }
    } catch (error) {
      console.error('❌ Error updating auth UI:', error);
    }
  }

  // Enhanced sign out function
  function fixedSignOut() {
    console.log('🚪 Signing out...');
    
    try {
      // Clear session
      localStorage.removeItem('visualVibeUser');
      window.currentUser = null;
      
      // Update UI
      updateAuthUIFixed();
      
      alert('You have been signed out successfully.');
      
    } catch (error) {
      console.error('❌ Error signing out:', error);
    }
  }

  // Restore session on load
  function restoreSessionFixed() {
    try {
      const savedSession = localStorage.getItem('visualVibeUser');
      if (savedSession) {
        const sessionData = JSON.parse(savedSession);
        if (sessionData && sessionData.signedIn) {
          window.currentUser = sessionData;
          console.log('🔄 Session restored for:', sessionData.name);
          updateAuthUIFixed();
          return true;
        }
      }
    } catch (error) {
      console.error('Error restoring session:', error);
    }
    return false;
  }

  // Setup fixed event listeners
  function setupFixedEventListeners() {
    console.log('🔧 Setting up fixed event listeners...');
    
    // Sign in form
    const signInForm = document.getElementById('signInForm');
    if (signInForm) {
      // Remove all existing listeners
      const newForm = signInForm.cloneNode(true);
      signInForm.parentNode.replaceChild(newForm, signInForm);
      
      // Add our fixed listener
      newForm.addEventListener('submit', fixedHandleSignIn);
      console.log('✅ Fixed sign in form listener attached');
    }

    // Sign up form
    const signUpForm = document.getElementById('signUpForm');
    if (signUpForm) {
      // Remove all existing listeners
      const newForm = signUpForm.cloneNode(true);
      signUpForm.parentNode.replaceChild(newForm, signUpForm);
      
      // Add our fixed listener
      newForm.addEventListener('submit', fixedHandleSignUp);
      console.log('✅ Fixed sign up form listener attached');
    }

    // Fix all auth buttons
    document.querySelectorAll('button[onclick*="signOut"]').forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        fixedSignOut();
      };
    });
  }

  // Override global functions with fixed versions
  window.handleSignIn = fixedHandleSignIn;
  window.handleSignUp = fixedHandleSignUp;
  window.signOut = fixedSignOut;
  window.updateAuthUI = updateAuthUIFixed;
  window.debugAuthState = debugAuthState;

  // Initialize
  function initializeFixed() {
    console.log('🚀 Initializing fixed authentication...');
    
    // Debug current state
    debugAuthState();
    
    // Restore session
    restoreSessionFixed();
    
    // Setup event listeners
    setupFixedEventListeners();
    
    console.log('✅ Fixed authentication system ready');
  }

  // Initialize when ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeFixed);
  } else {
    initializeFixed();
  }

  // Also initialize after a delay
  setTimeout(initializeFixed, 1000);

  // Add global debug function
  window.testSignIn = function(email = 'test@example.com', password = 'test123') {
    console.log('🧪 Testing sign in with:', email, password);
    
    const emailInput = document.getElementById('signInEmail');
    const passwordInput = document.getElementById('signInPassword');
    
    if (emailInput && passwordInput) {
      emailInput.value = email;
      passwordInput.value = password;
      fixedHandleSignIn();
    } else {
      console.error('Form inputs not found');
    }
  };

  console.log('🔧 Authentication Debug and Fix Loaded');
  console.log('💡 Use window.debugAuthState() to check current state');
  console.log('💡 Use window.testSignIn() to test with default credentials');

})();
