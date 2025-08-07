// QUICK FIX - Sign In Button Not Working
console.log('🔧 Fixing sign in button...');

(function() {
  'use strict';
  
  function fixSignInButton() {
    console.log('🔧 Applying sign in button fix...');
    
    // Override openSignInModal with a working version
    window.openSignInModal = function() {
      console.log('🔑 Opening sign in modal...');
      
      try {
        // Find or create the modal
        let modal = document.getElementById('signInModal');
        
        if (!modal) {
          console.log('Creating sign in modal...');
          createSignInModal();
          modal = document.getElementById('signInModal');
        }
        
        if (modal) {
          // Show the modal
          modal.classList.remove('hidden');
          modal.style.display = 'flex';
          document.body.style.overflow = 'hidden';
          
          // Focus the email input
          setTimeout(() => {
            const emailInput = document.getElementById('signInEmail');
            if (emailInput) {
              emailInput.focus();
            }
          }, 100);
          
          console.log('✅ Sign in modal opened');
        } else {
          console.error('❌ Could not create or find sign in modal');
          // Fallback: create a simple prompt
          const email = prompt('Enter your email:');
          const password = prompt('Enter your password:');
          
          if (email && password) {
            attemptSignIn(email, password);
          }
        }
        
      } catch (error) {
        console.error('❌ Error opening sign in modal:', error);
        alert('Error opening sign in. Please refresh the page and try again.');
      }
    };
    
    // Create sign in modal if it doesn't exist
    function createSignInModal() {
      const modal = document.createElement('div');
      modal.id = 'signInModal';
      modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
      modal.style.display = 'none';
      
      modal.innerHTML = `
        <div class="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
          <!-- Header -->
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-2xl font-bold text-gray-800">Sign In</h3>
            <button onclick="closeSignInModal()" class="text-gray-500 hover:text-gray-700 p-2">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <!-- Form -->
          <form id="signInForm" onsubmit="handleSignIn(event)">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" id="signInEmail" required 
                       class="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                       placeholder="your@email.com">
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input type="password" id="signInPassword" required 
                       class="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                       placeholder="Enter your password">
              </div>
              
              <button type="submit" 
                      class="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                Sign In
              </button>
            </div>
          </form>
          
          <p class="text-center text-sm text-gray-600 mt-4">
            Don't have an account?
            <button onclick="switchToSignUp()" class="text-indigo-600 hover:text-indigo-800 font-medium">Sign up</button>
          </p>
        </div>
      `;
      
      // Add click outside to close
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          closeSignInModal();
        }
      });
      
      document.body.appendChild(modal);
      console.log('✅ Sign in modal created');
    }
    
    // Close sign in modal
    window.closeSignInModal = function() {
      console.log('❌ Closing sign in modal...');
      
      const modal = document.getElementById('signInModal');
      if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
    };
    
    // Handle sign in form submission
    window.handleSignIn = function(event) {
      console.log('🔑 Processing sign in...');
      event.preventDefault();
      
      const email = document.getElementById('signInEmail').value.trim();
      const password = document.getElementById('signInPassword').value;
      
      if (!email || !password) {
        alert('Please enter both email and password.');
        return;
      }
      
      attemptSignIn(email, password);
    };
    
    // Attempt to sign in user
    function attemptSignIn(email, password) {
      try {
        console.log(`🔍 Attempting sign in for: ${email}`);
        
        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
        console.log(`Found ${users.length} registered users`);
        
        // Find user with case-insensitive email matching
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        
        if (!user) {
          alert('No account found with this email. Please check your email or sign up first.');
          return;
        }
        
        if (user.password !== password) {
          alert('Incorrect password. Please try again.');
          return;
        }
        
        console.log('✅ Authentication successful for:', user.name);
        
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
        if (window.closeSignInModal) {
          window.closeSignInModal();
        }
        
        // Update UI
        updateAuthUIQuick();
        
        // Show success
        alert(`Welcome back, ${user.name}!`);
        
        console.log('✅ Sign in completed successfully');
        
      } catch (error) {
        console.error('❌ Error during sign in:', error);
        alert('Sign in error. Please try again.');
      }
    }
    
    // Quick auth UI update
    function updateAuthUIQuick() {
      console.log('🎨 Updating auth UI...');
      
      try {
        // Hide signed out state
        const signedOutState = document.getElementById('signedOutState');
        const mobileSignedOutState = document.getElementById('mobileSignedOutState');
        
        if (signedOutState) {
          signedOutState.style.display = 'none';
        }
        if (mobileSignedOutState) {
          mobileSignedOutState.style.display = 'none';
        }
        
        // Show signed in state
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
        
        console.log('✅ Auth UI updated');
        
      } catch (error) {
        console.error('❌ Error updating auth UI:', error);
      }
    }
    
    // Switch to sign up modal
    window.switchToSignUp = function() {
      console.log('🔄 Switching to sign up...');
      
      // Close sign in modal
      if (window.closeSignInModal) {
        window.closeSignInModal();
      }
      
      // Open sign up modal after a delay
      setTimeout(() => {
        if (window.openSignUpModal) {
          window.openSignUpModal();
        } else {
          alert('Sign up functionality not available. Please refresh the page.');
        }
      }, 100);
    };
    
    // Fix all sign in buttons on the page
    const signInButtons = document.querySelectorAll('button[onclick*="openSignInModal"]');
    signInButtons.forEach(button => {
      button.onclick = function(e) {
        e.preventDefault();
        window.openSignInModal();
      };
      console.log('✅ Fixed sign in button');
    });
    
    console.log('✅ Sign in button fix applied');
  }
  
  // Apply fix immediately
  fixSignInButton();
  
  // Also apply when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixSignInButton);
  }
  
  // Apply with delay to override other scripts
  setTimeout(fixSignInButton, 1000);
  
})();

console.log('🔧 Sign in button fix loaded - buttons should now work!');
