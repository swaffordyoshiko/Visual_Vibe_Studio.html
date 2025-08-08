// ==========================================
// FORCE BUTTONS VISIBLE - Emergency Fix
// Forces sign in/up buttons to be visible and working
// ==========================================

(function() {
    'use strict';
    
    console.log('🚨 EMERGENCY: Forcing sign in/up buttons to be visible and working...');

    // Force buttons to be visible immediately
    function forceButtonsVisible() {
        const signedOutState = document.getElementById('signedOutState');
        const mobileSignedOutState = document.getElementById('mobileSignedOutState');
        const signedInState = document.getElementById('signedInState');
        const mobileSignedInState = document.getElementById('mobileSignedInState');

        // Force signed out state to be visible
        if (signedOutState) {
            signedOutState.style.display = 'flex !important';
            signedOutState.style.visibility = 'visible !important';
            signedOutState.classList.remove('hidden');
            console.log('✅ Desktop signed out state forced visible');
        }

        if (mobileSignedOutState) {
            mobileSignedOutState.style.display = 'block !important';
            mobileSignedOutState.style.visibility = 'visible !important';
            mobileSignedOutState.classList.remove('hidden');
            console.log('✅ Mobile signed out state forced visible');
        }

        // Hide signed in state until user actually signs in
        if (signedInState) {
            signedInState.style.display = 'none';
            signedInState.classList.add('hidden');
        }

        if (mobileSignedInState) {
            mobileSignedInState.style.display = 'none';
            mobileSignedInState.classList.add('hidden');
        }
    }

    // Create working modal functions
    window.openSignInModal = function() {
        console.log('🔑 EMERGENCY: Opening sign in modal...');
        const modal = document.getElementById('signInModal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.style.display = 'flex';
            modal.style.zIndex = '99999';
            
            // Clear and focus
            const emailInput = document.getElementById('signInEmail');
            const passwordInput = document.getElementById('signInPassword');
            if (emailInput) {
                emailInput.value = '';
                setTimeout(() => emailInput.focus(), 100);
            }
            if (passwordInput) passwordInput.value = '';
        } else {
            alert('Sign in modal not found. Please refresh the page.');
        }
    };

    window.openSignUpModal = function() {
        console.log('📝 EMERGENCY: Opening sign up modal...');
        const modal = document.getElementById('signUpModal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.style.display = 'flex';
            modal.style.zIndex = '99999';
            
            // Clear and focus
            const nameInput = document.getElementById('signUpName');
            const emailInput = document.getElementById('signUpEmail');
            const passwordInput = document.getElementById('signUpPassword');
            const confirmInput = document.getElementById('signUpConfirmPassword');
            
            if (nameInput) {
                nameInput.value = '';
                setTimeout(() => nameInput.focus(), 100);
            }
            if (emailInput) emailInput.value = '';
            if (passwordInput) passwordInput.value = '';
            if (confirmInput) confirmInput.value = '';
        } else {
            alert('Sign up modal not found. Please refresh the page.');
        }
    };

    window.closeSignInModal = function() {
        const modal = document.getElementById('signInModal');
        if (modal) {
            modal.classList.add('hidden');
            modal.style.display = 'none';
        }
    };

    window.closeSignUpModal = function() {
        const modal = document.getElementById('signUpModal');
        if (modal) {
            modal.classList.add('hidden');
            modal.style.display = 'none';
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

    // Simple authentication handlers
    window.handleSignIn = function(e) {
        if (e) e.preventDefault();
        
        const email = document.getElementById('signInEmail')?.value?.trim();
        const password = document.getElementById('signInPassword')?.value?.trim();
        
        if (!email || !password) {
            alert('Please enter both email and password');
            return false;
        }
        
        // Check for existing user
        const userData = localStorage.getItem('vvs_user_' + email);
        if (!userData) {
            alert('No account found with this email. Please sign up first.');
            return false;
        }
        
        const user = JSON.parse(userData);
        if (user.password !== password) {
            alert('Incorrect password');
            return false;
        }
        
        // Success
        localStorage.setItem('vvs_user', userData);
        window.closeSignInModal();
        updateAuthUI(user);
        alert(`Welcome back, ${user.name}!`);
        return false;
    };

    window.handleSignUp = function(e) {
        if (e) e.preventDefault();
        
        const name = document.getElementById('signUpName')?.value?.trim();
        const email = document.getElementById('signUpEmail')?.value?.trim();
        const password = document.getElementById('signUpPassword')?.value?.trim();
        const confirm = document.getElementById('signUpConfirmPassword')?.value?.trim();
        
        if (!name || !email || !password || !confirm) {
            alert('Please fill in all fields');
            return false;
        }
        
        if (password.length < 6) {
            alert('Password must be at least 6 characters');
            return false;
        }
        
        if (password !== confirm) {
            alert('Passwords do not match');
            return false;
        }
        
        // Check if user exists
        if (localStorage.getItem('vvs_user_' + email)) {
            alert('Account already exists with this email. Please sign in instead.');
            return false;
        }
        
        // Create user
        const userData = {
            name: name,
            email: email,
            password: password,
            createdAt: new Date().toISOString()
        };
        
        localStorage.setItem('vvs_user_' + email, JSON.stringify(userData));
        localStorage.setItem('vvs_user', JSON.stringify(userData));
        window.closeSignUpModal();
        updateAuthUI(userData);
        alert(`Welcome to Visual Vibe Studio, ${name}!`);
        return false;
    };

    window.signOut = function() {
        localStorage.removeItem('vvs_user');
        updateAuthUI(null);
        alert('You have been signed out');
    };

    function updateAuthUI(user) {
        const signedOutState = document.getElementById('signedOutState');
        const signedInState = document.getElementById('signedInState');
        const mobileSignedOutState = document.getElementById('mobileSignedOutState');
        const mobileSignedInState = document.getElementById('mobileSignedInState');

        if (user) {
            // User is signed in
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
        } else {
            // User is signed out - force buttons visible
            forceButtonsVisible();
        }
    }

    // Fix button onclick handlers
    function fixButtons() {
        // Find all sign in buttons
        const signInButtons = document.querySelectorAll('button[onclick*="openSignInModal"], button:contains("Sign In")');
        signInButtons.forEach((btn, i) => {
            btn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                window.openSignInModal();
            };
            console.log(`✅ Fixed sign in button ${i + 1}`);
        });

        // Find all sign up buttons
        const signUpButtons = document.querySelectorAll('button[onclick*="openSignUpModal"], button:contains("Sign Up")');
        signUpButtons.forEach((btn, i) => {
            btn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                window.openSignUpModal();
            };
            console.log(`✅ Fixed sign up button ${i + 1}`);
        });

        // Attach form handlers
        const signInForm = document.getElementById('signInForm');
        const signUpForm = document.getElementById('signUpForm');
        
        if (signInForm) {
            signInForm.onsubmit = window.handleSignIn;
            console.log('✅ Sign in form handler attached');
        }
        
        if (signUpForm) {
            signUpForm.onsubmit = window.handleSignUp;
            console.log('✅ Sign up form handler attached');
        }
    }

    // Initialize
    function initialize() {
        // Force buttons visible first
        forceButtonsVisible();
        
        // Fix button handlers
        fixButtons();
        
        // Check for existing user
        const userData = localStorage.getItem('vvs_user');
        if (userData) {
            try {
                const user = JSON.parse(userData);
                updateAuthUI(user);
            } catch (e) {
                updateAuthUI(null);
            }
        }
        
        // Continuously force buttons visible (in case other scripts hide them)
        setInterval(function() {
            const signedOutState = document.getElementById('signedOutState');
            const currentUser = localStorage.getItem('vvs_user');
            
            if (!currentUser && signedOutState) {
                const isHidden = signedOutState.style.display === 'none' || 
                               signedOutState.classList.contains('hidden');
                if (isHidden) {
                    console.log('🔄 Re-forcing buttons visible');
                    forceButtonsVisible();
                }
            }
        }, 2000);
        
        console.log('✅ EMERGENCY auth fix initialized');
    }

    // Run immediately and after DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
    
    // Also run after a delay to override other scripts
    setTimeout(initialize, 1000);
    setTimeout(initialize, 3000);

})();
