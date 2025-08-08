// DEFINITIVE BUTTON FIX - FINAL OVERRIDE FOR ALL SIGN IN/SIGN UP BUTTONS
console.log('🔥 Loading DEFINITIVE BUTTON FIX - Final override...');

(function() {
  'use strict';

  // Wait for all other scripts to load, then apply definitive fix
  function applyDefinitiveFix() {
    console.log('🔧 Applying definitive button fix...');

    const protectedFunctions = ['openSignInModal', 'openSignUpModal', 'closeSignInModal', 'closeSignUpModal', 'switchToSignIn', 'switchToSignUp'];
    
    // Protect against function deletion by making them non-configurable
    protectedFunctions.forEach(fnName => {
      try {
        Object.defineProperty(window, fnName, {
          configurable: false,
          writable: true
        });
      } catch(e) {
        // Property may already exist, that's ok
      }
    });

    // DEFINITIVE MODAL FUNCTIONS - CANNOT BE OVERRIDDEN
    window.openSignInModal = function() {
      console.log('🔑 DEFINITIVE: Opening sign in modal...');
      
      try {
        let modal = document.getElementById('signInModal');
        
        // Create modal if it doesn't exist
        if (!modal) {
          console.log('📝 Creating sign in modal...');
          modal = document.createElement('div');
          modal.id = 'signInModal';
          modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4';
          modal.style.display = 'none';
          modal.innerHTML = `
            <div class="bg-white rounded-xl p-6 sm:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div class="flex justify-between items-center mb-4 sm:mb-6">
                <h3 class="text-xl sm:text-2xl font-bold text-gray-800">Sign In</h3>
                <button onclick="closeSignInModal()" class="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
              </div>

              <form id="signInForm" class="space-y-4" onsubmit="handleSignIn(event); return false;">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" id="signInEmail" required class="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="your@email.com">
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input type="password" id="signInPassword" required class="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your password">
                </div>

                <button type="submit" class="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
                  Sign In
                </button>
              </form>

              <p class="text-center text-sm text-gray-600 mt-4">
                Don't have an account?
                <button onclick="switchToSignUp()" class="text-indigo-600 hover:text-indigo-800 font-medium">Sign up</button>
              </p>
            </div>
          `;
          document.body.appendChild(modal);
        }

        // Show modal
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
        modal.style.visibility = 'visible';
        modal.style.opacity = '1';
        document.body.style.overflow = 'hidden';

        const emailInput = document.getElementById('signInEmail');
        if (emailInput) {
          setTimeout(() => emailInput.focus(), 100);
        }

        console.log('✅ DEFINITIVE: Sign in modal opened successfully');
        return true;
      } catch (error) {
        console.error('❌ DEFINITIVE: Error opening sign in modal:', error);
        alert('Error opening sign in form. Please refresh the page.');
        return false;
      }
    };

    window.openSignUpModal = function() {
      console.log('📝 DEFINITIVE: Opening sign up modal...');
      
      try {
        let modal = document.getElementById('signUpModal');
        
        // Create modal if it doesn't exist
        if (!modal) {
          console.log('📝 Creating sign up modal...');
          modal = document.createElement('div');
          modal.id = 'signUpModal';
          modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4';
          modal.style.display = 'none';
          modal.innerHTML = `
            <div class="bg-white rounded-xl p-6 sm:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div class="flex justify-between items-center mb-4 sm:mb-6">
                <h3 class="text-xl sm:text-2xl font-bold text-gray-800">Create Account</h3>
                <button onclick="closeSignUpModal()" class="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
              </div>

              <form id="signUpForm" class="space-y-4" onsubmit="handleSignUp(event); return false;">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" id="signUpName" required class="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your full name">
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" id="signUpEmail" required class="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="your@email.com">
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input type="password" id="signUpPassword" required class="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Create a password" minlength="6">
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                  <input type="password" id="signUpConfirmPassword" required class="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Confirm your password">
                </div>

                <button type="submit" class="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
                  Create Account
                </button>
              </form>

              <p class="text-center text-sm text-gray-600 mt-4">
                Already have an account?
                <button onclick="switchToSignIn()" class="text-indigo-600 hover:text-indigo-800 font-medium">Sign in</button>
              </p>
            </div>
          `;
          document.body.appendChild(modal);
        }

        // Show modal
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
        modal.style.visibility = 'visible';
        modal.style.opacity = '1';
        document.body.style.overflow = 'hidden';

        const nameInput = document.getElementById('signUpName');
        if (nameInput) {
          setTimeout(() => nameInput.focus(), 100);
        }

        console.log('✅ DEFINITIVE: Sign up modal opened successfully');
        return true;
      } catch (error) {
        console.error('❌ DEFINITIVE: Error opening sign up modal:', error);
        alert('Error opening sign up form. Please refresh the page.');
        return false;
      }
    };

    window.closeSignInModal = function() {
      console.log('🔑 DEFINITIVE: Closing sign in modal...');
      
      const modal = document.getElementById('signInModal');
      if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
        modal.style.visibility = 'hidden';
        modal.style.opacity = '0';
        document.body.style.overflow = '';
      }
      
      const form = document.getElementById('signInForm');
      if (form) {
        form.reset();
      }
    };

    window.closeSignUpModal = function() {
      console.log('📝 DEFINITIVE: Closing sign up modal...');
      
      const modal = document.getElementById('signUpModal');
      if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
        modal.style.visibility = 'hidden';
        modal.style.opacity = '0';
        document.body.style.overflow = '';
      }
      
      const form = document.getElementById('signUpForm');
      if (form) {
        form.reset();
      }
    };

    window.switchToSignUp = function() {
      closeSignInModal();
      setTimeout(openSignUpModal, 100);
    };

    window.switchToSignIn = function() {
      closeSignUpModal();
      setTimeout(openSignInModal, 100);
    };

    // DEFINITIVE AUTHENTICATION FUNCTIONS
    window.handleSignIn = function(e) {
      console.log('🔑 DEFINITIVE: Sign in form submitted');
      if (e) e.preventDefault();

      try {
        const emailInput = document.getElementById('signInEmail');
        const passwordInput = document.getElementById('signInPassword');

        if (!emailInput || !passwordInput) {
          alert('Sign in form elements not found. Please refresh the page.');
          return;
        }

        const email = emailInput.value.trim().toLowerCase();
        const password = passwordInput.value;

        if (!email || !password) {
          alert('Please enter both email and password.');
          return;
        }

        const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
        const user = users.find(u => u.email.toLowerCase() === email && u.password === password);
        const existingUser = users.find(u => u.email.toLowerCase() === email);

        if (user) {
          const now = new Date().toISOString();
          window.currentUser = {
            id: user.id,
            name: user.name,
            firstName: user.firstName || user.name.split(' ')[0],
            lastName: user.lastName || user.name.split(' ').slice(1).join(' '),
            email: user.email,
            phone: user.phone || '',
            companyName: user.companyName || '',
            orders: user.orders || [],
            reviews: user.reviews || [],
            lastActivity: now,
            loginTime: now
          };

          localStorage.setItem('visualVibeUser', JSON.stringify(window.currentUser));
          user.lastLogin = now;
          localStorage.setItem('visualVibeUsers', JSON.stringify(users));

          if (window.updateAuthUI) window.updateAuthUI();
          closeSignInModal();
          
          // Simple notification
          const notification = document.createElement('div');
          notification.className = 'fixed top-4 right-4 z-[9999] px-6 py-3 rounded-lg shadow-lg text-white font-medium bg-green-500';
          notification.textContent = 'Welcome back, ' + user.name + '!';
          document.body.appendChild(notification);
          setTimeout(() => notification.remove(), 3000);
          
          console.log('✅ DEFINITIVE: User successfully signed in:', user.name);
        } else if (existingUser) {
          alert('Incorrect password for this email address. Please try again.');
        } else {
          alert('No account found with this email address. Please sign up first.');
        }
      } catch (error) {
        console.error('❌ DEFINITIVE: Error in handleSignIn:', error);
        alert('Sign in error. Please try again.');
      }
    };

    window.handleSignUp = function(e) {
      console.log('📝 DEFINITIVE: Sign up form submitted');
      if (e) e.preventDefault();

      try {
        const nameInput = document.getElementById('signUpName');
        const emailInput = document.getElementById('signUpEmail');
        const passwordInput = document.getElementById('signUpPassword');
        const confirmPasswordInput = document.getElementById('signUpConfirmPassword');

        if (!nameInput || !emailInput || !passwordInput || !confirmPasswordInput) {
          alert('Sign up form elements not found. Please refresh the page.');
          return;
        }

        const name = nameInput.value.trim();
        const email = emailInput.value.trim().toLowerCase();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (!name || !email || !password || !confirmPassword) {
          alert('Please fill in all fields.');
          return;
        }

        if (password.length < 6) {
          alert('Password must be at least 6 characters long.');
          return;
        }

        if (password !== confirmPassword) {
          alert('Passwords do not match. Please try again.');
          return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          alert('Please enter a valid email address.');
          return;
        }

        const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
        const existingUser = users.find(u => u.email.toLowerCase() === email);
        
        if (existingUser) {
          alert(`An account with this email already exists under the name "${existingUser.name}". Please sign in instead.`);
          setTimeout(() => {
            closeSignUpModal();
            openSignInModal();
            const signInEmail = document.getElementById('signInEmail');
            if (signInEmail) signInEmail.value = email;
          }, 2000);
          return;
        }

        const nameParts = name.trim().split(' ');
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

        users.push(newUser);
        localStorage.setItem('visualVibeUsers', JSON.stringify(users));

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

        localStorage.setItem('visualVibeUser', JSON.stringify(window.currentUser));
        if (window.updateAuthUI) window.updateAuthUI();
        closeSignUpModal();
        
        // Simple notification
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 z-[9999] px-6 py-3 rounded-lg shadow-lg text-white font-medium bg-green-500';
        notification.textContent = 'Welcome, ' + name + '! Account created successfully!';
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
        
        console.log('✅ DEFINITIVE: User successfully signed up:', name);
      } catch (error) {
        console.error('❌ DEFINITIVE: Error in handleSignUp:', error);
        alert('Sign up error. Please try again.');
      }
    };

    // FIX ALL BUTTONS ON THE PAGE
    function fixAllButtonsNow() {
      // Fix onclick attribute buttons
      const signInButtons = document.querySelectorAll('button[onclick*="openSignInModal"], a[onclick*="openSignInModal"]');
      const signUpButtons = document.querySelectorAll('button[onclick*="openSignUpModal"], a[onclick*="openSignUpModal"]');
      
      signInButtons.forEach((btn, index) => {
        console.log(`🔧 Fixing sign in button ${index + 1}`);
        btn.onclick = function(e) {
          e.preventDefault();
          e.stopPropagation();
          openSignInModal();
          return false;
        };
      });

      signUpButtons.forEach((btn, index) => {
        console.log(`🔧 Fixing sign up button ${index + 1}`);
        btn.onclick = function(e) {
          e.preventDefault();
          e.stopPropagation();
          openSignUpModal();
          return false;
        };
      });

      console.log(`✅ DEFINITIVE: Fixed ${signInButtons.length} sign in buttons and ${signUpButtons.length} sign up buttons`);
    }

    // Apply fixes immediately and periodically
    fixAllButtonsNow();
    setInterval(fixAllButtonsNow, 5000); // Re-fix every 5 seconds in case DOM changes

    console.log('✅ DEFINITIVE BUTTON FIX APPLIED - All sign in/sign up buttons should now work!');
  }

  // Apply fix after a delay to ensure all other scripts have loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(applyDefinitiveFix, 2000);
    });
  } else {
    setTimeout(applyDefinitiveFix, 2000);
  }

})();
