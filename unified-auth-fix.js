// UNIFIED AUTHENTICATION FIX - SOLVES ALL SIGN IN/SIGN UP ISSUES
console.log('🔐 Loading Unified Authentication Fix...');

(function() {
  'use strict';

  // COMPLETELY DISABLE ALL CONFLICTING SCRIPTS
  const conflictingScripts = [
    'immediate-signup-fix', 'emergency-signup-fix',
    'final-check', 'rock-solid-auth', 'immediate-auth-fix', 'auth-system-fix',
    'cross-device-auth', 'bulletproof-auth-system', 'unified-auth-system',
    'fix-signin-button', 'signup-error-fix', 'final-auth-override'
  ];

  conflictingScripts.forEach(script => {
    window[script] = false;
    window[script + '_disabled'] = true;
  });

  // Clear all existing auth functions to prevent conflicts
  const authFunctions = [
    'handleSignIn', 'handleSignUp', 'openSignInModal', 'openSignUpModal',
    'closeSignInModal', 'closeSignUpModal', 'switchToSignIn', 'switchToSignUp',
    'signOut', 'updateAuthUI', 'saveUserSession'
  ];

  authFunctions.forEach(fn => {
    if (window[fn]) {
      delete window[fn];
    }
  });

  console.log('🧹 Cleared all conflicting auth functions');

  // CORE AUTHENTICATION STATE
  let currentUser = null;
  let isProcessing = false;

  // UTILITY FUNCTIONS
  function showAlert(message, type = 'info') {
    if (window.toastManager && window.toastManager.show) {
      window.toastManager.show(message, type);
    } else {
      // Fallback to simple alert
      alert(message);
    }
  }

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function generateUserId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // USER STORAGE FUNCTIONS
  function getUsers() {
    try {
      return JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
    } catch (error) {
      console.error('Error reading users:', error);
      return [];
    }
  }

  function saveUsers(users) {
    try {
      localStorage.setItem('visualVibeUsers', JSON.stringify(users));
      return true;
    } catch (error) {
      console.error('Error saving users:', error);
      return false;
    }
  }

  function saveUserSession(user) {
    try {
      localStorage.setItem('visualVibeUser', JSON.stringify(user));
      return true;
    } catch (error) {
      console.error('Error saving session:', error);
      return false;
    }
  }

  function getUserSession() {
    try {
      return JSON.parse(localStorage.getItem('visualVibeUser') || 'null');
    } catch (error) {
      console.error('Error reading session:', error);
      return null;
    }
  }

  // MODAL MANAGEMENT
  function openSignInModal() {
    console.log('🔑 Opening Sign In Modal');
    
    const modal = document.getElementById('signInModal');
    if (!modal) {
      showAlert('Sign in form not available. Please refresh the page.', 'error');
      return;
    }

    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    
    // Focus on email input
    setTimeout(() => {
      const emailInput = document.getElementById('signInEmail');
      if (emailInput) emailInput.focus();
    }, 100);
  }

  function openSignUpModal() {
    console.log('📝 Opening Sign Up Modal');
    
    const modal = document.getElementById('signUpModal');
    if (!modal) {
      showAlert('Sign up form not available. Please refresh the page.', 'error');
      return;
    }

    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    
    // Focus on name input
    setTimeout(() => {
      const nameInput = document.getElementById('signUpName');
      if (nameInput) nameInput.focus();
    }, 100);
  }

  function closeSignInModal() {
    const modal = document.getElementById('signInModal');
    if (modal) {
      modal.classList.add('hidden');
      modal.style.display = 'none';
    }
    
    const form = document.getElementById('signInForm');
    if (form) form.reset();
  }

  function closeSignUpModal() {
    const modal = document.getElementById('signUpModal');
    if (modal) {
      modal.classList.add('hidden');
      modal.style.display = 'none';
    }
    
    const form = document.getElementById('signUpForm');
    if (form) form.reset();
  }

  function switchToSignUp() {
    closeSignInModal();
    setTimeout(openSignUpModal, 100);
  }

  function switchToSignIn() {
    closeSignUpModal();
    setTimeout(openSignInModal, 100);
  }

  // AUTHENTICATION HANDLERS
  function handleSignIn(event) {
    event.preventDefault();
    
    if (isProcessing) {
      console.log('⏳ Sign in already in progress');
      return;
    }
    
    isProcessing = true;
    console.log('🔑 Processing Sign In');

    try {
      const emailInput = document.getElementById('signInEmail');
      const passwordInput = document.getElementById('signInPassword');

      if (!emailInput || !passwordInput) {
        showAlert('Sign in form elements not found. Please refresh the page.', 'error');
        return;
      }

      const email = emailInput.value.trim().toLowerCase();
      const password = passwordInput.value.trim();

      // Validation
      if (!email || !password) {
        showAlert('Please enter both email and password.', 'error');
        return;
      }

      if (!validateEmail(email)) {
        showAlert('Please enter a valid email address.', 'error');
        return;
      }

      // Find user
      const users = getUsers();
      console.log(`🔍 Searching for user among ${users.length} registered users`);
      
      const user = users.find(u => 
        u.email && u.email.toLowerCase() === email && u.password === password
      );

      if (user) {
        // Successful sign in
        console.log('✅ Sign in successful for:', user.name);
        
        const sessionUser = {
          id: user.id,
          name: user.name,
          email: user.email,
          firstName: user.firstName || user.name.split(' ')[0],
          lastName: user.lastName || user.name.split(' ').slice(1).join(' '),
          phone: user.phone || '',
          companyName: user.companyName || '',
          signedIn: true,
          lastActivity: new Date().toISOString(),
          loginTime: new Date().toISOString()
        };

        // Save session
        window.currentUser = sessionUser;
        currentUser = sessionUser;
        saveUserSession(sessionUser);

        // Update user's last login
        user.lastLogin = new Date().toISOString();
        saveUsers(users);

        // Update UI
        updateAuthUI();
        closeSignInModal();
        
        showAlert(`Welcome back, ${user.firstName || user.name}!`, 'success');
        
      } else {
        // Check if email exists with different password
        const existingUser = users.find(u => u.email && u.email.toLowerCase() === email);
        
        if (existingUser) {
          console.log('❌ Wrong password for existing email:', email);
          showAlert('Incorrect password. Please try again.', 'error');
        } else {
          console.log('❌ No account found for email:', email);
          showAlert('No account found with this email. Please sign up first.', 'error');
          
          // Offer to switch to sign up
          setTimeout(() => {
            if (confirm('Would you like to create a new account with this email?')) {
              switchToSignUp();
              setTimeout(() => {
                const signUpEmail = document.getElementById('signUpEmail');
                if (signUpEmail) signUpEmail.value = email;
              }, 200);
            }
          }, 1000);
        }
      }

    } catch (error) {
      console.error('❌ Sign in error:', error);
      showAlert('Sign in failed. Please try again.', 'error');
    } finally {
      isProcessing = false;
    }
  }

  function handleSignUp(event) {
    event.preventDefault();
    
    if (isProcessing) {
      console.log('⏳ Sign up already in progress');
      return;
    }
    
    isProcessing = true;
    console.log('📝 Processing Sign Up');

    try {
      const nameInput = document.getElementById('signUpName');
      const emailInput = document.getElementById('signUpEmail');
      const passwordInput = document.getElementById('signUpPassword');
      const confirmPasswordInput = document.getElementById('signUpConfirmPassword');

      if (!nameInput || !emailInput || !passwordInput || !confirmPasswordInput) {
        showAlert('Sign up form elements not found. Please refresh the page.', 'error');
        return;
      }

      const name = nameInput.value.trim();
      const email = emailInput.value.trim().toLowerCase();
      const password = passwordInput.value.trim();
      const confirmPassword = confirmPasswordInput.value.trim();

      // Validation
      if (!name || !email || !password || !confirmPassword) {
        showAlert('Please fill in all fields.', 'error');
        return;
      }

      if (!validateEmail(email)) {
        showAlert('Please enter a valid email address.', 'error');
        return;
      }

      if (password.length < 6) {
        showAlert('Password must be at least 6 characters long.', 'error');
        return;
      }

      if (password !== confirmPassword) {
        showAlert('Passwords do not match.', 'error');
        return;
      }

      // Check if email already exists
      const users = getUsers();
      console.log(`📝 Checking for existing email among ${users.length} users`);
      
      const existingUser = users.find(u => u.email && u.email.toLowerCase() === email);
      
      if (existingUser) {
        console.log('❌ Email already exists:', email);
        showAlert(`An account with this email already exists. Please sign in instead.`, 'error');
        
        // Offer to switch to sign in
        setTimeout(() => {
          if (confirm('Would you like to sign in to your existing account?')) {
            switchToSignIn();
            setTimeout(() => {
              const signInEmail = document.getElementById('signInEmail');
              if (signInEmail) signInEmail.value = email;
            }, 200);
          }
        }, 1000);
        return;
      }

      // Create new user
      const nameParts = name.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      const newUser = {
        id: generateUserId(),
        name: name,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        phone: '',
        companyName: '',
        orders: [],
        reviews: [],
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        accountVersion: '3.0'
      };

      // Save user
      users.push(newUser);
      saveUsers(users);
      
      console.log('✅ New user created:', newUser.name);

      // Create session
      const sessionUser = {
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

      // Set current user
      window.currentUser = sessionUser;
      currentUser = sessionUser;
      saveUserSession(sessionUser);

      // Update UI
      updateAuthUI();
      closeSignUpModal();
      
      showAlert(`Welcome, ${firstName}! Your account has been created successfully.`, 'success');

    } catch (error) {
      console.error('❌ Sign up error:', error);
      showAlert('Sign up failed. Please try again.', 'error');
    } finally {
      isProcessing = false;
    }
  }

  function signOut() {
    console.log('🚪 Signing out user');
    
    // Clear session
    window.currentUser = null;
    currentUser = null;
    localStorage.removeItem('visualVibeUser');
    
    // Update UI
    updateAuthUI();
    
    showAlert('You have been signed out successfully.', 'success');
  }

  // UI UPDATE FUNCTION
  function updateAuthUI() {
    try {
      const signedOutState = document.getElementById('signedOutState');
      const signedInState = document.getElementById('signedInState');
      const mobileSignedOutState = document.getElementById('mobileSignedOutState');
      const mobileSignedInState = document.getElementById('mobileSignedInState');
      const userNameSpan = document.getElementById('userName');

      if (currentUser || window.currentUser) {
        const user = currentUser || window.currentUser;
        
        // Show signed in state
        if (signedOutState) signedOutState.style.display = 'none';
        if (signedInState) signedInState.style.display = 'flex';
        if (mobileSignedOutState) mobileSignedOutState.style.display = 'none';
        if (mobileSignedInState) mobileSignedInState.style.display = 'block';
        if (userNameSpan) userNameSpan.textContent = user.name;

        console.log('✅ UI updated to signed in state for:', user.name);
      } else {
        // Show signed out state
        if (signedOutState) signedOutState.style.display = 'flex';
        if (signedInState) signedInState.style.display = 'none';
        if (mobileSignedOutState) mobileSignedOutState.style.display = 'block';
        if (mobileSignedInState) mobileSignedInState.style.display = 'none';

        console.log('✅ UI updated to signed out state');
      }
    } catch (error) {
      console.error('❌ Error updating auth UI:', error);
    }
  }

  // RESTORE SESSION ON PAGE LOAD
  function restoreSession() {
    const savedUser = getUserSession();
    if (savedUser && savedUser.signedIn) {
      console.log('🔄 Restoring user session for:', savedUser.name);
      window.currentUser = savedUser;
      currentUser = savedUser;
      updateAuthUI();
    }
  }

  // REGISTER ALL FUNCTIONS GLOBALLY
  window.openSignInModal = openSignInModal;
  window.openSignUpModal = openSignUpModal;
  window.closeSignInModal = closeSignInModal;
  window.closeSignUpModal = closeSignUpModal;
  window.switchToSignIn = switchToSignIn;
  window.switchToSignUp = switchToSignUp;
  window.handleSignIn = handleSignIn;
  window.handleSignUp = handleSignUp;
  window.signOut = signOut;
  window.updateAuthUI = updateAuthUI;
  window.saveUserSession = saveUserSession;

  // SETUP EVENT LISTENERS
  function setupEventListeners() {
    // Sign in form
    const signInForm = document.getElementById('signInForm');
    if (signInForm) {
      signInForm.removeEventListener('submit', handleSignIn);
      signInForm.addEventListener('submit', handleSignIn);
      console.log('✅ Sign in form listener attached');
    }

    // Sign up form
    const signUpForm = document.getElementById('signUpForm');
    if (signUpForm) {
      signUpForm.removeEventListener('submit', handleSignUp);
      signUpForm.addEventListener('submit', handleSignUp);
      console.log('✅ Sign up form listener attached');
    }

    // Fix all auth buttons on the page
    document.querySelectorAll('button[onclick*="openSignInModal"]').forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        openSignInModal();
      };
    });

    document.querySelectorAll('button[onclick*="openSignUpModal"]').forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        openSignUpModal();
      };
    });
  }

  // INITIALIZE WHEN DOM IS READY
  function initialize() {
    console.log('🚀 Initializing Unified Auth System');
    
    restoreSession();
    setupEventListeners();
    
    console.log('✅ Unified Auth System Ready');
    console.log('📊 Functions available:', {
      openSignInModal: typeof window.openSignInModal,
      openSignUpModal: typeof window.openSignUpModal,
      handleSignIn: typeof window.handleSignIn,
      handleSignUp: typeof window.handleSignUp,
      signOut: typeof window.signOut
    });
  }

  // Initialize immediately if DOM is ready, otherwise wait
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }

  // Also initialize after a short delay to ensure all elements are ready
  setTimeout(initialize, 1000);

})();
