// COMPREHENSIVE AUTHENTICATION SYSTEM FIX
console.log('🔐 Loading Comprehensive Authentication System...');

(function() {
  'use strict';

  // DISABLE ALL CONFLICTING AUTHENTICATION SCRIPTS
  const conflictingSystems = [
    'unified-auth-fix', 'immediate-signup-fix', 'emergency-signup-fix', 
    'critical-mobile-auth-fix', 'final-check', 'rock-solid-auth', 
    'immediate-auth-fix', 'auth-system-fix', 'cross-device-auth', 
    'bulletproof-auth-system', 'unified-auth-system', 'fix-signin-button', 
    'signup-error-fix', 'final-auth-override'
  ];

  conflictingSystems.forEach(system => {
    window[system] = false;
    window[system + '_disabled'] = true;
  });

  // Clear existing auth functions (except modal functions that are being protected)
  const authFunctions = [
    'handleSignIn', 'handleSignUp',
    'signOut', 'updateAuthUI', 'saveUserSession', 'restoreSession'
  ];

  authFunctions.forEach(fn => {
    if (window[fn]) {
      try {
        delete window[fn];
      } catch(e) {
        // Function may be protected, that's ok
        console.log(`Function ${fn} is protected from deletion`);
      }
    }
  });

  console.log('🧹 Cleared all conflicting auth systems');

  // CORE STATE MANAGEMENT
  let currentUser = null;
  let isAuthProcessing = false;

  // UTILITY FUNCTIONS
  function showNotification(message, type = 'success') {
    console.log(`[${type.toUpperCase()}] ${message}`);
    
    if (window.toastManager && typeof window.toastManager.show === 'function') {
      window.toastManager.show(message, type);
    } else if (window.showAlert && typeof window.showAlert === 'function') {
      window.showAlert(message, type);
    } else {
      // Fallback notification system
      const notification = document.createElement('div');
      notification.className = `fixed top-4 right-4 z-[9999] px-6 py-3 rounded-lg shadow-lg text-white font-medium transform transition-all duration-300 ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 
        type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
      }`;
      notification.textContent = message;
      notification.style.transform = 'translateX(100%)';
      
      document.body.appendChild(notification);
      
      // Animate in
      setTimeout(() => {
        notification.style.transform = 'translateX(0)';
      }, 100);
      
      // Remove after 4 seconds
      setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
          }
        }, 300);
      }, 4000);
    }
  }

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  }

  function generateUserId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // USER STORAGE FUNCTIONS
  function getStoredUsers() {
    try {
      const users = localStorage.getItem('visualVibeUsers');
      return users ? JSON.parse(users) : [];
    } catch (error) {
      console.error('Error reading users from storage:', error);
      return [];
    }
  }

  function saveUsers(users) {
    try {
      localStorage.setItem('visualVibeUsers', JSON.stringify(users));
      return true;
    } catch (error) {
      console.error('Error saving users to storage:', error);
      return false;
    }
  }

  function saveUserSession(user) {
    try {
      const sessionData = {
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
      
      localStorage.setItem('visualVibeUser', JSON.stringify(sessionData));
      window.currentUser = sessionData;
      currentUser = sessionData;
      
      console.log('✅ User session saved:', sessionData.name);
      return true;
    } catch (error) {
      console.error('Error saving user session:', error);
      return false;
    }
  }

  function restoreSession() {
    try {
      const savedSession = localStorage.getItem('visualVibeUser');
      if (savedSession) {
        const sessionData = JSON.parse(savedSession);
        if (sessionData && sessionData.signedIn) {
          window.currentUser = sessionData;
          currentUser = sessionData;
          console.log('🔄 Session restored for:', sessionData.name);
          updateAuthUI();
          return true;
        }
      }
    } catch (error) {
      console.error('Error restoring session:', error);
    }
    return false;
  }

  // MODAL MANAGEMENT FUNCTIONS
  function openSignInModal() {
    console.log('🔑 Opening Sign In Modal...');
    
    const modal = document.getElementById('signInModal');
    if (!modal) {
      showNotification('Sign in form not available. Please refresh the page.', 'error');
      return;
    }

    // Clear any existing values
    const emailInput = document.getElementById('signInEmail');
    const passwordInput = document.getElementById('signInPassword');
    
    if (emailInput) emailInput.value = '';
    if (passwordInput) passwordInput.value = '';

    // Show modal
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    modal.style.opacity = '1';
    modal.style.visibility = 'visible';
    
    // Focus on email input
    setTimeout(() => {
      if (emailInput) emailInput.focus();
    }, 100);
    
    console.log('✅ Sign in modal opened');
  }

  function openSignUpModal() {
    console.log('📝 Opening Sign Up Modal...');
    
    const modal = document.getElementById('signUpModal');
    if (!modal) {
      showNotification('Sign up form not available. Please refresh the page.', 'error');
      return;
    }

    // Clear any existing values
    const nameInput = document.getElementById('signUpName');
    const emailInput = document.getElementById('signUpEmail');
    const passwordInput = document.getElementById('signUpPassword');
    const confirmPasswordInput = document.getElementById('signUpConfirmPassword');
    
    if (nameInput) nameInput.value = '';
    if (emailInput) emailInput.value = '';
    if (passwordInput) passwordInput.value = '';
    if (confirmPasswordInput) confirmPasswordInput.value = '';

    // Show modal
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    modal.style.opacity = '1';
    modal.style.visibility = 'visible';
    
    // Focus on name input
    setTimeout(() => {
      if (nameInput) nameInput.focus();
    }, 100);
    
    console.log('✅ Sign up modal opened');
  }

  function closeSignInModal() {
    const modal = document.getElementById('signInModal');
    const form = document.getElementById('signInForm');
    
    if (modal) {
      modal.classList.add('hidden');
      modal.style.display = 'none';
    }
    
    if (form) form.reset();
    console.log('🔑 Sign in modal closed');
  }

  function closeSignUpModal() {
    const modal = document.getElementById('signUpModal');
    const form = document.getElementById('signUpForm');
    
    if (modal) {
      modal.classList.add('hidden');
      modal.style.display = 'none';
    }
    
    if (form) form.reset();
    console.log('📝 Sign up modal closed');
  }

  function switchToSignUp() {
    closeSignInModal();
    setTimeout(openSignUpModal, 150);
  }

  function switchToSignIn() {
    closeSignUpModal();
    setTimeout(openSignInModal, 150);
  }

  // AUTHENTICATION HANDLERS
  function handleSignIn(event) {
    if (event) event.preventDefault();
    
    if (isAuthProcessing) {
      console.log('⏳ Sign in already in progress...');
      return false;
    }
    
    isAuthProcessing = true;
    console.log('🔑 Processing sign in...');

    try {
      const emailInput = document.getElementById('signInEmail');
      const passwordInput = document.getElementById('signInPassword');

      if (!emailInput || !passwordInput) {
        showNotification('Sign in form elements not found. Please refresh the page.', 'error');
        return false;
      }

      const email = emailInput.value.trim().toLowerCase();
      const password = passwordInput.value.trim();

      // Validation
      if (!email || !password) {
        showNotification('Please enter both email and password.', 'error');
        return false;
      }

      if (!validateEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return false;
      }

      // Find user in storage
      const users = getStoredUsers();
      console.log(`🔍 Searching among ${users.length} registered users...`);
      
      const user = users.find(u => 
        u.email && u.email.toLowerCase() === email && u.password === password
      );

      if (user) {
        // Successful sign in
        console.log('✅ Sign in successful for:', user.name);
        
        // Update last login time
        user.lastLogin = new Date().toISOString();
        saveUsers(users);
        
        // Save session
        saveUserSession(user);
        
        // Update UI
        updateAuthUI();
        closeSignInModal();
        
        showNotification(`Welcome back, ${user.firstName || user.name}!`, 'success');
        
        return true;
      } else {
        // Check if email exists with wrong password
        const existingUser = users.find(u => u.email && u.email.toLowerCase() === email);
        
        if (existingUser) {
          console.log('❌ Wrong password for existing email:', email);
          showNotification('Incorrect password. Please try again.', 'error');
        } else {
          console.log('❌ No account found for email:', email);
          showNotification('No account found with this email. Please sign up first.', 'error');
          
          // Offer to switch to sign up
          setTimeout(() => {
            if (confirm('Would you like to create a new account with this email?')) {
              switchToSignUp();
              setTimeout(() => {
                const signUpEmail = document.getElementById('signUpEmail');
                if (signUpEmail) signUpEmail.value = email;
              }, 200);
            }
          }, 1500);
        }
        return false;
      }

    } catch (error) {
      console.error('❌ Sign in error:', error);
      showNotification('Sign in failed. Please try again.', 'error');
      return false;
    } finally {
      isAuthProcessing = false;
    }
  }

  function handleSignUp(event) {
    if (event) event.preventDefault();
    
    if (isAuthProcessing) {
      console.log('⏳ Sign up already in progress...');
      return false;
    }
    
    isAuthProcessing = true;
    console.log('📝 Processing sign up...');

    try {
      const nameInput = document.getElementById('signUpName');
      const emailInput = document.getElementById('signUpEmail');
      const passwordInput = document.getElementById('signUpPassword');
      const confirmPasswordInput = document.getElementById('signUpConfirmPassword');

      if (!nameInput || !emailInput || !passwordInput || !confirmPasswordInput) {
        showNotification('Sign up form elements not found. Please refresh the page.', 'error');
        return false;
      }

      const name = nameInput.value.trim();
      const email = emailInput.value.trim().toLowerCase();
      const password = passwordInput.value.trim();
      const confirmPassword = confirmPasswordInput.value.trim();

      // Validation
      if (!name || !email || !password || !confirmPassword) {
        showNotification('Please fill in all fields.', 'error');
        return false;
      }

      if (!validateEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return false;
      }

      if (password.length < 6) {
        showNotification('Password must be at least 6 characters long.', 'error');
        return false;
      }

      if (password !== confirmPassword) {
        showNotification('Passwords do not match.', 'error');
        return false;
      }

      // Check for existing email (prevent duplicates)
      const users = getStoredUsers();
      console.log(`📝 Checking for existing email among ${users.length} users...`);
      
      const existingUser = users.find(u => u.email && u.email.toLowerCase() === email);
      
      if (existingUser) {
        console.log('❌ Email already exists:', email);
        showNotification(`An account with this email already exists under the name "${existingUser.name}". Please sign in instead.`, 'error');
        
        // Offer to switch to sign in
        setTimeout(() => {
          if (confirm('Would you like to sign in to your existing account?')) {
            switchToSignIn();
            setTimeout(() => {
              const signInEmail = document.getElementById('signInEmail');
              if (signInEmail) signInEmail.value = email;
            }, 200);
          }
        }, 2000);
        return false;
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
        accountVersion: '4.0'
      };

      // Save user to storage
      users.push(newUser);
      saveUsers(users);
      
      console.log('✅ New user created:', newUser.name);

      // Create session and sign in the new user
      saveUserSession(newUser);
      
      // Update UI
      updateAuthUI();
      closeSignUpModal();
      
      showNotification(`Welcome to Visual Vibe Studio, ${firstName}! Your account has been created successfully.`, 'success');
      
      return true;

    } catch (error) {
      console.error('❌ Sign up error:', error);
      showNotification('Sign up failed. Please try again.', 'error');
      return false;
    } finally {
      isAuthProcessing = false;
    }
  }

  function signOut() {
    console.log('🚪 Signing out user...');
    
    try {
      // Clear session
      localStorage.removeItem('visualVibeUser');
      window.currentUser = null;
      currentUser = null;
      
      // Update UI
      updateAuthUI();
      
      showNotification('You have been signed out successfully.', 'success');
      
      // Hide any user-specific content
      const welcomeBanner = document.getElementById('welcomeBanner');
      if (welcomeBanner) {
        welcomeBanner.classList.add('hidden');
      }
      
      console.log('✅ User signed out successfully');
      
    } catch (error) {
      console.error('�� Error signing out:', error);
      showNotification('Error signing out. Please refresh the page.', 'error');
    }
  }

  // UI UPDATE FUNCTION
  function updateAuthUI() {
    try {
      const signedOutState = document.getElementById('signedOutState');
      const signedInState = document.getElementById('signedInState');
      const mobileSignedOutState = document.getElementById('mobileSignedOutState');
      const mobileSignedInState = document.getElementById('mobileSignedInState');
      const userNameSpan = document.getElementById('userName');

      const user = currentUser || window.currentUser;

      if (user && user.signedIn) {
        // Show signed in state
        if (signedOutState) signedOutState.style.display = 'none';
        if (signedInState) signedInState.style.display = 'flex';
        if (mobileSignedOutState) mobileSignedOutState.style.display = 'none';
        if (mobileSignedInState) mobileSignedInState.style.display = 'block';
        if (userNameSpan) userNameSpan.textContent = user.firstName || user.name;

        console.log('✅ UI updated to signed in state for:', user.name);
        
        // Show welcome banner
        showWelcomeBanner(user.firstName || user.name);
        
      } else {
        // Show signed out state
        if (signedOutState) signedOutState.style.display = 'flex';
        if (signedInState) signedInState.style.display = 'none';
        if (mobileSignedOutState) mobileSignedOutState.style.display = 'block';
        if (mobileSignedInState) mobileSignedInState.style.display = 'none';

        console.log('✅ UI updated to signed out state');
        
        // Hide welcome banner
        const welcomeBanner = document.getElementById('welcomeBanner');
        if (welcomeBanner) {
          welcomeBanner.classList.add('hidden');
        }
      }
    } catch (error) {
      console.error('❌ Error updating auth UI:', error);
    }
  }

  function showWelcomeBanner(userName) {
    try {
      let welcomeBanner = document.getElementById('welcomeBanner');
      
      if (!welcomeBanner) {
        // Create welcome banner if it doesn't exist
        welcomeBanner = document.createElement('div');
        welcomeBanner.id = 'welcomeBanner';
        welcomeBanner.className = 'bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-4';
        
        const container = document.querySelector('main') || document.querySelector('.container') || document.body;
        container.insertBefore(welcomeBanner, container.firstChild);
      }
      
      welcomeBanner.innerHTML = `
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <span class="text-green-600 mr-2">👋</span>
            <span class="font-medium">Welcome back, ${userName}!</span>
          </div>
          <button onclick="hideWelcomeBanner()" class="text-green-600 hover:text-green-800">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      `;
      
      welcomeBanner.classList.remove('hidden');
      
    } catch (error) {
      console.error('Error showing welcome banner:', error);
    }
  }

  function hideWelcomeBanner() {
    const welcomeBanner = document.getElementById('welcomeBanner');
    if (welcomeBanner) {
      welcomeBanner.classList.add('hidden');
    }
  }

  // PROFILE AND ORDERS FUNCTIONS
  function openProfileModal() {
    console.log('👤 Opening profile modal...');
    
    if (!currentUser && !window.currentUser) {
      showNotification('Please sign in to edit your profile.', 'error');
      openSignInModal();
      return;
    }
    
    // Call existing profile modal function if available
    if (typeof window.actualOpenProfileModal === 'function') {
      window.actualOpenProfileModal();
    } else {
      showNotification('Profile editing will be available soon!', 'info');
    }
  }

  function showOrderHistory() {
    console.log('📋 Opening order history...');
    
    if (!currentUser && !window.currentUser) {
      showNotification('Please sign in to view your orders.', 'error');
      openSignInModal();
      return;
    }
    
    // Call existing order history function if available
    if (typeof window.actualShowOrderHistory === 'function') {
      window.actualShowOrderHistory();
    } else {
      showNotification('Order history will be available soon!', 'info');
    }
  }

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

    // Fix all auth buttons
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

    // Fix profile and orders buttons
    document.querySelectorAll('button[onclick*="openProfileModal"]').forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        openProfileModal();
      };
    });

    document.querySelectorAll('button[onclick*="showOrderHistory"]').forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        showOrderHistory();
      };
    });

    document.querySelectorAll('button[onclick*="signOut"]').forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        signOut();
      };
    });
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
  window.restoreSession = restoreSession;
  window.openProfileModal = openProfileModal;
  window.showOrderHistory = showOrderHistory;
  window.hideWelcomeBanner = hideWelcomeBanner;

  // INITIALIZATION
  function initialize() {
    console.log('🚀 Initializing Comprehensive Authentication System...');
    
    // Restore any existing session
    restoreSession();
    
    // Setup event listeners
    setupEventListeners();
    
    // Initial UI update
    updateAuthUI();
    
    console.log('✅ Comprehensive Authentication System Ready');
    console.log('📊 Available functions:', {
      openSignInModal: typeof window.openSignInModal,
      openSignUpModal: typeof window.openSignUpModal,
      handleSignIn: typeof window.handleSignIn,
      handleSignUp: typeof window.handleSignUp,
      signOut: typeof window.signOut,
      openProfileModal: typeof window.openProfileModal,
      showOrderHistory: typeof window.showOrderHistory
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }

  // Also initialize after a delay to ensure all elements are ready
  setTimeout(initialize, 1000);

  console.log('🔐 Comprehensive Authentication System Loaded');

})();
