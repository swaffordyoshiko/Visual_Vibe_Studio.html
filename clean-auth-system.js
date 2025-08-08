// ==========================================
// CLEAN AUTHENTICATION SYSTEM
// A unified solution for sign in/up functionality
// ==========================================

(function() {
    'use strict';

    console.log('🧹 CLEAN AUTH: Starting clean authentication system...');

    // Clear all conflicting auth functions
    const conflictingFunctions = [
        'handleSignIn', 'handleSignUp', 'openSignInModal', 'openSignUpModal',
        'closeSignInModal', 'closeSignUpModal', 'switchToSignIn', 'switchToSignUp',
        'signOut', 'updateAuthUI', 'saveUserSession', 'restoreUserSession',
        'handleSignIn_DISABLED', 'handleSignUp_DISABLED', 'handleSignUp_EMERGENCY_DISABLED',
        'handleSignUp_DISABLED_FROM_FINAL_CHECK', 'handleSignUp_CROSS_DEVICE_DISABLED'
    ];

    // Remove all conflicting functions
    conflictingFunctions.forEach(fn => {
        try {
            delete window[fn];
        } catch (e) {
            // Ignore errors for non-configurable properties
        }
    });

    // User storage utilities
    const UserStorage = {
        save: function(userData) {
            try {
                localStorage.setItem('vvs_user', JSON.stringify(userData));
                localStorage.setItem('vvs_user_' + userData.email, JSON.stringify(userData));
                console.log('💾 User data saved successfully');
            } catch (e) {
                console.error('❌ Failed to save user data:', e);
            }
        },

        load: function(email) {
            try {
                if (email) {
                    const userData = localStorage.getItem('vvs_user_' + email);
                    return userData ? JSON.parse(userData) : null;
                }
                const userData = localStorage.getItem('vvs_user');
                return userData ? JSON.parse(userData) : null;
            } catch (e) {
                console.error('❌ Failed to load user data:', e);
                return null;
            }
        },

        clear: function() {
            try {
                const keys = Object.keys(localStorage);
                keys.forEach(key => {
                    if (key.startsWith('vvs_user')) {
                        localStorage.removeItem(key);
                    }
                });
                console.log('🗑️ User data cleared');
            } catch (e) {
                console.error('❌ Failed to clear user data:', e);
            }
        },

        exists: function(email) {
            return !!this.load(email);
        }
    };

    // Toast notification system
    const showToast = function(message, type = 'success') {
        // Try to use existing toast manager first
        if (window.toastManager && typeof window.toastManager[type] === 'function') {
            window.toastManager[type](message);
            return;
        }

        // Fallback to simple alert
        alert(message);
    };

    // Authentication state management
    const AuthState = {
        currentUser: null,

        setUser: function(userData) {
            this.currentUser = userData;
            UserStorage.save(userData);
            this.updateUI();
        },

        clearUser: function() {
            this.currentUser = null;
            UserStorage.clear();
            this.updateUI();
        },

        loadUser: function() {
            this.currentUser = UserStorage.load();
            this.updateUI();
        },

        updateUI: function() {
            const isSignedIn = !!this.currentUser;
            
            // Update desktop states
            const signedOutState = document.getElementById('signedOutState');
            const signedInState = document.getElementById('signedInState');
            
            if (signedOutState && signedInState) {
                if (isSignedIn) {
                    signedOutState.classList.add('hidden');
                    signedInState.classList.remove('hidden');
                } else {
                    signedOutState.classList.remove('hidden');
                    signedInState.classList.add('hidden');
                }
            }

            // Update mobile states
            const mobileSignedOutState = document.getElementById('mobileSignedOutState');
            const mobileSignedInState = document.getElementById('mobileSignedInState');
            
            if (mobileSignedOutState && mobileSignedInState) {
                if (isSignedIn) {
                    mobileSignedOutState.classList.add('hidden');
                    mobileSignedInState.classList.remove('hidden');
                } else {
                    mobileSignedOutState.classList.remove('hidden');
                    mobileSignedInState.classList.add('hidden');
                }
            }

            console.log('🔄 Auth UI updated - signed in:', isSignedIn);
        }
    };

    // Modal management functions
    function openSignInModal() {
        console.log('🔑 Opening sign in modal...');
        const modal = document.getElementById('signInModal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.style.display = 'flex';
            
            // Clear form
            const emailInput = document.getElementById('signInEmail');
            const passwordInput = document.getElementById('signInPassword');
            if (emailInput) emailInput.value = '';
            if (passwordInput) passwordInput.value = '';
            
            // Focus on email field
            setTimeout(() => {
                if (emailInput) emailInput.focus();
            }, 100);
        } else {
            console.error('❌ Sign in modal not found');
        }
    }

    function openSignUpModal() {
        console.log('📝 Opening sign up modal...');
        const modal = document.getElementById('signUpModal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.style.display = 'flex';
            
            // Clear form
            const nameInput = document.getElementById('signUpName');
            const emailInput = document.getElementById('signUpEmail');
            const passwordInput = document.getElementById('signUpPassword');
            const confirmPasswordInput = document.getElementById('signUpConfirmPassword');
            
            if (nameInput) nameInput.value = '';
            if (emailInput) emailInput.value = '';
            if (passwordInput) passwordInput.value = '';
            if (confirmPasswordInput) confirmPasswordInput.value = '';
            
            // Focus on name field
            setTimeout(() => {
                if (nameInput) nameInput.focus();
            }, 100);
        } else {
            console.error('❌ Sign up modal not found');
        }
    }

    function closeSignInModal() {
        console.log('🔑 Closing sign in modal...');
        const modal = document.getElementById('signInModal');
        if (modal) {
            modal.classList.add('hidden');
            modal.style.display = 'none';
        }
    }

    function closeSignUpModal() {
        console.log('📝 Closing sign up modal...');
        const modal = document.getElementById('signUpModal');
        if (modal) {
            modal.classList.add('hidden');
            modal.style.display = 'none';
        }
    }

    function switchToSignUp() {
        closeSignInModal();
        setTimeout(openSignUpModal, 100);
    }

    function switchToSignIn() {
        closeSignUpModal();
        setTimeout(openSignInModal, 100);
    }

    // Authentication handlers
    function handleSignIn(event) {
        if (event) event.preventDefault();
        
        console.log('🔑 Processing sign in...');
        
        const emailInput = document.getElementById('signInEmail');
        const passwordInput = document.getElementById('signInPassword');
        
        if (!emailInput || !passwordInput) {
            showToast('Sign in form fields not found', 'error');
            return false;
        }
        
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        
        if (!email || !password) {
            showToast('Please enter both email and password', 'error');
            return false;
        }
        
        // Check if user exists
        const existingUser = UserStorage.load(email);
        if (!existingUser) {
            showToast('No account found with this email. Please sign up first.', 'error');
            return false;
        }
        
        // Verify password (in real app, this would be hashed)
        if (existingUser.password !== password) {
            showToast('Incorrect password', 'error');
            return false;
        }
        
        // Success - sign in user
        AuthState.setUser(existingUser);
        closeSignInModal();
        showToast(`Welcome back, ${existingUser.name}!`, 'success');
        
        console.log('✅ User signed in successfully:', existingUser.email);
        return false;
    }

    function handleSignUp(event) {
        if (event) event.preventDefault();
        
        console.log('📝 Processing sign up...');
        
        const nameInput = document.getElementById('signUpName');
        const emailInput = document.getElementById('signUpEmail');
        const passwordInput = document.getElementById('signUpPassword');
        const confirmPasswordInput = document.getElementById('signUpConfirmPassword');
        
        if (!nameInput || !emailInput || !passwordInput || !confirmPasswordInput) {
            showToast('Sign up form fields not found', 'error');
            return false;
        }
        
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();
        
        if (!name || !email || !password || !confirmPassword) {
            showToast('Please fill in all fields', 'error');
            return false;
        }
        
        if (password.length < 6) {
            showToast('Password must be at least 6 characters', 'error');
            return false;
        }
        
        if (password !== confirmPassword) {
            showToast('Passwords do not match', 'error');
            return false;
        }
        
        // Check if user already exists
        if (UserStorage.exists(email)) {
            showToast('An account with this email already exists. Please sign in instead.', 'error');
            return false;
        }
        
        // Create new user
        const userData = {
            name: name,
            email: email,
            password: password, // In real app, this would be hashed
            createdAt: new Date().toISOString()
        };
        
        // Save and sign in user
        AuthState.setUser(userData);
        closeSignUpModal();
        showToast(`Welcome to Visual Vibe Studio, ${name}!`, 'success');
        
        console.log('✅ User signed up successfully:', email);
        return false;
    }

    function signOut() {
        console.log('🚪 Signing out user...');
        
        const userName = AuthState.currentUser ? AuthState.currentUser.name : '';
        AuthState.clearUser();
        
        if (userName) {
            showToast(`Goodbye, ${userName}!`, 'success');
        } else {
            showToast('You have been signed out', 'success');
        }
    }

    // Register all functions globally
    window.openSignInModal = openSignInModal;
    window.openSignUpModal = openSignUpModal;
    window.closeSignInModal = closeSignInModal;
    window.closeSignUpModal = closeSignUpModal;
    window.switchToSignIn = switchToSignIn;
    window.switchToSignUp = switchToSignUp;
    window.handleSignIn = handleSignIn;
    window.handleSignUp = handleSignUp;
    window.signOut = signOut;

    // Expose AuthState for testing and integration
    window.AuthState = AuthState;

    // Initialize authentication system
    function initializeAuth() {
        console.log('🔧 Initializing authentication system...');
        
        // Load existing user session
        AuthState.loadUser();
        
        // Attach form event listeners
        const signInForm = document.getElementById('signInForm');
        const signUpForm = document.getElementById('signUpForm');
        
        if (signInForm) {
            signInForm.removeEventListener('submit', handleSignIn);
            signInForm.addEventListener('submit', handleSignIn);
            console.log('✅ Sign in form listener attached');
        }
        
        if (signUpForm) {
            signUpForm.removeEventListener('submit', handleSignUp);
            signUpForm.addEventListener('submit', handleSignUp);
            console.log('✅ Sign up form listener attached');
        }
        
        // Fix button onclick handlers (remove any existing and add clean ones)
        const signInButtons = document.querySelectorAll('button[onclick*="openSignInModal"]');
        const signUpButtons = document.querySelectorAll('button[onclick*="openSignUpModal"]');
        
        signInButtons.forEach((btn, i) => {
            btn.removeAttribute('onclick');
            btn.onclick = function(e) {
                e.preventDefault();
                openSignInModal();
            };
            console.log(`✅ Sign in button ${i + 1} fixed`);
        });
        
        signUpButtons.forEach((btn, i) => {
            btn.removeAttribute('onclick');
            btn.onclick = function(e) {
                e.preventDefault();
                openSignUpModal();
            };
            console.log(`✅ Sign up button ${i + 1} fixed`);
        });
        
        // Close modals when clicking outside
        document.addEventListener('click', function(e) {
            const signInModal = document.getElementById('signInModal');
            const signUpModal = document.getElementById('signUpModal');
            
            if (signInModal && e.target === signInModal) {
                closeSignInModal();
            }
            if (signUpModal && e.target === signUpModal) {
                closeSignUpModal();
            }
        });
        
        console.log('✅ Authentication system initialized successfully');
        
        // Verify functionality
        console.log('🔍 Function verification:', {
            openSignInModal: typeof window.openSignInModal,
            openSignUpModal: typeof window.openSignUpModal,
            handleSignIn: typeof window.handleSignIn,
            handleSignUp: typeof window.handleSignUp,
            signOut: typeof window.signOut,
            signInModal: !!document.getElementById('signInModal'),
            signUpModal: !!document.getElementById('signUpModal'),
            signInForm: !!document.getElementById('signInForm'),
            signUpForm: !!document.getElementById('signUpForm')
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeAuth);
    } else {
        // DOM is already loaded
        setTimeout(initializeAuth, 100);
    }

    console.log('🧹 CLEAN AUTH: Authentication system loaded successfully');

})();
