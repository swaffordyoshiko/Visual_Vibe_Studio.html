// CONSOLIDATED AUTHENTICATION SYSTEM FIX
// This script fixes the sign in and sign up functionality

console.log('🔄 Loading consolidated authentication system fix...');

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

// Initialize authentication system
async function initializeAuthSystem() {
  await waitForDOM();
  
  console.log('🔧 Initializing authentication system...');
  
  // Check for required modal elements
  const signInModal = document.getElementById('signInModal');
  const signUpModal = document.getElementById('signUpModal');
  const signInForm = document.getElementById('signInForm');
  const signUpForm = document.getElementById('signUpForm');
  
  if (!signInModal || !signUpModal || !signInForm || !signUpForm) {
    console.error('❌ Required modal elements not found');
    return;
  }
  
  console.log('✅ Modal elements found, setting up functionality...');
  
  // Clear any existing duplicate functions and event listeners
  const forms = [signInForm, signUpForm];
  forms.forEach(form => {
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);
  });
  
  // Define clean authentication functions
  setupAuthenticationFunctions();
  
  // Setup event listeners
  setupEventListeners();
  
  console.log('✅ Authentication system initialized successfully');
}

function setupAuthenticationFunctions() {
  // Clear any existing functions
  delete window.openSignInModal;
  delete window.openSignUpModal;
  delete window.closeSignInModal;
  delete window.closeSignUpModal;
  delete window.handleSignIn;
  delete window.handleSignUp;
  delete window.switchToSignIn;
  delete window.switchToSignUp;
  
  // Sign In Modal Functions
  window.openSignInModal = function() {
    console.log('🔑 Opening sign in modal...');
    const modal = document.getElementById('signInModal');
    if (modal) {
      modal.classList.remove('hidden');
      modal.style.display = 'flex';
      modal.style.opacity = '1';
      
      // Focus on email input
      const emailInput = document.getElementById('signInEmail');
      if (emailInput) {
        setTimeout(() => emailInput.focus(), 100);
      }
    } else {
      console.error('❌ Sign in modal not found');
      alert('Sign in form not available. Please refresh the page.');
    }
  };
  
  window.closeSignInModal = function() {
    console.log('🔒 Closing sign in modal...');
    const modal = document.getElementById('signInModal');
    if (modal) {
      modal.classList.add('hidden');
      modal.style.display = 'none';
      
      // Reset form
      const form = document.getElementById('signInForm');
      if (form) form.reset();
    }
  };
  
  // Sign Up Modal Functions
  window.openSignUpModal = function() {
    console.log('📝 Opening sign up modal...');
    const modal = document.getElementById('signUpModal');
    if (modal) {
      modal.classList.remove('hidden');
      modal.style.display = 'flex';
      modal.style.opacity = '1';
      
      // Focus on name input
      const nameInput = document.getElementById('signUpName');
      if (nameInput) {
        setTimeout(() => nameInput.focus(), 100);
      }
    } else {
      console.error('❌ Sign up modal not found');
      alert('Sign up form not available. Please refresh the page.');
    }
  };
  
  window.closeSignUpModal = function() {
    console.log('📝 Closing sign up modal...');
    const modal = document.getElementById('signUpModal');
    if (modal) {
      modal.classList.add('hidden');
      modal.style.display = 'none';
      
      // Reset form
      const form = document.getElementById('signUpForm');
      if (form) form.reset();
    }
  };
  
  // Switch between modals
  window.switchToSignUp = function() {
    window.closeSignInModal();
    setTimeout(() => window.openSignUpModal(), 100);
  };
  
  window.switchToSignIn = function() {
    window.closeSignUpModal();
    setTimeout(() => window.openSignInModal(), 100);
  };
  
  // Authentication handlers
  window.handleSignIn = function(e) {
    e.preventDefault();
    console.log('🔑 Processing sign in...');
    
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
    } else {
      // Check if email exists
      const existingUser = users.find(u => u.email.toLowerCase() === email);
      if (existingUser) {
        showAlert('Incorrect password. Please try again.', 'error');
      } else {
        showAlert('No account found with this email. Please sign up first.', 'error');
      }
    }
  };
  
  window.handleSignUp = function(e) {
    e.preventDefault();
    console.log('📝 Processing sign up...');
    
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
  };
}

function setupEventListeners() {
  // Set up form event listeners
  const signInForm = document.getElementById('signInForm');
  const signUpForm = document.getElementById('signUpForm');
  
  if (signInForm) {
    signInForm.addEventListener('submit', window.handleSignIn);
  }
  
  if (signUpForm) {
    signUpForm.addEventListener('submit', window.handleSignUp);
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
}

// Show alert function (if not already defined)
if (typeof showAlert !== 'function') {
  window.showAlert = function(message, type) {
    // Simple alert fallback
    if (type === 'error') {
      alert('Error: ' + message);
    } else {
      alert(message);
    }
  };
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
  } else {
    // User is signed out
    if (signedOutState) signedOutState.style.display = 'flex';
    if (signedInState) signedInState.style.display = 'none';
    if (mobileSignedOutState) mobileSignedOutState.style.display = 'block';
    if (mobileSignedInState) mobileSignedInState.style.display = 'none';
  }
}

// Restore session on page load
function restoreSession() {
  try {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      window.currentUser = JSON.parse(savedUser);
      updateAuthUI();
      console.log('✅ User session restored:', window.currentUser.name);
    }
  } catch (error) {
    console.error('❌ Error restoring session:', error);
    localStorage.removeItem('currentUser');
  }
}

// Initialize everything
waitForDOM().then(() => {
  initializeAuthSystem();
  restoreSession();
});

console.log('✅ Authentication system fix loaded');
