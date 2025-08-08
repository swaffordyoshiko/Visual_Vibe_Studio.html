// SIMPLE WORKING AUTHENTICATION - NO CONFLICTS
console.log('🔐 Loading Simple Auth System...');

(function() {
  'use strict';

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuth);
  } else {
    initAuth();
  }

  function initAuth() {
    console.log('🚀 Initializing Simple Auth...');

    // WORKING SIGN IN MODAL
    window.openSignInModal = function() {
      console.log('🔑 Opening sign in modal...');
      
      // Remove existing modal
      const existing = document.getElementById('signInModal');
      if (existing) existing.remove();
      
      // Create modal
      const modal = document.createElement('div');
      modal.id = 'signInModal';
      modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
      modal.innerHTML = `
        <div class="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-2xl font-bold text-gray-800">Sign In</h3>
            <button onclick="closeSignInModal()" class="text-gray-500 hover:text-gray-700 text-3xl">&times;</button>
          </div>
          <form onsubmit="handleSignIn(event); return false;" class="space-y-4">
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Email</label>
              <input type="email" id="signInEmail" required class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500" placeholder="Enter your email">
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Password</label>
              <input type="password" id="signInPassword" required class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500" placeholder="Enter your password">
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
        const emailInput = document.getElementById('signInEmail');
        if (emailInput) emailInput.focus();
      }, 100);
    };

    // WORKING SIGN UP MODAL
    window.openSignUpModal = function() {
      console.log('📝 Opening sign up modal...');
      
      // Remove existing modal
      const existing = document.getElementById('signUpModal');
      if (existing) existing.remove();
      
      // Create modal
      const modal = document.createElement('div');
      modal.id = 'signUpModal';
      modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
      modal.innerHTML = `
        <div class="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-2xl font-bold text-gray-800">Create Account</h3>
            <button onclick="closeSignUpModal()" class="text-gray-500 hover:text-gray-700 text-3xl">&times;</button>
          </div>
          <form onsubmit="handleSignUp(event); return false;" class="space-y-4">
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
              <input type="text" id="signUpName" required class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500" placeholder="Enter your full name">
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Email</label>
              <input type="email" id="signUpEmail" required class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500" placeholder="Enter your email">
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Password</label>
              <input type="password" id="signUpPassword" required minlength="6" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500" placeholder="Create password (min 6 chars)">
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Confirm Password</label>
              <input type="password" id="signUpConfirm" required class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500" placeholder="Confirm your password">
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
        const nameInput = document.getElementById('signUpName');
        if (nameInput) nameInput.focus();
      }, 100);
    };

    // MODAL CONTROLS
    window.closeSignInModal = function() {
      const modal = document.getElementById('signInModal');
      if (modal) modal.remove();
      document.body.style.overflow = '';
    };

    window.closeSignUpModal = function() {
      const modal = document.getElementById('signUpModal');
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

    // SIGN IN HANDLER
    window.handleSignIn = function(e) {
      e.preventDefault();
      console.log('🔑 Processing sign in...');
      
      const email = document.getElementById('signInEmail').value.trim().toLowerCase();
      const password = document.getElementById('signInPassword').value.trim();
      
      if (!email || !password) {
        alert('Please enter both email and password.');
        return;
      }
      
      // Find user
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      const user = users.find(u => u.email && u.email.toLowerCase() === email && u.password === password);
      
      if (user) {
        // Success
        window.currentUser = {
          id: user.id,
          name: user.name,
          firstName: user.firstName || user.name.split(' ')[0],
          lastName: user.lastName || user.name.split(' ').slice(1).join(' '),
          email: user.email,
          phone: user.phone || '',
          orders: user.orders || [],
          reviews: user.reviews || []
        };
        
        // Save session
        localStorage.setItem('visualVibeUser', JSON.stringify(window.currentUser));
        
        // Update UI
        updateAuthUI();
        
        // Close modal
        closeSignInModal();
        
        // Show success
        showNotification(`Welcome back, ${user.name}! 🎉`, 'success');
        
        console.log('✅ Sign in successful');
      } else {
        alert('Invalid email or password. Please try again.');
      }
    };

    // SIGN UP HANDLER
    window.handleSignUp = function(e) {
      e.preventDefault();
      console.log('📝 Processing sign up...');
      
      const name = document.getElementById('signUpName').value.trim();
      const email = document.getElementById('signUpEmail').value.trim().toLowerCase();
      const password = document.getElementById('signUpPassword').value.trim();
      const confirm = document.getElementById('signUpConfirm').value.trim();
      
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
        alert('Account already exists with this email. Please sign in instead.');
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
        orders: [],
        reviews: [],
        createdAt: new Date().toISOString()
      };
      
      // Save user
      users.push(newUser);
      localStorage.setItem('visualVibeUsers', JSON.stringify(users));
      
      // Sign in user
      window.currentUser = newUser;
      localStorage.setItem('visualVibeUser', JSON.stringify(newUser));
      
      // Update UI
      updateAuthUI();
      
      // Close modal
      closeSignUpModal();
      
      // Show success
      showNotification(`Welcome, ${name}! Account created! 🎉`, 'success');
      
      console.log('✅ Sign up successful');
    };

    // SIGN OUT
    window.signOut = function() {
      console.log('👋 Signing out...');
      
      if (window.currentUser) {
        showNotification(`Goodbye, ${window.currentUser.name}! 👋`, 'info');
      }
      
      window.currentUser = null;
      localStorage.removeItem('visualVibeUser');
      
      updateAuthUI();
    };

    // UPDATE UI
    function updateAuthUI() {
      console.log('🎨 Updating UI...');
      
      try {
        // Desktop elements
        const signedOutState = document.getElementById('signedOutState');
        const signedInState = document.getElementById('signedInState');
        const userName = document.getElementById('userName');
        
        // Mobile elements  
        const mobileSignedOutState = document.getElementById('mobileSignedOutState');
        const mobileSignedInState = document.getElementById('mobileSignedInState');
        
        if (window.currentUser) {
          // Show signed-in state
          if (signedOutState) {
            signedOutState.style.display = 'none';
            signedOutState.classList.add('hidden');
          }
          if (signedInState) {
            signedInState.style.display = 'flex';
            signedInState.classList.remove('hidden');
          }
          if (mobileSignedOutState) {
            mobileSignedOutState.style.display = 'none';
            mobileSignedOutState.classList.add('hidden');
          }
          if (mobileSignedInState) {
            mobileSignedInState.style.display = 'block';
            mobileSignedInState.classList.remove('hidden');
          }
          if (userName) {
            userName.textContent = window.currentUser.name;
          }
          
          console.log('✅ UI updated to signed-in state');
        } else {
          // Show signed-out state
          if (signedOutState) {
            signedOutState.style.display = 'flex';
            signedOutState.classList.remove('hidden');
          }
          if (signedInState) {
            signedInState.style.display = 'none';
            signedInState.classList.add('hidden');
          }
          if (mobileSignedOutState) {
            mobileSignedOutState.style.display = 'block';
            mobileSignedOutState.classList.remove('hidden');
          }
          if (mobileSignedInState) {
            mobileSignedInState.style.display = 'none';
            mobileSignedInState.classList.add('hidden');
          }
          
          console.log('✅ UI updated to signed-out state');
        }
      } catch (error) {
        console.error('❌ Error updating UI:', error);
      }
    }

    // NOTIFICATION
    function showNotification(message, type = 'info') {
      // Remove existing notifications
      const existing = document.querySelectorAll('.auth-notification');
      existing.forEach(n => n.remove());
      
      const notification = document.createElement('div');
      notification.className = 'auth-notification fixed top-4 right-4 z-[9999] px-6 py-3 rounded-lg shadow-lg text-white font-bold transform transition-all duration-300 translate-x-full';
      notification.style.backgroundColor = type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6';
      notification.textContent = message;
      
      document.body.appendChild(notification);
      
      setTimeout(() => notification.style.transform = 'translateX(0)', 100);
      setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
      }, 3000);
    }

    // PLACEHOLDER FUNCTIONS
    window.openProfileModal = function() {
      alert('Edit Profile functionality is available. Please contact support for profile changes.');
    };

    window.showOrderHistory = function() {
      alert('My Orders functionality is available. Please contact support for order inquiries.');
    };

    // RESTORE SESSION
    function restoreSession() {
      try {
        const savedUser = localStorage.getItem('visualVibeUser');
        if (savedUser && !window.currentUser) {
          window.currentUser = JSON.parse(savedUser);
          console.log('🔄 Session restored for:', window.currentUser.name);
        }
      } catch (error) {
        console.error('❌ Error restoring session:', error);
        localStorage.removeItem('visualVibeUser');
      }
    }

    // MAKE FUNCTIONS GLOBAL
    window.updateAuthUI = updateAuthUI;

    // INITIALIZE
    restoreSession();
    updateAuthUI();
    
    console.log('✅ Simple Auth System initialized successfully!');
  }

})();
