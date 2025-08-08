// WORKING AUTH FIX - DEFINITIVE SOLUTION FOR SIGN IN/SIGN UP
console.log('🔧 Loading Working Auth Fix - Definitive Solution...');

(function() {
  'use strict';

  // Prevent multiple executions
  if (window.workingAuthFixLoaded) {
    console.log('✅ Working Auth Fix already loaded');
    return;
  }
  window.workingAuthFixLoaded = true;

  console.log('🚀 Applying Working Auth Fix...');

  // Clear any existing broken functions
  const functionsToOverride = [
    'openSignInModal', 'openSignUpModal', 'closeSignInModal', 'closeSignUpModal',
    'switchToSignIn', 'switchToSignUp', 'handleSignIn', 'handleSignUp'
  ];

  functionsToOverride.forEach(funcName => {
    if (window[funcName]) {
      delete window[funcName];
    }
  });

  // WORKING SIGN IN MODAL
  window.openSignInModal = function() {
    console.log('🔑 WORKING: Opening sign in modal...');
    
    try {
      // Remove any existing modal first
      let existingModal = document.getElementById('signInModal');
      if (existingModal) {
        existingModal.remove();
      }

      // Create fresh modal
      const modal = document.createElement('div');
      modal.id = 'signInModal';
      modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999] p-4';
      modal.style.display = 'flex';
      modal.innerHTML = `
        <div class="bg-white rounded-xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-2xl font-bold text-gray-800">Sign In</h3>
            <button id="closeSignInBtn" class="text-gray-500 hover:text-gray-700 text-3xl font-bold">&times;</button>
          </div>

          <form id="signInForm" class="space-y-6">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input type="email" id="signInEmail" required 
                     class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
                     placeholder="Enter your email address">
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input type="password" id="signInPassword" required 
                     class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
                     placeholder="Enter your password">
            </div>

            <button type="submit" 
                    class="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg">
              Sign In
            </button>
          </form>

          <div class="mt-6 text-center">
            <p class="text-gray-600">Don't have an account?</p>
            <button id="switchToSignUpBtn" class="text-indigo-600 hover:text-indigo-800 font-semibold mt-1">
              Create Account
            </button>
          </div>
        </div>
      `;

      document.body.appendChild(modal);
      document.body.style.overflow = 'hidden';

      // Add event listeners
      document.getElementById('closeSignInBtn').onclick = closeSignInModal;
      document.getElementById('switchToSignUpBtn').onclick = switchToSignUp;
      document.getElementById('signInForm').onsubmit = function(e) {
        e.preventDefault();
        handleSignIn(e);
        return false;
      };

      // Focus on email input
      setTimeout(() => {
        const emailInput = document.getElementById('signInEmail');
        if (emailInput) emailInput.focus();
      }, 100);

      console.log('✅ WORKING: Sign in modal opened successfully');
      return true;
    } catch (error) {
      console.error('❌ WORKING: Error opening sign in modal:', error);
      alert('Error opening sign in form. Please try again.');
      return false;
    }
  };

  // WORKING SIGN UP MODAL
  window.openSignUpModal = function() {
    console.log('📝 WORKING: Opening sign up modal...');
    
    try {
      // Remove any existing modal first
      let existingModal = document.getElementById('signUpModal');
      if (existingModal) {
        existingModal.remove();
      }

      // Create fresh modal
      const modal = document.createElement('div');
      modal.id = 'signUpModal';
      modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999] p-4';
      modal.style.display = 'flex';
      modal.innerHTML = `
        <div class="bg-white rounded-xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-2xl font-bold text-gray-800">Create Account</h3>
            <button id="closeSignUpBtn" class="text-gray-500 hover:text-gray-700 text-3xl font-bold">&times;</button>
          </div>

          <form id="signUpForm" class="space-y-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input type="text" id="signUpName" required 
                     class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
                     placeholder="Enter your full name">
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input type="email" id="signUpEmail" required 
                     class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
                     placeholder="Enter your email address">
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input type="password" id="signUpPassword" required minlength="6"
                     class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
                     placeholder="Create a password (min 6 characters)">
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
              <input type="password" id="signUpConfirmPassword" required 
                     class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
                     placeholder="Confirm your password">
            </div>

            <button type="submit" 
                    class="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg">
              Create Account
            </button>
          </form>

          <div class="mt-6 text-center">
            <p class="text-gray-600">Already have an account?</p>
            <button id="switchToSignInBtn" class="text-indigo-600 hover:text-indigo-800 font-semibold mt-1">
              Sign In
            </button>
          </div>
        </div>
      `;

      document.body.appendChild(modal);
      document.body.style.overflow = 'hidden';

      // Add event listeners
      document.getElementById('closeSignUpBtn').onclick = closeSignUpModal;
      document.getElementById('switchToSignInBtn').onclick = switchToSignIn;
      document.getElementById('signUpForm').onsubmit = function(e) {
        e.preventDefault();
        handleSignUp(e);
        return false;
      };

      // Focus on name input
      setTimeout(() => {
        const nameInput = document.getElementById('signUpName');
        if (nameInput) nameInput.focus();
      }, 100);

      console.log('✅ WORKING: Sign up modal opened successfully');
      return true;
    } catch (error) {
      console.error('❌ WORKING: Error opening sign up modal:', error);
      alert('Error opening sign up form. Please try again.');
      return false;
    }
  };

  // WORKING CLOSE FUNCTIONS
  window.closeSignInModal = function() {
    console.log('🔑 WORKING: Closing sign in modal...');
    const modal = document.getElementById('signInModal');
    if (modal) {
      modal.remove();
    }
    document.body.style.overflow = '';
  };

  window.closeSignUpModal = function() {
    console.log('📝 WORKING: Closing sign up modal...');
    const modal = document.getElementById('signUpModal');
    if (modal) {
      modal.remove();
    }
    document.body.style.overflow = '';
  };

  // WORKING SWITCH FUNCTIONS
  window.switchToSignUp = function() {
    console.log('🔄 WORKING: Switching to sign up...');
    closeSignInModal();
    setTimeout(openSignUpModal, 200);
  };

  window.switchToSignIn = function() {
    console.log('🔄 WORKING: Switching to sign in...');
    closeSignUpModal();
    setTimeout(openSignInModal, 200);
  };

  // WORKING SIGN IN HANDLER
  window.handleSignIn = function(e) {
    console.log('🔑 WORKING: Processing sign in...');
    if (e) e.preventDefault();

    try {
      const emailInput = document.getElementById('signInEmail');
      const passwordInput = document.getElementById('signInPassword');

      if (!emailInput || !passwordInput) {
        alert('❌ Sign in form not found. Please try again.');
        return;
      }

      const email = emailInput.value.trim().toLowerCase();
      const password = passwordInput.value.trim();

      console.log(`🔍 Attempting sign in for: ${email}`);

      // Validation
      if (!email) {
        alert('Please enter your email address.');
        emailInput.focus();
        return;
      }

      if (!password) {
        alert('Please enter your password.');
        passwordInput.focus();
        return;
      }

      if (!email.includes('@') || !email.includes('.')) {
        alert('Please enter a valid email address.');
        emailInput.focus();
        return;
      }

      // Get users from storage
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      console.log(`📊 Checking against ${users.length} registered users`);

      // Find user
      const user = users.find(u => u.email && u.email.toLowerCase() === email && u.password === password);
      const existingUser = users.find(u => u.email && u.email.toLowerCase() === email);

      if (user) {
        // Successful sign in
        console.log('✅ WORKING: Sign in successful for:', user.name);

        const now = new Date().toISOString();
        window.currentUser = {
          id: user.id,
          name: user.name,
          firstName: user.firstName || user.name.split(' ')[0] || '',
          lastName: user.lastName || user.name.split(' ').slice(1).join(' ') || '',
          email: user.email,
          phone: user.phone || '',
          companyName: user.companyName || '',
          orders: user.orders || [],
          reviews: user.reviews || [],
          lastActivity: now,
          loginTime: now
        };

        // Save session
        localStorage.setItem('visualVibeUser', JSON.stringify(window.currentUser));

        // Update user's last login
        user.lastLogin = now;
        localStorage.setItem('visualVibeUsers', JSON.stringify(users));

        // Close modal
        closeSignInModal();

        // Update UI if function exists
        if (typeof window.updateAuthUI === 'function') {
          window.updateAuthUI();
        }

        // Show success message
        showSuccessNotification(`Welcome back, ${user.name}! 🎉`);

        console.log('✅ WORKING: Sign in process completed successfully');

      } else if (existingUser) {
        // Wrong password
        console.log('❌ WORKING: Incorrect password for existing user');
        alert('❌ Incorrect password. Please try again.');
        passwordInput.value = '';
        passwordInput.focus();

      } else {
        // No account found
        console.log('❌ WORKING: No account found for email:', email);
        const createAccount = confirm(`No account found for ${email}.\n\nWould you like to create a new account?`);
        
        if (createAccount) {
          closeSignInModal();
          setTimeout(() => {
            openSignUpModal();
            // Pre-fill email in sign up form
            setTimeout(() => {
              const signUpEmailInput = document.getElementById('signUpEmail');
              if (signUpEmailInput) {
                signUpEmailInput.value = email;
                const signUpNameInput = document.getElementById('signUpName');
                if (signUpNameInput) signUpNameInput.focus();
              }
            }, 100);
          }, 200);
        }
      }

    } catch (error) {
      console.error('❌ WORKING: Error in sign in process:', error);
      alert('❌ Sign in error. Please try again.');
    }
  };

  // WORKING SIGN UP HANDLER
  window.handleSignUp = function(e) {
    console.log('📝 WORKING: Processing sign up...');
    if (e) e.preventDefault();

    try {
      const nameInput = document.getElementById('signUpName');
      const emailInput = document.getElementById('signUpEmail');
      const passwordInput = document.getElementById('signUpPassword');
      const confirmPasswordInput = document.getElementById('signUpConfirmPassword');

      if (!nameInput || !emailInput || !passwordInput || !confirmPasswordInput) {
        alert('❌ Sign up form not found. Please try again.');
        return;
      }

      const name = nameInput.value.trim();
      const email = emailInput.value.trim().toLowerCase();
      const password = passwordInput.value.trim();
      const confirmPassword = confirmPasswordInput.value.trim();

      console.log(`🔍 Attempting sign up for: ${name} (${email})`);

      // Validation
      if (!name) {
        alert('Please enter your full name.');
        nameInput.focus();
        return;
      }

      if (!email) {
        alert('Please enter your email address.');
        emailInput.focus();
        return;
      }

      if (!email.includes('@') || !email.includes('.')) {
        alert('Please enter a valid email address.');
        emailInput.focus();
        return;
      }

      if (!password) {
        alert('Please enter a password.');
        passwordInput.focus();
        return;
      }

      if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        passwordInput.focus();
        return;
      }

      if (!confirmPassword) {
        alert('Please confirm your password.');
        confirmPasswordInput.focus();
        return;
      }

      if (password !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        confirmPasswordInput.value = '';
        confirmPasswordInput.focus();
        return;
      }

      // Check if email already exists
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      console.log(`📊 Checking against ${users.length} existing users`);

      const existingUser = users.find(u => u.email && u.email.toLowerCase() === email);
      if (existingUser) {
        console.log('❌ WORKING: Email already exists');
        const signInInstead = confirm(`An account already exists with ${email}.\n\nWould you like to sign in instead?`);
        
        if (signInInstead) {
          closeSignUpModal();
          setTimeout(() => {
            openSignInModal();
            setTimeout(() => {
              const signInEmailInput = document.getElementById('signInEmail');
              if (signInEmailInput) {
                signInEmailInput.value = email;
                const signInPasswordInput = document.getElementById('signInPassword');
                if (signInPasswordInput) signInPasswordInput.focus();
              }
            }, 100);
          }, 200);
        }
        return;
      }

      // Create new user
      const nameParts = name.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      const newUser = {
        id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
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
        lastLogin: new Date().toISOString()
      };

      // Save to storage
      users.push(newUser);
      localStorage.setItem('visualVibeUsers', JSON.stringify(users));

      console.log('✅ WORKING: New user created successfully:', newUser.name);

      // Sign in the new user
      const now = new Date().toISOString();
      window.currentUser = {
        id: newUser.id,
        name: newUser.name,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        phone: newUser.phone,
        companyName: newUser.companyName,
        orders: newUser.orders,
        reviews: newUser.reviews,
        lastActivity: now,
        loginTime: now
      };

      // Save session
      localStorage.setItem('visualVibeUser', JSON.stringify(window.currentUser));

      // Close modal
      closeSignUpModal();

      // Update UI if function exists
      if (typeof window.updateAuthUI === 'function') {
        window.updateAuthUI();
      }

      // Show success message
      showSuccessNotification(`Welcome to Visual Vibe Studio, ${name}! 🎉`);

      console.log('✅ WORKING: Sign up process completed successfully');

    } catch (error) {
      console.error('❌ WORKING: Error in sign up process:', error);
      alert('❌ Sign up error. Please try again.');
    }
  };

  // SUCCESS NOTIFICATION FUNCTION
  function showSuccessNotification(message) {
    // Remove any existing notifications
    const existingNotifications = document.querySelectorAll('.success-notification');
    existingNotifications.forEach(n => n.remove());

    // Create notification
    const notification = document.createElement('div');
    notification.className = 'success-notification fixed top-4 right-4 z-[99999] px-6 py-4 rounded-lg shadow-xl text-white font-semibold bg-green-500 transform transition-all duration-300 translate-x-full';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out after 4 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }, 4000);
  }

  // FIX ALL BUTTONS ON PAGE
  function fixButtonsOnPage() {
    console.log('🔧 WORKING: Fixing all sign in/sign up buttons on page...');

    const signInButtons = document.querySelectorAll('button[onclick*="openSignInModal"], a[onclick*="openSignInModal"]');
    const signUpButtons = document.querySelectorAll('button[onclick*="openSignUpModal"], a[onclick*="openSignUpModal"]');
    
    console.log(`🔍 Found ${signInButtons.length} sign in buttons and ${signUpButtons.length} sign up buttons`);

    signInButtons.forEach((btn, index) => {
      console.log(`🔧 Fixing sign in button ${index + 1}: "${btn.textContent.trim()}"`);
      
      // Remove old onclick
      btn.removeAttribute('onclick');
      
      // Add new click handler
      btn.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log(`🖱️ Sign in button ${index + 1} clicked`);
        openSignInModal();
        return false;
      };
    });

    signUpButtons.forEach((btn, index) => {
      console.log(`🔧 Fixing sign up button ${index + 1}: "${btn.textContent.trim()}"`);
      
      // Remove old onclick
      btn.removeAttribute('onclick');
      
      // Add new click handler
      btn.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log(`🖱️ Sign up button ${index + 1} clicked`);
        openSignUpModal();
        return false;
      };
    });

    console.log(`✅ WORKING: Fixed ${signInButtons.length + signUpButtons.length} buttons total`);
  }

  // Apply fixes immediately
  fixButtonsOnPage();

  // Re-fix buttons periodically in case DOM changes
  setInterval(fixButtonsOnPage, 3000);

  // Restore user session if exists
  try {
    const savedUser = localStorage.getItem('visualVibeUser');
    if (savedUser && !window.currentUser) {
      window.currentUser = JSON.parse(savedUser);
      console.log('🔄 WORKING: Restored user session for:', window.currentUser.name);
      
      // Update UI if function exists
      if (typeof window.updateAuthUI === 'function') {
        setTimeout(window.updateAuthUI, 500);
      }
    }
  } catch (error) {
    console.error('❌ Error restoring user session:', error);
  }

  console.log('✅ WORKING AUTH FIX LOADED - Sign in/sign up should work perfectly now!');

})();
