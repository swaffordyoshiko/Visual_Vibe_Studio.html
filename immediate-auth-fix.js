// IMMEDIATE AUTHENTICATION FIX
// This script overrides all broken authentication functions with working versions

console.log('🚀 IMMEDIATE AUTH FIX: Loading...');

(function() {
  'use strict';
  
  // Wait for DOM to be ready
  function waitForDOM() {
    return new Promise((resolve) => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', resolve);
      } else {
        resolve();
      }
    });
  }
  
  // Main fix function
  async function fixAuthenticationNow() {
    await waitForDOM();
    
    console.log('🔧 IMMEDIATE AUTH FIX: Applying...');
    
    // Check if modals exist
    const signInModal = document.getElementById('signInModal');
    const signUpModal = document.getElementById('signUpModal');
    
    if (!signInModal || !signUpModal) {
      console.error('❌ AUTH FIX: Modals not found');
      return;
    }
    
    console.log('✅ AUTH FIX: Modals found, setting up functions...');
    
    // Clear all existing broken functions
    delete window.openSignInModal;
    delete window.openSignUpModal;
    delete window.closeSignInModal;
    delete window.closeSignUpModal;
    delete window.handleSignIn;
    delete window.handleSignUp;
    delete window.switchToSignUp;
    delete window.switchToSignIn;
    
    // Define working modal functions
    window.openSignInModal = function() {
      console.log('🔑 AUTH FIX: Opening sign in modal...');
      const modal = document.getElementById('signInModal');
      if (modal) {
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
        modal.style.opacity = '1';
        
        const emailInput = document.getElementById('signInEmail');
        if (emailInput) {
          setTimeout(() => emailInput.focus(), 100);
        }
      } else {
        alert('Sign in form not available. Please refresh the page.');
      }
    };
    
    window.openSignUpModal = function() {
      console.log('📝 AUTH FIX: Opening sign up modal...');
      const modal = document.getElementById('signUpModal');
      if (modal) {
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
        modal.style.opacity = '1';
        
        const nameInput = document.getElementById('signUpName');
        if (nameInput) {
          setTimeout(() => nameInput.focus(), 100);
        }
      } else {
        alert('Sign up form not available. Please refresh the page.');
      }
    };
    
    window.closeSignInModal = function() {
      console.log('🔒 AUTH FIX: Closing sign in modal...');
      const modal = document.getElementById('signInModal');
      if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
        const form = document.getElementById('signInForm');
        if (form) form.reset();
      }
    };
    
    window.closeSignUpModal = function() {
      console.log('📝 AUTH FIX: Closing sign up modal...');
      const modal = document.getElementById('signUpModal');
      if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
        const form = document.getElementById('signUpForm');
        if (form) form.reset();
      }
    };
    
    window.switchToSignUp = function() {
      window.closeSignInModal();
      setTimeout(() => window.openSignUpModal(), 100);
    };
    
    window.switchToSignIn = function() {
      window.closeSignUpModal();
      setTimeout(() => window.openSignInModal(), 100);
    };
    
    // Simple alert function
    function showAlert(message, type) {
      if (type === 'error') {
        alert('Error: ' + message);
      } else if (type === 'success') {
        alert('Success: ' + message);
      } else {
        alert(message);
      }
    }
    
    // Authentication handlers
    function handleSignIn(e) {
      e.preventDefault();
      console.log('🔑 AUTH FIX: Processing sign in...');
      
      const emailInput = document.getElementById('signInEmail');
      const passwordInput = document.getElementById('signInPassword');
      
      if (!emailInput || !passwordInput) {
        showAlert('Form elements not found. Please refresh the page.', 'error');
        return;
      }
      
      const email = emailInput.value.trim().toLowerCase();
      const password = passwordInput.value;
      
      if (!email || !password) {
        showAlert('Please enter both email and password.', 'error');
        return;
      }
      
      // Get stored users
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      const user = users.find(u => u.email.toLowerCase() === email && u.password === password);
      
      if (user) {
        // Successful login
        const now = new Date().toISOString();
        window.currentUser = {
          id: user.id,
          name: user.name,
          email: user.email,
          lastActivity: now,
          loginTime: now
        };
        
        // Save session
        localStorage.setItem('currentUser', JSON.stringify(window.currentUser));
        
        // Update UI
        updateAuthUI();
        window.closeSignInModal();
        showAlert('Welcome back, ' + user.name + '!', 'success');
        console.log('✅ AUTH FIX: User signed in:', user.name);
      } else {
        // Check if email exists
        const existingUser = users.find(u => u.email.toLowerCase() === email);
        if (existingUser) {
          showAlert('Incorrect password. Please try again.', 'error');
        } else {
          showAlert('No account found with this email. Please sign up first.', 'error');
        }
      }
    }
    
    function handleSignUp(e) {
      e.preventDefault();
      console.log('📝 AUTH FIX: Processing sign up...');
      
      const nameInput = document.getElementById('signUpName');
      const emailInput = document.getElementById('signUpEmail');
      const passwordInput = document.getElementById('signUpPassword');
      const confirmPasswordInput = document.getElementById('signUpConfirmPassword');
      
      if (!nameInput || !emailInput || !passwordInput || !confirmPasswordInput) {
        showAlert('Form elements not found. Please refresh the page.', 'error');
        return;
      }
      
      const name = nameInput.value.trim();
      const email = emailInput.value.trim().toLowerCase();
      const password = passwordInput.value;
      const confirmPassword = confirmPasswordInput.value;
      
      if (!name || !email || !password || !confirmPassword) {
        showAlert('Please fill in all fields.', 'error');
        return;
      }
      
      if (password !== confirmPassword) {
        showAlert('Passwords do not match.', 'error');
        return;
      }
      
      if (password.length < 6) {
        showAlert('Password must be at least 6 characters long.', 'error');
        return;
      }
      
      // Get existing users
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      
      // Check if email already exists
      const existingUser = users.find(u => u.email.toLowerCase() === email);
      if (existingUser) {
        showAlert('An account with this email already exists. Please sign in instead.', 'error');
        setTimeout(() => {
          window.closeSignUpModal();
          window.openSignInModal();
          // Pre-fill email
          const signInEmail = document.getElementById('signInEmail');
          if (signInEmail) signInEmail.value = emailInput.value;
        }, 2000);
        return;
      }
      
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name: name,
        email: email,
        password: password,
        orders: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      users.push(newUser);
      localStorage.setItem('visualVibeUsers', JSON.stringify(users));
      
      // Auto sign in new user
      const now = new Date().toISOString();
      window.currentUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        lastActivity: now,
        loginTime: now
      };
      
      // Save session
      localStorage.setItem('currentUser', JSON.stringify(window.currentUser));
      
      // Update UI
      updateAuthUI();
      window.closeSignUpModal();
      showAlert('Account created successfully! Welcome, ' + name + '!', 'success');
      console.log('✅ AUTH FIX: User signed up:', name);
    }
    
    // Update auth UI function
    function updateAuthUI() {
      const signedOutState = document.getElementById('signedOutState');
      const signedInState = document.getElementById('signedInState');
      const mobileSignedOutState = document.getElementById('mobileSignedOutState');
      const mobileSignedInState = document.getElementById('mobileSignedInState');
      const userNameSpan = document.getElementById('userName');
      
      if (window.currentUser) {
        // User is signed in
        if (signedOutState) signedOutState.style.display = 'none';
        if (signedInState) signedInState.style.display = 'flex';
        if (mobileSignedOutState) mobileSignedOutState.style.display = 'none';
        if (mobileSignedInState) mobileSignedInState.style.display = 'block';
        if (userNameSpan) userNameSpan.textContent = window.currentUser.name;
        console.log('✅ AUTH FIX: UI updated for signed in user');
      } else {
        // User is signed out
        if (signedOutState) signedOutState.style.display = 'flex';
        if (signedInState) signedInState.style.display = 'none';
        if (mobileSignedOutState) mobileSignedOutState.style.display = 'block';
        if (mobileSignedInState) mobileSignedInState.style.display = 'none';
        console.log('✅ AUTH FIX: UI updated for signed out user');
      }
    }
    
    // Make updateAuthUI globally available
    window.updateAuthUI = updateAuthUI;
    
    // Set up form event listeners by replacing forms with fresh ones
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');
    
    if (signInForm) {
      const newSignInForm = signInForm.cloneNode(true);
      signInForm.parentNode.replaceChild(newSignInForm, signInForm);
      newSignInForm.addEventListener('submit', handleSignIn);
      console.log('✅ AUTH FIX: Sign in form listener set');
    }
    
    if (signUpForm) {
      const newSignUpForm = signUpForm.cloneNode(true);
      signUpForm.parentNode.replaceChild(newSignUpForm, signUpForm);
      newSignUpForm.addEventListener('submit', handleSignUp);
      console.log('✅ AUTH FIX: Sign up form listener set');
    }
    
    // Close modals when clicking outside
    [document.getElementById('signInModal'), document.getElementById('signUpModal')].forEach(modal => {
      if (modal) {
        modal.addEventListener('click', function(e) {
          if (e.target === modal) {
            if (modal.id === 'signInModal') {
              window.closeSignInModal();
            } else {
              window.closeSignUpModal();
            }
          }
        });
      }
    });
    
    // Restore session on page load
    function restoreSession() {
      try {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
          window.currentUser = JSON.parse(savedUser);
          updateAuthUI();
          console.log('✅ AUTH FIX: User session restored:', window.currentUser.name);
        } else {
          updateAuthUI();
        }
      } catch (error) {
        console.error('❌ AUTH FIX: Error restoring session:', error);
        localStorage.removeItem('currentUser');
        updateAuthUI();
      }
    }
    
    // Initialize session
    restoreSession();
    
    console.log('🎉 AUTH FIX: All authentication functions ready!');
    
    // Test functions
    console.log('🔍 AUTH FIX: Function check:');
    console.log('  openSignInModal:', typeof window.openSignInModal);
    console.log('  openSignUpModal:', typeof window.openSignUpModal);
    console.log('  closeSignInModal:', typeof window.closeSignInModal);
    console.log('  closeSignUpModal:', typeof window.closeSignUpModal);
  }
  
  // Start the fix immediately
  fixAuthenticationNow().catch(error => {
    console.error('❌ AUTH FIX: Failed to initialize:', error);
  });
})();
