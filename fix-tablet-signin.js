// Fix Sign In Button for Tablet View
console.log('📱 Fixing sign in button for tablet view...');

(function() {
  'use strict';
  
  function fixTabletSignIn() {
    console.log('🔧 Applying tablet sign in fix...');
    
    // Detect if we're on a tablet
    function isTablet() {
      const userAgent = navigator.userAgent.toLowerCase();
      const isTabletUA = /ipad|android(?!.*mobile)|tablet|kindle|playbook|silk/.test(userAgent);
      const isTabletSize = window.innerWidth >= 768 && window.innerWidth <= 1024;
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      return isTabletUA || (isTabletSize && isTouchDevice);
    }
    
    // Enhanced sign in modal opener for tablets
    window.openSignInModal = function() {
      console.log('🔑 [TABLET FIX] Opening sign in modal...');
      
      try {
        // Remove any existing modal first
        const existingModal = document.getElementById('signInModal');
        if (existingModal) {
          existingModal.remove();
          console.log('🗑️ Removed existing modal');
        }
        
        // Create enhanced tablet-friendly modal
        createTabletFriendlySignInModal();
        
        // Show the modal
        const modal = document.getElementById('signInModal');
        if (modal) {
          modal.classList.remove('hidden');
          modal.style.display = 'flex';
          document.body.style.overflow = 'hidden';
          
          // Tablet-specific focus handling
          setTimeout(() => {
            const emailInput = document.getElementById('signInEmail');
            if (emailInput && !isTablet()) {
              // Only auto-focus on non-tablets to avoid virtual keyboard issues
              emailInput.focus();
            }
          }, 300);
          
          console.log('✅ [TABLET FIX] Sign in modal opened');
        }
        
      } catch (error) {
        console.error('❌ Error opening sign in modal:', error);
        // Fallback for tablets
        fallbackTabletSignIn();
      }
    };
    
    // Create tablet-optimized sign in modal
    function createTabletFriendlySignInModal() {
      const modal = document.createElement('div');
      modal.id = 'signInModal';
      modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
      modal.style.display = 'none';
      
      // Tablet-optimized sizing and touch targets
      modal.innerHTML = `
        <div class="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl relative" style="max-height: 90vh; overflow-y: auto;">
          <!-- Header -->
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-2xl font-bold text-gray-800">Sign In</h3>
            <button id="closeSignInBtn" class="text-gray-500 hover:text-gray-700 p-3 -m-3 rounded-lg" 
                    style="min-height: 48px; min-width: 48px; touch-action: manipulation;">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <!-- Form -->
          <form id="signInForm">
            <div class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input type="email" id="signInEmail" required 
                       class="w-full border border-gray-300 p-4 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg" 
                       placeholder="your@email.com"
                       style="min-height: 48px; touch-action: manipulation;">
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input type="password" id="signInPassword" required 
                       class="w-full border border-gray-300 p-4 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg" 
                       placeholder="Enter your password"
                       style="min-height: 48px; touch-action: manipulation;">
              </div>
              
              <button type="submit" id="signInSubmitBtn"
                      class="w-full bg-indigo-600 text-white py-4 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium text-lg"
                      style="min-height: 56px; touch-action: manipulation;">
                Sign In
              </button>
            </div>
          </form>
          
          <p class="text-center text-sm text-gray-600 mt-6">
            Don't have an account?
            <button id="switchToSignUpBtn" class="text-indigo-600 hover:text-indigo-800 font-medium p-2 -m-2 rounded" 
                    style="min-height: 44px; touch-action: manipulation;">Sign up</button>
          </p>
          
          <!-- Tablet-specific help text -->
          <div class="mt-4 p-3 bg-blue-50 rounded-lg">
            <p class="text-xs text-blue-700">
              💡 Having trouble? Make sure you're using the same email and password you used when creating your account.
            </p>
          </div>
        </div>
      `;
      
      // Enhanced touch event handling for tablets
      setupTabletEventHandlers(modal);
      
      document.body.appendChild(modal);
      console.log('✅ Tablet-friendly sign in modal created');
    }
    
    // Setup tablet-optimized event handlers
    function setupTabletEventHandlers(modal) {
      // Close button
      const closeBtn = modal.querySelector('#closeSignInBtn');
      if (closeBtn) {
        // Use both click and touchend events for tablets
        closeBtn.addEventListener('click', closeSignInModal);
        closeBtn.addEventListener('touchend', function(e) {
          e.preventDefault();
          closeSignInModal();
        });
      }
      
      // Form submission
      const form = modal.querySelector('#signInForm');
      if (form) {
        form.addEventListener('submit', handleTabletSignIn);
      }
      
      // Submit button
      const submitBtn = modal.querySelector('#signInSubmitBtn');
      if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
          e.preventDefault();
          handleTabletSignIn(e);
        });
        submitBtn.addEventListener('touchend', function(e) {
          e.preventDefault();
          handleTabletSignIn(e);
        });
      }
      
      // Switch to sign up
      const switchBtn = modal.querySelector('#switchToSignUpBtn');
      if (switchBtn) {
        switchBtn.addEventListener('click', function(e) {
          e.preventDefault();
          switchToSignUp();
        });
        switchBtn.addEventListener('touchend', function(e) {
          e.preventDefault();
          switchToSignUp();
        });
      }
      
      // Click outside to close (tablet-friendly)
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          closeSignInModal();
        }
      });
      
      modal.addEventListener('touchend', function(e) {
        if (e.target === modal) {
          e.preventDefault();
          closeSignInModal();
        }
      });
    }
    
    // Tablet-optimized sign in handler
    function handleTabletSignIn(event) {
      console.log('🔑 [TABLET] Processing sign in...');
      if (event) event.preventDefault();
      
      try {
        const emailInput = document.getElementById('signInEmail');
        const passwordInput = document.getElementById('signInPassword');
        const submitBtn = document.getElementById('signInSubmitBtn');
        
        if (!emailInput || !passwordInput) {
          alert('Please fill in all fields.');
          return;
        }
        
        const email = emailInput.value.trim().toLowerCase();
        const password = passwordInput.value;
        
        if (!email || !password) {
          alert('Please enter both email and password.');
          return;
        }
        
        // Show loading state
        if (submitBtn) {
          submitBtn.textContent = 'Signing in...';
          submitBtn.disabled = true;
        }
        
        console.log(`🔍 [TABLET] Attempting sign in for: ${email}`);
        
        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
        console.log(`👥 [TABLET] Found ${users.length} registered users`);
        
        // Find user
        const user = users.find(u => u.email.toLowerCase() === email);
        
        if (!user) {
          alert('No account found with this email. Please check your email or sign up first.');
          resetSubmitButton(submitBtn);
          return;
        }
        
        if (user.password !== password) {
          alert('Incorrect password. Please try again.');
          resetSubmitButton(submitBtn);
          return;
        }
        
        console.log('✅ [TABLET] Authentication successful for:', user.name);
        
        // Set current user
        window.currentUser = {
          id: user.id,
          name: user.name,
          email: user.email,
          firstName: user.firstName || user.name.split(' ')[0],
          lastName: user.lastName || user.name.split(' ').slice(1).join(' '),
          lastActivity: new Date().toISOString()
        };
        
        // Save session
        localStorage.setItem('visualVibeUser', JSON.stringify(window.currentUser));
        
        // Close modal
        closeSignInModal();
        
        // Update UI
        updateTabletAuthUI();
        
        // Show success message
        setTimeout(() => {
          alert(`Welcome back, ${user.name}!`);
        }, 500);
        
        console.log('✅ [TABLET] Sign in completed successfully');
        
      } catch (error) {
        console.error('❌ [TABLET] Error during sign in:', error);
        alert('Sign in error. Please try again.');
        const submitBtn = document.getElementById('signInSubmitBtn');
        resetSubmitButton(submitBtn);
      }
    }
    
    // Reset submit button
    function resetSubmitButton(btn) {
      if (btn) {
        btn.textContent = 'Sign In';
        btn.disabled = false;
      }
    }
    
    // Close sign in modal
    function closeSignInModal() {
      console.log('❌ [TABLET] Closing sign in modal...');
      
      const modal = document.getElementById('signInModal');
      if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
    }
    
    // Switch to sign up
    function switchToSignUp() {
      console.log('🔄 [TABLET] Switching to sign up...');
      
      closeSignInModal();
      
      setTimeout(() => {
        if (window.openSignUpModal) {
          window.openSignUpModal();
        } else {
          alert('Sign up functionality not available. Please refresh the page.');
        }
      }, 300);
    }
    
    // Fallback sign in for tablets
    function fallbackTabletSignIn() {
      console.log('🆘 [TABLET] Using fallback sign in...');
      
      const email = prompt('Enter your email:');
      if (!email) return;
      
      const password = prompt('Enter your password:');
      if (!password) return;
      
      // Process sign in with prompts
      try {
        const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        
        if (!user) {
          alert('No account found with this email.');
          return;
        }
        
        if (user.password !== password) {
          alert('Incorrect password.');
          return;
        }
        
        // Set current user
        window.currentUser = {
          id: user.id,
          name: user.name,
          email: user.email,
          lastActivity: new Date().toISOString()
        };
        
        localStorage.setItem('visualVibeUser', JSON.stringify(window.currentUser));
        updateTabletAuthUI();
        alert(`Welcome back, ${user.name}!`);
        
      } catch (error) {
        console.error('❌ Fallback sign in error:', error);
        alert('Sign in error. Please try again.');
      }
    }
    
    // Update auth UI for tablets
    function updateTabletAuthUI() {
      console.log('🎨 [TABLET] Updating auth UI...');
      
      try {
        // Hide signed out states
        const signedOutState = document.getElementById('signedOutState');
        const mobileSignedOutState = document.getElementById('mobileSignedOutState');
        
        if (signedOutState) {
          signedOutState.style.display = 'none';
        }
        if (mobileSignedOutState) {
          mobileSignedOutState.style.display = 'none';
        }
        
        // Show signed in states
        const signedInState = document.getElementById('signedInState');
        const mobileSignedInState = document.getElementById('mobileSignedInState');
        
        if (signedInState) {
          signedInState.style.display = 'flex';
          signedInState.classList.remove('hidden');
        }
        if (mobileSignedInState) {
          mobileSignedInState.style.display = 'block';
          mobileSignedInState.classList.remove('hidden');
        }
        
        // Update welcome banner
        const welcomeBanner = document.getElementById('welcomeBanner');
        const welcomeMessage = document.getElementById('welcomeMessage');
        
        if (welcomeBanner && window.currentUser) {
          welcomeBanner.style.display = 'block';
          if (welcomeMessage) {
            welcomeMessage.textContent = `Welcome back, ${window.currentUser.name}! 👋`;
          }
        }
        
        console.log('✅ [TABLET] Auth UI updated');
        
      } catch (error) {
        console.error('❌ [TABLET] Error updating auth UI:', error);
      }
    }
    
    // Fix all sign in buttons with tablet-optimized event handlers
    function fixTabletSignInButtons() {
      console.log('🔧 [TABLET] Fixing all sign in buttons...');
      
      // Desktop sign in buttons (used on tablets)
      const desktopSignInBtns = document.querySelectorAll('#signedOutState button[onclick*="openSignInModal"]');
      desktopSignInBtns.forEach(btn => {
        // Remove old handlers
        btn.onclick = null;
        btn.removeAttribute('onclick');
        
        // Add tablet-optimized handlers
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          window.openSignInModal();
        });
        
        btn.addEventListener('touchend', function(e) {
          e.preventDefault();
          e.stopPropagation();
          window.openSignInModal();
        });
        
        // Ensure proper touch styling
        btn.style.touchAction = 'manipulation';
        btn.style.userSelect = 'none';
        
        console.log('✅ [TABLET] Fixed desktop sign in button');
      });
      
      // Mobile sign in buttons (backup)
      const mobileSignInBtns = document.querySelectorAll('#mobileSignedOutState button[onclick*="openSignInModal"]');
      mobileSignInBtns.forEach(btn => {
        btn.onclick = null;
        btn.removeAttribute('onclick');
        
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          window.openSignInModal();
        });
        
        btn.addEventListener('touchend', function(e) {
          e.preventDefault();
          e.stopPropagation();
          window.openSignInModal();
        });
        
        btn.style.touchAction = 'manipulation';
        console.log('✅ [TABLET] Fixed mobile sign in button');
      });
    }
    
    // Apply all tablet fixes
    fixTabletSignInButtons();
    
    // Make functions globally available
    window.closeSignInModal = closeSignInModal;
    window.handleTabletSignIn = handleTabletSignIn;
    
    console.log('✅ [TABLET] All sign in fixes applied');
    
    // Log tablet detection for debugging
    if (isTablet()) {
      console.log('📱 Tablet detected - enhanced touch handlers active');
    }
  }
  
  // Apply fix immediately
  fixTabletSignIn();
  
  // Also apply when DOM changes (for dynamic content)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixTabletSignIn);
  }
  
  // Apply with delay to override other scripts
  setTimeout(fixTabletSignIn, 1000);
  
  // Re-apply when window is resized (orientation changes on tablets)
  window.addEventListener('resize', function() {
    setTimeout(fixTabletSignIn, 500);
  });
  
})();

console.log('📱 Tablet sign in fix loaded - sign in should now work on tablets!');
