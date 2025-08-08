// CLEAN AUTH MANAGER - SIMPLE, CONFLICT-FREE AUTHENTICATION
console.log('🧹 Loading Clean Auth Manager - Eliminating all conflicts...');

(function() {
  'use strict';

  // Prevent multiple executions
  if (window.cleanAuthManagerLoaded) {
    console.log('✅ Clean Auth Manager already loaded');
    return;
  }
  window.cleanAuthManagerLoaded = true;

  console.log('🚀 Starting Clean Auth Manager...');

  // STEP 1: CLEAR ALL CONFLICTING FUNCTIONS
  const functionsToDelete = [
    'openSignInModal', 'openSignUpModal', 'closeSignInModal', 'closeSignUpModal',
    'handleSignIn', 'handleSignUp', 'switchToSignIn', 'switchToSignUp',
    'updateAuthUI', 'updateSignInUI', 'signOut', 'saveUserSession', 'restoreSession'
  ];

  functionsToDelete.forEach(funcName => {
    try {
      delete window[funcName];
    } catch(e) {
      // Some functions may be protected, that's ok
    }
  });

  console.log('🧹 Cleared all conflicting auth functions');

  // STEP 2: SIMPLE STATE MANAGEMENT
  let currentUser = null;

  // STEP 3: CLEAN UI UPDATE FUNCTION
  function updateAuthUI() {
    console.log('🎨 Clean Auth: Updating UI state...');
    
    try {
      // Get UI elements
      const signedOutState = document.getElementById('signedOutState');
      const signedInState = document.getElementById('signedInState');
      const mobileSignedOutState = document.getElementById('mobileSignedOutState');
      const mobileSignedInState = document.getElementById('mobileSignedInState');
      const userNameSpan = document.getElementById('userName');

      if (currentUser) {
        // User is signed in
        console.log(`🎨 Showing signed-in state for: ${currentUser.name}`);
        
        // Desktop states
        if (signedOutState) {
          signedOutState.style.display = 'none';
          signedOutState.classList.add('hidden');
        }
        if (signedInState) {
          signedInState.style.display = 'flex';
          signedInState.classList.remove('hidden');
        }
        
        // Mobile states
        if (mobileSignedOutState) {
          mobileSignedOutState.style.display = 'none';
          mobileSignedOutState.classList.add('hidden');
        }
        if (mobileSignedInState) {
          mobileSignedInState.style.display = 'block';
          mobileSignedInState.classList.remove('hidden');
        }
        
        // Update name
        if (userNameSpan) {
          userNameSpan.textContent = currentUser.name;
        }
        
        console.log('✅ Clean Auth: UI updated to signed-in state');
        
      } else {
        // User is signed out
        console.log('🎨 Showing signed-out state');
        
        // Desktop states
        if (signedOutState) {
          signedOutState.style.display = 'flex';
          signedOutState.classList.remove('hidden');
        }
        if (signedInState) {
          signedInState.style.display = 'none';
          signedInState.classList.add('hidden');
        }
        
        // Mobile states
        if (mobileSignedOutState) {
          mobileSignedOutState.style.display = 'block';
          mobileSignedOutState.classList.remove('hidden');
        }
        if (mobileSignedInState) {
          mobileSignedInState.style.display = 'none';
          mobileSignedInState.classList.add('hidden');
        }
        
        console.log('✅ Clean Auth: UI updated to signed-out state');
      }
    } catch (error) {
      console.error('❌ Clean Auth: Error updating UI:', error);
    }
  }

  // STEP 4: SIMPLE SIGN IN MODAL
  window.openSignInModal = function() {
    console.log('🔑 Clean Auth: Opening sign in modal...');
    
    // Remove any existing modal
    const existingModal = document.getElementById('cleanSignInModal');
    if (existingModal) existingModal.remove();
    
    // Create modal
    const modal = document.createElement('div');
    modal.id = 'cleanSignInModal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999] p-4';
    modal.innerHTML = `
      <div class="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-2xl font-bold text-gray-800">Sign In</h3>
          <button onclick="closeSignInModal()" class="text-gray-500 hover:text-gray-700 text-3xl">&times;</button>
        </div>
        <form onsubmit="handleSignIn(event); return false;" class="space-y-4">
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Email</label>
            <input type="email" id="cleanSignInEmail" required class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500" placeholder="Enter your email">
          </div>
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Password</label>
            <input type="password" id="cleanSignInPassword" required class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500" placeholder="Enter your password">
          </div>
          <button type="submit" class="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700">Sign In</button>
        </form>
        <div class="mt-6 text-center">
          <p class="text-gray-600">Don't have an account?</p>
          <button onclick="switchToSignUp()" class="text-indigo-600 font-bold">Create Account</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Focus email input
    setTimeout(() => {
      const emailInput = document.getElementById('cleanSignInEmail');
      if (emailInput) emailInput.focus();
    }, 100);
  };

  // STEP 5: SIMPLE SIGN UP MODAL
  window.openSignUpModal = function() {
    console.log('📝 Clean Auth: Opening sign up modal...');
    
    // Remove any existing modal
    const existingModal = document.getElementById('cleanSignUpModal');
    if (existingModal) existingModal.remove();
    
    // Create modal
    const modal = document.createElement('div');
    modal.id = 'cleanSignUpModal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999] p-4';
    modal.innerHTML = `
      <div class="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-2xl font-bold text-gray-800">Create Account</h3>
          <button onclick="closeSignUpModal()" class="text-gray-500 hover:text-gray-700 text-3xl">&times;</button>
        </div>
        <form onsubmit="handleSignUp(event); return false;" class="space-y-4">
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
            <input type="text" id="cleanSignUpName" required class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500" placeholder="Enter your full name">
          </div>
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Email</label>
            <input type="email" id="cleanSignUpEmail" required class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500" placeholder="Enter your email">
          </div>
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Password</label>
            <input type="password" id="cleanSignUpPassword" required minlength="6" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500" placeholder="Create password (min 6 chars)">
          </div>
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Confirm Password</label>
            <input type="password" id="cleanSignUpConfirm" required class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500" placeholder="Confirm your password">
          </div>
          <button type="submit" class="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700">Create Account</button>
        </form>
        <div class="mt-6 text-center">
          <p class="text-gray-600">Already have an account?</p>
          <button onclick="switchToSignIn()" class="text-indigo-600 font-bold">Sign In</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Focus name input
    setTimeout(() => {
      const nameInput = document.getElementById('cleanSignUpName');
      if (nameInput) nameInput.focus();
    }, 100);
  };

  // STEP 6: MODAL CONTROLS
  window.closeSignInModal = function() {
    const modal = document.getElementById('cleanSignInModal');
    if (modal) modal.remove();
    document.body.style.overflow = '';
  };

  window.closeSignUpModal = function() {
    const modal = document.getElementById('cleanSignUpModal');
    if (modal) modal.remove();
    document.body.style.overflow = '';
  };

  window.switchToSignUp = function() {
    closeSignInModal();
    setTimeout(openSignUpModal, 100);
  };

  window.switchToSignIn = function() {
    closeSignUpModal();
    setTimeout(openSignInModal, 100);
  };

  // STEP 7: AUTHENTICATION HANDLERS
  window.handleSignIn = function(e) {
    e.preventDefault();
    console.log('🔑 Clean Auth: Processing sign in...');
    
    const email = document.getElementById('cleanSignInEmail').value.trim().toLowerCase();
    const password = document.getElementById('cleanSignInPassword').value.trim();
    
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }
    
    // Find user
    const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
    const user = users.find(u => u.email && u.email.toLowerCase() === email && u.password === password);
    
    if (user) {
      // Success
      currentUser = {
        id: user.id,
        name: user.name,
        firstName: user.firstName || user.name.split(' ')[0],
        lastName: user.lastName || user.name.split(' ').slice(1).join(' '),
        email: user.email,
        phone: user.phone || '',
        companyName: user.companyName || '',
        orders: user.orders || [],
        reviews: user.reviews || []
      };
      
      // Save session
      window.currentUser = currentUser;
      localStorage.setItem('visualVibeUser', JSON.stringify(currentUser));
      
      // Update UI
      updateAuthUI();
      
      // Close modal
      closeSignInModal();
      
      // Show success
      showCleanNotification(`Welcome back, ${user.name}! 🎉`, 'success');
      
      console.log('✅ Clean Auth: Sign in successful');
      
    } else {
      alert('Invalid email or password.');
    }
  };

  window.handleSignUp = function(e) {
    e.preventDefault();
    console.log('📝 Clean Auth: Processing sign up...');
    
    const name = document.getElementById('cleanSignUpName').value.trim();
    const email = document.getElementById('cleanSignUpEmail').value.trim().toLowerCase();
    const password = document.getElementById('cleanSignUpPassword').value.trim();
    const confirm = document.getElementById('cleanSignUpConfirm').value.trim();
    
    // Validation
    if (!name || !email || !password || !confirm) {
      alert('Please fill in all fields.');
      return;
    }
    
    if (password !== confirm) {
      alert('Passwords do not match.');
      return;
    }
    
    if (password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }
    
    // Check if user exists
    const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
    if (users.find(u => u.email && u.email.toLowerCase() === email)) {
      alert('Account already exists with this email.');
      return;
    }
    
    // Create user
    const newUser = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: name,
      firstName: name.split(' ')[0],
      lastName: name.split(' ').slice(1).join(' '),
      email: email,
      password: password,
      phone: '',
      companyName: '',
      orders: [],
      reviews: [],
      createdAt: new Date().toISOString()
    };
    
    // Save user
    users.push(newUser);
    localStorage.setItem('visualVibeUsers', JSON.stringify(users));
    
    // Sign in user
    currentUser = newUser;
    window.currentUser = currentUser;
    localStorage.setItem('visualVibeUser', JSON.stringify(currentUser));
    
    // Update UI
    updateAuthUI();
    
    // Close modal
    closeSignUpModal();
    
    // Show success
    showCleanNotification(`Welcome, ${name}! Account created successfully! 🎉`, 'success');
    
    console.log('✅ Clean Auth: Sign up successful');
  };

  // STEP 8: SIGN OUT
  window.signOut = function() {
    console.log('👋 Clean Auth: Signing out...');
    
    currentUser = null;
    window.currentUser = null;
    localStorage.removeItem('visualVibeUser');
    
    updateAuthUI();
    
    showCleanNotification('Signed out successfully! 👋', 'info');
  };

  // STEP 9: SIMPLE NOTIFICATION
  function showCleanNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelectorAll('.clean-notification');
    existing.forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = 'clean-notification fixed top-4 right-4 z-[99999] px-6 py-3 rounded-lg shadow-lg text-white font-bold transform transition-all duration-300 translate-x-full';
    notification.style.backgroundColor = type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.style.transform = 'translateX(0)', 100);
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // STEP 10: FIX ALL BUTTONS
  function fixAllButtons() {
    const signInButtons = document.querySelectorAll('button[onclick*="openSignInModal"], a[onclick*="openSignInModal"]');
    const signUpButtons = document.querySelectorAll('button[onclick*="openSignUpModal"], a[onclick*="openSignUpModal"]');
    
    signInButtons.forEach(btn => {
      btn.onclick = function(e) {
        e.preventDefault();
        openSignInModal();
      };
    });
    
    signUpButtons.forEach(btn => {
      btn.onclick = function(e) {
        e.preventDefault();
        openSignUpModal();
      };
    });
    
    console.log(`✅ Clean Auth: Fixed ${signInButtons.length + signUpButtons.length} buttons`);
  }

  // STEP 11: RESTORE SESSION
  function restoreSession() {
    try {
      const savedUser = localStorage.getItem('visualVibeUser');
      if (savedUser) {
        currentUser = JSON.parse(savedUser);
        window.currentUser = currentUser;
        console.log('🔄 Clean Auth: Session restored for:', currentUser.name);
      }
    } catch (error) {
      console.error('❌ Clean Auth: Error restoring session:', error);
      localStorage.removeItem('visualVibeUser');
    }
  }

  // STEP 12: MAKE FUNCTIONS GLOBAL
  window.updateAuthUI = updateAuthUI;

  // STEP 13: INITIALIZE
  function initialize() {
    console.log('🚀 Clean Auth: Initializing...');
    
    // Restore session
    restoreSession();
    
    // Update UI
    updateAuthUI();
    
    // Fix buttons
    fixAllButtons();
    
    // Re-fix buttons periodically
    setInterval(fixAllButtons, 5000);
    
    console.log('✅ Clean Auth Manager initialized successfully!');
  }

  // Run initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }

})();
