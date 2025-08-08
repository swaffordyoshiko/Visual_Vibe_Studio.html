// 🚨 EMERGENCY AUTHENTICATION OVERRIDE
// This completely replaces the authentication system

(function() {
    'use strict';
    
    console.log('🚨 EMERGENCY AUTH OVERRIDE STARTING...');
    
    // STEP 1: Nuclear option - clear everything and start fresh
    const authKeys = [
        'vvs_user', 'visualVibeUser', 'visualVibeUsers', 'currentUser',
        'user_', 'vvs_user_' // These will be cleared by pattern
    ];
    
    // Clear storage
    authKeys.forEach(key => localStorage.removeItem(key));
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith('user_') || key.startsWith('vvs_user_')) {
            localStorage.removeItem(key);
        }
    });
    
    // Clear window variables
    window.currentUser = null;
    
    // STEP 2: Override ALL authentication functions immediately
    
    // Simple storage manager
    const SimpleAuth = {
        saveUser: function(user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            window.currentUser = user;
            console.log('✅ User saved:', user.email);
        },
        
        getUser: function(email) {
            if (email) {
                // Check if specific user exists
                const users = this.getAllUsers();
                return users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
            }
            // Get current user
            try {
                const data = localStorage.getItem('currentUser');
                return data ? JSON.parse(data) : null;
            } catch (e) {
                return null;
            }
        },
        
        getAllUsers: function() {
            try {
                return JSON.parse(localStorage.getItem('allUsers') || '[]');
            } catch (e) {
                return [];
            }
        },
        
        addUser: function(user) {
            const users = this.getAllUsers();
            // Remove existing user with same email
            const filtered = users.filter(u => u.email.toLowerCase() !== user.email.toLowerCase());
            filtered.push(user);
            localStorage.setItem('allUsers', JSON.stringify(filtered));
        },
        
        removeCurrentUser: function() {
            localStorage.removeItem('currentUser');
            window.currentUser = null;
        }
    };
    
    // STEP 3: Simple sign in function
    window.handleSignIn = function(e) {
        if (e) e.preventDefault();
        console.log('🔑 EMERGENCY: Processing sign in...');
        
        const emailInput = document.getElementById('signInEmail');
        const passwordInput = document.getElementById('signInPassword');
        
        if (!emailInput || !passwordInput) {
            alert('Sign in form not found');
            return false;
        }
        
        const email = emailInput.value.trim().toLowerCase();
        const password = passwordInput.value.trim();
        
        if (!email || !password) {
            alert('Please enter email and password');
            return false;
        }
        
        // Check if user exists
        const user = SimpleAuth.getUser(email);
        if (!user) {
            alert('No account found. Please sign up first.');
            return false;
        }
        
        if (user.password !== password) {
            alert('Incorrect password');
            return false;
        }
        
        // Success!
        SimpleAuth.saveUser(user);
        hideSignInModal();
        forceUpdateUI(true, user.name);
        alert(`Welcome back, ${user.name}!`);
        
        console.log('✅ EMERGENCY: Sign in successful');
        return true;
    };
    
    // STEP 4: Simple sign up function
    window.handleSignUp = function(e) {
        if (e) e.preventDefault();
        console.log('📝 EMERGENCY: Processing sign up...');
        
        const nameInput = document.getElementById('signUpName');
        const emailInput = document.getElementById('signUpEmail');
        const passwordInput = document.getElementById('signUpPassword');
        const confirmInput = document.getElementById('signUpConfirmPassword');
        
        if (!nameInput || !emailInput || !passwordInput || !confirmInput) {
            alert('Sign up form not found');
            return false;
        }
        
        const name = nameInput.value.trim();
        const email = emailInput.value.trim().toLowerCase();
        const password = passwordInput.value.trim();
        const confirm = confirmInput.value.trim();
        
        if (!name || !email || !password || !confirm) {
            alert('Please fill all fields');
            return false;
        }
        
        if (password !== confirm) {
            alert('Passwords do not match');
            return false;
        }
        
        if (password.length < 6) {
            alert('Password must be at least 6 characters');
            return false;
        }
        
        // Check if user already exists
        if (SimpleAuth.getUser(email)) {
            alert('Account already exists. Please sign in instead.');
            return false;
        }
        
        // Create new user
        const newUser = {
            id: Date.now().toString(),
            name: name,
            email: email,
            password: password,
            createdAt: new Date().toISOString()
        };
        
        SimpleAuth.addUser(newUser);
        SimpleAuth.saveUser(newUser);
        hideSignUpModal();
        forceUpdateUI(true, newUser.name);
        alert(`Welcome, ${newUser.name}!`);
        
        console.log('✅ EMERGENCY: Sign up successful');
        return true;
    };
    
    // STEP 5: Force UI update function
    function forceUpdateUI(isSignedIn, userName = '') {
        console.log('🎨 EMERGENCY: Forcing UI update', { isSignedIn, userName });
        
        const signedOutState = document.getElementById('signedOutState');
        const signedInState = document.getElementById('signedInState');
        const mobileSignedOutState = document.getElementById('mobileSignedOutState');
        const mobileSignedInState = document.getElementById('mobileSignedInState');
        const userWelcome = document.getElementById('userWelcome');
        
        if (isSignedIn) {
            // Hide signed out, show signed in
            if (signedOutState) {
                signedOutState.style.display = 'none';
                signedOutState.style.visibility = 'hidden';
                signedOutState.classList.add('hidden');
            }
            if (signedInState) {
                signedInState.style.display = 'flex';
                signedInState.style.visibility = 'visible';
                signedInState.style.opacity = '1';
                signedInState.classList.remove('hidden');
            }
            if (mobileSignedOutState) {
                mobileSignedOutState.style.display = 'none';
                mobileSignedOutState.style.visibility = 'hidden';
                mobileSignedOutState.classList.add('hidden');
            }
            if (mobileSignedInState) {
                mobileSignedInState.style.display = 'block';
                mobileSignedInState.style.visibility = 'visible';
                mobileSignedInState.classList.remove('hidden');
            }
            if (userWelcome) {
                userWelcome.textContent = `Welcome, ${userName}!`;
            }
            
            // Force add profile buttons
            addEmergencyProfileButtons();
            
        } else {
            // Show signed out, hide signed in
            if (signedOutState) {
                signedOutState.style.display = 'flex';
                signedOutState.style.visibility = 'visible';
                signedOutState.classList.remove('hidden');
            }
            if (signedInState) {
                signedInState.style.display = 'none';
                signedInState.style.visibility = 'hidden';
                signedInState.classList.add('hidden');
            }
            if (mobileSignedOutState) {
                mobileSignedOutState.style.display = 'block';
                mobileSignedOutState.style.visibility = 'visible';
                mobileSignedOutState.classList.remove('hidden');
            }
            if (mobileSignedInState) {
                mobileSignedInState.style.display = 'none';
                mobileSignedInState.style.visibility = 'hidden';
                mobileSignedInState.classList.add('hidden');
            }
        }
        
        console.log('✅ EMERGENCY: UI update forced');
    }
    
    // STEP 6: Add profile buttons
    function addEmergencyProfileButtons() {
        const signedInState = document.getElementById('signedInState');
        const mobileSignedInState = document.getElementById('mobileSignedInState');
        
        // Desktop buttons
        if (signedInState && !signedInState.querySelector('.emergency-profile-btn')) {
            const buttonsHTML = `
                <button onclick="alert('Edit Profile - Coming Soon!')" class="emergency-profile-btn text-indigo-600 hover:text-indigo-800 text-sm font-medium px-2 py-1 rounded transition-colors">
                    Edit Profile
                </button>
                <button onclick="alert('My Orders - Coming Soon!')" class="emergency-profile-btn text-indigo-600 hover:text-indigo-800 text-sm font-medium px-2 py-1 rounded transition-colors">
                    My Orders
                </button>
            `;
            signedInState.insertAdjacentHTML('beforeend', buttonsHTML);
        }
        
        // Mobile buttons
        if (mobileSignedInState && !mobileSignedInState.querySelector('.emergency-mobile-btn')) {
            const mobileButtonsHTML = `
                <button onclick="alert('Edit Profile - Coming Soon!')" class="emergency-mobile-btn w-full text-left text-indigo-600 hover:text-indigo-800 py-3 text-sm">
                    Edit Profile
                </button>
                <button onclick="alert('My Orders - Coming Soon!')" class="emergency-mobile-btn w-full text-left text-indigo-600 hover:text-indigo-800 py-3 text-sm">
                    My Orders
                </button>
            `;
            mobileSignedInState.insertAdjacentHTML('beforeend', mobileButtonsHTML);
        }
    }
    
    // STEP 7: Modal functions
    window.showSignInModal = function() {
        console.log('🔑 EMERGENCY: Showing sign in modal');
        const modal = document.getElementById('signInModal');
        if (modal) {
            modal.style.display = 'flex';
            modal.classList.remove('hidden');
            
            const emailInput = document.getElementById('signInEmail');
            if (emailInput) {
                emailInput.value = '';
                setTimeout(() => emailInput.focus(), 100);
            }
            
            const passwordInput = document.getElementById('signInPassword');
            if (passwordInput) passwordInput.value = '';
        } else {
            alert('Sign in modal not found');
        }
    };
    
    window.showSignUpModal = function() {
        console.log('📝 EMERGENCY: Showing sign up modal');
        const modal = document.getElementById('signUpModal');
        if (modal) {
            modal.style.display = 'flex';
            modal.classList.remove('hidden');
            
            // Clear all fields
            ['signUpName', 'signUpEmail', 'signUpPassword', 'signUpConfirmPassword'].forEach(id => {
                const input = document.getElementById(id);
                if (input) input.value = '';
            });
            
            const nameInput = document.getElementById('signUpName');
            if (nameInput) setTimeout(() => nameInput.focus(), 100);
        } else {
            alert('Sign up modal not found');
        }
    };
    
    window.hideSignInModal = function() {
        const modal = document.getElementById('signInModal');
        if (modal) {
            modal.style.display = 'none';
            modal.classList.add('hidden');
        }
    };
    
    window.hideSignUpModal = function() {
        const modal = document.getElementById('signUpModal');
        if (modal) {
            modal.style.display = 'none';
            modal.classList.add('hidden');
        }
    };
    
    window.switchToSignUp = function() {
        hideSignInModal();
        setTimeout(showSignUpModal, 100);
    };
    
    window.switchToSignIn = function() {
        hideSignUpModal();
        setTimeout(showSignInModal, 100);
    };
    
    // STEP 8: Sign out function
    window.signOut = function() {
        console.log('👋 EMERGENCY: Signing out');
        SimpleAuth.removeCurrentUser();
        forceUpdateUI(false);
        alert('Signed out successfully');
    };
    
    // STEP 9: Override updateAuthUI
    window.updateAuthUI = forceUpdateUI;
    
    // STEP 10: Attach form handlers
    function attachHandlers() {
        const signInForm = document.getElementById('signInForm');
        const signUpForm = document.getElementById('signUpForm');
        
        if (signInForm) {
            signInForm.onsubmit = window.handleSignIn;
            console.log('✅ EMERGENCY: Sign in form handler attached');
        }
        
        if (signUpForm) {
            signUpForm.onsubmit = window.handleSignUp;
            console.log('✅ EMERGENCY: Sign up form handler attached');
        }
        
        // Modal click handlers
        const signInModal = document.getElementById('signInModal');
        const signUpModal = document.getElementById('signUpModal');
        
        if (signInModal) {
            signInModal.onclick = function(e) {
                if (e.target === this) hideSignInModal();
            };
        }
        
        if (signUpModal) {
            signUpModal.onclick = function(e) {
                if (e.target === this) hideSignUpModal();
            };
        }
    }
    
    // STEP 11: Check existing session
    function checkSession() {
        const currentUser = SimpleAuth.getUser();
        if (currentUser) {
            console.log('✅ EMERGENCY: Found existing session for:', currentUser.email);
            forceUpdateUI(true, currentUser.name);
        } else {
            console.log('ℹ️ EMERGENCY: No session found');
            forceUpdateUI(false);
        }
    }
    
    // STEP 12: Create test user for testing
    function createTestUser() {
        const testUser = {
            id: 'test123',
            name: 'Test User',
            email: 'test@test.com',
            password: 'password123',
            createdAt: new Date().toISOString()
        };
        
        SimpleAuth.addUser(testUser);
        console.log('✅ EMERGENCY: Test user created - test@test.com / password123');
    }
    
    // STEP 13: Initialize everything
    function initialize() {
        console.log('🎯 EMERGENCY: Initializing...');
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                setTimeout(() => {
                    attachHandlers();
                    createTestUser();
                    checkSession();
                }, 500);
            });
        } else {
            setTimeout(() => {
                attachHandlers();
                createTestUser();
                checkSession();
            }, 500);
        }
        
        // Show notification
        setTimeout(() => {
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #4CAF50;
                color: white;
                padding: 15px;
                border-radius: 5px;
                z-index: 10000;
                font-family: Arial, sans-serif;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            `;
            notification.textContent = '🚨 Emergency Auth Override Active - Test with test@test.com / password123';
            document.body.appendChild(notification);
            
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 5000);
        }, 1000);
        
        console.log('✅ EMERGENCY: Authentication system overridden!');
    }
    
    // Start the emergency override
    initialize();
    
})();
