// 🚀 DIRECT INJECTION COMPREHENSIVE AUTH FIX
// This script can be run in the browser console to fix authentication issues immediately

(function() {
    'use strict';
    
    console.log('🔧 DIRECT INJECTION: Comprehensive Authentication Fix Starting...');
    
    // Step 1: Clear conflicting functions
    const conflictingFunctions = [
        'handleSignIn', 'handleSignUp', 'openSignInModal', 'openSignUpModal', 
        'showSignInModal', 'showSignUpModal', 'updateAuthUI', 'signOut'
    ];
    
    conflictingFunctions.forEach(funcName => {
        if (window[funcName]) {
            console.log(`🧹 Clearing conflicting function: ${funcName}`);
            delete window[funcName];
        }
    });
    
    // Step 2: Create unified storage manager
    const AuthStorage = {
        saveUser(userData) {
            const userToSave = {
                id: userData.id || Date.now().toString(),
                name: userData.name,
                email: userData.email.toLowerCase(),
                password: userData.password,
                createdAt: userData.createdAt || new Date().toISOString()
            };
            
            // Save to all possible storage locations
            localStorage.setItem('vvs_user', JSON.stringify(userToSave));
            localStorage.setItem('visualVibeUser', JSON.stringify(userToSave));
            localStorage.setItem('currentUser', JSON.stringify(userToSave));
            localStorage.setItem(`user_${userToSave.email}`, JSON.stringify(userToSave));
            localStorage.setItem(`vvs_user_${userToSave.email}`, JSON.stringify(userToSave));
            
            // Update users array
            let users = this.getAllUsers();
            users = users.filter(u => u.email !== userToSave.email);
            users.push(userToSave);
            localStorage.setItem('visualVibeUsers', JSON.stringify(users));
            
            console.log('✅ User saved to all storage locations:', userToSave.email);
            return userToSave;
        },
        
        getUser(email) {
            if (!email) {
                for (const key of ['vvs_user', 'visualVibeUser', 'currentUser']) {
                    const userData = localStorage.getItem(key);
                    if (userData) {
                        try {
                            return JSON.parse(userData);
                        } catch (e) {
                            console.warn(`Invalid JSON in ${key}:`, e);
                        }
                    }
                }
                return null;
            }
            
            const emailLower = email.toLowerCase();
            
            // Check user-specific keys
            for (const prefix of ['user_', 'vvs_user_']) {
                const userData = localStorage.getItem(prefix + emailLower);
                if (userData) {
                    try {
                        return JSON.parse(userData);
                    } catch (e) {
                        console.warn(`Invalid JSON in ${prefix + emailLower}:`, e);
                    }
                }
            }
            
            // Check users array
            const users = this.getAllUsers();
            const user = users.find(u => u.email && u.email.toLowerCase() === emailLower);
            if (user) return user;
            
            console.log(`❌ No user found for email: ${email}`);
            return null;
        },
        
        getAllUsers() {
            try {
                const usersData = localStorage.getItem('visualVibeUsers');
                return usersData ? JSON.parse(usersData) : [];
            } catch (e) {
                console.warn('Invalid JSON in visualVibeUsers:', e);
                return [];
            }
        },
        
        removeUser() {
            const keysToRemove = ['vvs_user', 'visualVibeUser', 'currentUser'];
            keysToRemove.forEach(key => localStorage.removeItem(key));
            console.log('✅ User session cleared');
        },
        
        userExists(email) {
            return this.getUser(email) !== null;
        }
    };
    
    // Step 3: Create authentication functions
    window.handleSignIn = function(e) {
        if (e) e.preventDefault();
        console.log('🔑 FIXED: Processing sign in...');
        
        const emailInput = document.getElementById('signInEmail');
        const passwordInput = document.getElementById('signInPassword');
        
        if (!emailInput || !passwordInput) {
            alert('Sign in form not found. Please refresh the page.');
            return;
        }
        
        const email = emailInput.value.trim().toLowerCase();
        const password = passwordInput.value.trim();
        
        if (!email || !password) {
            alert('Please enter both email and password');
            return;
        }
        
        const user = AuthStorage.getUser(email);
        if (!user) {
            alert('No account found with this email. Please sign up first.');
            return;
        }
        
        if (user.password !== password) {
            alert('Incorrect password. Please try again.');
            return;
        }
        
        // Sign in successful
        const sessionUser = AuthStorage.saveUser(user);
        window.currentUser = sessionUser;
        hideSignInModal();
        updateAuthUI(true, sessionUser.name);
        
        showToast(`Welcome back, ${sessionUser.name}!`, 'success');
        console.log('✅ FIXED: Sign in successful for:', sessionUser.email);
    };
    
    window.handleSignUp = function(e) {
        if (e) e.preventDefault();
        console.log('📝 FIXED: Processing sign up...');
        
        const nameInput = document.getElementById('signUpName');
        const emailInput = document.getElementById('signUpEmail');
        const passwordInput = document.getElementById('signUpPassword');
        const confirmInput = document.getElementById('signUpConfirmPassword');
        
        if (!nameInput || !emailInput || !passwordInput || !confirmInput) {
            alert('Sign up form not found. Please refresh the page.');
            return;
        }
        
        const name = nameInput.value.trim();
        const email = emailInput.value.trim().toLowerCase();
        const password = passwordInput.value.trim();
        const confirm = confirmInput.value.trim();
        
        if (!name || !email || !password || !confirm) {
            alert('Please fill in all fields');
            return;
        }
        
        if (password.length < 6) {
            alert('Password must be at least 6 characters');
            return;
        }
        
        if (password !== confirm) {
            alert('Passwords do not match');
            return;
        }
        
        if (AuthStorage.userExists(email)) {
            alert('Account already exists with this email. Please sign in instead.');
            return;
        }
        
        const userData = {
            id: Date.now().toString(),
            name: name,
            email: email,
            password: password,
            createdAt: new Date().toISOString()
        };
        
        const sessionUser = AuthStorage.saveUser(userData);
        window.currentUser = sessionUser;
        hideSignUpModal();
        updateAuthUI(true, sessionUser.name);
        
        showToast(`Welcome to Visual Vibe Studio, ${sessionUser.name}!`, 'success');
        console.log('✅ FIXED: Sign up successful for:', sessionUser.email);
    };
    
    // Step 4: Enhanced UI update function
    window.updateAuthUI = function(isSignedIn, userName = '') {
        console.log('🎨 FIXED: Updating auth UI:', { isSignedIn, userName });
        
        const signedOutState = document.getElementById('signedOutState');
        const signedInState = document.getElementById('signedInState');
        const mobileSignedOutState = document.getElementById('mobileSignedOutState');
        const mobileSignedInState = document.getElementById('mobileSignedInState');
        const userWelcome = document.getElementById('userWelcome');
        
        if (isSignedIn) {
            if (signedOutState) {
                signedOutState.style.display = 'none';
                signedOutState.style.visibility = 'hidden';
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
            }
            if (mobileSignedInState) {
                mobileSignedInState.style.display = 'block';
                mobileSignedInState.style.visibility = 'visible';
                mobileSignedInState.classList.remove('hidden');
            }
            
            if (userWelcome && userName) {
                userWelcome.textContent = `Welcome, ${userName}!`;
            }
            
            // Add profile buttons if missing
            addProfileButtons();
            
        } else {
            if (signedOutState) {
                signedOutState.style.display = 'flex';
                signedOutState.style.visibility = 'visible';
                signedOutState.classList.remove('hidden');
            }
            if (signedInState) {
                signedInState.style.display = 'none';
                signedInState.style.visibility = 'hidden';
                signedInState.style.opacity = '0';
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
        
        console.log('✅ FIXED: Auth UI updated successfully');
    };
    
    // Step 5: Add profile management buttons
    function addProfileButtons() {
        const signedInState = document.getElementById('signedInState');
        const mobileSignedInState = document.getElementById('mobileSignedInState');
        
        if (signedInState && !signedInState.querySelector('.profile-btn')) {
            const profileButtonsHTML = `
                <button onclick="openEditProfile()" class="profile-btn text-indigo-600 hover:text-indigo-800 text-sm font-medium px-2 py-1 rounded transition-colors">
                    Edit Profile
                </button>
                <button onclick="openMyOrders()" class="profile-btn text-indigo-600 hover:text-indigo-800 text-sm font-medium px-2 py-1 rounded transition-colors">
                    My Orders
                </button>
            `;
            
            const signOutBtn = signedInState.querySelector('button[onclick*="signOut"]');
            if (signOutBtn) {
                signOutBtn.insertAdjacentHTML('beforebegin', profileButtonsHTML);
            }
        }
        
        if (mobileSignedInState && !mobileSignedInState.querySelector('.mobile-profile-btn')) {
            const mobileButtonsHTML = `
                <button onclick="openEditProfile(); toggleMobileMenu && toggleMobileMenu();" class="mobile-profile-btn w-full text-left text-indigo-600 hover:text-indigo-800 py-3 text-sm">
                    Edit Profile
                </button>
                <button onclick="openMyOrders(); toggleMobileMenu && toggleMobileMenu();" class="mobile-profile-btn w-full text-left text-indigo-600 hover:text-indigo-800 py-3 text-sm">
                    My Orders
                </button>
            `;
            
            const mobileSignOutBtn = mobileSignedInState.querySelector('button[onclick*="signOut"]');
            if (mobileSignOutBtn) {
                mobileSignOutBtn.insertAdjacentHTML('beforebegin', mobileButtonsHTML);
            }
        }
    }
    
    // Step 6: Profile management functions
    window.openEditProfile = function() {
        console.log('👤 FIXED: Opening edit profile...');
        alert('Edit Profile feature coming soon!\\n\\nCurrent user: ' + (window.currentUser ? window.currentUser.name + ' (' + window.currentUser.email + ')' : 'None'));
    };
    
    window.openMyOrders = function() {
        console.log('📦 FIXED: Opening my orders...');
        alert('My Orders feature coming soon!\\n\\nThis will show your order history and current projects.');
    };
    
    // Step 7: Modal functions
    window.showSignInModal = function() {
        console.log('🔑 FIXED: Showing sign in modal');
        const modal = document.getElementById('signInModal');
        if (modal) {
            modal.style.display = 'flex';
            modal.classList.remove('hidden');
            
            const emailInput = document.getElementById('signInEmail');
            const passwordInput = document.getElementById('signInPassword');
            if (emailInput) {
                emailInput.value = '';
                setTimeout(() => emailInput.focus(), 100);
            }
            if (passwordInput) passwordInput.value = '';
        }
    };
    
    window.showSignUpModal = function() {
        console.log('📝 FIXED: Showing sign up modal');
        const modal = document.getElementById('signUpModal');
        if (modal) {
            modal.style.display = 'flex';
            modal.classList.remove('hidden');
            
            const inputs = ['signUpName', 'signUpEmail', 'signUpPassword', 'signUpConfirmPassword'];
            inputs.forEach((id, index) => {
                const input = document.getElementById(id);
                if (input) {
                    input.value = '';
                    if (index === 0) setTimeout(() => input.focus(), 100);
                }
            });
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
    
    // Step 8: Enhanced sign out
    window.signOut = function() {
        console.log('👋 FIXED: Signing out user');
        AuthStorage.removeUser();
        window.currentUser = null;
        updateAuthUI(false);
        showToast('You have been signed out', 'info');
    };
    
    // Step 9: Toast notification system
    function showToast(message, type = 'info') {
        const existingToasts = document.querySelectorAll('.auth-toast');
        existingToasts.forEach(toast => toast.remove());
        
        const toast = document.createElement('div');
        toast.className = `auth-toast fixed top-4 right-4 z-[10000] px-6 py-3 rounded-lg shadow-lg text-white font-medium transform transition-all duration-300 translate-x-full opacity-0 ${
            type === 'success' ? 'bg-green-500' : 
            type === 'error' ? 'bg-red-500' : 
            type === 'info' ? 'bg-blue-500' : 'bg-gray-500'
        }`;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        requestAnimationFrame(() => {
            toast.classList.remove('translate-x-full', 'opacity-0');
        });
        
        setTimeout(() => {
            toast.classList.add('translate-x-full', 'opacity-0');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }
    
    // Step 10: Setup form handlers
    function setupFormHandlers() {
        const signInForm = document.getElementById('signInForm') || document.querySelector('form[onsubmit*="handleSignIn"]');
        const signUpForm = document.getElementById('signUpForm') || document.querySelector('form[onsubmit*="handleSignUp"]');
        
        if (signInForm) {
            signInForm.onsubmit = window.handleSignIn;
            console.log('✅ FIXED: Sign in form handler attached');
        }
        
        if (signUpForm) {
            signUpForm.onsubmit = window.handleSignUp;
            console.log('✅ FIXED: Sign up form handler attached');
        }
        
        // Setup modal close handlers
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
    
    // Step 11: Check existing session
    function checkExistingSession() {
        console.log('🔍 FIXED: Checking for existing session...');
        
        const currentUser = AuthStorage.getUser();
        if (currentUser) {
            console.log('✅ FIXED: Found existing session for:', currentUser.email);
            window.currentUser = currentUser;
            updateAuthUI(true, currentUser.name);
        } else {
            console.log('ℹ️ FIXED: No existing session found');
            updateAuthUI(false);
        }
    }
    
    // Step 12: Initialize everything
    function initialize() {
        console.log('🎯 FIXED: Initializing comprehensive authentication system...');
        
        setupFormHandlers();
        checkExistingSession();
        
        console.log('✅ FIXED: Comprehensive authentication system initialized!');
        
        // Show success message
        showToast('Authentication system fixed successfully!', 'success');
        
        // Protect against overrides
        setTimeout(() => {
            const protectedFunctions = {
                handleSignIn: window.handleSignIn,
                handleSignUp: window.handleSignUp,
                updateAuthUI: window.updateAuthUI,
                showSignInModal: window.showSignInModal,
                showSignUpModal: window.showSignUpModal,
                signOut: window.signOut
            };
            
            Object.entries(protectedFunctions).forEach(([name, func]) => {
                if (window[name] !== func) {
                    console.log(`🛡️ FIXED: Restoring protected function: ${name}`);
                    window[name] = func;
                }
            });
        }, 2000);
    }
    
    // Step 13: Start the fix
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
    
    console.log('🚀 DIRECT INJECTION: Comprehensive authentication fix completed!');
    
})();
