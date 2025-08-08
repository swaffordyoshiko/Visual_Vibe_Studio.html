// UNIFIED AUTHENTICATION SYSTEM - CLEAN IMPLEMENTATION
(function() {
    'use strict';
    
    console.log('🔐 UNIFIED AUTH SYSTEM - LOADING...');
    
    // Disable all conflicting auth scripts
    window.CrossDeviceAuth = null;
    window.handleSignUp_DISABLED_BY_SIMPLE_OVERRIDE = null;
    window.handleSignUp_EMERGENCY_DISABLED = null;
    window.handleSignUp_DISABLED_FROM_FINAL_CHECK = null;
    
    // Wait for DOM to be ready
    function waitForDOM(callback) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', callback);
        } else {
            callback();
        }
    }
    
    // UNIFIED SIGN IN HANDLER
    function unifiedSignIn(e) {
        console.log('🔑 UNIFIED SIGN IN - Processing...');
        if (e) e.preventDefault();
        
        try {
            const emailInput = document.getElementById('signInEmail');
            const passwordInput = document.getElementById('signInPassword');
            
            if (!emailInput || !passwordInput) {
                alert('Sign in form not found. Please refresh the page.');
                return;
            }
            
            const email = emailInput.value.trim().toLowerCase();
            const password = passwordInput.value;
            
            if (!email || !password) {
                alert('Please enter both email and password.');
                return;
            }
            
            console.log('🔍 Looking for user:', email);
            
            // Get all stored users
            const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
            console.log(`👥 Found ${users.length} total users in database`);
            
            // Find user by email
            const user = users.find(u => u.email && u.email.toLowerCase() === email);
            
            if (!user) {
                alert('No account found with this email address. Please sign up first.');
                console.log('❌ User not found for email:', email);
                return;
            }
            
            // Check password
            if (user.password !== password) {
                alert('Incorrect password. Please try again.');
                console.log('❌ Incorrect password for user:', email);
                return;
            }
            
            // Successful sign in
            console.log('✅ User authenticated:', user.name);
            
            // Create session
            const sessionUser = {
                id: user.id,
                name: user.name,
                email: user.email,
                firstName: user.firstName || user.name.split(' ')[0],
                lastName: user.lastName || user.name.split(' ').slice(1).join(' '),
                signedIn: true,
                signInTime: new Date().toISOString(),
                lastActivity: new Date().toISOString()
            };
            
            // Set global current user
            window.currentUser = sessionUser;
            localStorage.setItem('visualVibeUser', JSON.stringify(sessionUser));
            
            // Update user's last login
            user.lastLogin = new Date().toISOString();
            localStorage.setItem('visualVibeUsers', JSON.stringify(users));
            
            console.log('✅ Session created for:', sessionUser.name);
            
            // Close modal and update UI
            if (typeof window.closeSignInModal === 'function') {
                window.closeSignInModal();
            }
            
            // Update authentication UI
            updateAuthenticationUI();
            
            alert(`Welcome back, ${user.name}!`);
            
        } catch (error) {
            console.error('❌ Sign in error:', error);
            alert('Sign in failed. Please try again.');
        }
    }
    
    // UNIFIED SIGN UP HANDLER
    function unifiedSignUp(e) {
        console.log('📝 UNIFIED SIGN UP - Processing...');
        if (e) e.preventDefault();
        
        try {
            const nameInput = document.getElementById('signUpName');
            const emailInput = document.getElementById('signUpEmail');
            const passwordInput = document.getElementById('signUpPassword');
            const confirmPasswordInput = document.getElementById('signUpConfirmPassword');
            
            if (!nameInput || !emailInput || !passwordInput || !confirmPasswordInput) {
                alert('Sign up form not found. Please refresh the page.');
                return;
            }
            
            const name = nameInput.value.trim();
            const email = emailInput.value.trim().toLowerCase();
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;
            
            // Validation
            if (!name || !email || !password || !confirmPassword) {
                alert('Please fill in all fields.');
                return;
            }
            
            if (password.length < 6) {
                alert('Password must be at least 6 characters long.');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Passwords do not match.');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            console.log('📝 Creating account for:', name, email);
            
            // Check if user already exists
            const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
            const existingUser = users.find(u => u.email && u.email.toLowerCase() === email);
            
            if (existingUser) {
                alert(`An account with email "${email}" already exists. Please sign in instead.`);
                console.log('❌ Attempted duplicate registration for:', email);
                
                // Switch to sign in modal
                setTimeout(() => {
                    if (typeof window.closeSignUpModal === 'function') {
                        window.closeSignUpModal();
                    }
                    if (typeof window.openSignInModal === 'function') {
                        window.openSignInModal();
                        setTimeout(() => {
                            const signInEmailInput = document.getElementById('signInEmail');
                            if (signInEmailInput) {
                                signInEmailInput.value = email;
                            }
                        }, 200);
                    }
                }, 1000);
                return;
            }
            
            // Create new user
            const newUser = {
                id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                name: name,
                firstName: name.split(' ')[0],
                lastName: name.split(' ').slice(1).join(' ') || '',
                email: email,
                password: password,
                orders: [],
                reviews: [],
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString(),
                accountVersion: '3.0'
            };
            
            // Add to users array
            users.push(newUser);
            localStorage.setItem('visualVibeUsers', JSON.stringify(users));
            
            console.log('✅ New user created:', newUser.name);
            
            // Create session
            const sessionUser = {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                signedIn: true,
                signInTime: new Date().toISOString(),
                lastActivity: new Date().toISOString()
            };
            
            // Set global current user
            window.currentUser = sessionUser;
            localStorage.setItem('visualVibeUser', JSON.stringify(sessionUser));
            localStorage.setItem(`user_${email}`, JSON.stringify(newUser));
            
            console.log('✅ Session created for new user:', sessionUser.name);
            
            // Clear form
            nameInput.value = '';
            emailInput.value = '';
            passwordInput.value = '';
            confirmPasswordInput.value = '';
            
            // Close modal and update UI
            if (typeof window.closeSignUpModal === 'function') {
                window.closeSignUpModal();
            }
            
            // Update authentication UI
            updateAuthenticationUI();
            
            alert(`Welcome ${name}! Your account has been created successfully.`);
            
        } catch (error) {
            console.error('❌ Sign up error:', error);
            alert('Sign up failed. Please try again.');
        }
    }
    
    // SIGN OUT HANDLER
    function unifiedSignOut() {
        console.log('🚪 UNIFIED SIGN OUT - Processing...');
        
        try {
            // Clear current user
            window.currentUser = null;
            localStorage.removeItem('visualVibeUser');
            
            // Update UI
            updateAuthenticationUI();
            
            console.log('✅ User signed out successfully');
            alert('You have been signed out successfully.');
            
        } catch (error) {
            console.error('❌ Sign out error:', error);
        }
    }
    
    // UPDATE AUTHENTICATION UI
    function updateAuthenticationUI() {
        try {
            const signedInState = document.getElementById('signedInState');
            const signedOutState = document.getElementById('signedOutState');
            
            if (window.currentUser) {
                // User is signed in
                if (signedOutState) {
                    signedOutState.style.display = 'none';
                    signedOutState.style.visibility = 'hidden';
                }
                
                if (signedInState) {
                    signedInState.style.display = 'flex';
                    signedInState.style.visibility = 'visible';
                    
                    // Show all child elements
                    const childElements = signedInState.querySelectorAll('*');
                    childElements.forEach(child => {
                        child.style.display = '';
                        child.style.visibility = 'visible';
                        child.style.position = 'static';
                        child.style.left = 'auto';
                    });
                }
                
                // Also mark the body with authenticated class
                document.body.classList.add('user-authenticated');
                
                console.log('✅ UI updated for signed in user:', window.currentUser.name);
                
            } else {
                // User is not signed in
                if (signedInState) {
                    signedInState.style.display = 'none';
                    signedInState.style.visibility = 'hidden';
                    
                    // Hide all child elements
                    const childElements = signedInState.querySelectorAll('*');
                    childElements.forEach(child => {
                        child.style.display = 'none';
                        child.style.visibility = 'hidden';
                        child.style.position = 'absolute';
                        child.style.left = '-9999px';
                    });
                }
                
                if (signedOutState) {
                    signedOutState.style.display = 'flex';
                    signedOutState.style.visibility = 'visible';
                }
                
                // Remove authenticated class
                document.body.classList.remove('user-authenticated');
                
                console.log('✅ UI updated for signed out state');
            }
            
        } catch (error) {
            console.error('❌ Error updating auth UI:', error);
        }
    }
    
    // INITIALIZE SYSTEM
    function initializeAuthSystem() {
        console.log('🔧 Initializing unified auth system...');
        
        // Override all existing auth functions
        window.handleSignIn = unifiedSignIn;
        window.handleSignUp = unifiedSignUp;
        window.signOut = unifiedSignOut;
        window.updateAuthUI = updateAuthenticationUI;
        
        // Restore session if exists
        try {
            const savedUser = localStorage.getItem('visualVibeUser');
            if (savedUser) {
                window.currentUser = JSON.parse(savedUser);
                console.log('✅ Session restored for:', window.currentUser.name);
            }
        } catch (error) {
            console.log('No valid session to restore');
        }
        
        // Update UI
        updateAuthenticationUI();
        
        // Attach event listeners
        const signInForm = document.getElementById('signInForm');
        const signUpForm = document.getElementById('signUpForm');
        
        if (signInForm) {
            signInForm.removeEventListener('submit', unifiedSignIn);
            signInForm.addEventListener('submit', unifiedSignIn);
            console.log('✅ Sign in form listener attached');
        }
        
        if (signUpForm) {
            signUpForm.removeEventListener('submit', unifiedSignUp);
            signUpForm.addEventListener('submit', unifiedSignUp);
            console.log('✅ Sign up form listener attached');
        }
        
        console.log('✅ UNIFIED AUTH SYSTEM - READY');
    }
    
    // Start initialization
    waitForDOM(initializeAuthSystem);
    
    // Also run after a delay to catch dynamic forms
    setTimeout(initializeAuthSystem, 1000);
    setTimeout(initializeAuthSystem, 3000);
    
    // Make functions globally available
    window.unifiedAuth = {
        signIn: unifiedSignIn,
        signUp: unifiedSignUp,
        signOut: unifiedSignOut,
        updateUI: updateAuthenticationUI,
        initialize: initializeAuthSystem
    };
    
})();
